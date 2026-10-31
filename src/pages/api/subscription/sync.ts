import type { APIRoute } from 'astro';
import { listSubscriptions } from '@lemonsqueezy/lemonsqueezy.js';
import {
	LEMONSQUEEZY_STORE_ID,
	LEMONSQUEEZY_VARIANTS,
	getPlanFromVariantOrPriceId,
} from '../../../lib/lemonsqueezy';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

interface SyncRequestBody {
	userId?: string;
	email?: string;
}

export const POST: APIRoute = async ({ request }) => {
	try {
		let body: SyncRequestBody = {};
		try {
			body = await request.json();
		} catch {
			return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const { userId, email } = body;

		if (!email && !userId) {
			return new Response(
				JSON.stringify({ error: 'Missing required parameter: email or userId' }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// 1. If we have LEMONSQUEEZY_STORE_ID and an email, check live subscriptions directly
		let livePlan: 'free' | 'pro' | 'family' = 'free';
		let activeSubscription: any = null;

		if (email && LEMONSQUEEZY_STORE_ID) {
			try {
				const lemonRes = await listSubscriptions({
					filter: {
						storeId: LEMONSQUEEZY_STORE_ID,
						userEmail: email.trim().toLowerCase(),
					},
				});

				const subscriptions = lemonRes.data?.data || [];

				// Filter for valid active or trialing subscriptions
				const activeSubs = subscriptions.filter((s: any) => {
					const status = s.attributes?.status;
					return status === 'active' || status === 'on_trial' || status === 'trialing';
				});

				if (activeSubs.length > 0) {
					// Check if any of the active subscriptions is a family plan (family takes precedence)
					const familySub = activeSubs.find((s: any) => {
						const variantId = String(s.attributes?.variant_id);
						const productName = String(s.attributes?.product_name || '');
						const variantName = String(s.attributes?.variant_name || '');
						return (
							variantId === String(LEMONSQUEEZY_VARIANTS.family.monthly) ||
							variantId === String(LEMONSQUEEZY_VARIANTS.family.yearly) ||
							productName.toLowerCase().includes('family') ||
							variantName.toLowerCase().includes('family')
						);
					});

					if (familySub) {
						livePlan = 'family';
						activeSubscription = familySub;
					} else {
						// Otherwise it's a Pro plan
						livePlan = 'pro';
						activeSubscription = activeSubs[0];
					}
				}
			} catch (lemonErr) {
				console.error('[Subscription Sync] Lemon Squeezy API check error:', lemonErr);
			}
		}

		// 2. If user is still 'free', check if they are a member or owner of a Family household
		if (livePlan === 'free' && (userId || email)) {
			try {
				let houseQuery = supabase.from('family_households').select('id');
				if (userId) houseQuery = houseQuery.eq('owner_id', userId);
				else if (email) houseQuery = houseQuery.eq('owner_email', email.trim().toLowerCase());
				const { data: ownerHouse } = await houseQuery.maybeSingle();

				if (ownerHouse) {
					livePlan = 'family';
				} else {
					let memberQuery = supabase.from('family_members').select('id, status');
					if (userId) memberQuery = memberQuery.eq('user_id', userId);
					else if (email) memberQuery = memberQuery.eq('email', email.trim().toLowerCase());
					const { data: memberRecord } = await memberQuery.maybeSingle();

					if (memberRecord && (memberRecord.status === 'active' || memberRecord.status === 'pending')) {
						livePlan = 'family';
					}
				}
			} catch {
				/* Supabase table check optional */
			}
		}

		// 3. Update Supabase public.users if table exists and userId is available
		if (userId && livePlan !== 'free') {
			try {
				await supabase
					.from('users')
					.upsert(
						{
							id: userId,
							email: email ? email.trim().toLowerCase() : undefined,
							plan: livePlan,
							subscription_status: 'active',
							stripe_customer_id: activeSubscription?.attributes?.customer_id ? String(activeSubscription.attributes.customer_id) : undefined,
							stripe_subscription_id: activeSubscription?.id ? String(activeSubscription.id) : undefined,
							updated_at: new Date().toISOString(),
						},
						{ onConflict: 'id' }
					);
			} catch (dbErr) {
				console.warn('[Subscription Sync] Note: Supabase public.users update skipped:', dbErr);
			}
		}

		return new Response(
			JSON.stringify({
				ok: true,
				active: livePlan !== 'free',
				plan: livePlan,
				subscriptionId: activeSubscription?.id || null,
				renewsAt: activeSubscription?.attributes?.renews_at || null,
				status: activeSubscription?.attributes?.status || 'none',
				message: livePlan !== 'free'
					? `Synchronized ${livePlan.toUpperCase()} subscription from payment gateway.`
					: 'No active paid subscription found on payment gateway.',
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (err: any) {
		console.error('[Subscription Sync] Fatal error:', err);
		return new Response(
			JSON.stringify({ error: err.message || 'Internal server error' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
};

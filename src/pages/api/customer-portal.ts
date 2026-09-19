import type { APIRoute } from 'astro';
import { getCustomer } from '@lemonsqueezy/lemonsqueezy.js';
import { stripe } from '../../lib/stripe';
import { supabase } from '../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		let body: { userId?: string; customerId?: string };
		try {
			body = await request.json();
		} catch {
			return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		let { userId, customerId } = body;

		const origin =
			request.headers.get('origin') ||
			request.headers.get('referer') ||
			'https://cancelkits.com';
		const returnUrl = `${new URL(origin).origin}/account`;

		// If customerId is not provided, look it up in Supabase
		if (!customerId && userId) {
			const { data: userProfile } = await supabase
				.from('users')
				.select('stripe_customer_id, plan')
				.eq('id', userId)
				.maybeSingle();

			if (userProfile?.stripe_customer_id) {
				customerId = userProfile.stripe_customer_id;
			}
		}

		if (!customerId) {
			return new Response(
				JSON.stringify({
					error: 'No active billing subscription found. Upgrade to Pro to manage subscriptions.',
				}),
				{
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// 1. Check if this is a Lemon Squeezy customer ID (numeric or non-cus_ prefix)
		if (!customerId.startsWith('cus_')) {
			try {
				const customer = await getCustomer(customerId);
				const portalUrl = customer.data?.data?.attributes?.urls?.customer_portal;
				if (portalUrl) {
					return new Response(JSON.stringify({ url: portalUrl }), {
						status: 200,
						headers: { 'Content-Type': 'application/json' },
					});
				}
			} catch (lsErr) {
				console.warn('[Lemon Customer Portal] Direct customer lookup failed, redirecting to orders portal:', lsErr);
			}

			// Lemon Squeezy default customer order & subscription management portal
			return new Response(
				JSON.stringify({ url: 'https://app.lemonsqueezy.com/my-orders' }),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// 2. Fallback to Stripe Billing Portal for legacy Stripe customers
		try {
			const portalSession = await stripe.billingPortal.sessions.create({
				customer: customerId,
				return_url: returnUrl,
			});

			return new Response(JSON.stringify({ url: portalSession.url }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (stripeErr: any) {
			console.warn('[Stripe Portal] Fallback failed:', stripeErr?.message);
			return new Response(
				JSON.stringify({ url: `${returnUrl}?portal_fallback=1` }),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}
	} catch (err: any) {
		console.error('Customer portal error:', err);
		return new Response(
			JSON.stringify({
				error: err?.message || 'Failed to create billing portal session',
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
};

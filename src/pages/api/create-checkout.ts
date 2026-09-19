import type { APIRoute } from 'astro';
import { createCheckout } from '@lemonsqueezy/lemonsqueezy.js';
import {
	LEMONSQUEEZY_STORE_ID,
	resolveLemonVariantId,
	getPlanFromVariantOrPriceId,
} from '../../lib/lemonsqueezy';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	let siteUrl = 'https://cancelkits.com';

	try {
		const origin =
			request.headers.get('origin') ||
			request.headers.get('referer') ||
			'https://cancelkits.com';
		siteUrl = new URL(origin).origin;

		let body: {
			variantId?: string | number;
			priceId?: string;
			tier?: 'pro' | 'family';
			billing?: 'monthly' | 'yearly';
			userId?: string;
			email?: string;
			referralCode?: string;
		};

		try {
			body = await request.json();
		} catch {
			return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const {
			variantId,
			priceId,
			tier,
			billing = 'monthly',
			userId,
			email,
			referralCode,
		} = body as any;

		// Resolve the plan ('pro' | 'family') and matching Lemon Squeezy variant ID
		const plan = tier || getPlanFromVariantOrPriceId(variantId || priceId);
		const targetVariantId = variantId || resolveLemonVariantId(priceId || tier, billing);

		// If no Lemon Squeezy store ID is configured yet (e.g. initial dev setup), provide graceful sandbox fallback
		if (!LEMONSQUEEZY_STORE_ID || targetVariantId.toString().startsWith('variant_')) {
			console.warn('[LemonSqueezy Sandbox] Store ID or live variant not configured yet. Returning sandbox test URL.');
			return new Response(
				JSON.stringify({
					url: `${siteUrl}/dashboard?upgraded=true&sandbox=1&plan=${plan}`,
					sandbox: true,
				}),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// Build custom metadata for webhook processing
		const custom: Record<string, string> = { plan };
		if (userId) custom.userId = String(userId);
		if (referralCode) custom.referralCode = String(referralCode);

		// Create real Lemon Squeezy Checkout Session
		const checkout = await createCheckout(LEMONSQUEEZY_STORE_ID, targetVariantId, {
			checkoutData: {
				email: email || undefined,
				custom,
			},
			productOptions: {
				redirectUrl: `${siteUrl}/dashboard?upgraded=true`,
				receiptButtonText: 'Return to CancelKits Dashboard',
				receiptLinkUrl: `${siteUrl}/dashboard`,
			},
		});

		const checkoutUrl = checkout.data?.data?.attributes?.url;

		if (!checkoutUrl) {
			const errorMsg =
				checkout.error?.message ||
				checkout.error?.cause ||
				'Failed to generate checkout URL from Lemon Squeezy';
			throw new Error(String(errorMsg));
		}

		return new Response(JSON.stringify({ url: checkoutUrl }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err: any) {
		console.error('Lemon Squeezy create-checkout error:', err);

		// Graceful dev fallback if keys are missing or invalid
		const isAuthIssue =
			err?.message?.includes('401') ||
			err?.message?.includes('Unauthorized') ||
			err?.message?.includes('credentials');

		if (isAuthIssue) {
			console.warn('[LemonSqueezy Sandbox] Authentication missing. Falling back to sandbox checkout URL for testing.');
			return new Response(
				JSON.stringify({
					url: `${siteUrl}/dashboard?upgraded=true&sandbox=1`,
					sandbox: true,
				}),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		return new Response(
			JSON.stringify({
				error: err?.message || 'Failed to create Lemon Squeezy checkout session',
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
};

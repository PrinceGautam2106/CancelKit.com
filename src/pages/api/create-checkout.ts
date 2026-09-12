import type { APIRoute } from 'astro';
import { stripe, STRIPE_PRICES, getPlanFromPriceId } from '../../lib/stripe';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		let body: { priceId?: string; userId?: string; email?: string };
		try {
			body = await request.json();
		} catch {
			return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const { priceId = STRIPE_PRICES.pro.monthly, userId, email } = body;

		const origin =
			request.headers.get('origin') ||
			request.headers.get('referer') ||
			'https://cancelkit.com';
		const siteUrl = new URL(origin).origin;

		const plan = getPlanFromPriceId(priceId);

		// Create Stripe Checkout Session
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			mode: 'subscription',
			customer_email: email || undefined,
			client_reference_id: userId || undefined,
			metadata: {
				userId: userId || '',
				plan,
			},
			subscription_data: {
				metadata: {
					userId: userId || '',
					plan,
				},
			},
			success_url: `${siteUrl}/dashboard?upgraded=true`,
			cancel_url: `${siteUrl}/pricing`,
			allow_promotion_codes: true,
		});

		return new Response(JSON.stringify({ url: session.url }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err: any) {
		console.error('Stripe create-checkout error:', err);
		return new Response(
			JSON.stringify({
				error: err?.message || 'Failed to create Stripe checkout session',
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
};

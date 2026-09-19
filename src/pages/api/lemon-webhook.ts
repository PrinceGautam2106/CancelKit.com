import type { APIRoute } from 'astro';
import crypto from 'node:crypto';
import { supabase } from '../../lib/supabase';
import { resend, EMAIL_DEFAULTS } from '../../lib/resend';
import { paymentFailedHtml, paymentFailedSubject } from '../../lib/emails/payment-failed';
import {
	LEMONSQUEEZY_WEBHOOK_SECRET,
	getPlanFromVariantOrPriceId,
} from '../../lib/lemonsqueezy';

export const prerender = false;

function verifySignature(rawBody: string, signature: string, secret: string): boolean {
	try {
		const hmac = crypto.createHmac('sha256', secret);
		const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
		const signatureBuffer = Buffer.from(signature, 'utf8');
		return (
			digest.length === signatureBuffer.length &&
			crypto.timingSafeEqual(digest, signatureBuffer)
		);
	} catch (err) {
		console.error('[LemonSqueezy Webhook] Signature verification error:', err);
		return false;
	}
}

export const POST: APIRoute = async ({ request }) => {
	const signature = request.headers.get('x-signature');
	const rawBody = await request.text();

	if (LEMONSQUEEZY_WEBHOOK_SECRET) {
		if (!signature || !verifySignature(rawBody, signature, LEMONSQUEEZY_WEBHOOK_SECRET)) {
			console.error('[LemonSqueezy Webhook] Invalid signature rejected');
			return new Response(JSON.stringify({ error: 'Invalid signature' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	} else {
		console.warn(
			'[LemonSqueezy Webhook] LEMONSQUEEZY_WEBHOOK_SECRET not set, proceeding in test mode'
		);
	}

	let payload: any;
	try {
		payload = JSON.parse(rawBody);
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const eventName = payload.meta?.event_name;
	const customData = payload.meta?.custom_data || {};
	const data = payload.data || {};
	const attributes = data.attributes || {};

	const customerId = attributes.customer_id ? String(attributes.customer_id) : null;
	const subscriptionId = data.id ? String(data.id) : null;
	const email = attributes.user_email || customData.email;
	let userId = customData.userId;
	const referralCode = customData.referralCode;

	try {
		// Look up userId by email if not present in custom data
		if (!userId && email) {
			const { data: userRecord } = await supabase
				.from('users')
				.select('id')
				.eq('email', email)
				.maybeSingle();
			if (userRecord?.id) {
				userId = userRecord.id;
			}
		}

		switch (eventName) {
			case 'subscription_created':
			case 'subscription_resumed': {
				const plan =
					customData.plan ||
					getPlanFromVariantOrPriceId(attributes.variant_id || attributes.variant_name);

				// Update user in Supabase
				if (userId) {
					try {
						await supabase
							.from('users')
							.update({
								plan,
								stripe_customer_id: customerId, // Kept compatible with existing DB columns
								stripe_subscription_id: subscriptionId,
								updated_at: new Date().toISOString(),
							})
							.eq('id', userId);
					} catch (dbErr) {
						console.warn('[Lemon Webhook] Failed to update user record:', dbErr);
					}
				}

				// Upsert subscription tracking entry
				if (userId || customerId) {
					try {
						const renewsAt = attributes.renews_at
							? attributes.renews_at.split('T')[0]
							: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

						await supabase.from('subscriptions').upsert(
							{
								user_id: userId || customerId,
								name: `CancelKits ${plan.toUpperCase()}`,
								category: 'Software & Cloud',
								amount: plan === 'family' ? 19 : 9,
								currency: 'USD',
								billing_cycle: attributes.billing_anchor ? 'yearly' : 'monthly',
								renewal_date: renewsAt,
								status: 'active',
							},
							{ onConflict: 'user_id,name' }
						);
					} catch (subErr) {
						console.warn('[Lemon Webhook] Failed to upsert subscription:', subErr);
					}
				}
				break;
			}

			case 'subscription_updated': {
				const plan =
					customData.plan ||
					getPlanFromVariantOrPriceId(attributes.variant_id || attributes.variant_name);
				const status = attributes.status; // 'active', 'past_due', 'paused', etc.

				if (userId) {
					try {
						await supabase
							.from('users')
							.update({
								plan: status === 'active' ? plan : 'free',
								updated_at: new Date().toISOString(),
							})
							.eq('id', userId);
					} catch (dbErr) {
						console.warn('[Lemon Webhook] Failed to update user status:', dbErr);
					}
				}
				break;
			}

			case 'subscription_cancelled':
			case 'subscription_expired': {
				if (userId) {
					try {
						await supabase
							.from('users')
							.update({
								plan: 'free',
								stripe_subscription_id: null,
								updated_at: new Date().toISOString(),
							})
							.eq('id', userId);
					} catch (dbErr) {
						console.warn('[Lemon Webhook] Failed to downgrade user:', dbErr);
					}
				}
				break;
			}

			case 'subscription_payment_failed': {
				const amount = attributes.total_formatted || '$9.00';
				const failedDate = new Date().toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				});
				const gracePeriodEnd = new Date(
					Date.now() + 3 * 24 * 60 * 60 * 1000
				).toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				});

				if (email) {
					try {
						await resend.emails.send({
							from: EMAIL_DEFAULTS.from,
							replyTo: EMAIL_DEFAULTS.replyTo,
							to: [email],
							subject: paymentFailedSubject(),
							html: paymentFailedHtml({
								email,
								userId: userId || customerId || '',
								planName: 'Pro',
								amount,
								failedDate,
								gracePeriodEnd,
							}),
						});
					} catch (emailErr) {
						console.warn('[Lemon Webhook] Failed to send payment failed email:', emailErr);
					}
				}
				break;
			}

			default:
				console.log(`[Lemon Webhook] Unhandled event: ${eventName}`);
		}

		return new Response(JSON.stringify({ received: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err: any) {
		console.error('[Lemon Webhook] Processing error:', err);
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

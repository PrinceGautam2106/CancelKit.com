/**
 * POST /api/webhooks/inbox-event
 *
 * Real-Time Inbox Receipt & Trial Guardian Ingestion Engine (Phase 3).
 *
 * Receives incoming email events (via Gmail Pub/Sub, Outlook Graph webhooks, or forwarded receipts):
 * 1. Analyzes the email using `parseIncomingEmailReceipt`.
 * 2. Identifies new recurring subscriptions or free trial activations.
 * 3. Records the subscription in Supabase with calculated renewal / billing window.
 * 4. Dispatches the high-conversion "Guardian Alert" email within minutes.
 * 5. Logs to Supabase alerts and email_log tables.
 */

import type { APIRoute } from 'astro';
import { parseIncomingEmailReceipt } from '../../../lib/inbox-scanner';
import { supabase } from '../../../lib/supabase';
import { resend, EMAIL_DEFAULTS } from '../../../lib/resend';
import {
	liveSubscriptionAlertSubject,
	liveSubscriptionAlertHtml,
	type LiveSubscriptionAlertData,
} from '../../../lib/emails';

export const prerender = false;

interface InboxEventPayload {
	userEmail?: string;
	userId?: string;
	from?: string;
	subject?: string;
	body?: string;
	// Optional pre-parsed overrides
	serviceName?: string;
	monthlyAmount?: number;
	isFreeTrial?: boolean;
	trialDaysRemaining?: number;
}

export const POST: APIRoute = async ({ request, url }) => {
	// ── 1. Security Check ──
	const authHeader = request.headers.get('authorization');
	const secretHeader = request.headers.get('x-webhook-secret') || request.headers.get('x-api-secret');
	const querySecret = url.searchParams.get('secret');

	const configuredSecret = import.meta.env.WEBHOOK_SECRET || process.env.WEBHOOK_SECRET || import.meta.env.CRON_SECRET || process.env.CRON_SECRET;
	const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';

	const token = authHeader?.replace(/^Bearer\s+/i, '') || secretHeader || querySecret;

	if (configuredSecret && token !== configuredSecret && !isLocal) {
		return new Response(JSON.stringify({ error: 'Unauthorized webhook trigger' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		let body: InboxEventPayload = {};
		try {
			body = await request.json();
		} catch {
			return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const userEmail = body.userEmail || '';
		let userId = body.userId || '';

		if (!userEmail) {
			return new Response(JSON.stringify({ error: 'Missing required userEmail in event payload' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// ── 2. If userId not supplied, lookup user in Supabase ──
		if (!userId) {
			const { data: userProfile } = await supabase
				.from('users')
				.select('id, full_name, plan')
				.eq('email', userEmail)
				.maybeSingle();

			if (userProfile?.id) {
				userId = userProfile.id;
			}
		}

		// ── 3. Parse Email for Subscription / Trial Signature ──
		const parsed = parseIncomingEmailReceipt({
			from: body.from || '',
			subject: body.subject || '',
			body: body.body || '',
		});

		const serviceName = body.serviceName || parsed?.serviceName;
		const monthlyAmount = body.monthlyAmount ?? parsed?.monthlyAmount;
		const isFreeTrial = body.isFreeTrial ?? parsed?.isFreeTrial ?? false;
		const trialDaysRemaining = body.trialDaysRemaining ?? parsed?.trialDaysRemaining ?? 7;
		const category = parsed?.category || 'Software & Cloud';

		if (!serviceName || monthlyAmount == null) {
			return new Response(
				JSON.stringify({
					ok: true,
					detected: false,
					message: 'Email analyzed: no active subscription receipt or free trial signature matched',
				}),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// ── 4. Calculate Renewal / Billing Window ──
		const daysUntilBilling = isFreeTrial ? trialDaysRemaining : 30;
		const billingDateObj = new Date(Date.now() + daysUntilBilling * 86400000);
		const billingDateStr = billingDateObj.toISOString().split('T')[0];
		const billingDateFormatted = billingDateObj.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});

		// ── 5. Record / Upsert to Supabase subscriptions table ──
		if (userId && userId !== 'anonymous') {
			try {
				await supabase.from('subscriptions').upsert(
					{
						user_id: userId,
						name: serviceName,
						category,
						amount: monthlyAmount,
						currency: 'USD',
						billing_cycle: 'monthly',
						renewal_date: billingDateStr,
						status: isFreeTrial ? 'trial' : 'active',
					},
					{ onConflict: 'user_id,name' }
				);

				// Log to alerts table
				await supabase.from('alerts').insert({
					user_id: userId,
					type: isFreeTrial ? 'trial_ending' : 'renewal_upcoming',
				});
			} catch (dbErr) {
				console.warn('[Inbox Webhook] Database upsert notice:', dbErr);
			}
		}

		// ── 6. Dispatch the "Guardian Alert" via Resend ──
		const alertData: LiveSubscriptionAlertData = {
			email: userEmail,
			userId,
			serviceName,
			monthlyAmount,
			isFreeTrial,
			trialDaysRemaining,
			billingDate: billingDateFormatted,
			category,
			cancelUrl: `https://cancelkits.com/cancel/${encodeURIComponent(serviceName.toLowerCase().replace(/[^a-z0-9]/g, '-'))}`,
			upgradeUrl: `https://cancelkits.com/pricing?service=${encodeURIComponent(serviceName)}`,
		};

		const subject = liveSubscriptionAlertSubject(alertData);
		const html = liveSubscriptionAlertHtml(alertData);

		let emailSent = false;
		let emailError: string | null = null;

		try {
			const sendRes = await resend.emails.send({
				from: EMAIL_DEFAULTS.from,
				replyTo: EMAIL_DEFAULTS.replyTo,
				to: userEmail,
				subject,
				html,
			});

			if (!sendRes.error) {
				emailSent = true;
			} else {
				emailError = sendRes.error.message;
			}

			// Log to Supabase email_log
			if (userId) {
				await supabase.from('email_log').insert({
					user_id: userId,
					template: 'live-subscription-alert',
					resend_id: (sendRes as any)?.data?.id ?? null,
					status: sendRes.error ? 'failed' : 'sent',
					error_message: emailError,
				});
			}
		} catch (err) {
			emailError = err instanceof Error ? err.message : 'Send failed';
		}

		return new Response(
			JSON.stringify({
				ok: true,
				detected: true,
				event: {
					serviceName,
					monthlyAmount,
					isFreeTrial,
					trialDaysRemaining,
					billingDate: billingDateFormatted,
				},
				emailSent,
				emailError,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Inbox event webhook failed';
		console.error('[Inbox Webhook Fatal Error]:', error);
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

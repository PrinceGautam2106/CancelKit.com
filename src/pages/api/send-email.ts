/**
 * POST /api/send-email
 *
 * Internal API endpoint — called by other server routes / cron jobs.
 * Accepts: { template, to, data }
 * Sends via Resend and logs to Supabase email_log table.
 *
 * Requires `output: 'server'` or `export const prerender = false;` to work at runtime.
 */

import type { APIRoute } from 'astro';
import { resend, EMAIL_DEFAULTS } from '../../lib/resend';
import { supabase } from '../../lib/supabase';

import {
	welcomeSubject,
	welcomeHtml,
	cancelConfirmationSubject,
	cancelConfirmationHtml,
	renewalAlertSubject,
	renewalAlertHtml,
	paymentFailedSubject,
	paymentFailedHtml,
	weeklySavingsSubject,
	weeklySavingsHtml,
	auditReportSubject,
	auditReportHtml,
	weeklyRenewalRadarSubject,
	weeklyRenewalRadarHtml,
	liveSubscriptionAlertSubject,
	liveSubscriptionAlertHtml,
} from '../../lib/emails';

export const prerender = false;

type TemplateName =
	| 'welcome'
	| 'cancel-confirmation'
	| 'renewal-alert'
	| 'payment-failed'
	| 'weekly-savings'
	| 'audit-report'
	| 'weekly-renewal-radar'
	| 'live-subscription-alert';

interface SendEmailRequest {
	template: TemplateName;
	to: string;
	data: Record<string, any>;
}

/**
 * Resolve subject + html for the requested template.
 */
function resolveTemplate(
	template: TemplateName,
	data: Record<string, any>
): { subject: string; html: string } | null {
	switch (template) {
		case 'welcome':
			return {
				subject: welcomeSubject(),
				html: welcomeHtml(data as any),
			};
		case 'cancel-confirmation':
			return {
				subject: cancelConfirmationSubject(data as any),
				html: cancelConfirmationHtml(data as any),
			};
		case 'renewal-alert':
			return {
				subject: renewalAlertSubject(data as any),
				html: renewalAlertHtml(data as any),
			};
		case 'payment-failed':
			return {
				subject: paymentFailedSubject(),
				html: paymentFailedHtml(data as any),
			};
		case 'weekly-savings':
			return {
				subject: weeklySavingsSubject(data as any),
				html: weeklySavingsHtml(data as any),
			};
		case 'audit-report':
			return {
				subject: auditReportSubject(data as any),
				html: auditReportHtml(data as any),
			};
		case 'weekly-renewal-radar':
			return {
				subject: weeklyRenewalRadarSubject(data as any),
				html: weeklyRenewalRadarHtml(data as any),
			};
		case 'live-subscription-alert':
			return {
				subject: liveSubscriptionAlertSubject(data as any),
				html: liveSubscriptionAlertHtml(data as any),
			};
		default:
			return null;
	}
}

export const POST: APIRoute = async ({ request }) => {
	// ── Auth: only allow internal calls (server-side / same-origin) ──
	const origin = request.headers.get('origin');
	const referer = request.headers.get('referer');
	const apiSecret = request.headers.get('x-api-secret');

	// In production you'd check apiSecret against a shared key.
	// For now, accept requests from same origin or with any x-api-secret header.
	const isTrusted =
		apiSecret ||
		(origin && origin.includes('cancelkits.com')) ||
		(origin && origin.includes('localhost')) ||
		(referer && referer.includes('cancelkits.com')) ||
		(referer && referer.includes('localhost'));

	if (!isTrusted) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	let body: SendEmailRequest;
	try {
		body = await request.json();
	} catch {
		return new Response(
			JSON.stringify({ error: 'Invalid JSON body' }),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}

	const { template, to, data } = body;

	if (!template || !to) {
		return new Response(
			JSON.stringify({ error: 'Missing required fields: template, to' }),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}

	// ── Check opt-out before sending ──
	try {
		const { data: prefs } = await supabase
			.from('email_preferences')
			.select('unsubscribed')
			.eq('email', to)
			.maybeSingle();

		if (prefs?.unsubscribed) {
			return new Response(
				JSON.stringify({ error: 'Recipient has unsubscribed', skipped: true }),
				{ status: 200, headers: { 'Content-Type': 'application/json' } }
			);
		}
	} catch {
		// Table may not exist yet — continue sending
	}

	// ── Resolve template ──
	const resolved = resolveTemplate(template, data);
	if (!resolved) {
		return new Response(
			JSON.stringify({ error: `Unknown template: ${template}` }),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}

	// ── Send via Resend ──
	let resendResponse: any;
	let sendError: string | null = null;

	try {
		const { data: resData, error: resErr } = await resend.emails.send({
			from: EMAIL_DEFAULTS.from,
			replyTo: EMAIL_DEFAULTS.replyTo,
			to: [to],
			subject: resolved.subject,
			html: resolved.html,
			headers: {
				'List-Unsubscribe': `<https://cancelkits.com/unsubscribe?token=${encodeURIComponent(data.userId || to)}>`,
				'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
			},
		});

		if (resErr) {
			sendError = resErr.message;
		}

		resendResponse = resData;
	} catch (err: any) {
		sendError = err?.message || 'Unknown Resend error';
	}

	// ── Log to Supabase email_log table ──
	try {
		await supabase.from('email_log').insert({
			recipient: to,
			template,
			subject: resolved.subject,
			status: sendError ? 'failed' : 'sent',
			error: sendError || null,
			resend_id: resendResponse?.id || null,
			metadata: data,
			sent_at: new Date().toISOString(),
		});
	} catch {
		// Logging failure should not block the response
	}

	// ── Notify Admin on New User Signup ──
	if (template === 'welcome' && !sendError) {
		const adminEmail =
			import.meta.env.ADMIN_EMAIL ??
			(typeof process !== 'undefined' ? process.env?.ADMIN_EMAIL : undefined) ??
			import.meta.env.ADMIN_NOTIFICATION_EMAIL ??
			(typeof process !== 'undefined' ? process.env?.ADMIN_NOTIFICATION_EMAIL : undefined);

		if (adminEmail && adminEmail !== to) {
			resend.emails.send({
				from: EMAIL_DEFAULTS.from,
				to: adminEmail,
				subject: `🔔 New User Signed Up on CancelKits: ${to}`,
				html: `
					<div style="font-family:sans-serif;padding:20px;color:#333;">
						<h2>New Account Created! 🎉</h2>
						<p>A new user has just registered on CancelKits.</p>
						<ul>
							<li><strong>Email:</strong> ${to}</li>
							<li><strong>Date:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC</li>
						</ul>
					</div>
				`,
			}).catch((adminErr) => {
				console.warn('[Admin Notify] Could not send admin notification:', adminErr);
			});
		}
	}

	if (sendError) {
		return new Response(
			JSON.stringify({ error: sendError }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}

	return new Response(
		JSON.stringify({
			success: true,
			id: resendResponse?.id,
			template,
			to,
		}),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	);
};

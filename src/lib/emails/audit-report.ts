/**
 * audit-report.ts — Sent immediately after the user completes their inbox scan.
 *
 * Subject: "🚨 We found $271/mo in subscriptions ($3,256/yr) — 3 renew soon"
 *
 * Strategic Conversion Engine (Phase 1):
 * 1. Immediate proof of value (exact figures detected from their scan).
 * 2. Loss aversion (annual pain multiplier: $271/mo = $3,256/yr).
 * 3. Urgency trigger (highlights upcoming renewals before they bill).
 * 4. High-conversion Pro upgrade CTA ($9/mo to save thousands).
 */

import { emailLayout, styles, SITE } from './layout';

export interface AuditReportData {
	email: string;
	userId?: string;
	count: number;
	monthlyTotal: number;
	annualTotal: number;
	topSubscriptions: Array<{
		name: string;
		monthly: number;
		category?: string;
		renewsIn?: number;
	}>;
	renewingSoonCount?: number;
	upgradeUrl?: string;
}

export function auditReportSubject(data: AuditReportData): string {
	const monthly = Math.round(data.monthlyTotal);
	const annual = Math.round(data.annualTotal).toLocaleString();
	const soon = data.renewingSoonCount ?? data.topSubscriptions.filter((s) => (s.renewsIn ?? 99) <= 7).length;
	const soonText = soon > 0 ? ` — ${soon} renew soon` : '';
	return `🚨 We found $${monthly}/mo in subscriptions ($${annual}/yr)${soonText}`;
}

export function auditReportHtml(data: AuditReportData): string {
	const monthlyFormatted = data.monthlyTotal.toLocaleString('en-US', {
		minimumFractionDigits: data.monthlyTotal % 1 === 0 ? 0 : 2,
		maximumFractionDigits: 2,
	});
	const annualFormatted = Math.round(data.annualTotal).toLocaleString('en-US');
	const soonCount =
		data.renewingSoonCount ?? data.topSubscriptions.filter((s) => (s.renewsIn ?? 99) <= 7).length;

	const targetUrl = data.upgradeUrl || `${SITE}/onboarding/results?email=${encodeURIComponent(data.email)}`;

	const subRows = (data.topSubscriptions || []).slice(0, 5).map((sub) => {
		const renewsText =
			sub.renewsIn != null
				? sub.renewsIn <= 0
					? 'Renews today'
					: sub.renewsIn === 1
						? 'Renews tomorrow'
						: `Renews in ${sub.renewsIn} days`
				: 'Active subscription';

		const isUrgent = (sub.renewsIn ?? 99) <= 7;

		return `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;">
          <p style="margin:0;font-size:15px;font-weight:600;color:#ffffff;">${sub.name}</p>
          <p style="margin:2px 0 0;font-size:12px;color:${isUrgent ? '#ffa800' : '#888888'};">
            ${sub.category ? `${sub.category} · ` : ''}${renewsText}
          </p>
        </td>
        <td align="right" style="padding:10px 0;border-bottom:1px solid #1a1a1a;">
          <p style="margin:0;font-family:monospace;font-size:15px;font-weight:700;color:#ffffff;">
            $${sub.monthly.toFixed(2)}<span style="font-size:11px;font-weight:400;color:#888888;">/mo</span>
          </p>
        </td>
      </tr>
    `;
	}).join('');

	const body = `
    <!-- Header Icon & Eyebrow -->
    <div style="text-align:center;margin-bottom:20px;">
      <span style="display:inline-block;padding:4px 12px;border-radius:100px;background-color:rgba(0,255,136,0.12);border:1px solid rgba(0,255,136,0.28);color:#00ff88;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
        Subscription Audit Complete
      </span>
    </div>

    <h1 style="${styles.h1}text-align:center;margin-bottom:8px;">We analyzed your recurring spend.</h1>
    <p style="${styles.body}text-align:center;margin-top:0;margin-bottom:28px;color:#999999;">
      Here is the breakdown of recurring charges and auto-renewals detected for <strong>${data.email}</strong>.
    </p>

    <!-- Big Spend Highlight Card -->
    <div style="${styles.card}background:linear-gradient(180deg, #111111 0%, #080808 100%);border:1px solid #262626;text-align:center;padding:24px 20px;margin-bottom:24px;">
      <p style="margin:0;font-size:13px;color:#888888;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">Monthly Burn Rate</p>
      <p style="margin:8px 0 4px;font-size:38px;font-weight:800;color:#ffffff;letter-spacing:-0.03em;">
        $${monthlyFormatted}<span style="font-size:18px;font-weight:400;color:#888888;">/month</span>
      </p>
      <p style="margin:0;font-size:14px;color:#ffa800;font-weight:500;">
        That is <strong>$${annualFormatted} per year</strong> quietly leaving your bank account.
      </p>
    </div>

    ${soonCount > 0 ? `
    <!-- Urgency Warning Box -->
    <div style="background-color:rgba(255,168,0,0.08);border:1px solid rgba(255,168,0,0.25);border-radius:8px;padding:14px 16px;margin-bottom:24px;">
      <p style="margin:0;font-size:13px;line-height:1.5;color:#f0a000;">
        ⚠️ <strong>${soonCount} subscription${soonCount !== 1 ? 's' : ''} renew in the next 7 days.</strong>
        If you don't cancel before their billing date, you will be billed again automatically.
      </p>
    </div>
    ` : ''}

    <!-- Discovered Services List -->
    <div style="${styles.card}margin-bottom:28px;">
      <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:12px;border-bottom:1px solid #222222;margin-bottom:4px;">
        <span style="font-size:13px;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:0.04em;">Top Subscriptions Found (${data.count} Total)</span>
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${subRows}
      </table>
    </div>

    <!-- Smart Conversion Pitch -->
    <div style="text-align:center;padding:0 8px;margin-bottom:28px;">
      <h2 style="font-size:18px;font-weight:700;color:#ffffff;margin:0 0 8px;">Ready to stop forgotten charges?</h2>
      <p style="${styles.body}font-size:14px;color:#a0a0a0;margin:0 0 20px;line-height:1.5;">
        Cancel unwanted services before their next billing window closes. CancelKits Pro gives you 1-click cancellation, renewal defense alerts, and guides for 50+ services.
      </p>

      <a href="${targetUrl}" style="${styles.ctaButton}display:inline-block;padding:14px 32px;font-size:15px;background-color:#00ff88;color:#000000;font-weight:700;text-decoration:none;border-radius:999px;box-shadow:0 0 24px rgba(0,255,136,0.25);">
        Review subscriptions &amp; cancel →
      </a>
    </div>

    <hr style="${styles.divider}" />

    <!-- Reassurance / Footer -->
    <p style="${styles.small}text-align:center;color:#666666;line-height:1.6;">
      CancelKits uses secure, read-only email scanning. We never store passwords or sell personal data.<br />
      Need to manage alert preferences? <a href="${SITE}/account" style="color:#888888;text-decoration:underline;">Account Settings</a>
    </p>
  `;

	return emailLayout(body, {
		preheader: `We found $${monthlyFormatted}/mo in subscriptions for ${data.email}. ${soonCount} renew soon.`,
		userId: data.userId,
		email: data.email,
	});
}

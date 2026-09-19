/**
 * weekly-renewal-radar.ts — Dispatched every Monday morning (Phase 2).
 *
 * Subject: "⚡ Weekly Radar: $74 in renewals hitting your card this week"
 *
 * Strategic Conversion Engine (Phase 2):
 * 1. Proactive protection: Warns users before renewal charges hit their card.
 * 2. Visual urgency: Shows exact day of week each service renews.
 * 3. Pro upgrade incentive: Highlights that cancelling 1 charge offsets the $9 Pro fee.
 */

import { emailLayout, styles, SITE } from './layout';

export interface UpcomingRenewalItem {
	name: string;
	amount: number;
	renewalDate: string; // e.g. "Wednesday, Sep 23"
	category?: string;
	daysUntil: number;
}

export interface WeeklyRenewalRadarData {
	email: string;
	userId?: string;
	userName?: string;
	weekStart: string; // e.g. "Sep 21"
	weekEnd: string;   // e.g. "Sep 27"
	totalWeeklyAmount: number;
	renewals: UpcomingRenewalItem[];
	userPlan?: 'free' | 'pro' | 'family';
	dashboardUrl?: string;
}

export function weeklyRenewalRadarSubject(data: WeeklyRenewalRadarData): string {
	const total = Math.round(data.totalWeeklyAmount);
	const count = data.renewals.length;
	return `⚡ Weekly Radar: $${total} across ${count} subscription${count !== 1 ? 's' : ''} renewing this week`;
}

export function weeklyRenewalRadarHtml(data: WeeklyRenewalRadarData): string {
	const firstName = data.userName?.split(' ')[0] || 'there';
	const totalFormatted = data.totalWeeklyAmount.toLocaleString('en-US', {
		minimumFractionDigits: data.totalWeeklyAmount % 1 === 0 ? 0 : 2,
		maximumFractionDigits: 2,
	});

	const targetUrl = data.dashboardUrl || `${SITE}/dashboard`;
	const isFree = data.userPlan !== 'pro' && data.userPlan !== 'family';

	const renewalRows = data.renewals.map((item) => {
		const isVerySoon = item.daysUntil <= 2;
		const timingBadge = item.daysUntil === 0
			? 'Renews Today'
			: item.daysUntil === 1
				? 'Renews Tomorrow'
				: `In ${item.daysUntil} days (${item.renewalDate})`;

		return `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #1a1a1a;">
          <p style="margin:0;font-size:15px;font-weight:600;color:#ffffff;">${item.name}</p>
          <p style="margin:3px 0 0;font-size:12px;color:${isVerySoon ? '#ffa800' : '#888888'};">
            ${timingBadge}${item.category ? ` · ${item.category}` : ''}
          </p>
        </td>
        <td align="right" style="padding:14px 0;border-bottom:1px solid #1a1a1a;">
          <p style="margin:0;font-family:monospace;font-size:16px;font-weight:700;color:#ffffff;">
            $${item.amount.toFixed(2)}
          </p>
          <a href="${SITE}/cancel/${encodeURIComponent(item.name.toLowerCase().replace(/[^a-z0-9]/g, '-'))}" style="display:inline-block;margin-top:4px;font-size:11px;color:#00ff88;text-decoration:none;font-weight:600;">
            Cancel guide →
          </a>
        </td>
      </tr>
    `;
	}).join('');

	const body = `
    <!-- Radar Badge -->
    <div style="text-align:center;margin-bottom:20px;">
      <span style="display:inline-block;padding:4px 12px;border-radius:100px;background-color:rgba(0,255,136,0.12);border:1px solid rgba(0,255,136,0.28);color:#00ff88;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
        Weekly Renewal Radar · ${data.weekStart} – ${data.weekEnd}
      </span>
    </div>

    <h1 style="${styles.h1}text-align:center;margin-bottom:8px;">Upcoming Charges This Week</h1>
    <p style="${styles.body}text-align:center;margin-top:0;margin-bottom:28px;color:#999999;">
      Hey ${firstName}, CancelKits scanned your upcoming billing cycles. Here is what is scheduled to charge your card over the next 7 days.
    </p>

    <!-- Total Due Highlight Box -->
    <div style="${styles.card}background:linear-gradient(180deg, #111111 0%, #080808 100%);border:1px solid #262626;text-align:center;padding:24px 20px;margin-bottom:24px;">
      <p style="margin:0;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Total Scheduled Renewals</p>
      <p style="margin:8px 0 4px;font-size:40px;font-weight:800;color:#ffffff;letter-spacing:-0.03em;">
        $${totalFormatted}
      </p>
      <p style="margin:0;font-size:13px;color:#ffa800;font-weight:500;">
        Across ${data.renewals.length} active subscription${data.renewals.length !== 1 ? 's' : ''}
      </p>
    </div>

    <!-- Renewals Table -->
    <div style="${styles.card}margin-bottom:28px;">
      <div style="padding-bottom:12px;border-bottom:1px solid #222222;">
        <span style="font-size:12px;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:0.06em;">Scheduled Charges Breakdown</span>
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${renewalRows}
      </table>
    </div>

    ${isFree ? `
    <!-- Free Tier Conversion Pitch -->
    <div style="background-color:rgba(0,255,136,0.06);border:1px solid rgba(0,255,136,0.22);border-radius:12px;padding:20px;text-align:center;margin-bottom:28px;">
      <p style="margin:0 0 6px;font-size:16px;font-weight:700;color:#ffffff;">
        Want to stop these charges before they hit?
      </p>
      <p style="margin:0 0 16px;font-size:13px;color:#a0a0a0;line-height:1.5;">
        Cancelling just one forgotten service pays for CancelKits Pro for the entire month. Unlock 1-click cancellation and automated renewal defense.
      </p>
      <a href="${SITE}/pricing" style="${styles.ctaButton}display:inline-block;padding:12px 28px;font-size:14px;background-color:#00ff88;color:#000000;font-weight:700;text-decoration:none;border-radius:999px;">
        Upgrade to Pro &amp; cancel in 1-click →
      </a>
    </div>
    ` : `
    <!-- Pro Member Direct Actions -->
    <div style="text-align:center;margin-bottom:28px;">
      <a href="${targetUrl}" style="${styles.ctaButton}display:inline-block;padding:12px 28px;font-size:14px;background-color:#00ff88;color:#000000;font-weight:700;text-decoration:none;border-radius:999px;">
        Manage renewals in Dashboard →
      </a>
    </div>
    `}

    <hr style="${styles.divider}" />

    <!-- Footer Note -->
    <p style="${styles.small}text-align:center;color:#666666;line-height:1.6;">
      This email was automatically generated by your CancelKits Weekly Renewal Radar.<br />
      You can customize alert frequencies anytime in your <a href="${SITE}/account" style="color:#888888;text-decoration:underline;">Account Preferences</a>.
    </p>
  `;

	return emailLayout(body, {
		preheader: `$${totalFormatted} in subscriptions renew this week for ${data.email}. Review or cancel.`,
		userId: data.userId,
		email: data.email,
	});
}

/**
 * live-subscription-alert.ts — Dispatched immediately when a new subscription or trial is detected (Phase 3).
 *
 * The "Guardian Alert":
 * Subject (Trial): "⚠️ Free trial detected: [Service] will charge you $20/mo in 6 days"
 * Subject (Paid):  "🚨 New subscription detected: [Service] ($20/mo)"
 *
 * Strategic Conversion Engine (Phase 3):
 * 1. Immediate proof of live monitoring (within minutes of user subscribing).
 * 2. Loss aversion: Displays annual burn ($20/mo = $240/yr).
 * 3. Urgent call to action: Option to 1-click cancel before billing closes.
 * 4. High-conversion Pro upgrade trigger ($9/mo to save $240/yr).
 */

import { emailLayout, styles, SITE } from './layout';

export interface LiveSubscriptionAlertData {
	email: string;
	userId?: string;
	userName?: string;
	serviceName: string;
	monthlyAmount: number;
	isFreeTrial?: boolean;
	trialDaysRemaining?: number;
	billingDate?: string;
	category?: string;
	cancelUrl?: string;
	upgradeUrl?: string;
}

export function liveSubscriptionAlertSubject(data: LiveSubscriptionAlertData): string {
	const amount = Math.round(data.monthlyAmount);
	if (data.isFreeTrial) {
		const days = data.trialDaysRemaining ?? 7;
		return `⚠️ Free trial detected: ${data.serviceName} will charge you $${amount}/mo in ${days} days`;
	}
	return `🚨 New subscription detected: ${data.serviceName} ($${amount}/mo)`;
}

export function liveSubscriptionAlertHtml(data: LiveSubscriptionAlertData): string {
	const firstName = data.userName?.split(' ')[0] || 'there';
	const monthlyFormatted = data.monthlyAmount.toLocaleString('en-US', {
		minimumFractionDigits: data.monthlyAmount % 1 === 0 ? 0 : 2,
		maximumFractionDigits: 2,
	});
	const annualFormatted = Math.round(data.monthlyAmount * 12).toLocaleString('en-US');

	const serviceSlug = data.serviceName.toLowerCase().replace(/[^a-z0-9]/g, '-');
	const cancelUrl = data.cancelUrl || `${SITE}/cancel/${serviceSlug}`;
	const upgradeUrl = data.upgradeUrl || `${SITE}/pricing?highlight=${serviceSlug}`;

	const days = data.trialDaysRemaining ?? 7;
	const isTrial = Boolean(data.isFreeTrial);

	const body = `
    <!-- Guardian Badge -->
    <div style="text-align:center;margin-bottom:20px;">
      <span style="display:inline-block;padding:4px 14px;border-radius:100px;background-color:rgba(0,255,136,0.12);border:1px solid rgba(0,255,136,0.28);color:#00ff88;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
        ${isTrial ? '⚠️ Free Trial Trapwire Triggered' : '🚨 Live Subscription Radar'}
      </span>
    </div>

    <h1 style="${styles.h1}text-align:center;margin-bottom:8px;">
      ${isTrial ? 'We caught a new trial before it bills.' : 'New recurring charge detected.'}
    </h1>
    <p style="${styles.body}text-align:center;margin-top:0;margin-bottom:28px;color:#999999;">
      Hey ${firstName}, while you were busy, CancelKits spotted a new receipt in your inbox for <strong>${data.email}</strong>.
    </p>

    <!-- Subscription Details Card -->
    <div style="${styles.card}background:linear-gradient(180deg, #111111 0%, #080808 100%);border:1px solid #262626;padding:24px 20px;margin-bottom:24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #1f1f1f;">
            <p style="margin:0;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">Service Name</p>
            <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:#ffffff;">${data.serviceName}</p>
          </td>
        </tr>
        ${data.category ? `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #1f1f1f;">
            <p style="margin:0;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">Category</p>
            <p style="margin:4px 0 0;font-size:14px;color:#cccccc;">${data.category}</p>
          </td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #1f1f1f;">
            <p style="margin:0;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">Monthly Charge</p>
            <p style="margin:4px 0 0;font-size:24px;font-weight:800;color:#ff4444;font-family:monospace;">
              $${monthlyFormatted}<span style="font-size:14px;font-weight:400;color:#888888;font-family:sans-serif;">/month</span>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #1f1f1f;">
            <p style="margin:0;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">12-Month Annual Cost</p>
            <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#ffa800;">
              $${annualFormatted} per year if left untouched
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;">
            <p style="margin:0;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">
              ${isTrial ? 'Trial Countdown' : 'Next Billing Window'}
            </p>
            <p style="margin:4px 0 0;font-size:14px;font-weight:700;color:${isTrial ? '#ffa800' : '#ffffff'};">
              ${isTrial ? `Renews in ${days} days ${data.billingDate ? `(${data.billingDate})` : ''}` : (data.billingDate || 'Standard Monthly Cycle')}
            </p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Action Choices -->
    <div style="text-align:center;margin-bottom:28px;">
      <h2 style="font-size:17px;font-weight:700;color:#ffffff;margin:0 0 6px;">What would you like to do?</h2>
      <p style="font-size:13px;color:#a0a0a0;margin:0 0 20px;">
        Most people forget to cancel trials in time. You can cancel now or let us remind you before the charge hits.
      </p>

      <div style="margin-bottom:12px;">
        <a href="${upgradeUrl}" style="${styles.ctaButton}display:inline-block;padding:14px 32px;font-size:14px;background-color:#00ff88;color:#000000;font-weight:700;text-decoration:none;border-radius:999px;box-shadow:0 0 24px rgba(0,255,136,0.3);">
          Auto-cancel with Pro ($9/mo) →
        </a>
      </div>

      <div>
        <a href="${cancelUrl}" style="display:inline-block;font-size:13px;color:#888888;text-decoration:underline;">
          Or follow the free manual cancellation guide →
        </a>
      </div>
    </div>

    <!-- ROI Proposition Box -->
    <div style="background-color:rgba(255,255,255,0.03);border:1px solid #222222;border-radius:10px;padding:16px;margin-bottom:28px;text-align:center;">
      <p style="margin:0;font-size:12px;line-height:1.6;color:#888888;">
        💡 <strong>Pro Guardian Defense</strong>: Upgrading to CancelKits Pro costs $9/mo and unlocks unlimited 1-click cancellations. Cancelling <strong>${data.serviceName}</strong> alone saves you <strong>$${annualFormatted}/yr</strong>.
      </p>
    </div>

    <hr style="${styles.divider}" />

    <p style="${styles.small}text-align:center;color:#666666;line-height:1.6;">
      CancelKits monitors your connected receipts in read-only mode to prevent surprise charges.<br />
      <a href="${SITE}/dashboard" style="color:#888888;text-decoration:underline;">View your complete subscription map in Dashboard</a>
    </p>
  `;

	return emailLayout(body, {
		preheader: `${data.serviceName} ($${monthlyFormatted}/mo) detected on ${data.email}. ${isTrial ? `Trial ends in ${days} days.` : 'Review or cancel.'}`,
		userId: data.userId,
		email: data.email,
	});
}

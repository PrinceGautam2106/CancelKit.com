/**
 * renewal-alert.ts — Sent 7 days before any subscription renews.
 *
 * Subject: "⚠️ Your Spotify renewal is in 7 days — still want it?"
 *
 * This is the core value prop email — prevents surprise charges.
 */

import { emailLayout, styles, SITE } from './layout';

export interface RenewalAlertData {
	email: string;
	userId: string;
	/** Name of the renewing service (e.g. "Spotify"). */
	serviceName: string;
	/** Amount that will be charged (e.g. "11.99"). */
	amount: string;
	/** Billing cycle label (e.g. "month", "year"). */
	billingCycle: string;
	/** Exact renewal date string (e.g. "September 19, 2026"). */
	renewalDate: string;
	/** Days until renewal (usually 7, but could be less for re-sends). */
	daysUntilRenewal: number;
	/** Category for context (e.g. "Streaming", "Software"). */
	category?: string;
}

export function renewalAlertSubject(data: RenewalAlertData): string {
	return `⚠️ Your ${data.serviceName} renewal is in ${data.daysUntilRenewal} day${data.daysUntilRenewal !== 1 ? 's' : ''} — still want it?`;
}

export function renewalAlertHtml(data: RenewalAlertData): string {
	const body = `
    <div style="text-align:center;margin-bottom:24px;">
      <span style="display:inline-block;width:56px;height:56px;line-height:56px;text-align:center;border-radius:50%;background-color:rgba(255,168,0,0.15);font-size:28px;">⚠️</span>
    </div>

    <h1 style="${styles.h1}text-align:center;">Upcoming renewal</h1>
    <p style="${styles.body}text-align:center;">
      <strong>${data.serviceName}</strong> will automatically renew in
      <span style="font-weight:700;color:#ffa800;">${data.daysUntilRenewal} day${data.daysUntilRenewal !== 1 ? 's' : ''}</span>.
    </p>

    <!-- Subscription Details Card -->
    <div style="${styles.card}margin-bottom:28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:6px 0;">
            <p style="margin:0;font-size:13px;color:#666666;">Service</p>
            <p style="margin:2px 0 0;font-size:16px;font-weight:600;color:#ffffff;">${data.serviceName}</p>
          </td>
        </tr>
        ${data.category ? `<tr><td style="padding:6px 0;"><p style="margin:0;font-size:13px;color:#666666;">Category</p><p style="margin:2px 0 0;font-size:14px;color:#cccccc;">${data.category}</p></td></tr>` : ''}
        <tr>
          <td style="padding:6px 0;">
            <p style="margin:0;font-size:13px;color:#666666;">Amount</p>
            <p style="margin:2px 0 0;font-size:22px;font-weight:700;color:#ff4444;">$${data.amount}<span style="font-size:14px;font-weight:400;color:#888888;">/${data.billingCycle}</span></p>
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0;">
            <p style="margin:0;font-size:13px;color:#666666;">Renewal date</p>
            <p style="margin:2px 0 0;font-size:14px;color:#cccccc;">${data.renewalDate}</p>
          </td>
        </tr>
      </table>
    </div>

    <p style="${styles.body}text-align:center;">
      If you're still using ${data.serviceName}, no action needed — we just wanted you to know.<br/>
      If not, you can cancel it right now from your dashboard.
    </p>

    <div style="text-align:center;margin-bottom:12px;">
      <a href="${SITE}/dashboard" style="${styles.ctaButton}background-color:#ff4444;">
        Cancel ${data.serviceName} now →
      </a>
    </div>
    <div style="text-align:center;">
      <a href="${SITE}/dashboard" style="${styles.ctaButtonOutline}">
        I still want it — keep it
      </a>
    </div>

    <hr style="${styles.divider}" />
    <p style="${styles.small}text-align:center;">
      You'll get this alert every time a subscription is about to renew.
      <a href="${SITE}/account" style="color:#888888;text-decoration:underline;">Manage alert preferences</a>
    </p>
  `;

	return emailLayout(body, {
		preheader: `${data.serviceName} renews for $${data.amount} on ${data.renewalDate}. Cancel or keep?`,
		userId: data.userId,
		email: data.email,
	});
}

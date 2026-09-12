/**
 * cancel-confirmation.ts — Sent when a subscription is cancelled.
 *
 * Subject: "Netflix cancelled ✓ — you saved $15.49/month"
 *
 * This is the email that earns affiliate revenue passively:
 * it shows alternatives with affiliate links alongside the savings data.
 */

import { emailLayout, styles, SITE } from './layout';

export interface CancelConfirmationData {
	email: string;
	userId: string;
	/** Name of the cancelled service (e.g. "Netflix"). */
	serviceName: string;
	/** Monthly amount saved by cancelling (e.g. "15.49"). */
	monthlySavings: string;
	/** Running total of all-time monthly savings (e.g. "47.48"). */
	totalMonthlySavings: string;
	/** Running total of projected annual savings (e.g. "569.76"). */
	totalAnnualSavings: string;
	/** Confirmation code, if any. */
	confirmationCode?: string;
	/** Suggested alternatives with affiliate links. */
	alternatives?: {
		name: string;
		description: string;
		price: string;
		url: string;
	}[];
}

export function cancelConfirmationSubject(data: CancelConfirmationData): string {
	return `${data.serviceName} cancelled ✓ — you saved $${data.monthlySavings}/month`;
}

export function cancelConfirmationHtml(data: CancelConfirmationData): string {
	const alternativesBlock =
		data.alternatives && data.alternatives.length > 0
			? `
      <hr style="${styles.divider}" />
      <h2 style="${styles.h2}">Looking for an alternative?</h2>
      <p style="${styles.muted}">People who cancelled ${data.serviceName} also liked:</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${data.alternatives
					.map(
						(alt) => `
        <tr>
          <td style="padding:12px 16px;border:1px solid #1a1a1a;border-radius:12px;margin-bottom:8px;background-color:#111111;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <p style="margin:0 0 2px;font-size:15px;font-weight:600;color:#ffffff;">${alt.name}</p>
                  <p style="margin:0 0 6px;font-size:13px;color:#888888;">${alt.description}</p>
                  <span style="${styles.badgeAccent}">${alt.price}</span>
                </td>
                <td width="100" align="right" valign="middle">
                  <a href="${alt.url}" style="${styles.ctaButtonOutline}font-size:13px;padding:8px 16px;">Try it →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr><td style="height:8px;"></td></tr>`
					)
					.join('')}
      </table>`
			: '';

	const body = `
    <div style="text-align:center;margin-bottom:24px;">
      <span style="display:inline-block;width:56px;height:56px;line-height:56px;text-align:center;border-radius:50%;background-color:rgba(0,255,136,0.15);font-size:28px;">✓</span>
    </div>

    <h1 style="${styles.h1}text-align:center;">${data.serviceName} cancelled</h1>
    <p style="${styles.body}text-align:center;">
      That's <span style="${styles.accent}font-weight:700;">$${data.monthlySavings}/month</span> back in your pocket. Nice.
    </p>

    ${data.confirmationCode ? `<p style="${styles.muted}text-align:center;">Confirmation: <code style="font-family:'Geist Mono',monospace;background-color:#111111;padding:2px 8px;border-radius:4px;color:#ffffff;">${data.confirmationCode}</code></p>` : ''}

    <!-- Savings Summary Card -->
    <div style="${styles.card}margin-bottom:28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:4px 0;">
            <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#555555;font-family:'Geist Mono',monospace;">Your running savings</p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0 4px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <p style="margin:0;font-size:14px;color:#888888;">Monthly</p>
                  <p style="margin:4px 0 0;font-size:24px;font-weight:700;color:#00ff88;">$${data.totalMonthlySavings}</p>
                </td>
                <td align="right">
                  <p style="margin:0;font-size:14px;color:#888888;">Annual (projected)</p>
                  <p style="margin:4px 0 0;font-size:24px;font-weight:700;color:#00ff88;">$${data.totalAnnualSavings}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>

    ${alternativesBlock}

    <hr style="${styles.divider}" />

    <div style="text-align:center;">
      <p style="${styles.muted}margin-bottom:16px;">Still paying for something you don't use?</p>
      <a href="${SITE}/dashboard" style="${styles.ctaButton}">
        Cancel another one →
      </a>
    </div>
  `;

	return emailLayout(body, {
		preheader: `${data.serviceName} is cancelled. You're now saving $${data.monthlySavings}/month.`,
		userId: data.userId,
		email: data.email,
	});
}

/**
 * cancel-dispatch.ts — Transactional email sent upon automated 1-click cancellation dispatch.
 *
 * Subject: "Cancellation Dispatched ✓ — {serviceName} (Ref: {dispatchId})"
 *
 * Serves as legal, timestamped proof of cancellation notice for the user,
 * documenting that pre-authorized debits were revoked under FTC ROSCA and Regulation E,
 * and confirming that Virtual Card Auto-Block ($0.00 limit) has been armed.
 */

import { emailLayout, styles, SITE } from './layout';

export interface CancelDispatchData {
	email: string;
	userId?: string;
	serviceName: string;
	serviceSlug?: string;
	dispatchId: string;
	recipientEmail: string;
	dispatchedAt: string;
	monthlySavings: number;
	annualSavings: number;
	virtualCardSuffix: string;
	legalNoticeSnippet: string;
}

export function cancelDispatchSubject(data: CancelDispatchData): string {
	return `Cancellation Dispatched ✓ — ${data.serviceName} (Ref: ${data.dispatchId})`;
}

export function cancelDispatchHtml(data: CancelDispatchData): string {
	const body = `
    <!-- Top Status Badge -->
    <div style="text-align:center;margin-bottom:20px;">
      <span style="display:inline-block;padding:6px 16px;border-radius:20px;background-color:rgba(0,255,136,0.12);border:1px solid #00ff88;color:#00ff88;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">
        ⚡ 1-Click Automated Dispatch Transmitted
      </span>
    </div>

    <h1 style="${styles.h1}text-align:center;margin-bottom:8px;">
      ${data.serviceName} Cancellation Recorded
    </h1>
    <p style="${styles.body}text-align:center;margin-top:0;margin-bottom:24px;">
      Official written notice has been logged and transmitted. You are saving <span style="${styles.accent}font-weight:700;">$${data.monthlySavings.toFixed(2)}/month</span> ($${data.annualSavings.toFixed(2)}/year).
    </p>

    <!-- Official Proof of Dispatch Certificate -->
    <div style="${styles.card}border-color:#2a2a2a;background-color:#0d0d0d;margin-bottom:24px;">
      <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#888888;font-family:'Geist Mono',monospace;">
        Official Dispatch Certificate · Legal Proof of Notice
      </p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:13px;line-height:1.6;">
        <tr>
          <td style="color:#888888;padding:4px 0;width:35%;">Dispatch Reference:</td>
          <td style="color:#00ff88;font-family:'Geist Mono',monospace;font-weight:700;padding:4px 0;">${data.dispatchId}</td>
        </tr>
        <tr>
          <td style="color:#888888;padding:4px 0;">Merchant Target:</td>
          <td style="color:#ffffff;font-weight:600;padding:4px 0;">${data.serviceName} (${data.recipientEmail})</td>
        </tr>
        <tr>
          <td style="color:#888888;padding:4px 0;">Timestamp (UTC):</td>
          <td style="color:#ffffff;font-family:'Geist Mono',monospace;padding:4px 0;">${data.dispatchedAt}</td>
        </tr>
        <tr>
          <td style="color:#888888;padding:4px 0;">Legal Authority:</td>
          <td style="color:#ffffff;padding:4px 0;">FTC ROSCA (15 U.S.C. § 8401) &amp; CFPB Reg E (12 CFR § 1005.10)</td>
        </tr>
      </table>
    </div>

    <!-- Virtual Card Auto-Block Status -->
    <div style="${styles.card}border-color:rgba(0,255,136,0.3);background-color:rgba(0,255,136,0.03);margin-bottom:24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="36" valign="top" style="padding-right:12px;">
            <span style="font-size:24px;line-height:1;">🛡️</span>
          </td>
          <td>
            <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#00ff88;">
              Virtual Card Auto-Block: ARMED
            </p>
            <p style="margin:0;font-size:13px;color:#cccccc;line-height:1.5;">
              Future charge attempts from <strong>${data.serviceName}</strong> against virtual card ending in <strong>•••• ${data.virtualCardSuffix}</strong> are hard-locked at <strong>$0.00</strong>. Any unauthorized rebill attempts will decline automatically.
            </p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Transmitted Legal Notice Excerpt -->
    <div style="margin-bottom:28px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#ffffff;">
        Legal Cancellation Notice Transmitted:
      </p>
      <div style="background-color:#080808;border:1px solid #1a1a1a;border-radius:8px;padding:14px;font-family:'Geist Mono',monospace;font-size:11px;color:#aaaaaa;line-height:1.6;white-space:pre-wrap;">${data.legalNoticeSnippet}</div>
    </div>

    <!-- Bank Dispute Assurance -->
    <div style="border-top:1px solid #1a1a1a;padding-top:20px;margin-bottom:24px;">
      <h2 style="${styles.h2}font-size:15px;margin-bottom:6px;">Bank Chargeback Protection</h2>
      <p style="${styles.muted}font-size:13px;line-height:1.5;margin:0 0 16px;">
        If ${data.serviceName} attempts any subsequent charge, your bank or card issuer will immediately charge it back upon receipt of this dispatch reference (<strong>${data.dispatchId}</strong>). Under federal rules, pre-authorized debit permission is legally terminated upon written notice.
      </p>

      <div style="text-align:center;">
        <a href="${SITE.url}/dashboard/" style="${styles.ctaButton}">
          View Cancellation in Dashboard →
        </a>
      </div>
    </div>
  `;

	return emailLayout(body, {
		preheader: `Cancellation dispatched for ${data.serviceName} (Ref: ${data.dispatchId}) — $${data.monthlySavings.toFixed(2)}/mo saved.`,
		userId: data.userId,
		email: data.email,
	});
}

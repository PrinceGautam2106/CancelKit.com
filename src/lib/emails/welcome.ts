/**
 * welcome.ts — Sent immediately on signup.
 *
 * Subject: "CancelKits is scanning your subscriptions now..."
 * Tone:    Excited but calm. Reassuring. Not spammy.
 */

import { emailLayout, styles, SITE } from './layout';

export interface WelcomeEmailData {
	name?: string;
	email: string;
	userId: string;
	/** Subscriptions already detected during initial scan (may be empty). */
	subscriptionsFound?: { name: string; amount: string }[];
}

export function welcomeSubject(): string {
	return 'CancelKits is scanning your subscriptions now...';
}

export function welcomeHtml(data: WelcomeEmailData): string {
	const firstName = data.name?.split(' ')[0] || 'there';
	const hasSubs = data.subscriptionsFound && data.subscriptionsFound.length > 0;

	const subsTable = hasSubs
		? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
        ${data.subscriptionsFound!
					.map(
						(sub) => `
          <tr>
            <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;">
              <span style="font-size:14px;font-weight:600;color:#ffffff;">${sub.name}</span>
            </td>
            <td align="right" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;">
              <span style="font-size:14px;font-weight:600;color:#00ff88;">${sub.amount}/mo</span>
            </td>
          </tr>`
					)
					.join('')}
      </table>`
		: `
      <div style="${styles.card}margin-bottom:24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="40" valign="top">
              <span style="display:inline-block;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;background-color:rgba(0,255,136,0.15);color:#00ff88;font-size:14px;">⏳</span>
            </td>
            <td style="padding-left:12px;">
              <p style="margin:0;font-size:14px;color:#cccccc;line-height:1.5;">
                We're scanning your receipt inbox right now. Most scans finish within 2 minutes — we'll update your dashboard automatically.
              </p>
            </td>
          </tr>
        </table>
      </div>`;

	const body = `
    <h1 style="${styles.h1}">Welcome to CancelKits, ${firstName} 👋</h1>
    <p style="${styles.body}">
      You just took the first step toward knowing exactly where your money goes every month. Here's what's happening:
    </p>

    <h2 style="${styles.h2}">
      ${hasSubs ? `We already found ${data.subscriptionsFound!.length} subscription${data.subscriptionsFound!.length !== 1 ? 's' : ''}` : 'Scanning in progress...'}
    </h2>
    ${subsTable}

    <h2 style="${styles.h2}">What happens next</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
      <tr>
        <td width="32" valign="top" style="padding:6px 0;">
          <span style="font-size:16px;color:#00ff88;">①</span>
        </td>
        <td style="padding:6px 0 6px 8px;">
          <p style="margin:0;font-size:14px;color:#cccccc;">We finish scanning your receipts for recurring charges</p>
        </td>
      </tr>
      <tr>
        <td width="32" valign="top" style="padding:6px 0;">
          <span style="font-size:16px;color:#00ff88;">②</span>
        </td>
        <td style="padding:6px 0 6px 8px;">
          <p style="margin:0;font-size:14px;color:#cccccc;">You see every subscription on your dashboard with amounts + renewal dates</p>
        </td>
      </tr>
      <tr>
        <td width="32" valign="top" style="padding:6px 0;">
          <span style="font-size:16px;color:#00ff88;">③</span>
        </td>
        <td style="padding:6px 0 6px 8px;">
          <p style="margin:0;font-size:14px;color:#cccccc;">Cancel anything you don't need with one click — we handle the rest</p>
        </td>
      </tr>
    </table>

    <div style="text-align:center;margin-bottom:16px;">
      <a href="${SITE}/dashboard" style="${styles.ctaButton}">
        Go to your Dashboard →
      </a>
    </div>

    <p style="${styles.muted}text-align:center;">
      No surprises, no spam — just your money, visible.
    </p>
  `;

	return emailLayout(body, {
		preheader: `We're scanning your inbox for hidden subscriptions. Your dashboard is ready.`,
		userId: data.userId,
		email: data.email,
	});
}

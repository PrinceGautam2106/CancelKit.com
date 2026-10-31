/**
 * family-invite.ts — Sent when a Family plan owner invites a household member.
 *
 * Subject: "You've been invited to join [Owner]'s CancelKits Family Plan"
 */

import { emailLayout, styles, SITE } from './layout';

export interface FamilyInviteEmailData {
	inviterName?: string;
	inviterEmail: string;
	recipientEmail: string;
	inviteUrl: string;
	householdName?: string;
}

export function familyInviteSubject(inviterName?: string): string {
	const name = inviterName || 'A family member';
	return `${name} invited you to join their CancelKits Family Plan (Free for you!)`;
}

export function familyInviteHtml(data: FamilyInviteEmailData): string {
	const inviter = data.inviterName || data.inviterEmail;
	const household = data.householdName || `${inviter}'s Household`;

	const body = `
    <h1 style="${styles.h1}">You're invited to CancelKits Family! 👨‍👩‍👧‍👦</h1>
    <p style="${styles.body}">
      <strong style="color:#ffffff;">${inviter}</strong> has added you to their CancelKits Family Household (<strong style="color:#00ff88;">${household}</strong>).
    </p>

    <div style="${styles.card}margin:24px 0;">
      <h3 style="margin:0 0 12px;font-size:16px;color:#ffffff;">What you get with Family access:</h3>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:6px 0;color:#00ff88;font-size:15px;" width="24">✓</td>
          <td style="padding:6px 0;color:#cccccc;font-size:14px;"><strong style="color:#ffffff;">100% Free for you</strong> — covered by ${inviter}'s Family subscription</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#00ff88;font-size:15px;" width="24">✓</td>
          <td style="padding:6px 0;color:#cccccc;font-size:14px;"><strong style="color:#ffffff;">Full Pro Features</strong> — unlimited scanning & 1-click cancellations</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#00ff88;font-size:15px;" width="24">✓</td>
          <td style="padding:6px 0;color:#cccccc;font-size:14px;"><strong style="color:#ffffff;">Renewal Radar Alerts</strong> — never get surprised by hidden subscriptions</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#00ff88;font-size:15px;" width="24">✓</td>
          <td style="padding:6px 0;color:#cccccc;font-size:14px;"><strong style="color:#ffffff;">Private & Secure</strong> — your account is private to you</td>
        </tr>
      </table>
    </div>

    <div style="text-align:center;margin:32px 0 20px;">
      <a href="${data.inviteUrl}" style="${styles.ctaButton}">
        Accept Invitation & Join Family →
      </a>
    </div>

    <p style="font-size:13px;color:#777777;text-align:center;margin:0;">
      Or copy this link to join: <a href="${data.inviteUrl}" style="color:#00ff88;word-break:break-all;">${data.inviteUrl}</a>
    </p>
  `;

	return emailLayout({
		content: body,
		preheader: `${inviter} gave you free access to CancelKits Pro on their Family Plan.`,
		email: data.recipientEmail,
	});
}

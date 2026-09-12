/**
 * referral-reward.ts — Sent to referrer when their friend upgrades to Pro.
 *
 * Subject: "🎉 You earned 1 month of CancelKit Pro free!"
 * Tone:    Celebratory, encouraging, clear explanation of Stripe credit.
 */

import { emailLayout, styles, SITE } from './layout';

export interface ReferralRewardEmailData {
	email: string;
	userId: string;
	referrerName?: string;
	referredFriendName?: string;
	monthsEarned: number;
	totalMonthsEarned: number;
	dollarCredit: string;
	referralCode: string;
}

export function referralRewardSubject(): string {
	return '🎉 You earned 1 month of CancelKit Pro free!';
}

export function referralRewardHtml(data: ReferralRewardEmailData): string {
	const firstName = data.referrerName?.split(' ')[0] || 'there';
	const friend = data.referredFriendName || 'Your friend';
	const referralUrl = `${SITE}/r/${data.referralCode}`;

	const tweetText = encodeURIComponent(
		`I just earned a free month of @CancelKit for helping a friend cancel forgotten subscriptions 💸\n\nGet your first month free: ${referralUrl}`
	);
	const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

	const body = `
    <div style="text-align:center;margin-bottom:24px;">
      <span style="display:inline-block;width:56px;height:56px;line-height:56px;text-align:center;border-radius:50%;background-color:rgba(0,255,136,0.15);font-size:28px;">🎁</span>
    </div>

    <h1 style="${styles.h1}text-align:center;">1 Month Free Unlocked!</h1>
    <p style="${styles.body}text-align:center;">
      Awesome news, ${firstName}! ${friend} just upgraded to CancelKit Pro. Because you invited them, you <strong style="color:#ffffff;">BOTH</strong> get 1 month of CancelKit Pro on us.
    </p>

    <!-- Credit Applied Card -->
    <div style="${styles.card}margin-bottom:24px;border-color:rgba(0,255,136,0.3);text-align:center;">
      <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#555555;font-family:'Geist Mono',monospace;">Reward Applied</p>
      <p style="margin:4px 0 0;font-size:32px;font-weight:700;color:#00ff88;letter-spacing:-0.03em;">+$${data.dollarCredit} Credit</p>
      <p style="margin:6px 0 0;font-size:13px;color:#888888;">
        Your next Stripe billing statement has been credited automatically.
      </p>
    </div>

    <!-- Referral Stats Counter -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
      <tr>
        <td width="50%" align="center" style="padding:12px;background-color:#111111;border:1px solid #1a1a1a;border-radius:10px 0 0 10px;">
          <p style="margin:0;font-size:11px;color:#777777;text-transform:uppercase;">This referral</p>
          <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:#ffffff;">+${data.monthsEarned} Month</p>
        </td>
        <td width="50%" align="center" style="padding:12px;background-color:#111111;border:1px solid #1a1a1a;border-left:none;border-radius:0 10px 10px 0;">
          <p style="margin:0;font-size:11px;color:#777777;text-transform:uppercase;">Total Free Months</p>
          <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:#00ff88;">${data.totalMonthsEarned} Months</p>
        </td>
      </tr>
    </table>

    <h2 style="${styles.h2}text-align:center;">Keep the momentum going</h2>
    <p style="${styles.muted}text-align:center;">
      There is no limit to how many free months you can earn. Share your link with more friends or colleagues:
    </p>

    <!-- Referral Link Box -->
    <div style="background-color:#0d0d0d;border:1px dashed #2a2a2a;border-radius:10px;padding:12px 16px;text-align:center;margin-bottom:20px;">
      <a href="${referralUrl}" style="color:#00ff88;font-family:'Geist Mono',monospace;font-size:14px;text-decoration:none;font-weight:600;">
        ${referralUrl}
      </a>
    </div>

    <div style="text-align:center;margin-bottom:20px;">
      <a href="${twitterShareUrl}" style="display:inline-block;padding:10px 22px;border-radius:100px;background-color:#1DA1F2;color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;">
        𝕏 Share on Twitter
      </a>
    </div>

    <div style="text-align:center;">
      <a href="${SITE}/refer" style="${styles.ctaButtonOutline}">
        View Referral Dashboard →
      </a>
    </div>
  `;

	return emailLayout(body, {
		preheader: `You earned 1 free month of CancelKit Pro! $${data.dollarCredit} credit applied to your account.`,
		userId: data.userId,
		email: data.email,
	});
}

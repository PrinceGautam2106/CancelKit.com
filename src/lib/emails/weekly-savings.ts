/**
 * weekly-savings.ts — Sent every Sunday.
 *
 * Subject: "Your SubZaps recap: $X saved this week"
 *
 * Includes viral "Share your savings" Twitter/X button.
 * Achievement badge system encourages engagement.
 */

import { emailLayout, styles, SITE } from './layout';

export interface WeeklySavingsData {
	email: string;
	userId: string;
	name?: string;
	/** Amount saved THIS week (e.g. "27.48"). */
	savedThisWeek: string;
	/** Running all-time total saved (e.g. "342.91"). */
	totalSaved: string;
	/** Subscriptions cancelled this week. */
	cancelledThisWeek: { name: string; monthlySavings: string }[];
	/** Number of active subscriptions remaining. */
	activeSubscriptions: number;
	/** Current monthly burn rate (e.g. "89.47"). */
	monthlyBurn: string;
	/** Achievement badge to show (milestone). */
	achievementBadge?: {
		title: string;
		emoji: string;
		description: string;
	};
}

export function weeklySavingsSubject(data: WeeklySavingsData): string {
	return `Your SubZaps recap: $${data.savedThisWeek} saved this week`;
}

export function weeklySavingsHtml(data: WeeklySavingsData): string {
	const firstName = data.name?.split(' ')[0] || 'there';
	const hasCancellations = data.cancelledThisWeek.length > 0;

	const tweetText = encodeURIComponent(
		`I've saved $${data.totalSaved} on subscriptions I forgot about using @SubZaps 💸\n\nStop paying for things you don't use → subzaps.com`
	);
	const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

	const cancellationsBlock = hasCancellations
		? `
      <h2 style="${styles.h2}">Cancelled this week</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
        ${data.cancelledThisWeek
					.map(
						(sub) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;">
            <span style="font-size:14px;color:#ffffff;">${sub.name}</span>
          </td>
          <td align="right" style="padding:10px 0;border-bottom:1px solid #1a1a1a;">
            <span style="${styles.badgeAccent}">-$${sub.monthlySavings}/mo</span>
          </td>
        </tr>`
					)
					.join('')}
      </table>`
		: `
      <div style="${styles.card}margin-bottom:24px;">
        <p style="margin:0;font-size:14px;color:#888888;text-align:center;">
          No cancellations this week. Your subscriptions are looking tidy! 🧹
        </p>
      </div>`;

	const achievementBlock = data.achievementBadge
		? `
      <div style="text-align:center;padding:24px 20px;border-radius:12px;background:linear-gradient(135deg, rgba(0,255,136,0.08) 0%, rgba(0,255,136,0.02) 100%);border:1px solid rgba(0,255,136,0.25);margin-bottom:28px;">
        <span style="display:block;font-size:48px;margin-bottom:8px;">${data.achievementBadge.emoji}</span>
        <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#00ff88;">${data.achievementBadge.title}</p>
        <p style="margin:0;font-size:13px;color:#888888;">${data.achievementBadge.description}</p>
      </div>`
		: '';

	const body = `
    <h1 style="${styles.h1}">Your weekly recap, ${firstName}</h1>
    <p style="${styles.muted}">Here's what happened with your subscriptions this week.</p>

    <!-- Hero Savings Card -->
    <div style="text-align:center;padding:28px 20px;border-radius:12px;background-color:#111111;border:1px solid #1a1a1a;margin-bottom:28px;">
      <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#555555;font-family:'Geist Mono',monospace;">Saved this week</p>
      <p style="margin:0 0 16px;font-size:40px;font-weight:700;color:#00ff88;letter-spacing:-0.03em;">$${data.savedThisWeek}</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="50%" style="text-align:center;padding:8px 0;border-right:1px solid #1a1a1a;">
            <p style="margin:0;font-size:11px;color:#666666;text-transform:uppercase;">Total saved</p>
            <p style="margin:4px 0 0;font-size:20px;font-weight:700;color:#ffffff;">$${data.totalSaved}</p>
          </td>
          <td width="50%" style="text-align:center;padding:8px 0;">
            <p style="margin:0;font-size:11px;color:#666666;text-transform:uppercase;">Monthly burn</p>
            <p style="margin:4px 0 0;font-size:20px;font-weight:700;color:#ffffff;">$${data.monthlyBurn}</p>
          </td>
        </tr>
      </table>

      <p style="margin:12px 0 0;font-size:12px;color:#555555;">
        ${data.activeSubscriptions} active subscription${data.activeSubscriptions !== 1 ? 's' : ''} remaining
      </p>
    </div>

    ${achievementBlock}
    ${cancellationsBlock}

    <hr style="${styles.divider}" />

    <!-- Viral Share Section -->
    <div style="text-align:center;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#ffffff;">
        You've saved $${data.totalSaved} with SubZaps 🎉
      </p>
      <p style="margin:0 0 16px;font-size:13px;color:#888888;">Flex your savings and help a friend stop overpaying:</p>
      <a href="${twitterShareUrl}" style="display:inline-block;padding:10px 20px;border-radius:100px;background-color:#1DA1F2;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">
        𝕏 Share your savings on Twitter
      </a>
    </div>

    <hr style="${styles.divider}" />

    <div style="text-align:center;">
      <a href="${SITE}/dashboard" style="${styles.ctaButton}">
        View Dashboard →
      </a>
    </div>
  `;

	return emailLayout(body, {
		preheader: `You saved $${data.savedThisWeek} this week. Total: $${data.totalSaved} with SubZaps.`,
		userId: data.userId,
		email: data.email,
	});
}

import { n as emailLayout, r as styles, t as SITE } from "./layout_DmOUDyLy.mjs";
//#region src/lib/emails/payment-failed.ts
/**
* payment-failed.ts — Sent when the user's CancelKits Pro payment fails.
*
* Subject: "Your CancelKits Pro access is paused"
* Tone:    Helpful, not threatening. Clear 3-day grace period.
*/
function paymentFailedSubject() {
	return "Your CancelKits Pro access is paused";
}
function paymentFailedHtml(data) {
	const body = `
    <div style="text-align:center;margin-bottom:24px;">
      <span style="display:inline-block;width:56px;height:56px;line-height:56px;text-align:center;border-radius:50%;background-color:rgba(255,68,68,0.15);font-size:28px;">⚠</span>
    </div>

    <h1 style="${styles.h1}text-align:center;">Payment didn't go through</h1>
    <p style="${styles.body}text-align:center;">
      We tried to charge your ${data.planName} subscription but the payment was declined. Your subscription monitoring is temporarily paused.
    </p>

    <!-- Failure Details Card -->
    <div style="${styles.card}margin-bottom:24px;border-color:rgba(255,68,68,0.3);">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:4px 0;">
            <p style="margin:0;font-size:13px;color:#666666;">Plan</p>
            <p style="margin:2px 0 0;font-size:15px;font-weight:600;color:#ffffff;">CancelKits ${data.planName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:4px 0;">
            <p style="margin:0;font-size:13px;color:#666666;">Amount</p>
            <p style="margin:2px 0 0;font-size:15px;font-weight:600;color:#ff4444;">$${data.amount}</p>
          </td>
        </tr>
        ${data.lastFourDigits ? `<tr><td style="padding:4px 0;"><p style="margin:0;font-size:13px;color:#666666;">Card ending in</p><p style="margin:2px 0 0;font-size:15px;color:#cccccc;">•••• ${data.lastFourDigits}</p></td></tr>` : ""}
        <tr>
          <td style="padding:4px 0;">
            <p style="margin:0;font-size:13px;color:#666666;">Failed on</p>
            <p style="margin:2px 0 0;font-size:15px;color:#cccccc;">${data.failedDate}</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Grace Period Notice -->
    <div style="padding:16px 20px;border-radius:12px;background-color:rgba(255,168,0,0.08);border:1px solid rgba(255,168,0,0.25);margin-bottom:28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="28" valign="top">
            <span style="font-size:18px;">⏰</span>
          </td>
          <td style="padding-left:10px;">
            <p style="margin:0;font-size:14px;font-weight:600;color:#ffa800;">3-day grace period</p>
            <p style="margin:4px 0 0;font-size:13px;color:#cccccc;line-height:1.5;">
              Update your payment method before <strong style="color:#ffffff;">${data.gracePeriodEnd}</strong> to keep your ${data.planName} features active. After that, your account will revert to the Free plan.
            </p>
          </td>
        </tr>
      </table>
    </div>

    <h2 style="${styles.h2}">What's paused right now</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
      <tr>
        <td style="padding:6px 0;font-size:14px;color:#888888;">
          <span style="color:#ff4444;margin-right:6px;">✕</span> Automatic inbox scanning
        </td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:14px;color:#888888;">
          <span style="color:#ff4444;margin-right:6px;">✕</span> 1-click cancellation assist
        </td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:14px;color:#888888;">
          <span style="color:#ff4444;margin-right:6px;">✕</span> Renewal alerts
        </td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:14px;color:#888888;">
          <span style="color:#ff4444;margin-right:6px;">✕</span> Refund claim assistance
        </td>
      </tr>
    </table>

    <div style="text-align:center;margin-bottom:12px;">
      <a href="${SITE}/account" style="${styles.ctaButton}">
        Update Payment Method →
      </a>
    </div>
    <p style="${styles.small}text-align:center;">
      If this was a mistake or your card was recently replaced, updating your payment info takes under 30 seconds.
    </p>
  `;
	return emailLayout(body, {
		preheader: `Your CancelKits ${data.planName} payment failed. Update your card within 3 days to keep your features.`,
		userId: data.userId,
		email: data.email
	});
}
//#endregion
export { paymentFailedSubject as n, paymentFailedHtml as t };

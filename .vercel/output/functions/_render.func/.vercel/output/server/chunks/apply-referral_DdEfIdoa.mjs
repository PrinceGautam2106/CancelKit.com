import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as supabase } from "./supabase_DGziOt98.mjs";
import { r as stripe } from "./stripe_CTivRJRB.mjs";
import { a as resend, i as EMAIL_DEFAULTS, n as emailLayout, r as styles, t as SITE } from "./layout_DmOUDyLy.mjs";
//#region src/lib/emails/referral-reward.ts
/**
* referral-reward.ts — Sent to referrer when their friend upgrades to Pro.
*
* Subject: "🎉 You earned 1 month of CancelKits Pro free!"
* Tone:    Celebratory, encouraging, clear explanation of Stripe credit.
*/
function referralRewardSubject() {
	return "🎉 You earned 1 month of CancelKits Pro free!";
}
function referralRewardHtml(data) {
	const firstName = data.referrerName?.split(" ")[0] || "there";
	const friend = data.referredFriendName || "Your friend";
	const referralUrl = `${SITE}/r/${data.referralCode}`;
	const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just earned a free month of @CancelKits for helping a friend cancel forgotten subscriptions 💸\n\nGet your first month free: ${referralUrl}`)}`;
	const body = `
    <div style="text-align:center;margin-bottom:24px;">
      <span style="display:inline-block;width:56px;height:56px;line-height:56px;text-align:center;border-radius:50%;background-color:rgba(0,255,136,0.15);font-size:28px;">🎁</span>
    </div>

    <h1 style="${styles.h1}text-align:center;">1 Month Free Unlocked!</h1>
    <p style="${styles.body}text-align:center;">
      Awesome news, ${firstName}! ${friend} just upgraded to CancelKits Pro. Because you invited them, you <strong style="color:#ffffff;">BOTH</strong> get 1 month of CancelKits Pro on us.
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
		preheader: `You earned 1 free month of CancelKits Pro! $${data.dollarCredit} credit applied to your account.`,
		userId: data.userId,
		email: data.email
	});
}
//#endregion
//#region src/pages/api/apply-referral.ts
var apply_referral_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	try {
		let body;
		try {
			body = await request.json();
		} catch {
			return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}
		const { referralCode, newUserId, newUserEmail, stripeCustomerId } = body;
		if (!referralCode && !newUserEmail) return new Response(JSON.stringify({ error: "Missing referralCode or newUserEmail" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		let referralRecord = null;
		if (referralCode) {
			const { data, error } = await supabase.from("referrals").select("*").eq("referral_code", referralCode).order("created_at", { ascending: false }).limit(1).maybeSingle();
			if (!error && data) referralRecord = data;
		}
		if (!referralRecord && newUserEmail) {
			const { data } = await supabase.from("referrals").select("*").eq("referred_email", newUserEmail).maybeSingle();
			if (data) referralRecord = data;
		}
		const referrerUserId = referralRecord?.referrer_user_id;
		const creditAmount = -900;
		if (stripeCustomerId && !stripeCustomerId.startsWith("cus_mock")) try {
			await stripe.customers.createBalanceTransaction(stripeCustomerId, {
				amount: creditAmount,
				currency: "usd",
				description: "Referral reward: 1 month free CancelKits Pro"
			});
		} catch (stripeErr) {
			console.warn("Could not credit new customer on Stripe:", stripeErr);
		}
		let referrerEmail = "";
		let referrerName = "";
		if (referrerUserId) try {
			const { data: refUser } = await supabase.from("users").select("email, full_name, stripe_customer_id").eq("id", referrerUserId).maybeSingle();
			if (refUser) {
				referrerEmail = refUser.email;
				referrerName = refUser.full_name || "";
				if (refUser.stripe_customer_id && !refUser.stripe_customer_id.startsWith("cus_mock")) try {
					await stripe.customers.createBalanceTransaction(refUser.stripe_customer_id, {
						amount: creditAmount,
						currency: "usd",
						description: "Referral reward: 1 month free for inviting a friend"
					});
				} catch (stripeErr) {
					console.warn("Could not credit referrer on Stripe:", stripeErr);
				}
			}
		} catch (dbErr) {
			console.warn("Error fetching referrer details:", dbErr);
		}
		try {
			if (referralRecord?.id) await supabase.from("referrals").update({
				status: "upgraded",
				referred_user_id: newUserId || null,
				referred_email: newUserEmail || null,
				reward_given_at: (/* @__PURE__ */ new Date()).toISOString(),
				reward_months: 1
			}).eq("id", referralRecord.id);
			else if (referrerUserId || referralCode) await supabase.from("referrals").insert({
				referrer_user_id: referrerUserId || "00000000-0000-0000-0000-000000000000",
				referral_code: referralCode || "default",
				referred_user_id: newUserId || null,
				referred_email: newUserEmail || null,
				status: "upgraded",
				reward_given_at: (/* @__PURE__ */ new Date()).toISOString(),
				reward_months: 1
			});
		} catch (dbUpdateErr) {
			console.warn("Could not update referrals table:", dbUpdateErr);
		}
		if (referrerEmail) try {
			const { count } = await supabase.from("referrals").select("*", {
				count: "exact",
				head: true
			}).eq("referrer_user_id", referrerUserId).eq("status", "upgraded");
			const totalMonths = Math.max(1, count || 1);
			const emailHtml = referralRewardHtml({
				email: referrerEmail,
				userId: referrerUserId,
				referrerName,
				referredFriendName: newUserEmail?.split("@")[0] || "Your friend",
				monthsEarned: 1,
				totalMonthsEarned: totalMonths,
				dollarCredit: "9.00",
				referralCode: referralCode || "cancelkit"
			});
			await resend.emails.send({
				from: EMAIL_DEFAULTS.from,
				replyTo: EMAIL_DEFAULTS.replyTo,
				to: [referrerEmail],
				subject: referralRewardSubject(),
				html: emailHtml
			});
			await supabase.from("email_log").insert({
				recipient: referrerEmail,
				template: "referral-reward",
				subject: referralRewardSubject(),
				status: "sent",
				metadata: {
					referralCode,
					newUserId,
					newUserEmail
				},
				sent_at: (/* @__PURE__ */ new Date()).toISOString()
			});
		} catch (emailErr) {
			console.warn("Failed to send referral reward email:", emailErr);
		}
		return new Response(JSON.stringify({
			success: true,
			rewardMonths: 1,
			creditAmount: "$9.00",
			referrerCredited: Boolean(referrerUserId)
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("apply-referral error:", err);
		return new Response(JSON.stringify({ error: err?.message || "Failed to apply referral" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/apply-referral@_@ts
var page = () => apply_referral_exports;
//#endregion
export { page };

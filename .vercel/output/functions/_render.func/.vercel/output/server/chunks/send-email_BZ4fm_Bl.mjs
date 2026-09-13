import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as supabase } from "./supabase_DGziOt98.mjs";
import { a as resend, i as EMAIL_DEFAULTS, n as emailLayout, r as styles, t as SITE } from "./layout_DmOUDyLy.mjs";
import { n as paymentFailedSubject, t as paymentFailedHtml } from "./payment-failed_I46Fddqb.mjs";
//#region src/lib/emails/welcome.ts
/**
* welcome.ts — Sent immediately on signup.
*
* Subject: "CancelKits is scanning your subscriptions now..."
* Tone:    Excited but calm. Reassuring. Not spammy.
*/
function welcomeSubject() {
	return "CancelKits is scanning your subscriptions now...";
}
function welcomeHtml(data) {
	const firstName = data.name?.split(" ")[0] || "there";
	const hasSubs = data.subscriptionsFound && data.subscriptionsFound.length > 0;
	const subsTable = hasSubs ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
        ${data.subscriptionsFound.map((sub) => `
          <tr>
            <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;">
              <span style="font-size:14px;font-weight:600;color:#ffffff;">${sub.name}</span>
            </td>
            <td align="right" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;">
              <span style="font-size:14px;font-weight:600;color:#00ff88;">${sub.amount}/mo</span>
            </td>
          </tr>`).join("")}
      </table>` : `
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
      ${hasSubs ? `We already found ${data.subscriptionsFound.length} subscription${data.subscriptionsFound.length !== 1 ? "s" : ""}` : "Scanning in progress..."}
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
		email: data.email
	});
}
//#endregion
//#region src/lib/emails/cancel-confirmation.ts
/**
* cancel-confirmation.ts — Sent when a subscription is cancelled.
*
* Subject: "Netflix cancelled ✓ — you saved $15.49/month"
*
* This is the email that earns affiliate revenue passively:
* it shows alternatives with affiliate links alongside the savings data.
*/
function cancelConfirmationSubject(data) {
	return `${data.serviceName} cancelled ✓ — you saved $${data.monthlySavings}/month`;
}
function cancelConfirmationHtml(data) {
	const alternativesBlock = data.alternatives && data.alternatives.length > 0 ? `
      <hr style="${styles.divider}" />
      <h2 style="${styles.h2}">Looking for an alternative?</h2>
      <p style="${styles.muted}">People who cancelled ${data.serviceName} also liked:</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${data.alternatives.map((alt) => `
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
        <tr><td style="height:8px;"></td></tr>`).join("")}
      </table>` : "";
	const body = `
    <div style="text-align:center;margin-bottom:24px;">
      <span style="display:inline-block;width:56px;height:56px;line-height:56px;text-align:center;border-radius:50%;background-color:rgba(0,255,136,0.15);font-size:28px;">✓</span>
    </div>

    <h1 style="${styles.h1}text-align:center;">${data.serviceName} cancelled</h1>
    <p style="${styles.body}text-align:center;">
      That's <span style="${styles.accent}font-weight:700;">$${data.monthlySavings}/month</span> back in your pocket. Nice.
    </p>

    ${data.confirmationCode ? `<p style="${styles.muted}text-align:center;">Confirmation: <code style="font-family:'Geist Mono',monospace;background-color:#111111;padding:2px 8px;border-radius:4px;color:#ffffff;">${data.confirmationCode}</code></p>` : ""}

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
		email: data.email
	});
}
//#endregion
//#region src/lib/emails/renewal-alert.ts
/**
* renewal-alert.ts — Sent 7 days before any subscription renews.
*
* Subject: "⚠️ Your Spotify renewal is in 7 days — still want it?"
*
* This is the core value prop email — prevents surprise charges.
*/
function renewalAlertSubject(data) {
	return `⚠️ Your ${data.serviceName} renewal is in ${data.daysUntilRenewal} day${data.daysUntilRenewal !== 1 ? "s" : ""} — still want it?`;
}
function renewalAlertHtml(data) {
	const body = `
    <div style="text-align:center;margin-bottom:24px;">
      <span style="display:inline-block;width:56px;height:56px;line-height:56px;text-align:center;border-radius:50%;background-color:rgba(255,168,0,0.15);font-size:28px;">⚠️</span>
    </div>

    <h1 style="${styles.h1}text-align:center;">Upcoming renewal</h1>
    <p style="${styles.body}text-align:center;">
      <strong>${data.serviceName}</strong> will automatically renew in
      <span style="font-weight:700;color:#ffa800;">${data.daysUntilRenewal} day${data.daysUntilRenewal !== 1 ? "s" : ""}</span>.
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
        ${data.category ? `<tr><td style="padding:6px 0;"><p style="margin:0;font-size:13px;color:#666666;">Category</p><p style="margin:2px 0 0;font-size:14px;color:#cccccc;">${data.category}</p></td></tr>` : ""}
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
		email: data.email
	});
}
//#endregion
//#region src/lib/emails/weekly-savings.ts
/**
* weekly-savings.ts — Sent every Sunday.
*
* Subject: "Your CancelKits recap: $X saved this week"
*
* Includes viral "Share your savings" Twitter/X button.
* Achievement badge system encourages engagement.
*/
function weeklySavingsSubject(data) {
	return `Your CancelKits recap: $${data.savedThisWeek} saved this week`;
}
function weeklySavingsHtml(data) {
	const firstName = data.name?.split(" ")[0] || "there";
	const hasCancellations = data.cancelledThisWeek.length > 0;
	const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I've saved $${data.totalSaved} on subscriptions I forgot about using @CancelKits 💸\n\nStop paying for things you don't use → cancelkits.com`)}`;
	const cancellationsBlock = hasCancellations ? `
      <h2 style="${styles.h2}">Cancelled this week</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
        ${data.cancelledThisWeek.map((sub) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;">
            <span style="font-size:14px;color:#ffffff;">${sub.name}</span>
          </td>
          <td align="right" style="padding:10px 0;border-bottom:1px solid #1a1a1a;">
            <span style="${styles.badgeAccent}">-$${sub.monthlySavings}/mo</span>
          </td>
        </tr>`).join("")}
      </table>` : `
      <div style="${styles.card}margin-bottom:24px;">
        <p style="margin:0;font-size:14px;color:#888888;text-align:center;">
          No cancellations this week. Your subscriptions are looking tidy! 🧹
        </p>
      </div>`;
	const achievementBlock = data.achievementBadge ? `
      <div style="text-align:center;padding:24px 20px;border-radius:12px;background:linear-gradient(135deg, rgba(0,255,136,0.08) 0%, rgba(0,255,136,0.02) 100%);border:1px solid rgba(0,255,136,0.25);margin-bottom:28px;">
        <span style="display:block;font-size:48px;margin-bottom:8px;">${data.achievementBadge.emoji}</span>
        <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#00ff88;">${data.achievementBadge.title}</p>
        <p style="margin:0;font-size:13px;color:#888888;">${data.achievementBadge.description}</p>
      </div>` : "";
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
        ${data.activeSubscriptions} active subscription${data.activeSubscriptions !== 1 ? "s" : ""} remaining
      </p>
    </div>

    ${achievementBlock}
    ${cancellationsBlock}

    <hr style="${styles.divider}" />

    <!-- Viral Share Section -->
    <div style="text-align:center;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#ffffff;">
        You've saved $${data.totalSaved} with CancelKits 🎉
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
		preheader: `You saved $${data.savedThisWeek} this week. Total: $${data.totalSaved} with CancelKits.`,
		userId: data.userId,
		email: data.email
	});
}
//#endregion
//#region src/pages/api/send-email.ts
var send_email_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* Resolve subject + html for the requested template.
*/
function resolveTemplate(template, data) {
	switch (template) {
		case "welcome": return {
			subject: welcomeSubject(),
			html: welcomeHtml(data)
		};
		case "cancel-confirmation": return {
			subject: cancelConfirmationSubject(data),
			html: cancelConfirmationHtml(data)
		};
		case "renewal-alert": return {
			subject: renewalAlertSubject(data),
			html: renewalAlertHtml(data)
		};
		case "payment-failed": return {
			subject: paymentFailedSubject(),
			html: paymentFailedHtml(data)
		};
		case "weekly-savings": return {
			subject: weeklySavingsSubject(data),
			html: weeklySavingsHtml(data)
		};
		default: return null;
	}
}
var POST = async ({ request }) => {
	const origin = request.headers.get("origin");
	const referer = request.headers.get("referer");
	if (!(request.headers.get("x-api-secret") || origin && origin.includes("cancelkits.com") || origin && origin.includes("localhost") || referer && referer.includes("cancelkits.com") || referer && referer.includes("localhost"))) return new Response(JSON.stringify({ error: "Unauthorized" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	let body;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
	const { template, to, data } = body;
	if (!template || !to) return new Response(JSON.stringify({ error: "Missing required fields: template, to" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	try {
		const { data: prefs } = await supabase.from("email_preferences").select("unsubscribed").eq("email", to).maybeSingle();
		if (prefs?.unsubscribed) return new Response(JSON.stringify({
			error: "Recipient has unsubscribed",
			skipped: true
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch {}
	const resolved = resolveTemplate(template, data);
	if (!resolved) return new Response(JSON.stringify({ error: `Unknown template: ${template}` }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	let resendResponse;
	let sendError = null;
	try {
		const { data: resData, error: resErr } = await resend.emails.send({
			from: EMAIL_DEFAULTS.from,
			replyTo: EMAIL_DEFAULTS.replyTo,
			to: [to],
			subject: resolved.subject,
			html: resolved.html,
			headers: {
				"List-Unsubscribe": `<https://cancelkits.com/unsubscribe?token=${encodeURIComponent(data.userId || to)}>`,
				"List-Unsubscribe-Post": "List-Unsubscribe=One-Click"
			}
		});
		if (resErr) sendError = resErr.message;
		resendResponse = resData;
	} catch (err) {
		sendError = err?.message || "Unknown Resend error";
	}
	try {
		await supabase.from("email_log").insert({
			recipient: to,
			template,
			subject: resolved.subject,
			status: sendError ? "failed" : "sent",
			error: sendError || null,
			resend_id: resendResponse?.id || null,
			metadata: data,
			sent_at: (/* @__PURE__ */ new Date()).toISOString()
		});
	} catch {}
	if (sendError) return new Response(JSON.stringify({ error: sendError }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	return new Response(JSON.stringify({
		success: true,
		id: resendResponse?.id,
		template,
		to
	}), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/send-email@_@ts
var page = () => send_email_exports;
//#endregion
export { page };

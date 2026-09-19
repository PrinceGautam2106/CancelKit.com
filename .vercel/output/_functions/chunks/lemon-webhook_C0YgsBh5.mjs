import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as supabase } from "./supabase_CCSxjsdD.mjs";
import { a as resend, i as EMAIL_DEFAULTS } from "./layout_DmOUDyLy.mjs";
import { n as paymentFailedSubject, t as paymentFailedHtml } from "./payment-failed_I46Fddqb.mjs";
import { t as getPlanFromVariantOrPriceId } from "./lemonsqueezy_i5WtEdXW.mjs";
import "node:crypto";
//#region src/pages/api/lemon-webhook.ts
var lemon_webhook_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	request.headers.get("x-signature");
	const rawBody = await request.text();
	console.warn("[LemonSqueezy Webhook] LEMONSQUEEZY_WEBHOOK_SECRET not set, proceeding in test mode");
	let payload;
	try {
		payload = JSON.parse(rawBody);
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
	const eventName = payload.meta?.event_name;
	const customData = payload.meta?.custom_data || {};
	const data = payload.data || {};
	const attributes = data.attributes || {};
	const customerId = attributes.customer_id ? String(attributes.customer_id) : null;
	const subscriptionId = data.id ? String(data.id) : null;
	const email = attributes.user_email || customData.email;
	let userId = customData.userId;
	customData.referralCode;
	try {
		if (!userId && email) {
			const { data: userRecord } = await supabase.from("users").select("id").eq("email", email).maybeSingle();
			if (userRecord?.id) userId = userRecord.id;
		}
		switch (eventName) {
			case "subscription_created":
			case "subscription_resumed": {
				const plan = customData.plan || getPlanFromVariantOrPriceId(attributes.variant_id || attributes.variant_name);
				if (userId) try {
					await supabase.from("users").update({
						plan,
						stripe_customer_id: customerId,
						stripe_subscription_id: subscriptionId,
						updated_at: (/* @__PURE__ */ new Date()).toISOString()
					}).eq("id", userId);
				} catch (dbErr) {
					console.warn("[Lemon Webhook] Failed to update user record:", dbErr);
				}
				if (userId || customerId) try {
					const renewsAt = attributes.renews_at ? attributes.renews_at.split("T")[0] : new Date(Date.now() + 2592e6).toISOString().split("T")[0];
					await supabase.from("subscriptions").upsert({
						user_id: userId || customerId,
						name: `CancelKits ${plan.toUpperCase()}`,
						category: "Software & Cloud",
						amount: plan === "family" ? 19 : 9,
						currency: "USD",
						billing_cycle: attributes.billing_anchor ? "yearly" : "monthly",
						renewal_date: renewsAt,
						status: "active"
					}, { onConflict: "user_id,name" });
				} catch (subErr) {
					console.warn("[Lemon Webhook] Failed to upsert subscription:", subErr);
				}
				break;
			}
			case "subscription_updated": {
				const plan = customData.plan || getPlanFromVariantOrPriceId(attributes.variant_id || attributes.variant_name);
				const status = attributes.status;
				if (userId) try {
					await supabase.from("users").update({
						plan: status === "active" ? plan : "free",
						updated_at: (/* @__PURE__ */ new Date()).toISOString()
					}).eq("id", userId);
				} catch (dbErr) {
					console.warn("[Lemon Webhook] Failed to update user status:", dbErr);
				}
				break;
			}
			case "subscription_cancelled":
			case "subscription_expired":
				if (userId) try {
					await supabase.from("users").update({
						plan: "free",
						stripe_subscription_id: null,
						updated_at: (/* @__PURE__ */ new Date()).toISOString()
					}).eq("id", userId);
				} catch (dbErr) {
					console.warn("[Lemon Webhook] Failed to downgrade user:", dbErr);
				}
				break;
			case "subscription_payment_failed": {
				const amount = attributes.total_formatted || "$9.00";
				const failedDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
					month: "long",
					day: "numeric",
					year: "numeric"
				});
				const gracePeriodEnd = new Date(Date.now() + 2592e5).toLocaleDateString("en-US", {
					month: "long",
					day: "numeric",
					year: "numeric"
				});
				if (email) try {
					await resend.emails.send({
						from: EMAIL_DEFAULTS.from,
						replyTo: EMAIL_DEFAULTS.replyTo,
						to: [email],
						subject: paymentFailedSubject(),
						html: paymentFailedHtml({
							email,
							userId: userId || customerId || "",
							planName: "Pro",
							amount,
							failedDate,
							gracePeriodEnd
						})
					});
				} catch (emailErr) {
					console.warn("[Lemon Webhook] Failed to send payment failed email:", emailErr);
				}
				break;
			}
			default: console.log(`[Lemon Webhook] Unhandled event: ${eventName}`);
		}
		return new Response(JSON.stringify({ received: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("[Lemon Webhook] Processing error:", err);
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/lemon-webhook@_@ts
var page = () => lemon_webhook_exports;
//#endregion
export { page };

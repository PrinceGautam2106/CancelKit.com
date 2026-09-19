import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as supabase } from "./supabase_CCSxjsdD.mjs";
import { n as stripe, t as getPlanFromPriceId } from "./stripe_CVXs5imd.mjs";
import { a as resend, i as EMAIL_DEFAULTS } from "./layout_DmOUDyLy.mjs";
import { n as paymentFailedSubject, t as paymentFailedHtml } from "./payment-failed_I46Fddqb.mjs";
//#region src/pages/api/stripe-webhook.ts
var stripe_webhook_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var webhookSecret = "whsec_mockStripeWebhookSecretForSubZaps";
var POST = async ({ request }) => {
	const signature = request.headers.get("stripe-signature");
	const rawBody = await request.text();
	let event;
	try {
		if (signature && !webhookSecret.startsWith("whsec_mock")) event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
		else event = JSON.parse(rawBody);
	} catch (err) {
		console.error("Webhook signature verification failed:", err.message);
		return new Response(`Webhook Error: ${err.message}`, { status: 400 });
	}
	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const session = event.data.object;
				const userId = session.client_reference_id || session.metadata?.userId;
				const plan = session.metadata?.plan || "pro";
				const email = session.customer_email || session.customer_details?.email;
				if (userId) try {
					await supabase.from("users").update({
						plan,
						stripe_customer_id: session.customer,
						stripe_subscription_id: session.subscription,
						updated_at: (/* @__PURE__ */ new Date()).toISOString()
					}).eq("id", userId);
				} catch (dbErr) {
					console.warn("Failed to update users table:", dbErr);
				}
				if (email) try {
					await supabase.from("subscriptions").upsert({
						user_id: userId || session.customer,
						name: `CancelKits ${plan.toUpperCase()}`,
						category: "Software & Cloud",
						amount: plan === "family" ? 19 : 9,
						currency: "USD",
						billing_cycle: "monthly",
						renewal_date: new Date(Date.now() + 2592e6).toISOString().split("T")[0],
						status: "active"
					}, { onConflict: "user_id,name" });
				} catch (subErr) {
					console.warn("Failed to upsert subscription:", subErr);
				}
				break;
			}
			case "customer.subscription.deleted": {
				const subscription = event.data.object;
				const userId = subscription.metadata?.userId;
				const customerId = subscription.customer;
				if (userId) try {
					await supabase.from("users").update({
						plan: "free",
						stripe_subscription_id: null,
						updated_at: (/* @__PURE__ */ new Date()).toISOString()
					}).eq("id", userId);
				} catch (dbErr) {
					console.warn("Failed to downgrade user in DB:", dbErr);
				}
				else if (customerId) try {
					await supabase.from("users").update({
						plan: "free",
						stripe_subscription_id: null,
						updated_at: (/* @__PURE__ */ new Date()).toISOString()
					}).eq("stripe_customer_id", customerId);
				} catch (dbErr) {
					console.warn("Failed to downgrade user by customer ID:", dbErr);
				}
				break;
			}
			case "customer.subscription.updated": {
				const subscription = event.data.object;
				const userId = subscription.metadata?.userId;
				const priceId = subscription.items?.data?.[0]?.price?.id;
				const plan = getPlanFromPriceId(priceId);
				const status = subscription.status;
				const mappedPlan = status === "active" || status === "trialing" ? plan : "free";
				if (userId) try {
					await supabase.from("users").update({
						plan: mappedPlan,
						subscription_status: status,
						updated_at: (/* @__PURE__ */ new Date()).toISOString()
					}).eq("id", userId);
				} catch (dbErr) {
					console.warn("Failed to update subscription in DB:", dbErr);
				}
				break;
			}
			case "invoice.payment_failed": {
				const invoice = event.data.object;
				const customerEmail = invoice.customer_email;
				const amount = invoice.amount_due ? (invoice.amount_due / 100).toFixed(2) : "9.00";
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
				if (customerEmail) try {
					const emailData = {
						email: customerEmail,
						userId: invoice.customer,
						planName: "Pro",
						amount,
						failedDate,
						gracePeriodEnd
					};
					await resend.emails.send({
						from: EMAIL_DEFAULTS.from,
						replyTo: EMAIL_DEFAULTS.replyTo,
						to: [customerEmail],
						subject: paymentFailedSubject(),
						html: paymentFailedHtml(emailData)
					});
				} catch (emailErr) {
					console.warn("Failed to send payment failed email:", emailErr);
				}
				try {
					await supabase.from("alerts").insert({
						customer_id: invoice.customer,
						type: "payment_failed",
						message: `Your CancelKits payment of $${amount} failed. Please update your payment method within 3 days.`,
						created_at: (/* @__PURE__ */ new Date()).toISOString()
					});
				} catch {}
				break;
			}
			default: console.log(`Unhandled Stripe event type: ${event.type}`);
		}
		return new Response(JSON.stringify({ received: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("Stripe webhook processing error:", err);
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/stripe-webhook@_@ts
var page = () => stripe_webhook_exports;
//#endregion
export { page };

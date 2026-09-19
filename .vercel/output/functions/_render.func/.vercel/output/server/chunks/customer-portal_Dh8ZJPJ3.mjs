import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as supabase } from "./supabase_CCSxjsdD.mjs";
import { n as stripe } from "./stripe_CVXs5imd.mjs";
import { getCustomer } from "@lemonsqueezy/lemonsqueezy.js";
//#region src/pages/api/customer-portal.ts
var customer_portal_exports = /* @__PURE__ */ __exportAll({
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
		let { userId, customerId } = body;
		const origin = request.headers.get("origin") || request.headers.get("referer") || "https://cancelkits.com";
		const returnUrl = `${new URL(origin).origin}/account`;
		if (!customerId && userId) {
			const { data: userProfile } = await supabase.from("users").select("stripe_customer_id, plan").eq("id", userId).maybeSingle();
			if (userProfile?.stripe_customer_id) customerId = userProfile.stripe_customer_id;
		}
		if (!customerId) return new Response(JSON.stringify({ error: "No active billing subscription found. Upgrade to Pro to manage subscriptions." }), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		if (!customerId.startsWith("cus_")) {
			try {
				const portalUrl = (await getCustomer(customerId)).data?.data?.attributes?.urls?.customer_portal;
				if (portalUrl) return new Response(JSON.stringify({ url: portalUrl }), {
					status: 200,
					headers: { "Content-Type": "application/json" }
				});
			} catch (lsErr) {
				console.warn("[Lemon Customer Portal] Direct customer lookup failed, redirecting to orders portal:", lsErr);
			}
			return new Response(JSON.stringify({ url: "https://app.lemonsqueezy.com/my-orders" }), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			});
		}
		try {
			const portalSession = await stripe.billingPortal.sessions.create({
				customer: customerId,
				return_url: returnUrl
			});
			return new Response(JSON.stringify({ url: portalSession.url }), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			});
		} catch (stripeErr) {
			console.warn("[Stripe Portal] Fallback failed:", stripeErr?.message);
			return new Response(JSON.stringify({ url: `${returnUrl}?portal_fallback=1` }), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			});
		}
	} catch (err) {
		console.error("Customer portal error:", err);
		return new Response(JSON.stringify({ error: err?.message || "Failed to create billing portal session" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/customer-portal@_@ts
var page = () => customer_portal_exports;
//#endregion
export { page };

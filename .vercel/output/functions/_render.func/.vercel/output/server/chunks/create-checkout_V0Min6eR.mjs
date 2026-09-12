import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as getPlanFromPriceId, r as stripe, t as STRIPE_PRICES } from "./stripe_CTivRJRB.mjs";
//#region src/pages/api/create-checkout.ts
var create_checkout_exports = /* @__PURE__ */ __exportAll({
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
		const { priceId = STRIPE_PRICES.pro.monthly, userId, email } = body;
		const origin = request.headers.get("origin") || request.headers.get("referer") || "https://cancelkit.com";
		const siteUrl = new URL(origin).origin;
		const plan = getPlanFromPriceId(priceId);
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [{
				price: priceId,
				quantity: 1
			}],
			mode: "subscription",
			customer_email: email || void 0,
			client_reference_id: userId || void 0,
			metadata: {
				userId: userId || "",
				plan
			},
			subscription_data: { metadata: {
				userId: userId || "",
				plan
			} },
			success_url: `${siteUrl}/dashboard?upgraded=true`,
			cancel_url: `${siteUrl}/pricing`,
			allow_promotion_codes: true
		});
		return new Response(JSON.stringify({ url: session.url }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("Stripe create-checkout error:", err);
		return new Response(JSON.stringify({ error: err?.message || "Failed to create Stripe checkout session" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/create-checkout@_@ts
var page = () => create_checkout_exports;
//#endregion
export { page };

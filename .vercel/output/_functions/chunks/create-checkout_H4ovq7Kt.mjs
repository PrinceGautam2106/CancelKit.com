import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as resolveLemonVariantId, t as getPlanFromVariantOrPriceId } from "./lemonsqueezy_i5WtEdXW.mjs";
import "@lemonsqueezy/lemonsqueezy.js";
//#region src/pages/api/create-checkout.ts
var create_checkout_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	let siteUrl = "https://cancelkits.com";
	try {
		const origin = request.headers.get("origin") || request.headers.get("referer") || "https://cancelkits.com";
		siteUrl = new URL(origin).origin;
		let body;
		try {
			body = await request.json();
		} catch {
			return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}
		const { variantId, priceId, tier, billing = "monthly", userId, email, referralCode } = body;
		const plan = tier || getPlanFromVariantOrPriceId(variantId || priceId);
		variantId || resolveLemonVariantId(priceId || tier, billing);
		console.warn("[LemonSqueezy Sandbox] Store ID or live variant not configured yet. Returning sandbox test URL.");
		return new Response(JSON.stringify({
			url: `${siteUrl}/dashboard?upgraded=true&sandbox=1&plan=${plan}`,
			sandbox: true
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("Lemon Squeezy create-checkout error:", err);
		if (err?.message?.includes("401") || err?.message?.includes("Unauthorized") || err?.message?.includes("credentials")) {
			console.warn("[LemonSqueezy Sandbox] Authentication missing. Falling back to sandbox checkout URL for testing.");
			return new Response(JSON.stringify({
				url: `${siteUrl}/dashboard?upgraded=true&sandbox=1`,
				sandbox: true
			}), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			});
		}
		return new Response(JSON.stringify({ error: err?.message || "Failed to create Lemon Squeezy checkout session" }), {
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

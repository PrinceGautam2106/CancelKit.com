import Stripe from "stripe";
var stripe = new Stripe("sk_test_51MockStripeSecretKeyForSubZaps", {
	apiVersion: "2025-02-24.acacia",
	typescript: true
});
var STRIPE_PRICES = {
	pro: {
		monthly: "price_pro_monthly_9",
		yearly: "price_pro_yearly_79"
	},
	family: {
		monthly: "price_family_monthly_19",
		yearly: "price_family_yearly_159"
	}
};
function getPlanFromPriceId(priceId) {
	if (!priceId) return "free";
	if (priceId === STRIPE_PRICES.pro.monthly || priceId === STRIPE_PRICES.pro.yearly || priceId.includes("pro")) return "pro";
	if (priceId === STRIPE_PRICES.family.monthly || priceId === STRIPE_PRICES.family.yearly || priceId.includes("family")) return "family";
	return "pro";
}
//#endregion
export { getPlanFromPriceId as n, stripe as r, STRIPE_PRICES as t };

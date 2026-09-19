//#region src/lib/lemonsqueezy.ts
var LEMONSQUEEZY_VARIANTS = {
	pro: {
		monthly: "",
		yearly: ""
	},
	family: {
		monthly: "",
		yearly: ""
	}
};
function getPlanFromVariantOrPriceId(id) {
	if (!id) return "free";
	const idStr = String(id).toLowerCase();
	if (idStr === String(LEMONSQUEEZY_VARIANTS.family.monthly).toLowerCase() || idStr === String(LEMONSQUEEZY_VARIANTS.family.yearly).toLowerCase() || idStr.includes("family")) return "family";
	if (idStr === String(LEMONSQUEEZY_VARIANTS.pro.monthly).toLowerCase() || idStr === String(LEMONSQUEEZY_VARIANTS.pro.yearly).toLowerCase() || idStr.includes("pro")) return "pro";
	return "pro";
}
function resolveLemonVariantId(requestedIdOrTier, billing = "monthly") {
	if (!requestedIdOrTier) return LEMONSQUEEZY_VARIANTS.pro[billing];
	const str = String(requestedIdOrTier).toLowerCase();
	const cycle = str.includes("yearly") || billing === "yearly" ? "yearly" : "monthly";
	if (str.includes("family")) return LEMONSQUEEZY_VARIANTS.family[cycle];
	return LEMONSQUEEZY_VARIANTS.pro[cycle];
}
//#endregion
export { resolveLemonVariantId as n, getPlanFromVariantOrPriceId as t };

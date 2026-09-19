import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

const apiKey =
	import.meta.env.LEMONSQUEEZY_API_KEY ??
	(typeof process !== 'undefined' ? process.env?.LEMONSQUEEZY_API_KEY : undefined) ??
	'';

export const LEMONSQUEEZY_STORE_ID =
	import.meta.env.LEMONSQUEEZY_STORE_ID ??
	(typeof process !== 'undefined' ? process.env?.LEMONSQUEEZY_STORE_ID : undefined) ??
	'';

export const LEMONSQUEEZY_WEBHOOK_SECRET =
	import.meta.env.LEMONSQUEEZY_WEBHOOK_SECRET ??
	(typeof process !== 'undefined' ? process.env?.LEMONSQUEEZY_WEBHOOK_SECRET : undefined) ??
	'';

export const LEMONSQUEEZY_VARIANTS = {
	pro: {
		monthly:
			import.meta.env.LEMONSQUEEZY_PRO_MONTHLY_VARIANT_ID ??
			(typeof process !== 'undefined' ? process.env?.LEMONSQUEEZY_PRO_MONTHLY_VARIANT_ID : undefined) ??
			'variant_pro_monthly',
		yearly:
			import.meta.env.LEMONSQUEEZY_PRO_YEARLY_VARIANT_ID ??
			(typeof process !== 'undefined' ? process.env?.LEMONSQUEEZY_PRO_YEARLY_VARIANT_ID : undefined) ??
			'variant_pro_yearly',
	},
	family: {
		monthly:
			import.meta.env.LEMONSQUEEZY_FAMILY_MONTHLY_VARIANT_ID ??
			(typeof process !== 'undefined' ? process.env?.LEMONSQUEEZY_FAMILY_MONTHLY_VARIANT_ID : undefined) ??
			'variant_family_monthly',
		yearly:
			import.meta.env.LEMONSQUEEZY_FAMILY_YEARLY_VARIANT_ID ??
			(typeof process !== 'undefined' ? process.env?.LEMONSQUEEZY_FAMILY_YEARLY_VARIANT_ID : undefined) ??
			'variant_family_yearly',
	},
} as const;

/**
 * Resolve the plan tier ('pro' | 'family' | 'free') from a Lemon Squeezy variant ID or legacy price ID
 */
export function getPlanFromVariantOrPriceId(id?: string | number | null): 'free' | 'pro' | 'family' {
	if (!id) return 'free';
	const idStr = String(id).toLowerCase();
	if (
		idStr === String(LEMONSQUEEZY_VARIANTS.family.monthly).toLowerCase() ||
		idStr === String(LEMONSQUEEZY_VARIANTS.family.yearly).toLowerCase() ||
		idStr.includes('family')
	) {
		return 'family';
	}
	if (
		idStr === String(LEMONSQUEEZY_VARIANTS.pro.monthly).toLowerCase() ||
		idStr === String(LEMONSQUEEZY_VARIANTS.pro.yearly).toLowerCase() ||
		idStr.includes('pro')
	) {
		return 'pro';
	}
	return 'pro';
}

/**
 * Helper to map any incoming tier or legacy priceId to the matching Lemon Squeezy variant ID
 */
export function resolveLemonVariantId(
	requestedIdOrTier?: string | number | null,
	billing: 'monthly' | 'yearly' = 'monthly'
): string {
	if (!requestedIdOrTier) return LEMONSQUEEZY_VARIANTS.pro[billing];

	const str = String(requestedIdOrTier).toLowerCase();
	const isYearly = str.includes('yearly') || billing === 'yearly';
	const cycle = isYearly ? 'yearly' : 'monthly';

	if (str.includes('family')) {
		return LEMONSQUEEZY_VARIANTS.family[cycle];
	}
	return LEMONSQUEEZY_VARIANTS.pro[cycle];
}

// Initialize Lemon Squeezy SDK if API key is provided
if (apiKey) {
	lemonSqueezySetup({
		apiKey,
		onError: (err) => console.error('[LemonSqueezy] API Error:', err),
	});
}

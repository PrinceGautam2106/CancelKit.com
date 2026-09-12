import Stripe from 'stripe';

const stripeSecretKey =
	import.meta.env.STRIPE_SECRET_KEY ??
	(typeof process !== 'undefined' ? process.env?.STRIPE_SECRET_KEY : undefined) ??
	'';

export const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
	apiVersion: '2025-02-24.acacia' as any,
	typescript: true,
});

export const STRIPE_PRICES = {
	pro: {
		monthly:
			import.meta.env.STRIPE_PRO_MONTHLY_PRICE_ID ??
			(typeof process !== 'undefined' ? process.env?.STRIPE_PRO_MONTHLY_PRICE_ID : undefined) ??
			'price_pro_monthly_9',
		yearly:
			import.meta.env.STRIPE_PRO_YEARLY_PRICE_ID ??
			(typeof process !== 'undefined' ? process.env?.STRIPE_PRO_YEARLY_PRICE_ID : undefined) ??
			'price_pro_yearly_79',
	},
	family: {
		monthly:
			import.meta.env.STRIPE_FAMILY_MONTHLY_PRICE_ID ??
			(typeof process !== 'undefined' ? process.env?.STRIPE_FAMILY_MONTHLY_PRICE_ID : undefined) ??
			'price_family_monthly_19',
		yearly:
			import.meta.env.STRIPE_FAMILY_YEARLY_PRICE_ID ??
			(typeof process !== 'undefined' ? process.env?.STRIPE_FAMILY_YEARLY_PRICE_ID : undefined) ??
			'price_family_yearly_159',
	},
} as const;

export function getPlanFromPriceId(priceId?: string | null): 'free' | 'pro' | 'family' {
	if (!priceId) return 'free';
	if (
		priceId === STRIPE_PRICES.pro.monthly ||
		priceId === STRIPE_PRICES.pro.yearly ||
		priceId.includes('pro')
	) {
		return 'pro';
	}
	if (
		priceId === STRIPE_PRICES.family.monthly ||
		priceId === STRIPE_PRICES.family.yearly ||
		priceId.includes('family')
	) {
		return 'family';
	}
	return 'pro';
}

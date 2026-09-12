export type BlogCategory = 'cancel-guides' | 'save-money' | 'subscription-tips';

export const blogCategoryLabel: Record<BlogCategory, string> = {
	'cancel-guides': 'Cancel guides',
	'save-money': 'Save money',
	'subscription-tips': 'Subscription tips',
};

export const blogCategoryDescription: Record<BlogCategory, string> = {
	'cancel-guides': 'Direct step-by-step cancellation playbooks and refund guides for tricky services.',
	'save-money': 'Proven strategies to cut recurring waste, avoid hidden fees, and optimize your monthly burn.',
	'subscription-tips': 'Actionable checklists, audits, and discovery systems to track recurring bills.',
};

/** Posts to surface on every cancel guide for internal SEO linking. */
export const cancelGuideBlogLinks = [
	{
		slug: 'how-to-cancel-subscriptions-on-iphone',
		title: 'How to cancel subscriptions on iPhone & iPad',
	},
	{
		slug: 'how-to-stop-recurring-payments-on-credit-card',
		title: 'How to stop recurring payments on credit cards',
	},
	{
		slug: 'how-to-get-refund-for-subscription',
		title: 'How to get a refund for an accidental charge',
	},
	{
		slug: 'how-to-find-all-your-subscriptions',
		title: 'How to find all your subscriptions',
	},
	{
		slug: 'best-apps-to-cancel-subscriptions-2026',
		title: 'Best apps to cancel subscriptions in 2026',
	},
] as const;

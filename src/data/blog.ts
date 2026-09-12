export type BlogCategory = 'cancel-guides' | 'save-money' | 'subscription-tips';

export const blogCategoryLabel: Record<BlogCategory, string> = {
	'cancel-guides': 'Cancel guides',
	'save-money': 'Save money',
	'subscription-tips': 'Subscription tips',
};

/** Posts to surface on every cancel guide for internal SEO linking. */
export const cancelGuideBlogLinks = [
	{
		slug: 'how-to-find-all-your-subscriptions',
		title: 'How to find all your subscriptions',
	},
	{
		slug: 'cancel-subscriptions-save-money',
		title: 'Cancel subscriptions and save money',
	},
	{
		slug: 'free-trials-that-became-paid-what-to-do',
		title: 'Free trial charged you — what to do',
	},
	{
		slug: 'best-subscription-tracker-2026',
		title: 'Best subscription tracker 2026',
	},
] as const;

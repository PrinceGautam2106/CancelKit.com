export type TestimonialPlan = 'Free' | 'Pro' | 'Family';

export interface Testimonial {
	name: string;
	location: string;
	avatar: string;
	savedAmount: number;
	subscriptionsCancelled: number;
	quote: string;
	plan: TestimonialPlan;
	date: string;
}

export const testimonials: Testimonial[] = [
	{
		name: 'Sarah K.',
		location: 'Austin, TX',
		avatar: 'S',
		savedAmount: 187,
		subscriptionsCancelled: 6,
		quote:
			'Found 6 subscriptions I completely forgot about. Cancelled them all in 10 minutes. Saved $187/month.',
		plan: 'Pro',
		date: '2026-08',
	},
	{
		name: 'Marcus T.',
		location: 'Chicago, IL',
		avatar: 'M',
		savedAmount: 142,
		subscriptionsCancelled: 5,
		quote:
			'I thought I only had Netflix and Spotify. CancelKit found a gym membership I stopped going to in 2024. Instant win.',
		plan: 'Pro',
		date: '2026-07',
	},
	{
		name: 'Priya N.',
		location: 'Seattle, WA',
		avatar: 'P',
		savedAmount: 96,
		subscriptionsCancelled: 4,
		quote:
			'Clean, fast, and actually respectful of my inbox. Read-only access made me comfortable enough to connect Gmail.',
		plan: 'Free',
		date: '2026-08',
	},
	{
		name: 'James R.',
		location: 'Denver, CO',
		avatar: 'J',
		savedAmount: 231,
		subscriptionsCancelled: 8,
		quote:
			'Eight forgotten charges. Adobe alone was $60. Cancelled half before lunch and my paycheck finally feels bigger.',
		plan: 'Pro',
		date: '2026-06',
	},
	{
		name: 'Elena V.',
		location: 'Miami, FL',
		avatar: 'E',
		savedAmount: 118,
		subscriptionsCancelled: 5,
		quote:
			'The renewal alerts alone are worth it. I almost got hit by another free trial converting to paid. Not anymore.',
		plan: 'Pro',
		date: '2026-09',
	},
	{
		name: 'David L.',
		location: 'Brooklyn, NY',
		avatar: 'D',
		savedAmount: 204,
		subscriptionsCancelled: 7,
		quote:
			'Between streaming stacks and cloud storage I was bleeding money. CancelKit showed the damage in one red number.',
		plan: 'Family',
		date: '2026-07',
	},
	{
		name: 'Aisha B.',
		location: 'Atlanta, GA',
		avatar: 'A',
		savedAmount: 79,
		subscriptionsCancelled: 3,
		quote:
			'Not a huge list — but three things I never used. Took two minutes. Wish I had done this a year ago.',
		plan: 'Free',
		date: '2026-08',
	},
	{
		name: 'Chris W.',
		location: 'Portland, OR',
		avatar: 'C',
		savedAmount: 165,
		subscriptionsCancelled: 6,
		quote:
			'Connected Outlook, watched the scan, cancelled what I didn’t need. No sales call, no guilt trip. Just savings.',
		plan: 'Pro',
		date: '2026-05',
	},
	{
		name: 'Nina P.',
		location: 'Phoenix, AZ',
		avatar: 'N',
		savedAmount: 153,
		subscriptionsCancelled: 5,
		quote:
			'My partner and I compared dashboards. Combined we cut over $300/month. Family plan paid for itself instantly.',
		plan: 'Family',
		date: '2026-08',
	},
	{
		name: 'Omar H.',
		location: 'Dallas, TX',
		avatar: 'O',
		savedAmount: 211,
		subscriptionsCancelled: 9,
		quote:
			'Nine subscriptions. Nine. I work in tech and somehow still got blindsided. This tool is embarrassingly useful.',
		plan: 'Pro',
		date: '2026-06',
	},
	{
		name: 'Lauren M.',
		location: 'Boston, MA',
		avatar: 'L',
		savedAmount: 88,
		subscriptionsCancelled: 4,
		quote:
			'Started on free with the top 5 preview. Upgraded the same day once I saw how much was still hidden.',
		plan: 'Pro',
		date: '2026-09',
	},
	{
		name: 'Kevin S.',
		location: 'San Diego, CA',
		avatar: 'K',
		savedAmount: 129,
		subscriptionsCancelled: 5,
		quote:
			'Cancelled meal kits I never cooked and a VPN I forgot existed. CancelKit made the boring money stuff actually satisfying.',
		plan: 'Pro',
		date: '2026-07',
	},
];

/** Sum of monthly savings claimed in published testimonials */
export function testimonialsMonthlySaved(): number {
	return testimonials.reduce((sum, t) => sum + t.savedAmount, 0);
}

export function testimonialsCancelledCount(): number {
	return testimonials.reduce((sum, t) => sum + t.subscriptionsCancelled, 0);
}

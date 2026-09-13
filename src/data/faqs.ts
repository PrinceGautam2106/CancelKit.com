/**
 * Homepage FAQ — single source for visible accordion + FAQPage JSON-LD.
 * Keep answers factual: email read-only scan (no bank/Plaid claims unless shipped).
 */

export type FaqItem = {
	question: string;
	/** Plain text for schema (no HTML) */
	answer: string;
	/** Optional HTML paragraphs for the visible UI (trusted static content) */
	answerHtml: string;
};

export const homepageFaqs: FaqItem[] = [
	{
		question: 'What is CancelKits and how does it work?',
		answer:
			'CancelKits is a subscription cancellation tool that finds recurring charges from your email receipts and helps you cancel unwanted subscriptions. Connect Gmail or Outlook with secure read-only access, and CancelKits scans for subscription receipts in under 60 seconds. You see a dashboard of what you are paying for — then cancel supported services or follow a step-by-step cancel guide.',
		answerHtml: `
			<p>CancelKits is a subscription cancellation tool that finds recurring charges from your email receipts and helps you cancel unwanted subscriptions in one place.</p>
			<p>Connect Gmail or Outlook with secure <strong>read-only</strong> access. CancelKits scans for subscription receipts in under 60 seconds, then shows a dashboard of what you are paying for — with cancel tools and verified guides for 50+ services.</p>
		`,
	},
	{
		question: 'How does CancelKits find my subscriptions?',
		answer:
			'CancelKits connects to your Gmail or Outlook inbox using read-only OAuth access and scans for subscription receipts, renewal notices, and recurring payment confirmations. The scan takes under 60 seconds and surfaces active subscriptions with monthly cost and next renewal timing where available.',
		answerHtml: `
			<p>CancelKits connects to Gmail or Outlook with read-only OAuth and scans for subscription receipts, renewal notices, and payment confirmations.</p>
			<p>The scan completes in under 60 seconds and shows subscriptions with monthly cost and renewal timing — so you know what you are dealing with before you cancel.</p>
		`,
	},
	{
		question: 'Can CancelKits actually cancel subscriptions on my behalf?',
		answer:
			'For many major services, CancelKits helps you cancel from the dashboard. Supported services include popular streaming, software, fitness, and news subscriptions. For harder providers like some gym memberships, CancelKits provides verified step-by-step cancel guides so you can finish without guessing through dark patterns or phone trees.',
		answerHtml: `
			<p>For many major services, CancelKits helps you cancel from the dashboard — including popular streaming, software, fitness, and news subscriptions.</p>
			<p>For harder providers like some gyms, CancelKits provides verified <a href="/cancel" class="faq-inline-link">step-by-step cancel guides</a> so you are not stuck in dark patterns or hold music.</p>
		`,
	},
	{
		question: 'Is CancelKits safe? What access does it need?',
		answer:
			'CancelKits uses read-only email access. It can see subscription receipts but cannot send emails, delete messages, or change anything in your inbox. You can disconnect accounts or delete your data anytime from Account Settings.',
		answerHtml: `
			<p>CancelKits uses <strong>read-only</strong> email access only. It can see subscription receipts — it cannot send emails, delete messages, or change your inbox.</p>
			<p>You can disconnect accounts or permanently delete your data anytime from Account Settings.</p>
		`,
	},
	{
		question: 'How much does CancelKits cost?',
		answer:
			'CancelKits is free to start with no credit card required. The free plan lets you scan and use cancel guides. CancelKits Pro is $9 per month or $79 per year and unlocks unlimited scanning, one-click cancellation tools, renewal alerts, and savings tracking. Pro includes a 7-day free trial.',
		answerHtml: `
			<p>CancelKits is free to start — no credit card required. Scan your inbox and use cancel guides on the free plan.</p>
			<p>CancelKits Pro is <strong>$9/month</strong> or <strong>$79/year</strong> (save 27%) with unlimited scanning, one-click cancel tools, renewal alerts, and savings tracking. <a href="/pricing" class="faq-inline-link">See pricing →</a></p>
		`,
	},
	{
		question: 'How is CancelKits different from Rocket Money or other subscription apps?',
		answer:
			'Many subscription apps only remind you to cancel or take a cut of negotiated savings. Rocket Money is often associated with concierge-style bill negotiation and percentage-based fees. CancelKits focuses on finding forgotten subscriptions from email receipts, flat Pro pricing at $9/month with no cut of your savings, web access without a required app download, and 50+ service-specific cancel guides.',
		answerHtml: `
			<p>Many apps only remind you to cancel — or take a percentage of negotiated savings. CancelKits focuses on finding forgotten subscriptions from email receipts and helping you cancel them.</p>
			<p>Pro is a flat <strong>$9/month</strong> with no cut of your savings, works on the web, and includes 50+ service-specific cancel guides. <a href="/blog/best-apps-to-cancel-subscriptions-2026" class="faq-inline-link">Compare options →</a></p>
		`,
	},
	{
		question: 'What subscriptions can CancelKits cancel?',
		answer:
			'CancelKits covers 50+ services across streaming (Netflix, Hulu, Disney+, Max, Amazon Prime), music (Spotify, Apple Music), software (Adobe, Microsoft 365, Canva Pro, Dropbox), fitness and wellness (Peloton, Headspace, Calm), and news or reading (NYT, Audible, Kindle Unlimited), with new guides added regularly.',
		answerHtml: `
			<p>CancelKits covers 50+ services across major categories:</p>
			<ul>
				<li><strong>Streaming:</strong> Netflix, Hulu, Disney+, Max, Amazon Prime, Apple TV+, Peacock, Paramount+</li>
				<li><strong>Music:</strong> Spotify, Apple Music, YouTube Music</li>
				<li><strong>Software:</strong> Adobe Creative Cloud, Microsoft 365, Canva Pro, Dropbox, Google One</li>
				<li><strong>Fitness:</strong> Peloton, Headspace, Calm, Duolingo</li>
				<li><strong>News:</strong> New York Times, Audible, Kindle Unlimited</li>
			</ul>
			<p><a href="/cancel" class="faq-inline-link">See the full cancel guides hub →</a></p>
		`,
	},
	{
		question: 'Will I still have access after I cancel a subscription through CancelKits?',
		answer:
			'Usually yes until the end of the current billing period. If you cancel mid-cycle, most services keep access until the next renewal date and then stop charging. CancelKits aims to confirm timing so you know when access ends.',
		answerHtml: `
			<p>Usually yes until the end of your current billing period. Cancel mid-cycle and most services keep access until the next renewal date — then stop charging.</p>
			<p>CancelKits confirms timing so you know when access ends and when the next charge should stop.</p>
		`,
	},
	{
		question: 'Can I get a refund after cancelling a subscription?',
		answer:
			'Refund eligibility depends on each provider. CancelKits cancel guides include refund notes where relevant. Some providers offer prorated or goodwill refunds; others do not. Free trials that converted to paid are a common refund request path.',
		answerHtml: `
			<p>Refunds depend on each provider. Each CancelKits <a href="/cancel" class="faq-inline-link">cancel guide</a> includes refund notes where relevant.</p>
			<p>Some providers offer prorated or goodwill refunds; others do not. Free trials that converted to paid are a common place to request a refund. See also <a href="/blog/how-to-get-refund-for-subscription" class="faq-inline-link">how to get a subscription refund</a>.</p>
		`,
	},
	{
		question: 'Does CancelKits work on mobile?',
		answer:
			'Yes. CancelKits is a responsive web app that works in mobile and desktop browsers with no required app store download. You can scan, review subscriptions, and follow cancel flows from your phone.',
		answerHtml: `
			<p>Yes. CancelKits is fully responsive in mobile and desktop browsers — no app store download required.</p>
			<p>Scan, review subscriptions, and follow cancel flows from your phone or laptop.</p>
		`,
	},
	{
		question: 'What happens to my data if I delete my CancelKits account?',
		answer:
			'When you delete your CancelKits account from Account Settings, your personal data and connected email access are removed in line with GDPR and CCPA rights. You can request deletion anytime with no phone call required.',
		answerHtml: `
			<p>Delete your account from Account Settings and CancelKits removes your personal data and connected email access in line with GDPR and CCPA.</p>
			<p>No phone call required — request deletion anytime from the danger zone in your account.</p>
		`,
	},
	{
		question: 'How do I cancel my CancelKits Pro subscription?',
		answer:
			'Cancel CancelKits Pro anytime from Account Settings. There is no cancellation fee. Access continues through the end of the current billing period, then you move to the free plan. Pro includes a 7-day money-back guarantee.',
		answerHtml: `
			<p>Go to <strong>Account Settings → Cancel my CancelKits subscription</strong>. One click. No phone call, no cancellation fee.</p>
			<p>Pro access continues until the end of the billing period, then you move to free. CancelKits offers a 7-day money-back guarantee on Pro.</p>
		`,
	},
];

export function buildFaqPageSchema(faqs: FaqItem[] = homepageFaqs) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer,
			},
		})),
	};
}

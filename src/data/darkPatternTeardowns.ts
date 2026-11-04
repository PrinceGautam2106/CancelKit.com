import type { Service, CancelDifficulty } from './services';

export interface RetentionScreen {
	screenNumber: number;
	name: string;
	tactic: string;
	counterAction: string;
}

export interface DowngradeLoophole {
	title: string;
	summary: string;
	steps: string[];
}

export interface DarkPatternTeardown {
	difficultyRating: CancelDifficulty;
	difficultyBadge: string;
	timeToCancel: string;
	refundEligibility: string;
	hiddenTraps: string[];
	retentionScreensCount: number;
	retentionScreens: RetentionScreen[];
	directBillingUrl: string;
	directBillingUrlLabel: string;
	downgradeLoophole: DowngradeLoophole;
}

// ─────────────────────────────────────────────────────────────────────────────
// Detailed Manual Teardowns for High-Traffic Services
// ─────────────────────────────────────────────────────────────────────────────
const DETAILED_TEARDOWNS: Record<string, Partial<DarkPatternTeardown>> = {
	adobe: {
		difficultyRating: 'nightmare',
		difficultyBadge: '🔴 Nightmare (50% Contract Penalty & Retention Maze)',
		timeToCancel: '15–25 minutes',
		refundEligibility: '100% refund within first 14 days of any new plan. 50% early termination fee on remaining annual contract if cancelled thereafter.',
		hiddenTraps: [
			'Annual contracts disguised as monthly plans: $59.99/mo is actually a 1-year binding contract ($719.88/yr) with a 50% early termination penalty.',
			'Mandatory cloud storage purge: Any files exceeding 2GB free storage are permanently deleted 30 days after cancellation.',
			'Phone hotline retention maze: Some corporate and student plans disable web cancellation entirely and require calling during US business hours.',
		],
		retentionScreensCount: 4,
		retentionScreens: [
			{
				screenNumber: 1,
				name: 'Asset & Cloud Storage Forfeit Warning',
				tactic: 'Shows alarming red dialog warning that you will lose cloud documents, Typekit fonts, and version history.',
				counterAction: 'Export your projects locally to your hard drive, then click "Continue".',
			},
			{
				screenNumber: 2,
				name: 'The Retention Bribe',
				tactic: 'Offers 3 free months or a permanent 50% rate cut to prevent cancellation.',
				counterAction: 'If you want out completely, decline the offer. (Or accept if you want 3 months free).',
			},
			{
				screenNumber: 3,
				name: 'Early Termination Fee Invoice',
				tactic: 'Presents an intimidating bill (often $150–$300) for "50% of remaining contract obligations".',
				counterAction: 'Do NOT pay this! Use the Plan-Switch loophole detailed below before confirming.',
			},
			{
				screenNumber: 4,
				name: 'Final Confirmation & Feedback Trap',
				tactic: 'Demands an exit reason with the "Cancel" button styled in low-contrast grey.',
				counterAction: 'Select "Too expensive" and click the final confirm button to lock in your cancellation.',
			},
		],
		directBillingUrl: 'https://account.adobe.com/plans',
		directBillingUrlLabel: 'account.adobe.com/plans (Direct Plans Sub-Menu)',
		downgradeLoophole: {
			title: 'The 14-Day Plan-Switch Loophole (Bypass Early Termination Fee)',
			summary: 'Under consumer protection regulations, switching to any new Adobe plan initiates a brand new contract with a mandatory 14-day statutory cooling-off window. Cancel the new plan 24 hours later for a 100% refund with $0 early termination penalty.',
			steps: [
				'Open account.adobe.com/plans and click "Manage Plan".',
				'Select "Change Plan" (do NOT click "Cancel" yet).',
				'Choose the cheapest available plan (e.g., Photography 20GB or InCopy at ~$9.99/mo).',
				'Confirm the plan switch. Adobe immediately credits your previous plan and starts a fresh 14-day trial period.',
				'Wait 20–30 minutes for billing systems to settle, then click "Cancel Plan" on the new subscription.',
				'Adobe triggers the automatic 14-day statutory refund: $0 early termination fee and 100% refund of the switched plan charge.',
			],
		},
	},

	'planet-fitness': {
		difficultyRating: 'hard',
		difficultyBadge: '🔴 Hard (Certified Mail or In-Person Only)',
		timeToCancel: '10–15 minutes (+ 3–5 days postal transit)',
		refundEligibility: 'Strictly non-refundable. Notice must be received by the 10th of the month to stop the next month dues, and by the 25th of the month prior to the $49 annual maintenance fee.',
		hiddenTraps: [
			'Web & App cancellation is completely disabled: There is zero self-service cancellation button online or in the app.',
			'Phone cancellation is strictly rejected: Front desk staff are contractually prohibited from cancelling over the phone.',
			'The $49 annual fee ambush: The annual fee bills separately from monthly dues and cannot be waived if cancelled past the 25th.',
		],
		retentionScreensCount: 3,
		retentionScreens: [
			{
				screenNumber: 1,
				name: 'Online Account Roadblock',
				tactic: 'Member portal displays billing history and barcode but hides any online cancellation mechanism.',
				counterAction: 'Log in only to record your Member ID and home club address for your certified notice.',
			},
			{
				screenNumber: 2,
				name: 'In-Person Retention Confrontation',
				tactic: 'Front desk staff present a freeze form or demand reasons why you are leaving.',
				counterAction: 'Firmly insist on signing the standard physical cancellation form and demand a signed copy.',
			},
			{
				screenNumber: 3,
				name: 'Manager Absence Delay',
				tactic: 'Staff often claim "only the general manager can process cancellations and they are not in today".',
				counterAction: 'Do not leave empty-handed: Send our legally compliant USPS Certified Mail letter with Return Receipt.',
			},
		],
		directBillingUrl: 'https://www.planetfitness.com/login',
		directBillingUrlLabel: 'planetfitness.com/login (Member ID Lookup)',
		downgradeLoophole: {
			title: 'USPS Certified Mail Revocation (Skip In-Person Visits)',
			summary: 'Under Federal EFTA regulations (12 CFR § 1005.10(c)), consumers possess the statutory right to revoke preauthorized electronic recurring debits via written notice. Certified mail with return receipt legally obligates them to stop billing upon postal delivery.',
			steps: [
				'Use our free Gym Certified Mail Generator (/gym-cancellation-letter) to auto-fill your Member ID and club address.',
				'Print the 1-page formal notice citing EFTA 12 CFR § 1005.10(c).',
				'Send via USPS Certified Mail with Return Receipt (costs ~$4.50 at any post office).',
				'Track delivery on usps.com. The green card signature serves as airtight legal proof for credit card dispute if charged again.',
			],
		},
	},

	audible: {
		difficultyRating: 'medium',
		difficultyBadge: '🟡 Medium (4 Retention Screens & Credit Forfeiture Trap)',
		timeToCancel: '4–6 minutes',
		refundEligibility: 'Prorated refund available via customer support chat within 48 hours of an accidental renewal. Standard web cancel provides access through end of cycle.',
		hiddenTraps: [
			'Instant credit forfeiture: Any banked Audible credits you already paid for disappear the second cancellation is finalized.',
			'The pause subscription illusion: Audible pushes a 3-month pause that silently auto-resumes full $14.95/mo billing without reminder.',
			'App Store billing conflict: Subscriptions purchased via Apple iOS must be cancelled in Apple ID Settings, not Audible.com.',
		],
		retentionScreensCount: 4,
		retentionScreens: [
			{
				screenNumber: 1,
				name: 'Credit Forfeiture Threat',
				tactic: 'Displays a prominent warning: "You have X unused credits that will be lost forever if you cancel today."',
				counterAction: 'Pause here: Open the store in a new tab, spend every single credit on audiobooks, then return to proceed.',
			},
			{
				screenNumber: 2,
				name: 'The 3-Month Pause Lure',
				tactic: 'Offers to "Pause your membership for up to 90 days at $0/month while keeping your credits active".',
				counterAction: 'Unless you genuinely plan to return, decline the pause—it auto-charges once 90 days elapse.',
			},
			{
				screenNumber: 3,
				name: '50% Discount Retention Bribe',
				tactic: 'Offers 3 months of Audible at $7.49/month (50% off standard rate).',
				counterAction: 'If you want cheap audiobooks, accept. If you want to stop all charges, click "Continue Cancelling".',
			},
			{
				screenNumber: 4,
				name: 'Exit Survey & Low-Contrast Confirm Button',
				tactic: 'Forces you to select a radio reason; the final "Finish Cancelling" button is styled in subdued grey.',
				counterAction: 'Select "Too expensive" and click the subdued "Finish Cancelling" button.',
			},
		],
		directBillingUrl: 'https://www.audible.com/account/overview',
		directBillingUrlLabel: 'audible.com/account/overview (Direct Membership Sub-Menu)',
		downgradeLoophole: {
			title: 'The Pre-Cancellation Credit Burn (Keep Your Audiobooks Forever)',
			summary: 'Unlike Netflix or Spotify, any audiobook purchased with an Audible credit remains in your Amazon/Audible library permanently, even on a completely cancelled account. Never cancel with an active credit balance.',
			steps: [
				'Check your credit balance in the top right corner.',
				'Spend all credits on high-value audiobooks (e.g. box sets or titles priced above $25).',
				'Pre-order unreleased audiobooks if you cannot find current titles (credits are redeemed immediately).',
				'Once your balance reads 0 credits, proceed with the cancellation flow.',
				'You can re-listen to your entire library indefinitely via the free Audible app.',
			],
		},
	},

	netflix: {
		difficultyRating: 'easy',
		difficultyBadge: '🟢 Easy (Online 2-Click Cancellation)',
		timeToCancel: '2 minutes',
		refundEligibility: 'Strictly no partial-month refunds. Streaming access remains active until the final day of your monthly billing cycle.',
		hiddenTraps: [
			'10-Month Instant Reactivation trap: Profiles and viewing preferences are retained for 10 months. Anyone with saved credentials can re-activate the subscription with a single button press on a smart TV.',
			'T-Mobile / Cable bundle dependency: If billed via third-party telecom, cancelling on Netflix.com will redirect to carrier portal.',
		],
		retentionScreensCount: 2,
		retentionScreens: [
			{
				screenNumber: 1,
				name: 'Downgrade to Standard with Ads',
				tactic: 'Prompts to switch to the $6.99/mo ad-supported plan instead of cancelling.',
				counterAction: 'Click "Finish Cancellation" to reject the ad-tier downgrade.',
			},
			{
				screenNumber: 2,
				name: 'Cancellation Confirmation & Access Window',
				tactic: 'Confirms cancellation and displays final viewing date.',
				counterAction: 'Verify confirmation email received in your inbox.',
			},
		],
		directBillingUrl: 'https://www.netflix.com/cancelplan',
		directBillingUrlLabel: 'netflix.com/cancelplan (Direct 1-Click Cancel Page)',
		downgradeLoophole: {
			title: 'Day-2 Cancellation Strategy (Service Hopping)',
			summary: 'Netflix provides full access through the end of your billing cycle regardless of when you cancel. By cancelling 24 hours after billing, you ensure you never accidentally pay for an unneeded month.',
			steps: [
				'Check your monthly billing date under Account.',
				'Wait until 1 day after your card is charged.',
				'Navigate straight to netflix.com/cancelplan and click "Finish Cancellation".',
				'You get 29 remaining days of uninterrupted 4K streaming with zero risk of next month auto-renewing.',
			],
		},
	},

	'amazon-prime': {
		difficultyRating: 'medium',
		difficultyBadge: '🟡 Medium (3-Step Amazon Roach Motel Flow)',
		timeToCancel: '5–8 minutes',
		refundEligibility: 'Automatic 100% full refund if you have not used any Prime shipping or Prime Video benefits during the current billing period.',
		hiddenTraps: [
			'Confusing button colors: Amazon styles "Remind Me Later" and "Keep My Benefits" in bright yellow/amber, while the actual cancellation button is plain text or grey.',
			'Multiple confirmation screens: You must click "End Membership" on three consecutive pages before cancellation takes effect.',
			'Secondary Prime Video channels: Cancelling Prime does NOT automatically cancel Paramount+, Starz, or BritBox channels attached to your account.',
		],
		retentionScreensCount: 3,
		retentionScreens: [
			{
				screenNumber: 1,
				name: 'Shipping Benefits Guilt Screen',
				tactic: 'Displays a calculation of how much money you allegedly saved on two-day delivery over the last 12 months.',
				counterAction: 'Scroll past the savings infographic and click "I Do Not Want My Benefits".',
			},
			{
				screenNumber: 2,
				name: 'Switch to Annual / Pause Pitch',
				tactic: 'Offers to switch to annual billing to "save $30/yr" or pause membership temporarily.',
				counterAction: 'Click "Continue to Cancel" (styled in low-contrast grey).',
			},
			{
				screenNumber: 3,
				name: 'Final Amber Button Trick',
				tactic: 'Offers "Remind me 3 days before renewal" in bright amber. The actual "End Now" button is adjacent.',
				counterAction: 'Click "End on [Date]" or "Cancel Now" to finalize.',
			},
		],
		directBillingUrl: 'https://www.amazon.com/mc/manage',
		directBillingUrlLabel: 'amazon.com/mc/manage (Direct Prime Management Sub-Menu)',
		downgradeLoophole: {
			title: 'Unused Benefits Full Refund Trigger',
			summary: 'If Prime auto-renewed unexpectedly and you have not used Prime free delivery or streamed Prime Video since the billing date, Amazon\'s automated billing system automatically grants a 100% full refund.',
			steps: [
				'Do NOT stream any video or place an order after the renewal charge hits your card.',
				'Navigate directly to amazon.com/mc/manage.',
				'Click "End Membership" through the 3 confirmation screens.',
				'Select "End Now". The system automatically calculates $0 usage and issues an immediate 100% card refund.',
			],
		},
	},

	spotify: {
		difficultyRating: 'medium',
		difficultyBadge: '🟡 Medium (Mobile App Blocked / Web Only)',
		timeToCancel: '3–5 minutes',
		refundEligibility: '14-day statutory cooling-off refund in EU/UK. In the US, non-refundable via web, but customer support chat will refund if requested within 24 hours of renewal.',
		hiddenTraps: [
			'Blocked inside mobile app: You cannot cancel Spotify Premium inside the iOS or Android app. Spotify hides all cancellation buttons on mobile devices.',
			'Duo & Family plan host trap: If the plan manager cancels, all members lose Premium access and offline downloads simultaneously.',
		],
		retentionScreensCount: 3,
		retentionScreens: [
			{
				screenNumber: 1,
				name: 'Offline Music Loss Warning',
				tactic: 'Alerts that all downloaded offline songs will be deleted from your device.',
				counterAction: 'Your playlists and saved library remain safe forever on the free tier. Click "Continue to cancel".',
			},
			{
				screenNumber: 2,
				name: 'Student & Duo Discount Upsell',
				tactic: 'Pitches switching to a discounted $5.99 Student or $14.99 Duo plan.',
				counterAction: 'Click "Continue to cancel" at the bottom of the page.',
			},
			{
				screenNumber: 3,
				name: 'Confirmation Survey',
				tactic: 'Requires an exit reason radio selection before activating final cancel button.',
				counterAction: 'Select any reason and click "Cancel Premium". Check for confirmation banner.',
			},
		],
		directBillingUrl: 'https://www.spotify.com/account/overview/',
		directBillingUrlLabel: 'spotify.com/account/overview (Direct Web Account Portal)',
		downgradeLoophole: {
			title: 'Playlist Preservation & Free Tier Transition',
			summary: 'Cancelling Spotify Premium does NOT delete your playlists, liked tracks, or algorithmic recommendations. It simply reverts your account to Spotify Free with ads.',
			steps: [
				'Open spotify.com/account/overview in a web browser (not the app).',
				'Under "Your plan", click "Change plan".',
				'Scroll to "Cancel Spotify" and click "Cancel Premium".',
				'All your playlists remain intact permanently and can be exported to Apple Music or Tidal using free web tools.',
			],
		},
	},

	'chatgpt-plus': {
		difficultyRating: 'easy',
		difficultyBadge: '🟢 Easy (Direct Stripe Portal)',
		timeToCancel: '2 minutes',
		refundEligibility: 'Non-refundable for partial months. EU/UK users eligible for full refund within 14 days of purchase via OpenAI support.',
		hiddenTraps: [
			'Apple In-App Purchase trap: If you upgraded via the ChatGPT iOS app, cancelling on chatgpt.com will NOT cancel your subscription. You must cancel in Apple ID subscriptions.',
			'Team workspace auto-renewal: If you have an OpenAI Team workspace, it bills separately per seat from your personal Plus subscription.',
		],
		retentionScreensCount: 2,
		retentionScreens: [
			{
				screenNumber: 1,
				name: 'GPT-4o Limit Warning',
				tactic: 'Warns that your account will drop back to standard GPT-4o mini rate limits and lose DALL-E 3 priority.',
				counterAction: 'Click "Cancel Subscription" to proceed to the Stripe customer portal.',
			},
			{
				screenNumber: 2,
				name: 'Stripe Billing Portal Confirmation',
				tactic: 'Stripe customer portal prompts "Are you sure you want to cancel your plan?".',
				counterAction: 'Click "Cancel plan". Access remains active until the end of your prepaid month.',
			},
		],
		directBillingUrl: 'https://chatgpt.com/#settings/Account',
		directBillingUrlLabel: 'chatgpt.com/#settings/Account (Direct Settings Modal)',
		downgradeLoophole: {
			title: 'Pre-Paid 30-Day Retention Hack',
			summary: 'OpenAI never cuts off Plus access early upon cancellation. If you cancel 5 minutes after paying $20, you retain all GPT-4o and advanced voice features for the full 30 days without worrying about surprise renewal.',
			steps: [
				'Immediately after your monthly $20 payment processes, go to chatgpt.com/#settings/Account.',
				'Click "Manage Subscription" → "Cancel Plan".',
				'Your account shows "Cancels on [Date]". You get full Plus access for 30 days with zero renewal risk.',
			],
		},
	},

	'la-fitness': {
		difficultyRating: 'hard',
		difficultyBadge: '🔴 Hard (Physical Form or Certified Mail Only)',
		timeToCancel: '15–20 minutes (+ 3–5 days postal transit)',
		refundEligibility: 'Non-refundable. Requires a minimum 5 business days advance written notice before your scheduled billing date.',
		hiddenTraps: [
			'Operations Manager hours restriction: Front desk staff will claim cancellations can only be processed in-person between 9 AM and 5 PM on weekdays.',
			'No online cancel button: Online portal only lets you print a cancellation form to deliver in person or by mail.',
			'Initiation & annual fee non-refundable: Any paid annual maintenance fees ($49–$59) are forfeited upon cancellation.',
		],
		retentionScreensCount: 3,
		retentionScreens: [
			{
				screenNumber: 1,
				name: 'Portal Form Generation Roadblock',
				tactic: 'Account portal provides a printable form rather than an online cancellation button.',
				counterAction: 'Print the pre-filled form directly or use our certified mail letter generator.',
			},
			{
				screenNumber: 2,
				name: 'In-Person Retention Pitch',
				tactic: 'Manager offers a $10/mo VIP freeze or guest pass bundle to stop cancellation.',
				counterAction: 'Decline all freeze options (they automatically unfreeze into full billing after 90 days).',
			},
			{
				screenNumber: 3,
				name: 'Receipt Withholding',
				tactic: 'Staff often promise "it is taken care of" without providing written receipt.',
				counterAction: 'Demand a stamped, signed copy of the cancellation form before leaving the facility.',
			},
		],
		directBillingUrl: 'https://www.lafitness.com/Pages/login.aspx',
		directBillingUrlLabel: 'lafitness.com/Pages/login.aspx (Account Information & Form Portal)',
		downgradeLoophole: {
			title: 'The Pre-Populated Web Form Shortcut',
			summary: 'Avoid in-person sales pitches by logging into the member portal, downloading the pre-populated PDF cancellation form with your barcode, and mailing it via USPS Certified Mail.',
			steps: [
				'Sign in at lafitness.com/Pages/login.aspx.',
				'Click "Account Information" and select the "Cancellation Form" tab on the right side.',
				'Print the pre-populated form containing your exact barcode and club number.',
				'Sign and date the form. Mail it via USPS Certified Mail with Return Receipt to: LA Fitness, PO Box 54170, Irvine, CA 92619.',
			],
		},
	},

	hulu: {
		difficultyRating: 'medium',
		difficultyBadge: '🟡 Medium (3 Retention Screens & Pause Trap)',
		timeToCancel: '3–5 minutes',
		refundEligibility: 'No partial-month refunds. Streaming access remains active until the end of the current billing cycle.',
		hiddenTraps: [
			'The 12-week pause trap: Hulu heavily promotes a "Pause subscription for up to 12 weeks" option. If selected, billing resumes automatically on week 13 with zero notification.',
			'Disney bundle lock-in: If billed through Disney+ or Spotify Student, cancelling on Hulu.com is disabled.',
		],
		retentionScreensCount: 3,
		retentionScreens: [
			{
				screenNumber: 1,
				name: 'Pause Subscription Banner',
				tactic: 'Prominently features "Pause your subscription instead" with a bright button.',
				counterAction: 'Click the smaller "Continue to Cancel" link at the bottom of the card.',
			},
			{
				screenNumber: 2,
				name: '70% Retention Discount Offer',
				tactic: 'Offers Hulu for $2.99/mo for the next 6 months to prevent you from leaving.',
				counterAction: 'If you still watch Hulu occasionally, accept! This saves ~$90. If not, click "Continue".',
			},
			{
				screenNumber: 3,
				name: 'Final Survey & Confirm',
				tactic: 'Select a reason; cancel button is placed alongside an accent-colored "Keep My Plan".',
				counterAction: 'Click "Cancel Subscription". Verify confirmation email.',
			},
		],
		directBillingUrl: 'https://secure.hulu.com/account',
		directBillingUrlLabel: 'secure.hulu.com/account (Direct Account & Billing Page)',
		downgradeLoophole: {
			title: 'The $2.99/mo Retention Bribe Hack',
			summary: 'Hulu\'s cancellation flow is programmed to offer a $2.99/month promotional discount for 6 months to high-retention risk users. You can trigger this discount in 60 seconds without actually losing service.',
			steps: [
				'Open secure.hulu.com/account and scroll to "Cancel your subscription".',
				'Click "Cancel". On the pause screen, click "Continue to Cancel".',
				'When the $2.99/mo for 6 months offer appears, click "Claim Offer".',
				'Your monthly bill drops by ~75% immediately for the next half year.',
			],
		},
	},
};

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic Intelligent Fallback for all 72 services
// ─────────────────────────────────────────────────────────────────────────────
export function getTeardownForService(service: Service): DarkPatternTeardown {
	const detailed = DETAILED_TEARDOWNS[service.slug];
	if (detailed) {
		return {
			difficultyRating: detailed.difficultyRating || service.cancelDifficulty,
			difficultyBadge: detailed.difficultyBadge || getBadgeForDifficulty(service.cancelDifficulty, service.cancelMethod),
			timeToCancel: detailed.timeToCancel || service.timeToCancel,
			refundEligibility: detailed.refundEligibility || getDefaultRefundPolicy(service),
			hiddenTraps: detailed.hiddenTraps || getDefaultTraps(service),
			retentionScreensCount: detailed.retentionScreensCount || (service.willTheyOfferDiscount ? 3 : 2),
			retentionScreens: detailed.retentionScreens || getDefaultRetentionScreens(service),
			directBillingUrl: detailed.directBillingUrl || getDirectBillingUrl(service),
			directBillingUrlLabel: detailed.directBillingUrlLabel || `${service.slug}.com/account (Direct Billing Sub-Menu)`,
			downgradeLoophole: detailed.downgradeLoophole || {
				title: service.darkPatternHack ? 'Actionable Dark Pattern Bypass' : 'Billing Loophole & Cancellation Tip',
				summary: service.darkPatternHack || `Bypass ${service.name}'s retention barriers by completing the cancellation online and verifying written confirmation.`,
				steps: service.steps.length >= 2 ? service.steps.slice(0, 3) : ['Navigate to account settings', 'Confirm cancellation', 'Save receipt'],
			},
		};
	}

	// Dynamic fallback for any service in catalog
	const rating = service.cancelDifficulty;
	const badge = getBadgeForDifficulty(rating, service.cancelMethod);
	const directUrl = getDirectBillingUrl(service);

	return {
		difficultyRating: rating,
		difficultyBadge: badge,
		timeToCancel: service.timeToCancel || '5 minutes',
		refundEligibility: getDefaultRefundPolicy(service),
		hiddenTraps: getDefaultTraps(service),
		retentionScreensCount: service.willTheyOfferDiscount ? 3 : 2,
		retentionScreens: getDefaultRetentionScreens(service),
		directBillingUrl: directUrl,
		directBillingUrlLabel: `${service.name} Direct Billing Management Portal`,
		downgradeLoophole: {
			title: service.darkPatternHack ? 'Actionable Dark Pattern Bypass' : 'Billing Optimization Hack',
			summary: service.darkPatternHack || `Stop recurring renewals on ${service.name} by following our verified cancellation sequence and saving your confirmation receipt.`,
			steps: service.steps.length > 0 ? service.steps : [
				`Log into the official ${service.name} account dashboard`,
				'Navigate to the hidden billing or subscription management sub-menu',
				'Decline promotional pause or retention offers and confirm cancellation',
			],
		},
	};
}

function getBadgeForDifficulty(diff: CancelDifficulty, method: string): string {
	if (diff === 'nightmare') return '🔴 Nightmare (Multi-Barrier / Hidden Retention Traps)';
	if (diff === 'hard') {
		if (method === 'phone') return '🔴 Hard (Phone Call Required During Business Hours)';
		if (method === 'in-person') return '🔴 Hard (In-Person or Certified Mail Only)';
		return '🔴 Hard (Complex Multi-Step Cancellation Maze)';
	}
	if (diff === 'medium') return '🟡 Medium (3–4 Retention Screens & Discount Bribes)';
	return '🟢 Easy (Direct 1–2 Click Online Self-Service)';
}

function getDefaultRefundPolicy(service: Service): string {
	if (service.category === 'Fitness & Wellness') {
		return 'Non-refundable. Must provide written cancellation notice 10–30 days prior to the next billing cycle to prevent subsequent monthly and annual dues.';
	}
	if (service.category === 'Software & Cloud') {
		return '14-day statutory cooling-off refund for new subscriptions. Monthly plans generally non-refundable once billed; annual plans incur termination penalties if cancelled early.';
	}
	if (service.category === 'Streaming' || service.category === 'Music & Audio') {
		return 'No partial-month refunds. Service remains active with full access until the final day of your current paid billing period.';
	}
	if (service.category === 'Food & Delivery') {
		return 'Upcoming scheduled deliveries can be cancelled up to 5–6 days prior to order processing cutoff; past delivered boxes are non-refundable.';
	}
	return 'Standard policy is non-refundable for partial months; prepaid access runs through the end of the current billing cycle.';
}

function getDefaultTraps(service: Service): string[] {
	const traps: string[] = [];
	if (service.willTheyOfferDiscount) {
		traps.push(`${service.name} presents a promotional discount or subscription pause offer right before the final cancel screen to keep you on recurring billing.`);
	}
	if (service.cancelMethod === 'phone') {
		traps.push('Phone customer service reps are trained in aggressive retention scripts and will offer multiple discounts before processing cancellation.');
	} else if (service.cancelMethod === 'in-person') {
		traps.push('Online and phone cancellation are disabled; staff will attempt to convince you to pause or downgrade rather than cancel.');
	} else {
		traps.push('Mobile app stores (Apple App Store / Google Play) bill separately from web accounts; you must cancel through the original purchase channel.');
	}
	traps.push(`Billing auto-renews at full price without advance notice unless cancelled at least 24–48 hours before the renewal date.`);
	return traps;
}

function getDefaultRetentionScreens(service: Service): RetentionScreen[] {
	if (service.willTheyOfferDiscount) {
		return [
			{
				screenNumber: 1,
				name: 'Benefits Loss & Guilt Screen',
				tactic: `Highlights all ${service.name} premium features, saved data, and library items you will lose upon cancellation.`,
				counterAction: 'Acknowledge the alert and click "Continue to Cancel".',
			},
			{
				screenNumber: 2,
				name: 'The Retention Discount or Pause Bribe',
				tactic: 'Offers a reduced monthly rate (e.g. 50% off for 3 months) or an option to pause billing for 1–3 months.',
				counterAction: 'If you want out permanently, decline the offer and continue to the final confirmation.',
			},
			{
				screenNumber: 3,
				name: 'Final Cancellation Confirmation',
				tactic: 'Often styles the "Keep Subscription" button in high-contrast color while placing "Cancel" in subtle text.',
				counterAction: 'Click the final cancel button and verify the confirmation email arrives in your inbox.',
			},
		];
	}
	return [
		{
			screenNumber: 1,
			name: 'Loss Aversion Screen',
			tactic: `Shows remaining active days and reminds you that premium benefits will expire at cycle end.`,
			counterAction: 'Click "Continue to cancellation".',
		},
		{
			screenNumber: 2,
			name: 'Final Confirmation Screen',
			tactic: 'Prompts for a cancellation reason survey before activating the confirmation button.',
			counterAction: 'Select any reason and submit to finalize your cancellation.',
		},
	];
}

function getDirectBillingUrl(service: Service): string {
	const slug = service.slug;
	const directMap: Record<string, string> = {
		netflix: 'https://www.netflix.com/cancelplan',
		spotify: 'https://www.spotify.com/account/overview/',
		adobe: 'https://account.adobe.com/plans',
		'planet-fitness': 'https://www.planetfitness.com/login',
		'amazon-prime': 'https://www.amazon.com/mc/manage',
		audible: 'https://www.audible.com/account/overview',
		hulu: 'https://secure.hulu.com/account',
		'disney-plus': 'https://www.disneyplus.com/account',
		'hbo-max': 'https://auth.max.com/account',
		'youtube-premium': 'https://www.youtube.com/paid_memberships',
		'chatgpt-plus': 'https://chatgpt.com/#settings/Account',
		'apple-one': 'https://support.apple.com/billing',
		'apple-music': 'https://music.apple.com/account/settings',
		'apple-tv-plus': 'https://tv.apple.com/account/settings',
		canva: 'https://www.canva.com/settings/billing-and-plans',
		'canva-pro': 'https://www.canva.com/settings/billing-and-plans',
		dropbox: 'https://www.dropbox.com/account/plan',
		'microsoft-365': 'https://account.microsoft.com/services',
		'nordvpn': 'https://my.nordaccount.com/billing/my-subscriptions/',
		'expressvpn': 'https://www.expressvpn.com/sign-in',
		'surfshark': 'https://my.surfshark.com/account',
		'proton-vpn': 'https://account.proton.me/u/0/vpn/dashboard',
		'1password': 'https://my.1password.com/profile',
		peloton: 'https://members.onepeloton.com/preferences/subscriptions',
		headspace: 'https://www.headspace.com/subscription',
		calm: 'https://www.calm.com/profile',
		'door-dash': 'https://www.doordash.com/consumer/dashpass/',
		'uber-one': 'https://m.uber.com/go/pass',
		'la-fitness': 'https://www.lafitness.com/Pages/login.aspx',
		'orange-theory': 'https://www.orangetheory.com/en-us/login',
		classpass: 'https://classpass.com/account/upcoming-cycle',
		nyt: 'https://www.nytimes.com/subscription/cancel',
		wsj: 'https://customercenter.wsj.com/manage-subscription',
		'washington-post': 'https://myaccount.washingtonpost.com/',
		'linkedin-premium': 'https://www.linkedin.com/premium/cancel',
		duolingo: 'https://www.duolingo.com/settings/super',
		notion: 'https://www.notion.so/settings',
		figma: 'https://www.figma.com/settings',
	};
	return directMap[slug] || `https://${slug.replace(/-/g, '')}.com/account`;
}

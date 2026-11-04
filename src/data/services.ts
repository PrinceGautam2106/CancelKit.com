export type CancelDifficulty = 'easy' | 'medium' | 'hard' | 'nightmare';
export type CancelMethod = 'online' | 'phone' | 'email' | 'in-person';
export type ServiceCategory =
	| 'Streaming'
	| 'Music & Audio'
	| 'Software & Cloud'
	| 'Fitness & Wellness'
	| 'News & Learning'
	| 'VPN & Security'
	| 'Food & Delivery'
	| 'Shopping & Memberships';

export interface Service {
	slug: string;
	name: string;
	category: ServiceCategory;
	monthlyPrice: number;
	cancelDifficulty: CancelDifficulty;
	cancelMethod: CancelMethod;
	steps: string[];
	timeToCancel: string;
	willTheyOfferDiscount: boolean;
	saveWithCancelKits: boolean;
	metaTitle: string;
	metaDescription: string;
	relatedSlugs?: string[];
	alternatives: Alternative[];
	cancelDifficultyScore?: number;
	difficultyNotes?: string;
}
export interface Alternative { name: string; description: string; affiliateUrl: string; monthlyCost: number; commission: string; category: string; }

export const services: Service[] = [
	{
		slug: "netflix",
		name: "Netflix",
		category: "Streaming",
		monthlyPrice: 15.49,
		cancelDifficulty: "medium",
		cancelDifficultyScore: 2,
		difficultyNotes: "2 clicks, done",
		cancelMethod: "online",
		steps: [
			"Sign in at netflix.com/account on a browser (not the app)",
			"Under Membership & Billing, click Cancel membership",
			"Confirm cancellation — you keep access until the billing period ends",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Netflix Without Losing Profiles or Remaining Days (2026) | CancelKits",
		metaDescription:
			"Cancel Netflix without early cutoff. Learn how to preserve watchlist history, extra members, and watch until the final billing day.",
		headline: "How to Cancel Netflix Without Losing Viewing Profiles or Remaining Days",
		darkPatternHack:
			"Netflix keeps your profile, viewing history, and ratings for 10 months after cancellation. Tip: Turn off auto-pay rather than deleting your account so you can restart anytime without re-training the recommendation engine.",
		howToName: "How to Cancel Netflix Without Losing Profiles or Remaining Billing Days",
		relatedSlugs: ["hulu", "disney-plus", "hbo-max", "amazon-prime"],
	},
	{
		slug: "spotify",
		name: "Spotify",
		category: "Music & Audio",
		monthlyPrice: 11.99,
		cancelDifficulty: "easy",
		cancelDifficultyScore: 2,
		difficultyNotes: "Easy online",
		cancelMethod: "online",
		steps: [
			"Open spotify.com/account and sign in",
			"Go to Subscription or Plan overview",
			"Click Cancel Premium and confirm",
		],
		timeToCancel: "1 minute",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Spotify Premium Without Losing Playlists & Liked Songs (2026) | CancelKits",
		metaDescription:
			"Wondering if you lose playlists when canceling Spotify? Here is what happens to your downloaded music, saved songs, and how to cancel cleanly.",
		headline: "How to Cancel Spotify Premium Without Losing Playlists or Liked Music",
		darkPatternHack:
			"Cancelling Spotify Premium does not delete your playlists or liked songs—it merely reverts you to the ad-supported free tier and removes offline downloads. Export playlists to CSV before cancelling if moving to Apple Music.",
		howToName: "How to Cancel Spotify Premium Without Losing Playlists or Saved Music",
		relatedSlugs: ["apple-music", "youtube-premium", "audible", "tidal"],
	},
	{
		slug: "adobe",
		name: "Adobe Creative Cloud",
		category: "Software & Cloud",
		monthlyPrice: 59.99,
		cancelDifficulty: "nightmare",
		cancelDifficultyScore: 7,
		difficultyNotes: "Hidden cancel button, retention offers, phone call required for some plans",
		cancelMethod: "online",
		steps: [
			"Sign in at account.adobe.com and open Plans",
			"Select Manage plan → Cancel your plan",
			"Expect retention offers and early termination fees on annual plans — confirm cancel anyway",
			"Save the cancellation confirmation email",
		],
		timeToCancel: "15–30 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "How to Cancel Adobe Annual Plan Without Fee (2026 Waiver Trick) | CancelKits",
		metaDescription:
			"Bypass Adobe's 50% early termination fee on Creative Cloud annual plans. Step-by-step 2026 fee waiver loophole and refund guide.",
		headline: "How to Cancel Adobe Annual Plan Without Fee (Cancellation Fee Waiver Trick)",
		darkPatternHack:
			"Adobe charges a 50% early termination fee on annual plans paid monthly. Loophole: Switch your subscription to a cheap monthly plan (like Photography). Once switched, you enter a fresh 14-day refund window. Cancel within 24 hours to receive a full refund with $0 early termination fee.",
		howToName: "How to Cancel Adobe Creative Cloud Without an Early Termination Fee",
		howToDescription: "Step-by-step guide to bypassing the 50% remaining contract penalty on Adobe annual plans.",
		howToSteps: [
			{
				name: "Switch to a cheaper monthly plan",
				text: "Navigate to Plans & Products, select Change Plan, and pick the lowest-tier Photography plan.",
				url: "https://cancelkits.com/cancel/adobe/#step-1",
			},
			{
				name: "Trigger the 14-day refund window",
				text: "Within 24 hours of switching, cancel the new plan to trigger Adobe's automatic 14-day no-fee refund.",
				url: "https://cancelkits.com/cancel/adobe/#step-2",
			},
		],
		relatedSlugs: ["canva-pro", "dropbox", "microsoft-365", "figma"],
	},
	{
		slug: "hulu",
		name: "Hulu",
		category: "Streaming",
		monthlyPrice: 17.99,
		cancelDifficulty: "easy",
		cancelDifficultyScore: 2,
		difficultyNotes: "Quick self-service online cancel",
		cancelMethod: "online",
		steps: [
			"Go to hulu.com/account and sign in",
			"Select Cancel under your subscription",
			"Confirm — access continues until the period ends",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Hulu $2.99 Retention Offer Trick: How to Cancel or Get 6 Months Cheap (2026)",
		metaDescription:
			"Learn the Hulu pause/retention discount trick to slash your bill to $2.99/mo, or cancel cleanly without breaking your Disney bundle.",
		headline: "Hulu Cancellation Retention Trick: How to Cancel or Unlock the $2.99 Deal",
		darkPatternHack:
			"When you click cancel on Hulu, navigating past the second exit screen frequently triggers a $2.99/mo for 6 months retention offer. If you want to keep watching, take the offer; if cancelling, refuse both pause and discount screens.",
		howToName: "How to Cancel Hulu or Trigger the $2.99 Retention Offer",
		relatedSlugs: ["netflix", "disney-plus", "hbo-max", "paramount-plus"],
	},
	{
		slug: "disney-plus",
		name: "Disney+",
		category: "Streaming",
		monthlyPrice: 15.99,
		cancelDifficulty: "easy",
		cancelDifficultyScore: 2,
		difficultyNotes: "2-click account cancellation",
		cancelMethod: "online",
		steps: [
			"Sign in at disneyplus.com/account",
			"Open your subscription details",
			"Choose Cancel Subscription and confirm",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "Cancel Disney+ Without Losing Hulu or ESPN+ (Bundle Separation Hack 2026)",
		metaDescription:
			"Tired of Disney bundle billing confusion? Step-by-step guide to removing Disney+ while keeping standalone Hulu or ESPN+ active.",
		headline: "How to Cancel Disney+ Without Cancelling Hulu or ESPN+ (Bundle Separation)",
		darkPatternHack:
			"Disney Trio and Duo bundles lock all three services under one master charge. To cancel only Disney+, you must downgrade your plan inside your account settings to standalone Hulu before cancelling the parent bundle.",
		howToName: "How to Cancel Disney+ Without Breaking Your Hulu or ESPN+ Subscriptions",
		relatedSlugs: ["hulu", "netflix", "hbo-max", "peacock"],
	},
	{
		slug: "hbo-max",
		name: "HBO Max",
		category: "Streaming",
		monthlyPrice: 16.99,
		cancelDifficulty: "medium",
		cancelDifficultyScore: 4,
		difficultyNotes: "Account page cancel, can be tricky if carrier-billed",
		cancelMethod: "online",
		steps: [
			"Sign in at max.com (or via your billing partner like Verizon/AT&T)",
			"Open Account → Subscription",
			"Select Cancel subscription and confirm through your payment provider if bundled",
		],
		timeToCancel: "3–5 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel HBO Max Through Third-Party Billing (Roku, Amazon, Apple Hack 2026)",
		metaDescription:
			"Stuck in a Max billing loop where the app sends you to Roku, Apple, or Amazon? Here is how to cancel through third-party provider portals.",
		headline: "How to Cancel HBO Max Through Third-Party Billing (Bypass the Login Loop)",
		darkPatternHack:
			"Max frequently denies in-app cancellation if you subscribed via Amazon Prime Video Channels, Roku, or Apple. You must log into the original distributor's subscription hub—not max.com—to stop recurring auto-renewals.",
		howToName: "How to Cancel HBO Max Through Third-Party Billing Providers",
		relatedSlugs: ["netflix", "hulu", "disney-plus", "paramount-plus"],
	},
	{
		slug: "amazon-prime",
		name: "Amazon Prime",
		category: "Shopping & Memberships",
		monthlyPrice: 14.99,
		cancelDifficulty: "medium",
		cancelDifficultyScore: 3,
		difficultyNotes: "Online but lots of confirmation screens",
		cancelMethod: "online",
		steps: [
			"Open amazon.com/gp/primecentral and sign in",
			"Click End membership or Cancel membership",
			"Decline retention offers and confirm cancellation",
		],
		timeToCancel: "3 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "How to Cancel Amazon Prime & Get a Prorated Refund (2026 Loophole) | CancelKits",
		metaDescription:
			"Did you know Amazon auto-refunds unused Prime benefits? Learn the exact refund loophole and how to cancel Prime without losing Kindle books.",
		headline: "How to Cancel Amazon Prime and Claim an Immediate Prorated Refund",
		darkPatternHack:
			"Amazon has an automated prorated refund policy: if you have not used Prime shipping or video streaming during the current billing cycle, cancelling triggers an immediate, full or prorated refund back to your payment method.",
		howToName: "How to Cancel Amazon Prime and Claim a Prorated Refund",
		relatedSlugs: ["audible", "kindle-unlimited", "walmart-plus", "costco"],
	},
	{
		slug: "apple-one",
		name: "Apple One",
		category: "Software & Cloud",
		monthlyPrice: 19.95,
		cancelDifficulty: "easy",
		cancelDifficultyScore: 2,
		difficultyNotes: "1-click toggle in iOS Settings or Apple ID",
		cancelMethod: "online",
		steps: [
			"On iPhone/iPad: Settings → [your name] → Subscriptions",
			"Select Apple One",
			"Tap Cancel Subscription and confirm",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "Cancel Apple One Without Losing 200GB iCloud Photos & Data (2026 Hack)",
		metaDescription:
			"Cancel Apple One without losing iCloud backup files. Step-by-step guide to downgrading to standalone 50GB/200GB iCloud storage safely.",
		headline: "How to Cancel Apple One Without Losing Your iCloud Photos or Storage",
		darkPatternHack:
			"Cancelling Apple One instantly downgrades your iCloud storage to the free 5GB tier, causing photo syncing and iCloud mail to halt. Hack: Immediately purchase a standalone 50GB or 200GB iCloud+ plan right after cancelling Apple One.",
		howToName: "How to Cancel Apple One Without Losing iCloud Photos or Storage",
		relatedSlugs: ["icloud", "apple-music", "apple-tv-plus", "youtube-premium"],
	},
	{
		slug: "youtube-premium",
		name: "YouTube Premium",
		category: "Streaming",
		monthlyPrice: 13.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Go to youtube.com/paid_memberships and sign in",
			"Find YouTube Premium and click Manage membership",
			"Select Cancel membership and confirm",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel YouTube Premium Without Losing Playlists & Music Library (2026)",
		metaDescription:
			"Step-by-step guide to cancelling YouTube Premium. Learn what happens to YouTube Music downloads, family members, and background playback.",
		headline: "How to Cancel YouTube Premium Without Losing Playlists or YouTube Music",
		darkPatternHack:
			"If you subscribed to YouTube Premium on an iPhone or iPad, Apple charges an extra 30% markup ($18.99 vs $13.99). If cancelling, cancel via Apple Subscriptions or web browser directly so you are not double-billed.",
		howToName: "How to Cancel YouTube Premium Without Losing Music Playlists",
		relatedSlugs: ["spotify", "netflix", "apple-music", "disney-plus"],
	},
	{
		slug: "planet-fitness",
		name: "Planet Fitness",
		category: "Fitness & Wellness",
		monthlyPrice: 22.99,
		cancelDifficulty: "hard",
		cancelDifficultyScore: 9,
		difficultyNotes: "Requires IN-PERSON visit or certified mail. Seriously.",
		cancelMethod: "in-person",
		steps: [
			"Check your club’s cancel policy (many require in-club or certified mail)",
			"Visit your home club with photo ID during staffed hours",
			"Request a cancellation form and keep a stamped copy",
			"Confirm your bank stops the monthly draft after the next cycle",
		],
		timeToCancel: "1–2 weeks",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "Planet Fitness Cancellation Letter Template PDF: Cancel Without Going In Person (2026)",
		metaDescription:
			"Download and copy our free certified mail cancellation letter template for Planet Fitness. Cancel your membership without stepping foot in the gym.",
		headline: "Planet Fitness Cancellation Letter Template PDF (Cancel Without Going in Person)",
		darkPatternHack:
			"Planet Fitness franchise policies force members to visit the gym in person or send certified mail. Use our free certified mail letter template with USPS Return Receipt to create a legally binding paper trail that forces cancellation without speaking to staff.",
		howToName: "How to Cancel Planet Fitness Without Going In Person (Certified Mail Template)",
		relatedSlugs: ["peloton", "orange-theory", "la-fitness", "classpass"],
	},
	{
		slug: "peloton",
		name: "Peloton",
		category: "Fitness & Wellness",
		monthlyPrice: 44,
		cancelDifficulty: "medium",
		cancelMethod: "online",
		steps: [
			"Sign in at members.onepeloton.com",
			"Open Membership → Manage membership",
			"Select Cancel and confirm (bike/tread All-Access vs app differ)",
		],
		timeToCancel: "5 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Peloton All-Access Without Bricking Your Bike (Downgrade Trick 2026)",
		metaDescription:
			"Do not let Peloton brick your $1,500 bike. Learn how to switch from $44/mo All-Access to the Just Ride free mode or cheaper app subscription.",
		headline: "How to Cancel Peloton Membership Without Bricking Your Bike (App Downgrade Hack)",
		darkPatternHack:
			"Cancelling the $44/mo All-Access membership disables scenic rides and metrics, but \"Just Ride\" manual resistance mode remains free forever. If you want classes on a budget, downgrade to the $12.99 Peloton App One.",
		howToName: "How to Cancel Peloton All-Access Without Bricking Your Exercise Bike",
		relatedSlugs: ["planet-fitness", "classpass", "headspace", "calm"],
	},
	{
		slug: "headspace",
		name: "Headspace",
		category: "Fitness & Wellness",
		monthlyPrice: 12.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Open the Headspace app or headspace.com/account",
			"Go to Subscription settings",
			"Cancel via App Store / Google Play if billed there, or cancel on the website",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Headspace Free Trial & Trigger the $19.99 Retention Offer (2026 Hack)",
		metaDescription:
			"Cancel Headspace before the $69.99 annual charge hits, or trigger the secret 50% retention discount. Step-by-step cancellation guide.",
		headline: "How to Cancel Headspace Free Trial (and Trigger the Secret $19.99 Offer)",
		darkPatternHack:
			"Headspace frequently offers a $19.99/year retention deal on the cancellation exit flow. If you cancel on iOS, do it at least 24 hours before the trial ends, as Apple processes trial renewals 24 hours early.",
		howToName: "How to Cancel Headspace Free Trial Before the $69.99 Annual Charge",
		relatedSlugs: ["calm", "peloton", "duolingo", "insight-timer"],
	},
	{
		slug: "calm",
		name: "Calm",
		category: "Fitness & Wellness",
		monthlyPrice: 14.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"If billed by Apple/Google, cancel in device subscription settings",
			"If billed on calm.com, sign in → Account → Manage subscription",
			"Confirm Cancel and check your email receipt",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Calm App Free Trial Before the $69.99 Surprise Charge (2026 Hack)",
		metaDescription:
			"Avoid Calm's surprise $69.99 annual subscription charge. Learn how to cancel on iOS, Android, and Web before your trial converts.",
		headline: "How to Cancel Calm App Free Trial Before the $69.99 Annual Auto-Charge",
		darkPatternHack:
			"Calm's 7-day free trial automatically bills the full $69.99 yearly fee if not cancelled 24 hours prior to expiration. If billed, Apple or Calm support will grant a one-time refund if requested within 48 hours.",
		howToName: "How to Cancel Calm App Free Trial Before the Annual Auto-Charge",
		relatedSlugs: ["headspace", "peloton", "insight-timer", "duolingo"],
	},
	{
		slug: "duolingo",
		name: "Duolingo Super",
		category: "News & Learning",
		monthlyPrice: 12.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Cancel where you subscribed: App Store, Google Play, or duolingo.com",
			"On web: Profile → Settings → Super Duolingo → Cancel",
			"Confirm — free Duolingo still works after Super ends",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Duolingo Super Free Trial Without Losing Your Streak (2026 Hack)",
		metaDescription:
			"Will you lose your Duolingo streak when canceling Super? No. Learn how to cancel the free trial safely and stop the $83.99 annual rollover.",
		headline: "How to Cancel Duolingo Super Without Losing Your Streak or XP",
		darkPatternHack:
			"Your Duolingo streak, crowns, gems, and friends list are completely tied to your free account. Cancelling Duolingo Super only disables unlimited hearts and offline lessons—your streak is 100% safe.",
		howToName: "How to Cancel Duolingo Super Free Trial Without Losing Your Streak",
		relatedSlugs: ["masterclass", "skillshare", "coursera", "babbel"],
	},
	{
		slug: "audible",
		name: "Audible",
		category: "Music & Audio",
		monthlyPrice: 14.95,
		cancelDifficulty: "medium",
		cancelMethod: "online",
		steps: [
			"Go to audible.com/account/overview",
			"Choose Cancel membership under Membership details",
			"Decide whether to keep unused credits, then confirm",
		],
		timeToCancel: "3 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "What Happens to Unused Audible Credits When You Cancel? (2026 Save Trick)",
		metaDescription:
			"Do you lose Audible credits when you cancel? Yes, unless you use this trick. Learn how to spend remaining credits on pre-orders before canceling.",
		headline: "What Happens to Unused Audible Credits When You Cancel? (Credit Save Trick)",
		darkPatternHack:
			"Audible permanently deletes all unused credits the moment your membership is cancelled. Loophole: Spend all unused credits on pre-orders or audiobooks before clicking cancel. Titles remain in your library forever even after cancellation.",
		howToName: "What Happens to Unused Audible Credits When You Cancel (And How to Keep Them)",
		relatedSlugs: ["spotify", "kindle-unlimited", "amazon-prime", "scribd"],
	},
	{
		slug: "nyt",
		name: "The New York Times",
		category: "News & Learning",
		monthlyPrice: 17,
		cancelDifficulty: "medium",
		cancelDifficultyScore: 6,
		difficultyNotes: "Phone call required, long hold times",
		cancelMethod: "online",
		steps: [
			"Sign in at myaccount.nytimes.com",
			"Open Subscriptions → Manage subscription",
			"Select Cancel and complete the survey if prompted",
		],
		timeToCancel: "5 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel NYT Online Without Calling Customer Service (California Law Hack 2026)",
		metaDescription:
			"Bypass the NYT phone cancellation trap. Use the online chat loophole and California consumer protection billing address hack to cancel instantly.",
		headline: "How to Cancel The New York Times Online Without Calling Customer Service",
		darkPatternHack:
			"The New York Times uses forced phone calls or live chat bots for non-California residents. Loophole: Change your account billing address to a California address (e.g. 90210) to legally unlock the mandatory instant online cancellation button under CA law.",
		howToName: "How to Cancel The New York Times Online Without Calling Support",
		relatedSlugs: ["wsj", "washington-post", "the-athletic", "medium"],
	},
	{
		slug: "wsj",
		name: "The Wall Street Journal",
		category: "News & Learning",
		monthlyPrice: 39,
		cancelDifficulty: "hard",
		cancelDifficultyScore: 7,
		difficultyNotes: "Phone call or chat retention gauntlet required",
		cancelMethod: "phone",
		steps: [
			"Visit customercenter.wsj.com and sign in",
			"Many plans require calling retention to cancel",
			"Request cancellation confirmation by email and note the agent ID",
		],
		timeToCancel: "15–45 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel WSJ Online Without Calling Customer Service (Retention Loophole 2026)",
		metaDescription:
			"Escape the Wall Street Journal phone retention gauntlet. Learn how to cancel WSJ online via live chat script or the California address hack.",
		headline: "How to Cancel Wall Street Journal Online Without Phone Call Runarounds",
		darkPatternHack:
			"WSJ hides the cancel button behind customer service phone lines (1-800-JOURNAL). Use our live chat cancellation script or switch your account billing state to California to reveal the self-service online cancel button.",
		howToName: "How to Cancel The Wall Street Journal Online Without Calling",
		relatedSlugs: ["nyt", "washington-post", "financial-times", "bloomberg"],
	},
	{
		slug: "linkedin-premium",
		name: "LinkedIn Premium",
		category: "Software & Cloud",
		monthlyPrice: 29.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Go to linkedin.com/premium/manage",
			"Click Cancel subscription",
			"Confirm — Premium features end at the billing cycle close",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel LinkedIn Premium Before Free Trial Charges (2-Month Free Hack 2026)",
		metaDescription:
			"Cancel LinkedIn Business or Career before the $39.99/mo charge hits. How to trigger retention free months and keep InMail credits.",
		headline: "How to Cancel LinkedIn Premium Before Free Trial Ends (and Get 2 Months Free)",
		darkPatternHack:
			"LinkedIn frequently offers an additional free month or 50% discount when you select \"Too expensive\" as your cancellation reason. Note: Any accumulated InMail credits expire immediately upon final cancellation.",
		howToName: "How to Cancel LinkedIn Premium Before Free Trial Auto-Renewal",
		relatedSlugs: ["microsoft-365", "dropbox", "notion", "canva-pro"],
	},
	{
		slug: "canva-pro",
		name: "Canva Pro",
		category: "Software & Cloud",
		monthlyPrice: 14.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Open canva.com → Billing",
			"Select your Pro/Teams plan → Cancel subscription",
			"Confirm — designs stay, Pro assets become locked",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Canva Pro Without Losing Brand Kits & Custom Designs (2026 Hack)",
		metaDescription:
			"Wondering what happens to your designs when you cancel Canva Pro? Learn how to export transparent PNGs and maintain edit access on free Canva.",
		headline: "How to Cancel Canva Pro Without Losing Your Brand Kits or Templates",
		darkPatternHack:
			"Cancelling Canva Pro does not delete your projects—they remain editable with free elements. However, brand kits, custom fonts, and transparent background exports lock immediately. Download high-res PNG assets before cancelling.",
		howToName: "How to Cancel Canva Pro Without Losing Access to Brand Kits",
		relatedSlugs: ["adobe", "figma", "notion", "dropbox"],
	},
	{
		slug: "dropbox",
		name: "Dropbox",
		category: "Software & Cloud",
		monthlyPrice: 11.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Sign in at dropbox.com/account/plan",
			"Choose Cancel plan or Downgrade",
			"Move files under the free limit before the plan ends",
		],
		timeToCancel: "3 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "What Happens to Files When You Cancel Dropbox Plus? (Storage Hack 2026)",
		metaDescription:
			"Does Dropbox delete your files if you downgrade from 2TB to 2GB? Learn how Dropbox handles excess files and avoid syncing interruptions.",
		headline: "What Happens to Your Files When You Cancel Dropbox Plus? (2GB Storage Guide)",
		darkPatternHack:
			"Dropbox never deletes existing files when you downgrade past the 2GB free cap. Instead, syncing halts across linked devices until storage drops below 2GB. You can still download all existing files from dropbox.com.",
		howToName: "What Happens to Your Files When You Cancel Dropbox Plus",
		relatedSlugs: ["google-one", "icloud", "microsoft-365", "box"],
	},
	{
		slug: "icloud",
		name: "iCloud+",
		category: "Software & Cloud",
		monthlyPrice: 2.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"On iPhone: Settings → [your name] → iCloud → Manage Account Storage / Change Storage Plan",
			"Select Downgrade Options",
			"Choose the free 5 GB plan and confirm with Apple ID password",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "What Happens to Photos When You Cancel iCloud+? (Downgrade Guide 2026)",
		metaDescription:
			"Will Apple delete photos when cancelling iCloud+ 50GB/200GB/2TB? Learn the 30-day grace period rules and how to export originals to a Mac/PC.",
		headline: "What Happens to Your Photos When You Cancel iCloud+ Storage?",
		darkPatternHack:
			"When you cancel iCloud+, Apple gives you a 30-day grace period to download photos before non-backed files become at risk. Download your entire library via privacy.apple.com before downgrading to 5GB.",
		howToName: "What Happens to Your Photos When You Cancel iCloud Plus Storage",
		relatedSlugs: ["apple-one", "google-one", "dropbox", "microsoft-365"],
	},
	{
		slug: "google-one",
		name: "Google One",
		category: "Software & Cloud",
		monthlyPrice: 2.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Open one.google.com/settings",
			"Select Cancel membership",
			"Confirm — data over 15 GB may be blocked for upload after the plan ends",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "What Happens to Gmail When You Cancel Google One Storage? (2026 Hack)",
		metaDescription:
			"Warning: Cancelling Google One can block incoming Gmail emails if storage exceeds 15GB. Learn how to clean Drive space safely before cancelling.",
		headline: "What Happens to Gmail and Google Photos When You Cancel Google One?",
		darkPatternHack:
			"If your account exceeds the 15GB free limit after cancelling Google One, incoming Gmail emails bounce back to senders, and Google Photos backup stops. Clean out large Google Drive attachments before cancelling.",
		howToName: "What Happens to Gmail When You Cancel Google One Storage",
		relatedSlugs: ["icloud", "dropbox", "youtube-premium", "microsoft-365"],
	},
	{
		slug: "nordvpn",
		name: "NordVPN",
		category: "VPN & Security",
		monthlyPrice: 12.99,
		cancelDifficulty: "hard",
		cancelMethod: "online",
		steps: [
			"Sign in at nordaccount.com",
			"Open Billing → Cancel subscription (or request refund within the money-back window)",
			"Disable auto-renewal and save the confirmation",
		],
		timeToCancel: "10 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel NordVPN Auto-Renewal & Force 30-Day Refund (Live Chat Script 2026)",
		metaDescription:
			"Turn off NordVPN hidden auto-renewal and use our copy-paste live chat script to claim a full 30-day money-back guarantee refund.",
		headline: "How to Cancel NordVPN Auto-Renewal and Claim Your 30-Day Money-Back Refund",
		darkPatternHack:
			"Disabling auto-renewal in your Nord Account does NOT automatically trigger your 30-day refund. You must open live chat support and state: \"I am exercising my 30-day money-back guarantee.\" Use our copy-paste script.",
		howToName: "How to Cancel NordVPN Auto-Renewal and Get 30-Day Refund",
		relatedSlugs: ["expressvpn", "surfshark", "proton-vpn", "1password"],
	},
	{
		slug: "expressvpn",
		name: "ExpressVPN",
		category: "VPN & Security",
		monthlyPrice: 12.95,
		cancelDifficulty: "medium",
		cancelMethod: "online",
		steps: [
			"Sign in at expressvpn.com/subscriptions",
			"Choose Cancel subscription or contact chat for refunds",
			"Confirm auto-renew is off",
		],
		timeToCancel: "5–10 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel ExpressVPN & Claim Full 30-Day Refund (Live Chat Script 2026)",
		metaDescription:
			"ExpressVPN auto-renewal cancellation guide. Copy-paste support script to get your 30-day money-back guarantee without retention pushback.",
		headline: "How to Cancel ExpressVPN Auto-Renew and Claim a 30-Day Full Refund",
		darkPatternHack:
			"ExpressVPN's 30-day money-back guarantee is no-questions-asked, but their support agents are trained to offer troubleshooting steps. Repeat: \"No troubleshooting needed, please process my full refund immediately.\"",
		howToName: "How to Cancel ExpressVPN and Get a Full 30-Day Refund",
		relatedSlugs: ["nordvpn", "surfshark", "proton-vpn", "1password"],
	},
	{
		slug: "hellofresh",
		name: "HelloFresh",
		category: "Food & Delivery",
		monthlyPrice: 60,
		cancelDifficulty: "medium",
		cancelDifficultyScore: 6,
		difficultyNotes: "Online but deeply hidden",
		cancelMethod: "online",
		steps: [
			"Log in to your HelloFresh account on the website",
			"Open Account settings → Subscription settings",
			"Select Cancel subscription (skipping weeks is different from canceling)",
			"Confirm and watch for last-box charges already in production",
		],
		timeToCancel: "5 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel HelloFresh After the Free Box (Avoid Next Week's $85 Charge 2026)",
		metaDescription:
			"Avoid HelloFresh surprise weekly box billings. Learn the difference between skipping a delivery vs cancelling your plan before the cutoff.",
		headline: "How to Cancel HelloFresh After the Free Box (Without Getting Charged Next Week)",
		darkPatternHack:
			"HelloFresh requires cancellation 5 full days before your next scheduled delivery date (11:59 PM PT). Simply \"skipping\" a week does not cancel your plan—you must navigate through 4 cancellation screens until you receive an email confirmation.",
		howToName: "How to Cancel HelloFresh After the Free Box Promotion",
		relatedSlugs: ["blue-apron", "factor", "home-chef", "door-dash"],
	},
	{
		slug: "blue-apron",
		name: "Blue Apron",
		category: "Food & Delivery",
		monthlyPrice: 55,
		cancelDifficulty: "medium",
		cancelMethod: "online",
		steps: [
			"Sign in at blueapron.com/account",
			"Open Plan settings → Cancel plan",
			"Confirm cancellation before the weekly cutoff",
		],
		timeToCancel: "5 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Blue Apron Account Permanently (Skip the 4-Week Pause Trap 2026)",
		metaDescription:
			"Blue Apron makes pausing easy but permanent cancellation tricky. Learn how to stop deliveries, cancel billing, and avoid surprise deliveries.",
		headline: "How to Cancel Blue Apron Account Permanently (Avoid the 4-Week Pause Trap)",
		darkPatternHack:
			"Blue Apron steers users towards pausing for up to 4 weeks, which automatically resumes billing unannounced. Click \"Manage Plan\" -> \"Cancel My Account\" and confirm cancellation before the weekly cutoff.",
		howToName: "How to Cancel Blue Apron Account Permanently",
		relatedSlugs: ["hellofresh", "factor", "home-chef", "instacart"],
	},
	{
		slug: "apple-music",
		name: "Apple Music",
		category: "Music & Audio",
		monthlyPrice: 10.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Settings → [your name] → Subscriptions on iOS, or music.apple.com on the web",
			"Select Apple Music → Cancel Subscription",
			"Confirm — downloaded music may become unavailable offline",
		],
		timeToCancel: "1 minute",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "Cancel Apple Music Without Losing Your Playlists & Library (2026 Guide)",
		metaDescription:
			"Does Apple Music delete your playlists after cancellation? Yes, after 30-90 days. Learn how to export your playlists to Spotify before cancelling.",
		headline: "How to Cancel Apple Music Without Losing Your Playlists and Cloud Library",
		darkPatternHack:
			"Apple Music permanently wipes iCloud Music Library playlists if an account remains inactive for 30–90 days. Use SongShift or Soundiiz to export playlists to Spotify or local XML before cancelling.",
		howToName: "How to Cancel Apple Music Without Losing Your Playlists",
		relatedSlugs: ["spotify", "youtube-premium", "apple-one", "tidal"],
	},
	{
		slug: "sirius-xm",
		name: "Sirius XM",
		category: "Music & Audio",
		monthlyPrice: 23.99,
		cancelDifficulty: "hard",
		cancelDifficultyScore: 8,
		difficultyNotes: "Phone only, aggressive retention team",
		cancelMethod: "phone",
		steps: [
			"Call SiriusXM customer service at 1-866-635-2349 (Monday–Friday 8am–8pm ET)",
			"Navigate the automated phone tree to reach the cancellation & retention department",
			"Decline multiple discounted promotional offers from the retention agent",
			"Insist on immediate cancellation and request a cancellation reference number",
		],
		timeToCancel: "15–30 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel SiriusXM Online Without Calling Customer Service ($5 Deal Trick 2026)",
		metaDescription:
			"Avoid the SiriusXM telephone retention maze. Cancel via digital chat bot or use our script to slash your subscription rate to $5/month.",
		headline: "How to Cancel SiriusXM Online Without Calling (and the $5/Mo Retention Deal)",
		darkPatternHack:
			"SiriusXM's automated live chat allows cancellation without picking up the phone. Type \"cancel subscription\" into the chat bot. When asked why, type \"too expensive\"—the bot will offer $5/mo for 12 months before letting you cancel.",
		howToName: "How to Cancel SiriusXM Online Without Calling Customer Support",
		relatedSlugs: ["spotify", "apple-music", "audible"],
	},
	{
		slug: "apple-tv-plus",
		name: "Apple TV+",
		category: "Streaming",
		monthlyPrice: 9.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Open Settings → [your name] → Subscriptions",
			"Tap Apple TV+",
			"Cancel Subscription and confirm",
		],
		timeToCancel: "1 minute",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "Cancel Apple TV+ Free Trial Without Getting Billed (Timing Hack 2026)",
		metaDescription:
			"Caution: Apple TV+ promotional trials end immediately upon cancellation. Learn the optimal timing strategy to maximize free watching.",
		headline: "How to Cancel Apple TV+ Free Trial Before Getting Billed $9.99/Month",
		darkPatternHack:
			"Unlike standard subscriptions that remain active until the billing cycle ends, free promotional trials for Apple TV+ terminate immediate access the exact moment you cancel. Set a reminder to cancel on day 6 of a 7-day trial.",
		howToName: "How to Cancel Apple TV+ Free Trial Before Getting Billed",
		relatedSlugs: ["netflix", "disney-plus", "apple-one", "hulu"],
	},
	{
		slug: "paramount-plus",
		name: "Paramount+",
		category: "Streaming",
		monthlyPrice: 12.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Sign in at paramountplus.com/account",
			"Select Cancel under Subscription",
			"Confirm — carrier bundles may need a separate cancel",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Paramount+ Free Month Promo Retention Loop: How to Cancel or Keep Free (2026)",
		metaDescription:
			"Learn the Paramount+ cancellation flow loophole that gives you 2 free months of streaming, or how to cancel completely through Amazon/Apple.",
		headline: "Paramount+ Cancellation Retention Hack: How to Cancel or Keep It Free",
		darkPatternHack:
			"When cancelling Paramount+ online, clicking through the exit survey almost always triggers an offer for 1 to 2 free months of commercial-free streaming. You can accept the free months or confirm final cancellation.",
		howToName: "How to Cancel Paramount+ or Trigger Free Retention Months",
		relatedSlugs: ["hulu", "peacock", "hbo-max", "netflix"],
	},
	{
		slug: "peacock",
		name: "Peacock",
		category: "Streaming",
		monthlyPrice: 13.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Go to peacocktv.com/account/subscription",
			"Choose Cancel Peacock",
			"Confirm cancellation",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "How to Cancel Peacock TV Without In-App Billing Traps (Third-Party Loophole 2026)",
		metaDescription:
			"Stuck trying to cancel Peacock? Learn how to cancel direct accounts, Roku subscriptions, or Xfinity linked plans without ghost recurring charges.",
		headline: "How to Cancel Peacock TV (Bypass Roku, Xfinity, and In-App Billing Traps)",
		darkPatternHack:
			"If you linked Peacock through an Xfinity internet bundle or Roku account, peacocktv.com will disable the cancel button and send you to the provider. Cancel under the third-party portal to ensure recurring charges stop permanently.",
		howToName: "How to Cancel Peacock TV Third-Party Subscriptions",
		relatedSlugs: ["paramount-plus", "hulu", "netflix", "disney-plus"],
	},
	{
		slug: "microsoft-365",
		name: "Microsoft 365",
		category: "Software & Cloud",
		monthlyPrice: 9.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Sign in at account.microsoft.com/services",
			"Select Microsoft 365 → Manage → Cancel",
			"Confirm — Office apps switch to view-only after expiry",
		],
		timeToCancel: "3 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "How to Cancel Microsoft 365 & Claim an Immediate Prorated Refund (2026)",
		metaDescription:
			"Learn Microsoft's hidden prorated refund rule for Office 365 annual subscriptions and how to protect OneDrive files before cancelling.",
		headline: "How to Cancel Microsoft 365 and Claim an Immediate Prorated Refund",
		darkPatternHack:
			"If you cancel an annual Microsoft 365 subscription within 30 days of purchase or renewal, Microsoft's automated billing portal offers an immediate prorated refund. Select \"Cancel immediately and get a refund\".",
		howToName: "How to Cancel Microsoft 365 and Claim a Prorated Refund",
		relatedSlugs: ["google-one", "dropbox", "adobe", "notion"],
	},
	{
		slug: "notion",
		name: "Notion",
		category: "Software & Cloud",
		monthlyPrice: 10,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Open Settings & members → Billing",
			"Select Change plan → Free or Cancel",
			"Confirm — pages remain; Plus/Business limits apply",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "Cancel Notion Plus Without Losing Workspaces or Page History (2026)",
		metaDescription:
			"Downgrade Notion Plus to the Free plan cleanly. Learn what happens to team member seats, database row limits, and page version history.",
		headline: "How to Cancel Notion Plus Without Losing Workspaces, Databases, or History",
		darkPatternHack:
			"Notion workspace owners often get billed for ghost \"Members\" added unintentionally. Before downgrading to the Free plan, remove extra workspace members under Settings -> Members to avoid prorated seat charges.",
		howToName: "How to Cancel Notion Plus Without Losing Workspaces or Databases",
		relatedSlugs: ["canva-pro", "dropbox", "figma", "evernote"],
	},
	{
		slug: "figma",
		name: "Figma",
		category: "Software & Cloud",
		monthlyPrice: 15,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Open Admin settings → Billing for your team",
			"Change seats or cancel the Professional/Organization plan",
			"Export critical files before seat removal if needed",
		],
		timeToCancel: "5 minutes",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "Cancel Figma Professional & Remove Paid Editor Seats (Avoid Surprise Bills 2026)",
		metaDescription:
			"Stop surprise $15/mo Figma invoices. Learn how to downgrade editor seats to free viewer roles and cancel your Professional team plan.",
		headline: "How to Cancel Figma Professional and Remove Hidden Paid Editor Seats",
		darkPatternHack:
			"Figma's notorious dark pattern auto-upgrades view-only users to paid \"Editor\" seats ($15/mo) the moment they edit a design file. Demote all team editors to \"Viewer-Restricted\" before cancelling your team subscription.",
		howToName: "How to Cancel Figma Professional and Remove Hidden Editor Seats",
		relatedSlugs: ["adobe", "canva-pro", "notion", "miro"],
	},
	{
		slug: "gym-membership",
		name: "Gym Membership (Generic)",
		category: "Fitness & Wellness",
		monthlyPrice: 40,
		cancelDifficulty: "nightmare",
		cancelDifficultyScore: 9,
		difficultyNotes: "Requires certified postal letter or in-person manager signature",
		cancelMethod: "in-person",
		steps: [
			"Read your contract for notice period, freeze options, and required method",
			"Send cancellation via the required channel (in-person, certified mail, or portal)",
			"Get written confirmation and calendar a bank draft check",
			"Dispute remaining drafts only after documented cancel",
		],
		timeToCancel: "2–4 weeks",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "Gym Membership Certified Mail Cancellation Letter Template PDF (FTC Loophole 2026)",
		metaDescription:
			"Free certified mail cancellation letter template for any gym. Bypass in-person manager meetings and high-pressure retention tactics.",
		headline: "How to Cancel Any Gym Membership Without Going In Person (Certified Mail Template)",
		darkPatternHack:
			"Gym contracts often require 30-day certified mail notice with return receipt requested. Sending USPS Certified Mail with tracking legally fulfills your contractual cancellation notice regardless of whether staff claims in-person visits are required.",
		howToName: "How to Cancel Any Gym Membership Without Going In Person",
		relatedSlugs: ["planet-fitness", "la-fitness", "orange-theory", "peloton"],
	},
	{
		slug: "la-fitness",
		name: "LA Fitness",
		category: "Fitness & Wellness",
		monthlyPrice: 34.99,
		cancelDifficulty: "hard",
		cancelDifficultyScore: 9,
		difficultyNotes: "Certified mail only",
		cancelMethod: "in-person",
		steps: [
			"Visit your home club and request a cancellation form",
			"Some regions allow online cancel — check mylafitness.com first",
			"Keep a copy and verify the final draft date",
		],
		timeToCancel: "1–2 weeks",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "Cancel LA Fitness Without Going to the Club (Certified Mail Template PDF 2026)",
		metaDescription:
			"Escape the LA Fitness operations manager meeting. Use our certified mail cancellation letter template to cancel your membership from home.",
		headline: "How to Cancel LA Fitness Membership Without Going to the Club",
		darkPatternHack:
			"LA Fitness requires you to hand-deliver a printed form to the club operations manager during limited weekday hours or mail it to their Irvine, CA PO Box. Use our certified mail letter template to cancel without visiting.",
		howToName: "How to Cancel LA Fitness Membership Without Going to the Club",
		relatedSlugs: ["planet-fitness", "gym-membership", "orange-theory", "classpass"],
	},
	{
		slug: "orange-theory",
		name: "OrangeTheory",
		category: "Fitness & Wellness",
		monthlyPrice: 159,
		cancelDifficulty: "hard",
		cancelDifficultyScore: 8,
		difficultyNotes: "Requires written 30-day notice in person or certified mail",
		cancelMethod: "email",
		steps: [
			"Email or visit your studio with the cancel request before the billing date",
			"Ask for written confirmation of the last bill date",
			"Return any studio-specific gear if required by your agreement",
		],
		timeToCancel: "1 week",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel OrangeTheory Without Paying the Extra 30-Day Dues (2026 Loophole)",
		metaDescription:
			"OrangeTheory requires 30 days notice to cancel, meaning one more full charge. Learn how to submit your cancellation form early or freeze your account.",
		headline: "How to Cancel OrangeTheory Membership Without Paying an Extra Month of Dues",
		darkPatternHack:
			"OrangeTheory enforces a strict \"30-day written notice\" rule: if your billing date is the 15th and you cancel on the 10th, you will still be charged full dues on the 15th. Submit your cancellation form at least 32 days prior.",
		howToName: "How to Cancel OrangeTheory Membership Without Paying Extra Dues",
		relatedSlugs: ["peloton", "classpass", "planet-fitness", "la-fitness"],
	},
	{
		slug: "classpass",
		name: "ClassPass",
		category: "Fitness & Wellness",
		monthlyPrice: 49,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Open the ClassPass app or website → Account → Membership",
			"Select Cancel plan",
			"Confirm — unused credits policies vary by plan",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "What Happens to Unused ClassPass Credits When You Cancel? (Freeze Hack 2026)",
		metaDescription:
			"Do ClassPass credits roll over if you cancel? No. Learn how to switch to the $0 or $7 credit protection freeze plan instead of cancelling.",
		headline: "What Happens to Unused ClassPass Credits When You Cancel? (Keep Your Credits)",
		darkPatternHack:
			"Cancelling ClassPass wipes all accumulated rollover credits instantly. Loophole: Switch to the ClassPass Pause/Freeze plan ($0 to $7/mo) to preserve your rollover credit balance until you are ready to book again.",
		howToName: "What Happens to Unused ClassPass Credits When You Cancel",
		relatedSlugs: ["peloton", "orange-theory", "planet-fitness", "headspace"],
	},
	{
		slug: "surfshark",
		name: "Surfshark",
		category: "VPN & Security",
		monthlyPrice: 15.45,
		cancelDifficulty: "medium",
		cancelMethod: "online",
		steps: [
			"Sign in at my.surfshark.com",
			"Open Subscription → Cancel subscription",
			"Use live chat for money-back refunds within the window",
		],
		timeToCancel: "5 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Surfshark Auto-Renewal & Get 30-Day Refund (Live Chat Script 2026)",
		metaDescription:
			"Surfshark hides the auto-renewal toggle behind customer support. Use our copy-paste chat script to disable recurring billing and get refunded.",
		headline: "How to Cancel Surfshark Auto-Renewal and Get a Full 30-Day Refund",
		darkPatternHack:
			"Surfshark disables self-service auto-renewal cancellation in certain regions. Connect to 24/7 live chat and state: \"Please turn off auto-renewal for my subscription and process my 30-day money-back guarantee.\"",
		howToName: "How to Cancel Surfshark Auto-Renewal and Claim 30-Day Refund",
		relatedSlugs: ["nordvpn", "expressvpn", "proton-vpn", "1password"],
	},
	{
		slug: "proton-vpn",
		name: "Proton VPN",
		category: "VPN & Security",
		monthlyPrice: 9.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Sign in at account.proton.me",
			"Open Subscriptions → Manage → Cancel",
			"Confirm — free Proton VPN remains available",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "Cancel Proton VPN Downgrade to Free Tier (Keep Proton Mail Safe 2026)",
		metaDescription:
			"Cancel Proton VPN Plus without disrupting your Proton Mail, Drive, or Calendar. Step-by-step downgrade guide to Proton Free.",
		headline: "How to Cancel Proton VPN Without Breaking Your Proton Mail Account",
		darkPatternHack:
			"Proton combines VPN, Mail, and Drive under unified account credits. When downgrading from Proton Unlimited to Proton Free, ensure your custom domain email addresses and storage limits conform to free tier caps.",
		howToName: "How to Cancel Proton VPN Without Breaking Proton Mail",
		relatedSlugs: ["nordvpn", "expressvpn", "surfshark", "1password"],
	},
	{
		slug: "1password",
		name: "1Password",
		category: "VPN & Security",
		monthlyPrice: 2.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Sign in at my.1password.com → Billing",
			"Choose Cancel subscription",
			"Export your vault before access ends if you are leaving the product",
		],
		timeToCancel: "3 minutes",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "What Happens to Passwords When You Cancel 1Password? (Vault Export Hack 2026)",
		metaDescription:
			"Will you get locked out of logins if you cancel 1Password? Learn read-only vault access rules and how to export passwords to 1PUX/CSV safely.",
		headline: "What Happens to Your Passwords When You Cancel 1Password? (Vault Export Guide)",
		darkPatternHack:
			"When you cancel 1Password, your vault transitions to \"Read-Only\" mode. You can still view, search, and export all existing logins forever; you simply cannot add new passwords. Export a 1PUX backup before cancelling.",
		howToName: "What Happens to Your Passwords When You Cancel 1Password",
		relatedSlugs: ["nordvpn", "dashlane", "lastpass", "google-one"],
	},
	{
		slug: "door-dash",
		name: "DashPass",
		category: "Food & Delivery",
		monthlyPrice: 9.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Open the DoorDash app → Account → DashPass",
			"Tap Manage → Cancel DashPass",
			"Confirm cancellation",
		],
		timeToCancel: "1 minute",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel DashPass Without Losing Order Benefits Before Expiration (2026 Hack)",
		metaDescription:
			"Cancel DashPass on iOS, Android, or desktop. Learn how to avoid accidental restaurant promo renewals and keep active order perks.",
		headline: "How to Cancel DashPass (DoorDash) and Keep $0 Delivery Fees Until Month End",
		darkPatternHack:
			"If you received free DashPass through a Chase credit card partnership, cancelling within DoorDash does not cancel your card link, but manual subscriptions keep benefits until the billing period end date.",
		howToName: "How to Cancel DashPass and Keep Delivery Benefits Until Period Ends",
		relatedSlugs: ["uber-one", "instacart", "hellofresh", "grubhub"],
	},
	{
		slug: "uber-one",
		name: "Uber One",
		category: "Food & Delivery",
		monthlyPrice: 9.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Open the Uber app → Account → Uber One",
			"Select Manage membership → Cancel",
			"Confirm — benefits last until the period ends",
		],
		timeToCancel: "1 minute",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Uber One & Bypass the 48-Hour Renewal Trap (Refund Hack 2026)",
		metaDescription:
			"Uber One charges you if not cancelled 48 hours prior to renewal. Learn how to bypass the cutoff deadline and dispute unexpected charges.",
		headline: "How to Cancel Uber One and Bypass the Strict 48-Hour Auto-Renewal Policy",
		darkPatternHack:
			"Uber One terms state you must cancel at least 48 hours before your renewal date or you will be billed for the next period. If you missed the cutoff by hours, contact Uber Help -> \"I was charged unexpectedly\" for an auto-refund.",
		howToName: "How to Cancel Uber One and Bypass the 48-Hour Renewal Trap",
		relatedSlugs: ["door-dash", "instacart", "amazon-prime", "lyft-pink"],
	},
	{
		slug: "instacart",
		name: "Instacart+",
		category: "Food & Delivery",
		monthlyPrice: 9.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Sign in at instacart.com → Account → Instacart+",
			"Choose Cancel Instacart+",
			"Confirm cancellation",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Instacart+ Free Trial Before the $99 Annual Charge Hits (2026 Hack)",
		metaDescription:
			"Avoid Instacart's surprise $99 yearly charge. Learn how to cancel Instacart+ on iPhone and desktop while keeping delivery benefits until expiry.",
		headline: "How to Cancel Instacart+ Before the Surprise $99 Annual Auto-Charge",
		darkPatternHack:
			"Instacart+ trials convert to a hefty $99 annual charge rather than monthly. Cancelling the trial inside account settings immediately locks in cancellation while keeping free delivery perks active until the trial expiration timestamp.",
		howToName: "How to Cancel Instacart+ Free Trial Before the $99 Annual Charge",
		relatedSlugs: ["amazon-prime", "door-dash", "uber-one", "walmart-plus"],
	},
	{
		slug: "factor",
		name: "Factor",
		category: "Food & Delivery",
		monthlyPrice: 70,
		cancelDifficulty: "medium",
		cancelMethod: "online",
		steps: [
			"Log into your Factor account",
			"Open Settings → Subscription → Cancel",
			"Cancel before the weekly order cutoff to avoid another box",
		],
		timeToCancel: "5 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Factor 75 Meals Permanently (Skip the 4-Week Pause Trap 2026)",
		metaDescription:
			"Factor makes it easy to skip a week, but unskipping restarts $80+ charges. Learn how to cancel Factor 75 account permanently before Wednesday.",
		headline: "How to Cancel Factor 75 Meals Permanently (Stop the Auto-Resuming Weekly Box)",
		darkPatternHack:
			"Factor 75 (owned by HelloFresh) requires cancellation by 11:59 PM ET on Wednesday prior to your delivery week. If you pause instead of cancelling, deliveries resume automatically after 4 weeks.",
		howToName: "How to Cancel Factor 75 Meals Permanently",
		relatedSlugs: ["hellofresh", "blue-apron", "home-chef", "door-dash"],
	},
	{
		slug: "home-chef",
		name: "Home Chef",
		category: "Food & Delivery",
		monthlyPrice: 50,
		cancelDifficulty: "medium",
		cancelMethod: "online",
		steps: [
			"Sign in at homechef.com",
			"Go to Account → Plan → Cancel plan",
			"Confirm before the next shipping deadline",
		],
		timeToCancel: "5 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Home Chef Account Before the Friday Cutoff Deadline (2026 Guide)",
		metaDescription:
			"Stop Home Chef meal box recurring charges. Learn the exact Friday noon cutoff rules and how to cancel your subscription permanently.",
		headline: "How to Cancel Home Chef Account (Avoid the Weekly Meal Cutoff Trap)",
		darkPatternHack:
			"Home Chef changes order statuses to \"Processing\" on Fridays at 12:00 PM CST for the following week. Once an order is processing, cancellation will not refund that box. Cancel by Thursday night to ensure $0 charged.",
		howToName: "How to Cancel Home Chef Account Before the Weekly Cutoff",
		relatedSlugs: ["hellofresh", "blue-apron", "factor", "instacart"],
	},
	{
		slug: "washington-post",
		name: "The Washington Post",
		category: "News & Learning",
		monthlyPrice: 12,
		cancelDifficulty: "medium",
		cancelMethod: "online",
		steps: [
			"Sign in at washingtonpost.com/subscribe/already-a-subscriber",
			"Manage subscription → Cancel",
			"Complete prompts and save confirmation",
		],
		timeToCancel: "5 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel The Washington Post Before the Promo Rate Jumps to $120 (2026 Hack)",
		metaDescription:
			"Cancel your Washington Post subscription online without telephone runarounds. How to stop automatic renewal after $4/month promotional deals.",
		headline: "How to Cancel The Washington Post Before the Promo Rate Jumps to $120/Year",
		darkPatternHack:
			"The Washington Post entices users with $4/month or $29/year intros that jump to $120+/year. Cancel online under Account Settings -> Subscription & Billing. If prompted to call, switch your billing ZIP code to 90210.",
		howToName: "How to Cancel The Washington Post Online Before Promo Jumps",
		relatedSlugs: ["nyt", "wsj", "the-athletic", "medium"],
	},
	{
		slug: "the-athletic",
		name: "The Athletic",
		category: "News & Learning",
		monthlyPrice: 11.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Sign in via The Athletic account page (NYT-owned login may apply)",
			"Manage subscription → Cancel",
			"Confirm cancellation",
		],
		timeToCancel: "3 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel The Athletic Online Without Calling ($1/Month Retention Deal 2026)",
		metaDescription:
			"Cancel The Athletic online in 60 seconds. Learn how to trigger the $1/month discount offer or cancel completely through NYT billing.",
		headline: "How to Cancel The Athletic Online (and Trigger the $1/Month Retention Deal)",
		darkPatternHack:
			"The Athletic has an automated retention funnel: clicking cancel prompts an instant offer of $1/month or $12 for an entire year. If you want the sports coverage cheap, accept the deal; otherwise confirm cancellation.",
		howToName: "How to Cancel The Athletic Online or Trigger $1/Month Retention Offer",
		relatedSlugs: ["nyt", "washington-post", "espn-plus", "medium"],
	},
	{
		slug: "medium",
		name: "Medium Membership",
		category: "News & Learning",
		monthlyPrice: 5,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Go to medium.com/me/membership",
			"Select Cancel membership",
			"Confirm — your published stories remain",
		],
		timeToCancel: "1 minute",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "Cancel Medium Membership Before Next Renewal (Keep Reading Lists 2026)",
		metaDescription:
			"Step-by-step guide to cancelling your $5/mo Medium subscription. Learn how to stop auto-renew on Web, Apple, or Google Play without losing bookmarks.",
		headline: "How to Cancel Medium Membership (Keep Your Story Bookmarks and History)",
		darkPatternHack:
			"If you cancel Medium on the web, you retain unlimited member reading until the current monthly or annual billing period ends. Your authored stories, claps, and bookmarks remain 100% intact on your free profile.",
		howToName: "How to Cancel Medium Membership Before Next Renewal",
		relatedSlugs: ["nyt", "substack", "washington-post", "the-athletic"],
	},
	{
		slug: "masterclass",
		name: "MasterClass",
		category: "News & Learning",
		monthlyPrice: 15,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Sign in at masterclass.com/settings/billing",
			"Choose Cancel membership",
			"Confirm — annual plans may not prorate",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel MasterClass & Claim 30-Day Money-Back Guarantee Refund (2026 Trick)",
		metaDescription:
			"Billed $180 for MasterClass annual renewal? Use our step-by-step guide to cancel auto-renew and claim a 30-day money-back refund.",
		headline: "How to Cancel MasterClass and Claim a 30-Day Full Refund",
		darkPatternHack:
			"MasterClass offers a 30-day money-back guarantee on annual memberships. If your card was charged $180 for an auto-renewal, submit a ticket at support.masterclass.com within 30 days citing their refund policy to get 100% back.",
		howToName: "How to Cancel MasterClass and Claim 30-Day Money-Back Refund",
		relatedSlugs: ["skillshare", "coursera", "duolingo", "linkedin-premium"],
	},
	{
		slug: "skillshare",
		name: "Skillshare",
		category: "News & Learning",
		monthlyPrice: 16,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Open Skillshare → Account → Billing",
			"Select Cancel membership",
			"Confirm through the App Store if that is how you subscribed",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Skillshare Free Trial Before Getting Billed $168 Annual Fee (2026)",
		metaDescription:
			"Avoid Skillshare's surprise $168 annual auto-charge. Learn how to cancel Skillshare membership on desktop and mobile before trial expiration.",
		headline: "How to Cancel Skillshare Free Trial Before Getting Billed the $168 Annual Fee",
		darkPatternHack:
			"Skillshare free trials convert into a non-refundable annual plan ($168) rather than monthly charges. If you cancel during the trial, you maintain free access until the trial ends and avoid the $168 surprise.",
		howToName: "How to Cancel Skillshare Free Trial Before the $168 Annual Charge",
		relatedSlugs: ["masterclass", "coursera", "duolingo", "canva-pro"],
	},
	{
		slug: "coursera",
		name: "Coursera Plus",
		category: "News & Learning",
		monthlyPrice: 59,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Go to coursera.org → My Purchases / Subscriptions",
			"Cancel Coursera Plus",
			"Note that certificate deadlines may still apply",
		],
		timeToCancel: "3 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Coursera Plus Without Losing Earned Certificates (2026 Guide)",
		metaDescription:
			"Will you lose Coursera certificates when canceling Plus? No. Learn how to cancel Coursera Plus monthly/annual auto-renew safely.",
		headline: "How to Cancel Coursera Plus (Keep All Earned Professional Certificates)",
		darkPatternHack:
			"All Coursera course certificates and specialization badges you have already earned are permanently tied to your profile and remain verifiable forever on LinkedIn even after cancelling Coursera Plus.",
		howToName: "How to Cancel Coursera Plus Without Losing Earned Certificates",
		relatedSlugs: ["masterclass", "skillshare", "linkedin-premium", "duolingo"],
	},
	{
		slug: "kindle-unlimited",
		name: "Kindle Unlimited",
		category: "Music & Audio",
		monthlyPrice: 11.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Visit amazon.com/kindle-dbs/hz/bookshelf and open Membership Settings",
			"Or go to Your Memberships and Subscriptions → Kindle Unlimited",
			"Cancel membership and return borrowed titles",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "What Happens to Your Books When You Cancel Kindle Unlimited? (2026 Hack)",
		metaDescription:
			"Do you keep Kindle Unlimited books after canceling? Learn the exact rules for borrowed titles, bookmarks, and how to cancel without losing notes.",
		headline: "What Happens to Your Books When You Cancel Kindle Unlimited?",
		darkPatternHack:
			"When you cancel Kindle Unlimited, borrowed titles disappear from your Kindle library at the end of the billing cycle, but your notes, highlights, and bookmarks are saved permanently on your Amazon account at read.amazon.com/notebook.",
		howToName: "What Happens to Your Books When You Cancel Kindle Unlimited",
		relatedSlugs: ["audible", "amazon-prime", "scribd", "spotify"],
	},
	{
		slug: "scribd",
		name: "Scribd",
		category: "Music & Audio",
		monthlyPrice: 11.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Sign in at scribd.com/account",
			"Open Payment & Settings → Cancel subscription",
			"Confirm cancellation",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "How to Cancel Scribd (Everand) Without Losing Saved Documents (2026 Guide)",
		metaDescription:
			"Cancel Scribd/Everand/Slideshare subscription cleanly. Learn how to pause membership for 12 weeks for free or cancel recurring billing.",
		headline: "How to Cancel Scribd (Everand) Without Losing Saved Documents or Lists",
		darkPatternHack:
			"Scribd offers an option to pause your membership for up to 12 weeks instead of cancelling, keeping your saved lists and reading history active with $0 charged. If you proceed with cancel, your lists stay safe on free tier.",
		howToName: "How to Cancel Scribd or Pause Membership for 12 Weeks",
		relatedSlugs: ["audible", "kindle-unlimited", "spotify", "medium"],
	},
	{
		slug: "tidal",
		name: "Tidal",
		category: "Music & Audio",
		monthlyPrice: 10.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Sign in at tidal.com/my-collection or account settings",
			"Manage subscription → Cancel",
			"If billed via carrier or Apple, cancel there instead",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "How to Cancel Tidal Subscription Without Losing Playlists (2026 Guide)",
		metaDescription:
			"Step-by-step guide to cancelling Tidal HiFi/HiFi Plus. How to export your music library to Spotify or Apple Music before cancellation.",
		headline: "How to Cancel Tidal HiFi Without Losing Your Playlists and Favorites",
		darkPatternHack:
			"If you subscribed to Tidal through Sprint, T-Mobile, or Apple Subscriptions, cancelling inside the Tidal app will not stop billing. Check your wireless carrier bill or Apple ID settings to stop the third-party charge.",
		howToName: "How to Cancel Tidal Subscription Without Losing Playlists",
		relatedSlugs: ["spotify", "apple-music", "youtube-premium", "audible"],
	},
	{
		slug: "walmart-plus",
		name: "Walmart+",
		category: "Shopping & Memberships",
		monthlyPrice: 12.95,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Go to walmart.com/plus/manage",
			"Select Cancel Walmart+",
			"Confirm — Paramount+ perk ends with the membership",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Walmart+ Free Trial Before Getting Charged $98/Year (2026 Hack)",
		metaDescription:
			"Cancel Walmart Plus free trial on desktop and app. Learn how to stop the $98 annual rollover while keeping Paramount+ access until expiration.",
		headline: "How to Cancel Walmart+ Free Trial Before Getting Charged $98/Year",
		darkPatternHack:
			"Walmart+ free trials convert to a $98 annual charge upon expiration. Cancelling online under \"Manage Membership\" -> \"Cancel Walmart+\" requires confirming through 3 retention screens—ensure you see the final confirmation screen.",
		howToName: "How to Cancel Walmart+ Free Trial Before the $98 Annual Fee",
		relatedSlugs: ["amazon-prime", "costco", "instacart", "paramount-plus"],
	},
	{
		slug: "costco",
		name: "Costco Membership",
		category: "Shopping & Memberships",
		monthlyPrice: 5,
		cancelDifficulty: "medium",
		cancelMethod: "in-person",
		steps: [
			"Visit a Costco warehouse membership counter with your card and ID",
			"Request cancellation / refund per the satisfaction guarantee policy",
			"Or call Costco membership services for your region",
		],
		timeToCancel: "30–60 minutes",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "How to Cancel Costco Membership for a 100% Full Refund (Policy Loophole 2026)",
		metaDescription:
			"Did you know Costco guarantees a 100% refund on membership dues at any time? Learn how to cancel and claim a full cash or card refund.",
		headline: "How to Cancel Costco Membership for a 100% Full Refund (Policy Loophole)",
		darkPatternHack:
			"Costco has a 100% satisfaction guarantee on memberships: you can cancel your Gold Star ($65) or Executive ($130) membership at any time during the year and receive a full 100% refund at the membership desk, even on month 11.",
		howToName: "How to Cancel Costco Membership and Claim 100% Full Refund",
		relatedSlugs: ["amazon-prime", "walmart-plus", "sam-club", "instacart"],
	},
	{
		slug: "espn-plus",
		name: "ESPN+",
		category: "Streaming",
		monthlyPrice: 10.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Go to espn.com/espnplus/account or Disney Bundle settings",
			"Cancel ESPN+ (or the Disney Bundle if that is how you pay)",
			"Confirm cancellation",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "Cancel ESPN+ Without Breaking Your Disney Bundle (Standalone Hack 2026)",
		metaDescription:
			"Learn how to cancel ESPN+ standalone subscriptions or remove it from the Disney Bundle without losing your Hulu watchlist or Disney+ profiles.",
		headline: "How to Cancel ESPN+ Without Breaking Your Disney+ or Hulu Subscriptions",
		darkPatternHack:
			"If you bought ESPN+ as part of the Disney Bundle, you cannot cancel ESPN+ individually inside the ESPN app. You must visit disneyplus.com/account and downgrade to the Disney Duo (Disney+ & Hulu) plan.",
		howToName: "How to Cancel ESPN+ Without Breaking Your Disney Bundle",
		relatedSlugs: ["disney-plus", "hulu", "the-athletic", "youtube-premium"],
	},
	{
		slug: "box",
		name: "Box",
		category: "Software & Cloud",
		monthlyPrice: 15,
		cancelDifficulty: "medium",
		cancelMethod: "online",
		steps: [
			"Admin Console → Account → Billing",
			"Cancel or downgrade your Box plan",
			"Download critical files before storage limits apply",
		],
		timeToCancel: "5 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Box Cloud Storage Downgrade to Free (Keep Shared Folders 2026)",
		metaDescription:
			"Downgrade Box Personal Pro or Business to the free 10GB tier. Learn how to prevent collaborator lockouts and download files before renewal.",
		headline: "How to Cancel Box Cloud Storage Without Losing Shared Folder Access",
		darkPatternHack:
			"Box requires manual cancellation at least 30 days prior to contract renewal for annual plans. Make sure to download files that exceed the 10GB free personal cap before submitting your cancellation ticket.",
		howToName: "How to Cancel Box Cloud Storage Without Losing Shared Folders",
		relatedSlugs: ["dropbox", "google-one", "microsoft-365", "icloud"],
	},
	{
		slug: "evernote",
		name: "Evernote",
		category: "Software & Cloud",
		monthlyPrice: 14.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Sign in at evernote.com/settings/billing",
			"Select Cancel plan",
			"Export notebooks if you are leaving Evernote entirely",
		],
		timeToCancel: "3 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Evernote Without Losing Notes (Export to Notion/Apple Notes Hack 2026)",
		metaDescription:
			"Billed $129 for Evernote renewal? Learn how to export your notebooks to ENEX files and downgrade to the free 1-notebook tier safely.",
		headline: "How to Cancel Evernote Without Losing Your Notes (Export ENEX Guide)",
		darkPatternHack:
			"Evernote restricted free accounts to just 1 notebook and 50 notes. Before cancelling your paid plan, export all notebooks to .enex format on desktop so you can migrate seamlessly into Notion, Obsidian, or Apple Notes.",
		howToName: "How to Cancel Evernote Without Losing Your Notes",
		relatedSlugs: ["notion", "dropbox", "microsoft-365", "google-one"],
	},
	{
		slug: "babbel",
		name: "Babbel",
		category: "News & Learning",
		monthlyPrice: 13.99,
		cancelDifficulty: "medium",
		cancelMethod: "online",
		steps: [
			"Sign in at babbel.com → My Account → Subscription",
			"Cancel subscription (App Store billing must be canceled on device)",
			"Confirm before the renewal date — many Babbel plans are prepaid terms",
		],
		timeToCancel: "5 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Babbel Auto-Renewal Before the Annual Rollover Charge (2026 Guide)",
		metaDescription:
			"Stop Babbel's automatic annual subscription renewals. Learn how to turn off auto-renew on Web, iOS, and Android while keeping vocabulary progress.",
		headline: "How to Cancel Babbel Auto-Renewal Before the Annual Rollover Charge Hits",
		darkPatternHack:
			"Babbel defaults to automatic renewal at standard non-discounted pricing. Cancel auto-renewal at least 48 hours before the expiration date under Account Information -> Settings -> Cancel Subscription.",
		howToName: "How to Cancel Babbel Auto-Renewal Before the Annual Rollover",
		relatedSlugs: ["duolingo", "masterclass", "skillshare", "coursera"],
	},
	{
		slug: "insight-timer",
		name: "Insight Timer",
		category: "Fitness & Wellness",
		monthlyPrice: 9.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Cancel via App Store / Google Play if subscribed there",
			"Or manage Membership inside the Insight Timer app settings",
			"Confirm — free meditation library remains",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "Cancel Insight Timer Member Plus & Stop In-App Subscriptions (2026 Guide)",
		metaDescription:
			"Cancel Insight Timer Member Plus $59.99 annual subscription. How to cancel through Apple Subscriptions or Google Play without losing meditation logs.",
		headline: "How to Cancel Insight Timer Plus and Stop Recurring App Store Charges",
		darkPatternHack:
			"Insight Timer Member Plus is billed almost exclusively through Apple App Store or Google Play Store. Cancelling inside the meditation app only gives instructions—you must open your phone's App Store subscriptions to stop charges.",
		howToName: "How to Cancel Insight Timer Member Plus In-App Subscriptions",
		relatedSlugs: ["headspace", "calm", "peloton", "classpass"],
	},
	{
		slug: "dashlane",
		name: "Dashlane",
		category: "VPN & Security",
		monthlyPrice: 4.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Sign in at dashlane.com → Account → Manage subscription",
			"Cancel plan and export passwords if migrating",
			"Confirm cancellation email",
		],
		timeToCancel: "3 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "What Happens to Passwords When You Cancel Dashlane? (CSV Export Hack 2026)",
		metaDescription:
			"Will you lose logins when downgrading from Dashlane Premium? Learn the 25-password free limit rules and how to export your encrypted vault.",
		headline: "What Happens to Your Passwords When You Cancel Dashlane? (Export Guide)",
		darkPatternHack:
			"Dashlane's free tier restricts users to 25 passwords on 1 device. If you have over 25 passwords, export a secure CSV or JSON archive from the Dashlane web app before your Premium subscription lapses.",
		howToName: "What Happens to Your Passwords When You Cancel Dashlane",
		relatedSlugs: ["1password", "lastpass", "nordvpn", "google-one"],
	},
	{
		slug: "lastpass",
		name: "LastPass",
		category: "VPN & Security",
		monthlyPrice: 3,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Sign in at lastpass.com → Account Settings → Renewals & Billing",
			"Turn off auto-renew / cancel subscription",
			"Export your vault before leaving",
		],
		timeToCancel: "3 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "How to Cancel LastPass Premium & Safely Export All Passwords (2026 Guide)",
		metaDescription:
			"Cancel LastPass Premium auto-renewal and export your vault passwords to 1Password or Bitwarden. Step-by-step security migration guide.",
		headline: "How to Cancel LastPass Premium and Safely Export Your Vault Passwords",
		darkPatternHack:
			"LastPass limits free users to either mobile OR computer devices, not both. Before cancelling Premium, export your vault from the LastPass browser extension under Advanced Options -> Export -> CSV.",
		howToName: "How to Cancel LastPass Premium and Safely Export Passwords",
		relatedSlugs: ["1password", "dashlane", "nordvpn", "google-one"],
	},
	{
		slug: "substack",
		name: "Substack",
		category: "News & Learning",
		monthlyPrice: 10,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Open substack.com/account/subscriptions or the publication’s settings",
			"Cancel each paid newsletter individually",
			"Confirm — free email subscriptions can stay active",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "How to Cancel Substack Paid Subscriptions & Stop Stripe Auto-Charges (2026)",
		metaDescription:
			"Cancel individual paid Substack newsletters in 2 clicks. How to downgrade to free reader tier without unsubscribing from email delivery.",
		headline: "How to Cancel Paid Substack Subscriptions and Stop Recurring Stripe Charges",
		darkPatternHack:
			"On Substack, cancelling a paid subscription does not unsubscribe you from the author's newsletter. It simply downgrades your tier to \"Free Reader\" so you keep receiving public posts without credit card charges.",
		howToName: "How to Cancel Substack Paid Subscriptions Without Unsubscribing",
		relatedSlugs: ["medium", "nyt", "washington-post", "the-athletic"],
	},
	{
		slug: "miro",
		name: "Miro",
		category: "Software & Cloud",
		monthlyPrice: 8,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Open Miro team settings → Billing",
			"Downgrade to Free or cancel paid plan",
			"Export boards you need before plan limits apply",
		],
		timeToCancel: "3 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Miro Team Subscription & Delete Hidden Paid Seats (2026 Hack)",
		metaDescription:
			"Stop surprise Miro invoices. Learn how to downgrade editor seats to free viewers and cancel team subscriptions before annual rollover.",
		headline: "How to Cancel Miro Subscription and Delete Hidden Paid Member Seats",
		darkPatternHack:
			"Like Figma, Miro automatically converts guest board collaborators into paid team members ($8–$16/mo) if they are granted edit rights. Audit and remove extra team members under Company Settings -> Active Users before cancelling.",
		howToName: "How to Cancel Miro Team Subscription and Delete Hidden Paid Seats",
		relatedSlugs: ["figma", "notion", "canva-pro", "microsoft-365"],
	},
	{
		slug: "sam-club",
		name: "Sam's Club",
		category: "Shopping & Memberships",
		monthlyPrice: 4.17,
		cancelDifficulty: "medium",
		cancelMethod: "in-person",
		steps: [
			"Visit a Sam’s Club Member Services desk with your membership card",
			"Request cancellation under the membership satisfaction policy",
			"Or manage some memberships online via your account portal",
		],
		timeToCancel: "30–60 minutes",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "How to Cancel Sam's Club Membership and Claim a Full Refund (2026 Policy Hack)",
		metaDescription:
			"Sam's Club 100% Membership Guarantee lets you cancel and get a full refund at any time. Learn how to cancel online, by phone, or at the Member Desk.",
		headline: "How to Cancel Sam's Club Membership and Claim a 100% Full Refund",
		darkPatternHack:
			"Sam's Club offers a 100% refund guarantee on memberships: \"If at any time you're not satisfied, we will refund your membership in full.\" Request cancellation at the Member Services desk or call 1-888-746-7726 for full credit.",
		howToName: "How to Cancel Sam's Club Membership and Claim a Full Refund",
		relatedSlugs: ["costco", "amazon-prime", "walmart-plus", "instacart"],
	},
	{
		slug: "lyft-pink",
		name: "Lyft Pink",
		category: "Shopping & Memberships",
		monthlyPrice: 9.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Open the Lyft app → Menu → Lyft Pink",
			"Tap Manage → Cancel membership",
			"Confirm cancellation",
		],
		timeToCancel: "1 minute",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "How to Cancel Lyft Pink Subscription Before Auto-Renew Charges (2026)",
		metaDescription:
			"Cancel Lyft Pink $9.99/mo or $99/yr subscription on iOS and Android. How to cancel without affecting Chase Sapphire Reserve perks.",
		headline: "How to Cancel Lyft Pink Before Auto-Renewal (Bypass Chase Card Confusion)",
		darkPatternHack:
			"If your Lyft Pink is complimentary through a Chase credit card partnership, you do not need to cancel—it will not bill automatically. If you purchased a standalone plan, cancel under Lyft App -> Lyft Pink -> Manage Plan.",
		howToName: "How to Cancel Lyft Pink Subscription Before Auto-Renewal",
		relatedSlugs: ["uber-one", "door-dash", "amazon-prime", "walmart-plus"],
	},
	{
		slug: "grubhub",
		name: "Grubhub+",
		category: "Food & Delivery",
		monthlyPrice: 9.99,
		cancelDifficulty: "easy",
		cancelMethod: "online",
		steps: [
			"Open Grubhub → Account → Grubhub+",
			"Select Cancel Grubhub+",
			"Confirm — some plans are tied to credit-card perks",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "How to Cancel Grubhub+ Without Affecting Your Amazon Prime (2026 Guide)",
		metaDescription:
			"Cancel Grubhub+ $9.99/month subscription. Learn how Amazon Prime members can manage free Grubhub+ perks without paying surprise monthly fees.",
		headline: "How to Cancel Grubhub+ (Without Affecting Your Amazon Prime Membership)",
		darkPatternHack:
			"Amazon Prime members receive free Grubhub+ indefinitely as a perk. If Grubhub bills your card, your account was unlinked from Prime. Relink through amazon.com/grubhub to restore free status or cancel standalone billing.",
		howToName: "How to Cancel Grubhub+ Without Affecting Amazon Prime",
		relatedSlugs: ["door-dash", "uber-one", "instacart", "hellofresh"],
	},
	{
		slug: "bloomberg",
		name: "Bloomberg",
		category: "News & Learning",
		monthlyPrice: 34.99,
		cancelDifficulty: "hard",
		cancelMethod: "online",
		steps: [
			"Sign in at bloomberg.com/subscriptions",
			"Manage subscription → Cancel (chat/phone may be required)",
			"Request written confirmation of the end date",
		],
		timeToCancel: "15–30 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Bloomberg Subscription Without Calling (Retention Loophole 2026)",
		metaDescription:
			"Escape Bloomberg's telephone cancellation requirement. Learn how to cancel digital access online or via live chat support without contract penalties.",
		headline: "How to Cancel Bloomberg Subscription Online (Bypass the Phone Call Trap)",
		darkPatternHack:
			"Bloomberg digital subscriptions often show \"Contact Customer Support to cancel\" in account settings. Loophole: Use the Bloomberg live chat button in the bottom right corner of the Help Center to cancel via automated bot in 2 minutes.",
		howToName: "How to Cancel Bloomberg Subscription Online Without Calling",
		relatedSlugs: ["wsj", "financial-times", "nyt", "washington-post"],
	},
	{
		slug: "financial-times",
		name: "Financial Times",
		category: "News & Learning",
		monthlyPrice: 39,
		cancelDifficulty: "hard",
		cancelMethod: "online",
		steps: [
			"Sign in at ft.com/myaccount",
			"Manage subscription → Cancel",
			"Complete any required chat verification and save confirmation",
		],
		timeToCancel: "10–20 minutes",
		willTheyOfferDiscount: true,
		saveWithCancelKits: true,
		metaTitle: "Cancel Financial Times (FT) Online Without Notice Period Fees (2026)",
		metaDescription:
			"Cancel Financial Times subscription without hidden fees. Learn how to cancel online, avoid automatic renewals, and manage corporate multi-user plans.",
		headline: "How to Cancel Financial Times (FT) Online Without 30-Day Notice Fees",
		darkPatternHack:
			"The Financial Times contract requires notice prior to your renewal date or an extra billing period is charged. Log into ft.com/myaccount -> Subscription -> Cancel and request immediate confirmation email.",
		howToName: "How to Cancel Financial Times Online Without Notice Period Fees",
		relatedSlugs: ["wsj", "bloomberg", "nyt", "washington-post"],
	},
	{
		slug: "chatgpt-plus",
		name: "ChatGPT Plus",
		category: "Software & Cloud",
		monthlyPrice: 20,
		cancelDifficulty: "easy",
		cancelDifficultyScore: 2,
		difficultyNotes: "Easy 2-click cancellation via billing portal",
		cancelMethod: "online",
		steps: [
			"Log in to chatgpt.com on your web browser",
			"Click your profile icon at the bottom-left corner and open Settings",
			"Under Account / Subscription, click Manage My Subscription",
			"You will be redirected to the Stripe billing portal — select Cancel Plan",
			"Confirm cancellation — you keep full GPT-4/Plus access until the billing period ends",
		],
		timeToCancel: "2 minutes",
		willTheyOfferDiscount: false,
		saveWithCancelKits: true,
		metaTitle: "How to Cancel ChatGPT Plus Without Losing Custom GPTs or Chat History (2026)",
		metaDescription:
			"Downgrade ChatGPT Plus to the free tier. Learn what happens to your custom GPTs, uploaded files, and conversation history after cancellation.",
		headline: "How to Cancel ChatGPT Plus Without Losing Custom GPTs or Chat History",
		darkPatternHack:
			"Cancelling ChatGPT Plus ($20/mo) does NOT delete your conversation history, saved prompts, or custom GPTs you created. Custom GPTs remain saved in your account; you simply revert to standard GPT-4o mini rate limits.",
		howToName: "How to Cancel ChatGPT Plus Without Losing Custom GPTs or History",
		relatedSlugs: ["notion", "canva-pro", "adobe", "microsoft-365"],
	},
] as Service[];

const alternativesByCategory: Record<ServiceCategory, Alternative[]> = {
	Streaming: [{ name: 'Plex', description: 'Free Netflix alternative', affiliateUrl: 'https://plex.tv?ref=cancelkit', monthlyCost: 0, commission: '$5 per signup', category: 'streaming' }, { name: 'Peacock', description: 'More shows for less', affiliateUrl: 'https://peacocktv.com?ref=cancelkit', monthlyCost: 5, commission: 'Affiliate commission', category: 'streaming' }, { name: 'Tubi', description: 'Free streaming', affiliateUrl: 'https://tubitv.com?ref=cancelkit', monthlyCost: 0, commission: 'Affiliate commission', category: 'streaming' }],
	'Fitness & Wellness': [{ name: 'Fitbod', description: 'Personalized workouts', affiliateUrl: 'https://fitbod.me?ref=cancelkit', monthlyCost: 13, commission: 'Affiliate commission', category: 'fitness' }, { name: 'Nike Training Club', description: 'Free training plans', affiliateUrl: 'https://nike.com?ref=cancelkit', monthlyCost: 0, commission: 'Affiliate commission', category: 'fitness' }, { name: 'YouTube Fitness', description: 'Free fitness videos', affiliateUrl: 'https://youtube.com?ref=cancelkit', monthlyCost: 0, commission: 'Affiliate commission', category: 'fitness' }],
	'News & Learning': [{ name: 'Ground News', description: 'Compare news coverage', affiliateUrl: 'https://ground.news?ref=cancelkit', monthlyCost: 9, commission: 'Affiliate commission', category: 'news' }, { name: 'Substack', description: 'Independent newsletters', affiliateUrl: 'https://substack.com?ref=cancelkit', monthlyCost: 0, commission: 'Affiliate commission', category: 'news' }],
	'Music & Audio': [{ name: 'YouTube Music', description: 'Music for less', affiliateUrl: 'https://music.youtube.com?ref=cancelkit', monthlyCost: 10, commission: 'Affiliate commission', category: 'music' }, { name: 'Deezer', description: 'Music streaming', affiliateUrl: 'https://deezer.com?ref=cancelkit', monthlyCost: 0, commission: 'Affiliate commission', category: 'music' }],
	'VPN & Security': [{ name: 'Proton VPN', description: 'Privacy-first VPN', affiliateUrl: 'https://protonvpn.com?ref=cancelkit', monthlyCost: 0, commission: '40% commission', category: 'vpn' }, { name: 'Mullvad', description: 'Simple privacy', affiliateUrl: 'https://mullvad.net?ref=cancelkit', monthlyCost: 5, commission: 'Affiliate commission', category: 'vpn' }],
	'Software & Cloud': [{ name: 'pCloud', description: 'Lifetime cloud storage', affiliateUrl: 'https://pcloud.com?ref=cancelkit', monthlyCost: 0, commission: '$35 commission', category: 'cloud' }, { name: 'Backblaze', description: 'Simple backup', affiliateUrl: 'https://backblaze.com?ref=cancelkit', monthlyCost: 9, commission: 'Affiliate commission', category: 'cloud' }],
	'Food & Delivery': [], 'Shopping & Memberships': [],
};
for (const service of services) service.alternatives = alternativesByCategory[service.category];

export const categoryOrder: ServiceCategory[] = [
	'Streaming',
	'Music & Audio',
	'Software & Cloud',
	'Fitness & Wellness',
	'News & Learning',
	'VPN & Security',
	'Food & Delivery',
	'Shopping & Memberships',
];

export function getServiceBySlug(slug: string): Service | undefined {
	return services.find((service) => service.slug === slug);
}

export function getRelatedServices(service: Service, limit = 4): Service[] {
	const fromSlugs = (service.relatedSlugs ?? [])
		.map((slug) => getServiceBySlug(slug))
		.filter((item): item is Service => Boolean(item) && item.slug !== service.slug);

	if (fromSlugs.length >= limit) return fromSlugs.slice(0, limit);

	const fillers = services.filter(
		(item) =>
			item.slug !== service.slug &&
			item.category === service.category &&
			!fromSlugs.some((related) => related.slug === item.slug),
	);

	return [...fromSlugs, ...fillers].slice(0, limit);
}

export function getServicesByCategory(): { category: ServiceCategory; services: Service[] }[] {
	return categoryOrder
		.map((category) => ({
			category,
			services: services.filter((service) => service.category === category),
		}))
		.filter((group) => group.services.length > 0);
}

export function difficultyLabel(difficulty: CancelDifficulty): string {
	switch (difficulty) {
		case 'easy':
			return 'Easy';
		case 'medium':
			return 'Medium';
		case 'hard':
			return 'Hard';
		case 'nightmare':
			return 'Nightmare';
	}
}

export function formatPrice(price: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: price % 1 === 0 ? 0 : 2,
		maximumFractionDigits: 2,
	}).format(price);
}

export function buildFaqs(service: Service) {
	const name = service.name;
	return [
		{
			question: `Does cancelling ${name} immediately stop charges?`,
			answer: `Usually no. After you cancel ${name}, you typically keep access until the end of the current billing period, then renewals stop. Always check your confirmation email for the exact end date.`,
		},
		{
			question: `How long does it take to cancel ${name}?`,
			answer: `Most people finish in about ${service.timeToCancel} when canceling ${service.cancelMethod === 'online' ? 'online' : `via ${service.cancelMethod}`}. Harder plans can take longer if retention calls or in-person visits are required.`,
		},
		{
			question: `Will ${name} offer a discount if I try to cancel?`,
			answer: service.willTheyOfferDiscount
				? `Yes — ${name} often shows a retention discount or pause offer before canceling completes. You can accept it or decline and finish canceling.`
				: `${name} usually does not push a heavy discount flow, but offers can still appear depending on your plan and billing country.`,
		},
		{
			question: `Can I cancel ${name} with CancelKits?`,
			answer: service.saveWithCancelKits
				? `Yes. CancelKits can cancel ${name} for you in one click so you do not have to dig through account menus or phone trees.`
				: `CancelKits can still track ${name} renewals and remind you before the next charge, even when the provider requires a manual step.`,
		},
	];
}

export function getCancelDifficultyScore(service: Service): number {
	if (typeof service.cancelDifficultyScore === 'number') {
		return service.cancelDifficultyScore;
	}
	if (service.cancelMethod === 'in-person' || service.cancelDifficulty === 'nightmare') return 9;
	if (service.cancelMethod === 'phone' || service.cancelDifficulty === 'hard') return 7;
	if (service.cancelDifficulty === 'medium') return 5;
	return 2;
}

export function getDifficultyNotes(service: Service): string {
	if (service.difficultyNotes) {
		return service.difficultyNotes;
	}
	if (service.cancelMethod === 'in-person') return 'Requires in-person club visit or certified mail';
	if (service.cancelMethod === 'phone') return 'Phone call required with retention agents';
	if (service.cancelDifficulty === 'nightmare') return 'Multi-step retention flow and hidden cancellation settings';
	if (service.cancelDifficulty === 'hard') return 'Multiple retention prompts, survey screens, or wait times';
	if (service.cancelDifficulty === 'medium') return 'Online cancellation with multiple confirmation prompts';
	return 'Straightforward 1–2 click online self-service cancellation';
}

export type DifficultyTier = 'nightmare' | 'hard' | 'easy';

export function getDifficultyTier(score: number): DifficultyTier {
	if (score >= 8) return 'nightmare';
	if (score >= 5) return 'hard';
	return 'easy';
}

export const SERVICE_ALIASES: Record<string, string> = {
	'planet': 'planet-fitness',
	'planet-fitness-black-card': 'planet-fitness',
	'canva': 'canva-pro',
	'disney': 'disney-plus',
	'nord': 'nordvpn',
	'paramount': 'paramount-plus',
	'samsclub': 'sam-club',
	'sam-s-club': 'sam-club',
	'sam-s-club-plus': 'sam-club',
	'sam-club-plus': 'sam-club',
	'adobe-cc': 'adobe',
	'adobe-creative-cloud': 'adobe',
	'linkedin': 'linkedin-premium',
	'doordash': 'door-dash',
	'dashpass': 'door-dash',
	'chatgpt': 'chatgpt-plus',
	'openai': 'chatgpt-plus',
	'hulu-no-ads': 'hulu',
	'netflix-standard': 'netflix',
	'spotify-premium': 'spotify',
	'the-new-york-times': 'nyt',
	'new-york-times': 'nyt',
	'audible-premium': 'audible',
	'dropbox-plus': 'dropbox',
	'max': 'hbo-max',
	'hbo': 'hbo-max',
	'amazon': 'amazon-prime',
	'prime': 'amazon-prime',
	'youtube': 'youtube-premium',
	'apple-music-subscription': 'apple-music',
	'office-365': 'microsoft-365',
	'office365': 'microsoft-365',
	'ms-365': 'microsoft-365',
	'express-vpn': 'expressvpn',
};

export function resolveServiceSlug(raw: string, fallbackName?: string): string | null {
	if (!raw && !fallbackName) return null;
	const clean = (raw || '').toLowerCase().trim().replace(/^custom-/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
	
	if (clean) {
		const direct = services.find((s) => s.slug === clean);
		if (direct) return direct.slug;
		if (SERVICE_ALIASES[clean]) {
			const target = SERVICE_ALIASES[clean];
			if (services.some((s) => s.slug === target)) return target;
		}
	}

	if (fallbackName) {
		const cleanName = fallbackName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
		const directByName = services.find((s) => s.slug === cleanName);
		if (directByName) return directByName.slug;
		if (SERVICE_ALIASES[cleanName]) {
			const target = SERVICE_ALIASES[cleanName];
			if (services.some((s) => s.slug === target)) return target;
		}
		for (const s of services) {
			if (cleanName.includes(s.slug) || s.slug.includes(cleanName)) {
				return s.slug;
			}
		}
	}

	if (clean) {
		for (const s of services) {
			if (clean.includes(s.slug) || s.slug.includes(clean)) {
				return s.slug;
			}
		}
	}

	return null;
}

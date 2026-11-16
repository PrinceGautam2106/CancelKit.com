import type { Service } from './services';

export const APPLE_CANCEL = 'https://support.apple.com/en-us/118428';
export const APPLE_REFUND = 'https://support.apple.com/en-us/118223';
export const GOOGLE_CANCEL = 'https://support.google.com/googleplay/answer/7018481?hl=en';
export const GOOGLE_REFUND = 'https://support.google.com/googleplay/answer/15574897?hl=en';

export interface GuideDetails {
  source: string;
  web: string[];
  refund: string;
  refundSource?: string;
  note?: string;
  email?: string;
  phone?: string;
  storeBilling?: boolean;
  needsReview?: boolean;
  ios?: string[];
  android?: string[];
}

// Each record cites the provider document behind the instructions. Do not infer
// emails, telephone numbers, refund windows or cancellation URLs from a slug.
const rows: Record<string, GuideDetails> = {
  'paramount-plus': {
    source: 'https://cbsi.my.salesforce-sites.com/CBSi/articles/en_US/Knowledge/PD-How-can-I-cancel-my-Paramount-subscription?template=template_mobileppr',
    web: ['Sign in at paramountplus.com.', 'Select your username in the upper-right corner and open Account.', 'Scroll to Cancel subscription and complete the confirmation prompts.', 'If you cannot sign in, open the official help-center chat and request an agent. Store, Roku, Amazon and channel subscriptions must be cancelled with that billing platform.'],
    refund: 'Ask the billing platform to assess your payment under its current terms. The cancellation article does not establish a universal refund promise.'
  },
  'espn-plus': {
    source: 'https://support.espn.com/hc/en-us/articles/40377550796308-Cancelling-Your-ESPN-Select-or-Unlimited-Subscription',
    web: ['Sign in to ESPN in a computer or mobile browser and select your profile picture.', 'Open Account under Manage My Account, then Manage Subscription.', 'Under Plans & Billing select the subscription and the plan to cancel.', 'Select Cancel and confirm. For a third-party or Disney bundle purchase, use that biller’s route instead.'],
    refund: 'ESPN’s current direct-billing cancellation page says there are no refunds or credits for partially used billing periods. Access continues until the current cycle ends. Third-party billing has separate policies.',
    note: 'ESPN’s current documentation uses Select and Unlimited plan names. Check the actual plan and biller for an older ESPN+ subscription.'
  },
  grubhub: {
    source: 'https://lp.grubhub.com/legal/plus/',
    web: ['Sign in at grubhub.com or seamless.com.', 'Open the upper-right account menu, then Grubhub+.', 'Select Cancel membership, then confirm Cancel membership.', 'Complete cancellation at least 24 hours before the next scheduled payment; special partner offers may require that partner’s cancellation route.'],
    ios: ['Sign in to the Grubhub app.', 'Tap Account → Grubhub+ membership → Manage Membership.', 'Tap Cancel membership and confirm Cancel membership.', 'Keep confirmation and check the effective date. Some partner offers use their own cancellation channel.'],
    android: ['Sign in to the Grubhub app.', 'Tap Account → Grubhub+ membership → Manage Membership.', 'Tap Cancel membership and confirm Cancel membership.', 'Keep confirmation and check the effective date. Some partner offers use their own cancellation channel.'],
    refund: 'Grubhub+ membership charges and partially used periods are generally not refundable, subject to applicable law and discretionary exceptions. Cancelling normally preserves paid benefits through the term; promotional benefits may end earlier.',
    refundSource: 'https://lp.grubhub.com/legal/plus/', storeBilling: false
  },
  netflix: {
    source: 'https://help.netflix.com/en/node/407',
    web: ['Sign in to Netflix and open Account, then Manage your membership.', 'Select Cancel, then Finish Cancellation. A pause offer is a different action.', 'Save the confirmation email and check the date your membership ends.'],
    refund: 'Cancellation stops future renewals; it does not itself request a refund. Netflix says remaining paid time normally stays available. Ask Netflix support about a disputed or mistaken charge; partner-billed accounts must use that partner.',
    note: 'If Cancel is missing, the Membership section identifies your payment partner and its cancellation route. Deleting the app or signing out does not cancel.'
  },
  spotify: {
    source: 'https://support.spotify.com/us/article/cancel-premium/',
    web: ['Sign in to the Spotify account that has Premium.', 'On the account page, select Cancel plan under Your plan or Manage your plan.', 'Continue until Spotify displays the cancellation confirmation and switch-to-Free date.'],
    refund: 'Review Spotify’s refund policy separately from cancellation. Payments through a partner must be raised with that partner; do not assume a partial-month refund.',
    refundSource: 'https://support.spotify.com/us/article/refund-policy/',
    note: 'A Family or Duo member leaving the plan does not cancel the manager’s subscription. A zero-priced trial can end immediately; playlists and saved music remain.'
  },
  adobe: {
    source: 'https://helpx.adobe.com/account/individual/subscriptions-and-plans/renewals-and-cancellations/cancel-adobe-subscription.html',
    web: ['Sign in to your Adobe account and open Plans.', 'Choose Manage plan, then Cancel your plan for the specific subscription.', 'Review the displayed fee, access end date and refund before continuing. Select a reason and proceed to Confirm cancellation.', 'Save Adobe’s confirmation email. If payment is processing, wait and retry as instructed by Adobe.'],
    refund: 'For most Adobe plans, cancellation within 14 days of the initial purchase qualifies for a full refund. Later cancellation depends on the plan and country. An annual commitment billed monthly can incur 50% of the remaining contract balance; monthly billing does not necessarily mean a monthly contract.',
    note: 'Use the terms for your own country and plan. A plan change is a new purchase decision, not a guaranteed way to avoid a fee.'
  },
  hulu: {
    source: 'https://help.hulu.com/article/hulu-cancel-hulu-subscription',
    web: ['Sign in to Hulu’s Account page in a computer or mobile browser.', 'Under Your Subscription, select Cancel.', 'If offered a pause, choose Continue to Cancel, then Cancel Subscription.', 'Check that the Account page says the subscription will be cancelled and retain the email confirmation.'],
    refund: 'The cancellation instructions confirm remaining billing-cycle access, not a refund promise. Contact the biller shown in Payment Information for a refund decision. A Hulu + Live TV trial can end immediately when cancelled.',
    note: 'Existing subscriptions outside a bundle may continue separately. Check each biller instead of assuming a bundle cancellation ends every plan.'
  },
  'disney-plus': {
    source: 'https://help.disneyplus.com/article/disneyplus-cancel',
    web: ['Sign in to Disney+ in a browser and open your Account.', 'In Subscription, select the plan you pay for.', 'Select Cancel Subscription and complete the displayed confirmation prompts.', 'Record the end date. If the account names a third-party biller, cancel with that provider.'],
    refund: 'Cancellation and refund approval are separate. Ask Disney+ support about a directly billed charge; app stores and other billing partners decide their own refund requests.',
    note: 'Check separately billed Disney+, Hulu and ESPN plans; cancelling a bundle does not necessarily cancel older standalone subscriptions.'
  },
  'hbo-max': {
    source: 'https://help.hbomax.com/us/Answer/Detail/000002526',
    web: ['Open HBO Max, choose an adult profile, then Subscription to identify who bills you.', 'For direct billing, open the subscription-management option and select Cancel your subscription.', 'Complete the confirmation. For Apple, Google, Amazon, Roku or a TV provider, follow that biller’s cancellation route instead.', 'Check the subscription end date and keep the confirmation.'],
    refund: 'HBO Max’s refund policy depends on the billing provider. Identify the biller in Subscription before requesting a refund; cancelling alone does not establish eligibility.',
    refundSource: 'https://help.hbomax.com/us/Answer/Detail/000002522'
  },
  'amazon-prime': {
    source: 'https://digprjsurvey.amazon.com/csad/help/node/G2B9L3YR7LR8J4XP',
    web: ['Sign in to the Amazon account paying for Prime and open Prime Membership.', 'Open the membership-management controls and choose the option to end membership.', 'Review the final date and any refund displayed; continue through the confirmation screens.', 'Save the membership confirmation. If a third party bills you, contact that provider.'],
    refund: 'US Prime terms distinguish cancellation within three business days of signup or trial conversion from later cancellation. Benefits used can reduce an early refund; a later full refund generally requires no eligible purchases or Prime benefits used since the latest charge. Third-party terms can differ.',
    storeBilling: false
  },
  'apple-one': {
    source: APPLE_CANCEL,
    web: ['Open Apple’s subscription-management page from the linked support article and sign in to the paying Apple Account.', 'Select Apple One and choose Cancel Subscription.', 'Confirm and note which bundle benefits end and when. Check separately billed services as well.'],
    refund: 'Apple reviews refund eligibility by purchase and region. Request a refund at reportaproblem.apple.com; stopping renewal does not automatically refund a payment.', refundSource: APPLE_REFUND,
    ios: ['Open Settings on iPhone or iPad and tap your name.', 'Open Subscriptions → Apple One.', 'Tap Cancel Subscription, confirm and save the displayed expiry date.'],
    android: ['Open Apple’s cancellation instructions in Chrome and follow its online subscription-management link.', 'Sign in with the Apple Account paying for Apple One.', 'Select Apple One, cancel and save confirmation. Apple One is not a Google Play subscription.'],
    note: 'Apple One is Apple-billed; check separately billed Apple services as well.', storeBilling: false
  },
  'youtube-premium': {
    source: 'https://support.google.com/youtube/answer/6308278?hl=en',
    web: ['Sign in and open youtube.com/paid_memberships.', 'Select Manage membership, then Deactivate.', 'Choose Continue to cancel, select a reason, then Next and Yes, cancel.', 'Confirm the membership end date; Apple- or Google Play-billed plans must use the store that bills them.'],
    refund: 'YouTube does not ordinarily refund the unused interval between cancellation and the paid membership end date. Faulty features may qualify for review. Apple purchases require Apple’s approval; other purchase types have separate conditions.',
    refundSource: 'https://support.google.com/youtube/answer/12014038?hl=en'
  },
  'planet-fitness': {
    source: 'https://www.planetfitness.com/about-planet-fitness/customer-service/',
    web: ['Find your home club and retrieve your signed membership agreement.', 'Check the club’s current cancellation options and whether your account offers online cancellation.', 'Use the method your club requires; if the online option is unavailable, ask the home club for its in-person or written cancellation process.', 'Obtain written confirmation of the effective cancellation date, final draft and any commitment fee.'],
    refund: 'Fees, notice deadlines and any refund depend on the home club and your agreement. Ask that club to review the specific charge. There is no universal refund or fee-waiver promise in this guide.',
    note: 'A club membership is not an Apple or Google Play subscription simply because you installed the gym app.', storeBilling: false
  },
  peloton: {
    source: 'https://support.onepeloton.com/s/article/Peloton-Membership-How-to-Manage-Your-All-Access-Membership?language=en_US',
    web: ['Sign in to your Peloton membership account and identify whether you have All-Access or an App membership.', 'For All-Access, select Manage beside the subscription, then Pause or cancel.', 'Choose cancellation and follow the remaining confirmation prompts.', 'App memberships bought through a third party must be cancelled through that provider. Keep the end-date confirmation.'],
    refund: 'Hardware returns, membership cancellation and App-store refunds are separate processes. Ask Peloton support to assess your membership charge under the terms for the plan you bought; no automatic refund is promised here.',
    phone: '(866) 679-9129'
  },
  headspace: {
    source: 'https://help.headspace.com/hc/en-us/articles/115008364988-How-do-I-cancel-my-subscription',
    web: ['Sign in at headspace.com in a desktop or mobile browser.', 'Open headspace.com/subscription/manage.', 'Choose CANCEL MEMBERSHIP and complete confirmation. If the button is missing, contact help@headspace.com.'],
    refund: 'Headspace describes direct website subscriptions as non-refundable, while inviting support review for special circumstances. Store purchases must be reviewed by Apple or Google under their policies.', email: 'help@headspace.com'
  },
  calm: {
    source: 'https://support.calm.com/hc/en-us/articles/115002473607-How-to-Cancel-Your-Subscription-or-Free-Trial',
    web: ['Check the receipt to find whether Calm, Apple or Google bills you.', 'For a Calm website purchase, sign in on the website and open the subscription-management settings.', 'Turn off renewal using the cancellation option and complete confirmation.', 'For store purchases, cancel with that store and check the expiry date.'],
    refund: 'Cancelling does not automatically create a refund. Calm’s refund page describes eligibility by purchase channel and subscription type; submit a request promptly rather than assuming all charges qualify.',
    refundSource: 'https://support.calm.com/hc/en-us/articles/360008240974-Calm-App-Refund-Policy-How-to-Get-Your-Money-Back',
    note: 'Calm says it does not offer phone support. Use the Support widget or Submit a request form in its help center.'
  },
  audible: {
    source: 'https://help.audible.com/s/article/cancel-membership?language=en_US',
    web: ['Sign in to Audible. On desktop choose your name; on mobile web open the menu, then your name.', 'Open Membership details.', 'Choose Cancel membership, then Confirm cancellation.', 'Keep the email confirmation and check Membership details for the changed status.'],
    refund: 'Membership cancellation is separate from returning an audiobook or requesting a billing refund. Ask Audible support about the charge and biller. This guide does not promise a 48-hour refund or a prorated membership refund.',
    note: 'Check credit rules before cancelling: direct-billed unused membership credits can expire. Purchased audiobooks remain in your library. Apple/Google subscriptions use their respective store procedures.'
  },
  'linkedin-premium': {
    source: 'https://www.linkedin.com/help/linkedin/answer/a7152614',
    web: ['Sign in to the LinkedIn account with Premium and open Manage Premium.', 'Open subscription management and choose Cancel subscription.', 'Continue until cancellation is confirmed and note the billing-cycle end date.', 'An Apple App Store purchase must be managed through Apple.'],
    refund: 'LinkedIn says Premium may qualify for a refund within seven days of the charge without Premium usage. Previous refunds can affect eligibility. Apple handles refunds for iOS store purchases.',
    refundSource: 'https://www.linkedin.com/help/linkedin/answer/a1337140'
  },
  'canva-pro': {
    source: 'https://www.canva.com/help/cancel-canva-plan/',
    web: ['Sign in to the correct Canva account and team.', 'Open the profile menu, then Settings → Billing.', 'On the plan choose Cancel plan, then Continue cancellation.', 'Select a reason, continue and choose Cancel subscription. Save the confirmation email.'],
    refund: 'Canva says subscriptions are generally non-refundable but reviews individual requests. Apple handles App Store refunds. Cancelling a physical card does not necessarily stop a Canva subscription.',
    refundSource: 'https://www.canva.com/help/subscription-refunds/'
  },
  dropbox: {
    source: 'https://help.dropbox.com/plans/downgrade-dropbox-individual-plans',
    web: ['Sign in to Dropbox with the account that owns the paid individual plan.', 'Open the plan-management settings and choose Cancel plan.', 'Complete the cancellation prompts and check the downgrade confirmation.', 'If you bought the subscription on a mobile device through Apple or Google, cancel in that store instead.'],
    refund: 'Dropbox eligibility varies by location and purchase type. Its help pages describe a 14-day option for eligible purchases; check the refund page for your plan before relying on it. Store-billed refunds go through the store.',
    refundSource: 'https://help.dropbox.com/plans/refund',
    note: 'Back up important files and check the storage allowance after downgrade. This guide covers individual subscriptions; team plans have administrator-specific steps.'
  },
  icloud: {
    source: 'https://support.apple.com/en-us/108318',
    web: ['Use an Apple device to open the iCloud storage-plan settings for the paying Apple Account.', 'Choose the downgrade or cancellation option and select the required lower plan, including free 5 GB if appropriate.', 'Confirm the change and its effective date.', 'Without an Apple device, follow Apple’s linked iCloud+ cancellation support process.'],
    refund: 'Apple says to contact it within 14 days if you recently changed the iCloud+ plan and want a refund. Regional rules apply; a downgrade alone is not a refund request.',
    ios: ['On iOS/iPadOS 18.4 or later, open Settings → your name → Subscriptions → iCloud+.', 'Tap Cancel Subscription to end iCloud+, or See All Plans to downgrade. Follow the confirmation prompts.', 'On iOS/iPadOS 18–18.3, use Settings → your name → iCloud → Manage Plan → Downgrade Options. Choose the new plan and Done.', 'On iOS/iPadOS 17 or earlier, use iCloud → Manage Account Storage → Downgrade Options. Confirm the selected plan and effective date.'],
    android: ['In Chrome, open Apple’s official “cancel iCloud+ without an Apple device” instructions at support.apple.com/121290.', 'Follow its online support process using the paying Apple Account.', 'Keep confirmation. iCloud+ is not cancelled in Google Play.'],
    note: 'Download or remove data exceeding the new allowance before downgrade.', storeBilling: false
  },
  'google-one': {
    source: 'https://support.google.com/googleone/answer/9056360?hl=en',
    web: ['Sign in to the correct Google account and open Google One.', 'Open Settings, then Cancel membership.', 'Confirm Cancel membership and check the cancellation message.', 'If purchased through Apple, use the Apple Account that paid for it.'],
    refund: 'In most countries, Google storage-plan purchases are non-refundable. Local exceptions and App Store policies can apply. Check the official purchase/cancellation policy before requesting a refund.',
    refundSource: 'https://support.google.com/googleone/answer/2736362?hl=en',
    note: 'Review your storage usage before the paid allowance expires. Cancellation can affect Gmail, Drive and Photos when you exceed the remaining allowance.'
  },
  nordvpn: {
    source: 'https://support.nordvpn.com/hc/en-us/articles/19556844985489-How-to-cancel-auto-renewal-for-your-NordVPN-subscription',
    web: ['Sign in to Nord Account and open Billing → Subscriptions.', 'Find the subscription’s auto-renewal controls.', 'Choose Cancel auto-renewal and complete confirmation.', 'Check that renewal is off. Refund requests are a separate action in payment history or support.'],
    refund: 'The refund button appears only for payments eligible under NordVPN’s guarantee and applicable terms. If absent and you believe the decision is incorrect, ask live support to review it. Turning off renewal alone does not refund an earlier charge.',
    refundSource: 'https://support.nordvpn.com/hc/en-us/articles/19476991311121-What-is-your-refund-policy'
  },
  expressvpn: {
    source: 'https://www.expressvpn.com/support/manage-account/cancel-expressvpn-subscription/',
    web: ['In a browser, sign in to your ExpressVPN account and open My subscription.', 'Open the subscription’s renewal/cancellation controls and turn off renewal.', 'Finish the cancellation prompts and save confirmation.', 'Subscriptions bought through Apple or Google must use the store’s subscription settings.'],
    refund: 'ExpressVPN describes a 30-day guarantee for eligible first-time users, subject to the terms at purchase. Prior refunds and app-store purchases affect eligibility. Request a refund through official support; stopping renewal is separate.',
    refundSource: 'https://www.expressvpn.com/support/manage-account/what-is-expressvpns-refund-policy/', email: 'support@expressvpn.com',
    note: 'ExpressVPN says cancellation cannot be completed inside the VPN app.'
  },
  hellofresh: {
    source: 'https://www.hellofresh.com/about/how-to-cancel-hellofresh-subscription',
    web: ['Sign in to HelloFresh in a browser and open your account’s plan settings.', 'Choose the cancellation option for the active plan, rather than skipping one delivery.', 'Review the upcoming order and its change deadline before confirming cancellation.', 'Save confirmation and ask support whether any already-processed box will still ship.'],
    refund: 'Cancelling future deliveries does not automatically refund a box already processed. Ask HelloFresh support about the specific order, deadline and any quality issue. Do not assume a free-box offer prevents later renewal.',
    note: 'US HelloFresh FAQs state an account-update deadline five days before scheduled delivery. Confirm the actual deadline displayed for your order.', storeBilling: false
  },
  'blue-apron': {
    source: 'https://blog.blueapron.com/guides/membership-autoship-faq',
    web: ['Sign in and identify whether you have paid Membership, Subscribe & Save, or both.', 'Open the account controls for each recurring product you want to stop.', 'Cancel Subscribe & Save separately from paid Membership when both are active.', 'Check any already-submitted order and keep confirmation for each cancellation.'],
    refund: 'Blue Apron’s terms distinguish subscription charges from refunds or credits for meal issues. Ask support to review the relevant order; no automatic refund follows from cancelling future orders.',
    refundSource: 'https://www.blueapron.com/pages/terms',
    note: 'Blue Apron’s current membership/autoship model differs from older meal-plan instructions. Verify the active product in your account.', storeBilling: false
  },
  'apple-music': {
    source: 'https://support.apple.com/en-us/118399',
    web: ['Sign in at music.apple.com.', 'Choose My Account → Settings.', 'Scroll to Subscriptions, select Manage, then Cancel Subscription.', 'Confirm the end date. A Google Play-billed plan must be cancelled through Google Play or the Android Apple Music subscription controls.'],
    refund: 'Apple-billed refunds are reviewed at reportaproblem.apple.com. Google Play purchases use Google’s refund process. Cancellation does not automatically refund either purchase.', refundSource: APPLE_REFUND
  },
  'sirius-xm': {
    source: 'https://www.siriusxm.com/help/manage-or-cancel-service',
    web: ['Identify who bills you using your statement or receipt.', 'For SiriusXM direct billing, sign in to the Online Account Center and open Subscriptions.', 'Use the available cancellation option or the official chat/phone route for that plan.', 'Ask for the effective date and cancellation reference. Store, vehicle and other partner purchases have separate processes.'],
    refund: 'SiriusXM’s refund policy uses plan-specific grace periods. Requests outside the applicable grace period may receive no refund or credit. Read the policy for your exact audio plan.',
    refundSource: 'https://www.siriusxm.com/help/refund-policy-change'
  },
  'apple-tv-plus': {
    source: APPLE_CANCEL,
    web: ['Open Apple’s subscription-management link and sign in to the Apple Account paying for Apple TV.', 'Find the Apple TV subscription and choose Cancel Subscription.', 'Confirm and check the displayed expiry date. If another provider bills you, contact that provider instead.'],
    refund: 'Apple decides eligible Apple-billed refunds at reportaproblem.apple.com. A carrier or other partner decides its own refund requests.', refundSource: APPLE_REFUND
  },
  peacock: {
    source: 'https://www.peacocktv.com/help/article/cancellation',
    web: ['Sign in to your Peacock account.', 'Open subscription management and choose Cancel All Subscriptions to stop the base plan and its add-ons.', 'Complete the cancellation confirmation; review any add-ons you intended to keep or cancel.', 'If Peacock is supplied or billed by a partner, use that partner’s instructions.'],
    refund: 'Consult Peacock’s terms and your biller for refund eligibility. Cancelling the base subscription is separate from obtaining a refund for a charge.', refundSource: 'https://www.peacocktv.com/terms'
  },
  'microsoft-365': {
    source: 'https://support.microsoft.com/en-us/accounts-billing/subscriptions/cancel-a-microsoft-365-subscription',
    web: ['Sign in to account.microsoft.com/services with the purchasing Microsoft account.', 'Find Microsoft 365 and choose Manage.', 'Choose the cancellation or recurring-billing option and review any refund offered before confirming.', 'If Turn on recurring billing is shown, renewal is already off. Keep the expiry-date confirmation.'],
    refund: 'Microsoft checks eligibility during the cancellation process. The result depends on purchase region, plan and timing. Apple/Google or reseller purchases must be taken to that biller.',
    refundSource: 'https://support.microsoft.com/en-us/accounts-billing/subscriptions/how-to-get-a-refund-on-a-microsoft-subscription',
    note: 'Check cloud-storage usage before the plan expires. Business plans use a different administrator process.'
  },
  notion: {
    source: 'https://www.notion.com/help/upgrade-or-downgrade-your-plan',
    web: ['Sign in as an owner of the workspace you want to change.', 'Open Settings → Billing → Change plan.', 'Select Free, continue, then confirm Downgrade.', 'Check the effective date and any separately billed workspaces or add-ons.'],
    refund: 'Requests must come from the workspace owner or billing email. Notion’s refund page sets timing and purchase-channel conditions; contact support promptly and distinguish invoice date from payment date.',
    refundSource: 'https://www.notion.com/help/refunds',
    note: 'An unused workspace does not itself stop renewal. Export needed content and review Free-plan limits.'
  },
  figma: {
    source: 'https://help.figma.com/hc/en-us/articles/360046216313-Upgrade-or-downgrade-your-plan',
    web: ['Sign in as the relevant team or organization administrator.', 'Open the plan’s billing settings and select the downgrade/cancellation option for that plan.', 'Review seat, team and file implications, then confirm the downgrade.', 'Retain the billing confirmation. Cancelling a Community plugin is a separate Stripe-portal process.'],
    refund: 'Figma says cancellation generally does not refund the remaining annual fee, except for limited cases in its renewal/cancellation terms. Community resource refunds have separate rules.',
    refundSource: 'https://help.figma.com/hc/en-us/articles/360039826814-Delete-your-Figma-account', storeBilling: false
  },
  'gym-membership': {
    source: '',
    web: ['Find your signed membership agreement and the legal business name of your gym.', 'Check the notice period, commitment term and accepted cancellation methods.', 'Submit the request through the method your contract and applicable local rules require; ask your club for the correct address if mail is required.', 'Get written confirmation of the effective date, final bill and any fee. Keep proof of delivery.'],
    refund: 'There is no single policy for all gyms. Your agreement, location and reason for cancelling determine possible refunds and fees. Ask the named gym for a written charge breakdown.', storeBilling: false,
    note: 'Contact the club shown on your membership agreement. No universal gym phone number or cancellation email exists.'
  },
  'la-fitness': {
    source: 'https://www.lafitness.com/Pages/MembershipQuestions.aspx',
    web: ['Sign in to your LA Fitness membership account and review Cancel My Membership in the official membership FAQ.', 'Use the cancellation method available for your membership, including its online option or cancellation form where applicable.', 'For a form or club request, use the recipient and notice requirements in the official instructions and agreement.', 'Save confirmation and ask when the final payment and access end.'],
    refund: 'The official FAQ distinguishes an initial commitment term from later cancellation. Ending an agreement early may involve a termination fee. Ask LA Fitness to assess your own agreement; personal training can be a separate contract.', storeBilling: false
  },
  'orange-theory': {
    source: 'https://www.orangetheory.com/en-us/promotion-terms',
    web: ['Locate the Membership Agreement for your home studio.', 'Contact the studio through the contact details on that agreement and ask for its cancellation form or procedure.', 'Submit written notice using that procedure before the contract’s notice deadline.', 'Ask the studio to confirm the effective date, any remaining billing and cancellation of separate services.'],
    refund: 'Orangetheory’s published promotion terms defer to the membership agreement at the studio where you joined. Do not treat a local offer or refund promise as a nationwide rule.', storeBilling: false
  },
  classpass: {
    source: 'https://help.classpass.com/hc/en-us/articles/204578119-How-do-I-cancel-my-ClassPass-membership',
    web: ['Sign in to ClassPass and open Account → Membership.', 'Choose cancellation and complete all prompts rather than only changing plans.', 'Submit the request at least 48 hours before renewal, as ClassPass recommends for processing.', 'Save the cancellation confirmation and check remaining credits and reservations.'],
    refund: 'ClassPass says membership months and additional credit purchases are non-refundable. Plan changes apply to upcoming cycles; cancellation is not retroactive.',
    refundSource: 'https://help.classpass.com/hc/en-us/articles/205433975-What-is-the-ClassPass-refund-policy'
  },
  surfshark: {
    source: 'https://support.surfshark.com/hc/en-us/articles/360003069694-How-to-cancel-auto-renewal-for-your-Surfshark-subscription',
    web: ['Sign in to Surfshark’s website account and open the subscription’s renewal controls.', 'Choose cancellation of auto-renewal and complete confirmation.', 'If the control is unavailable, check whether an app store bills you or ask official live support.', 'Verify that renewal is off; access normally remains for the current paid term.'],
    refund: 'Surfshark describes a full-refund option within 30 days of the first eligible website purchase. The guarantee does not automatically apply to repeat purchases or every store payment. Request it separately.',
    refundSource: 'https://support.surfshark.com/hc/en-us/articles/360003103653-What-is-Surfshark-s-refund-policy'
  },
  'proton-vpn': {
    source: 'https://protonvpn.com/support/cancel-vpn-subscription',
    web: ['Sign in to the Proton VPN account that owns the paid plan.', 'Open the subscription controls and choose cancellation for the paid VPN plan.', 'Complete the prompts and record the billing-cycle end date.', 'If you want a refund, contact Proton support separately instead of assuming cancellation requests one.'],
    refund: 'Proton says purchases within the last 30 days may be eligible under its money-back guarantee. Eligibility and the payment channel matter; ask support to assess your payment.'
  },
  '1password': {
    source: 'https://support.1password.com/manage-subscription/',
    web: ['Sign in to the 1Password account whose subscription you manage.', 'Open Billing and choose the subscription-cancellation option.', 'Review the consequences and confirm cancellation.', 'If a store or another administrator manages billing, use that party’s route instead.'],
    refund: 'For a self-managed paid subscription, 1Password says it cannot refund previous charges or remaining paid time. Access remains active through the current billing period, then the account is frozen. Business-representative and app-store subscriptions have their own terms.',
    refundSource: 'https://support.1password.com/refund-policy/', email: 'support+sales@1password.com',
    note: 'Before moving providers, securely migrate passwords. Export files can contain unencrypted secrets; never send a vault export to cancellation support.'
  },
  'door-dash': {
    source: 'https://help.doordash.com/en-us/consumers/article/how-do-i-cancel-my-dashpass-subscription',
    web: ['Sign in to DoorDash and open the DashPass management section.', 'Select the option to end the DashPass subscription.', 'Finish the confirmation at least 24 hours before the next scheduled payment to avoid the next charge.', 'Keep the cancellation email. A free-period cancellation can end benefits immediately.'],
    refund: 'Ending DashPass does not automatically refund an existing subscription payment. Ask DoorDash support about the specific charge under the DashPass terms.', storeBilling: false
  },
  'uber-one': {
    source: 'https://help.uber.com/riders/article/how-do-i-cancel-my-uber-one-subscription?nodeId=8dd035e9-9779-4c87-9bf6-db9c1e3de60a',
    web: ['Open Uber and tap your profile or Account icon.', 'Open Uber One → Manage subscription or Manage membership.', 'Choose End Subscription/End Membership and complete the Leave Uber One confirmation.', 'If within 48 hours of renewal and the option is unavailable, contact Uber support.'],
    refund: 'Request a review through Uber’s official account-support flow. Cancellation and refund eligibility differ, and an approved refund may end benefits immediately. Do not assume a prorated refund.', storeBilling: false
  },
  instacart: {
    source: 'https://www.instacart.com/help/section/107169420/423178048/xwdoio9us',
    web: ['Sign in to the account paying for Instacart+.', 'On web open the menu; in the app open Account, then Your Instacart+ membership.', 'Open membership management, choose cancellation and follow confirmation prompts.', 'Check renewal status. Cancelling membership does not cancel an already-placed grocery order.'],
    refund: 'Instacart’s terms generally make membership fees non-refundable except for specified exceptions. Check the current terms and ask support about your payment; order-issue refunds are a different policy.', refundSource: 'https://www.instacart.com/terms', storeBilling: false
  },
  factor: {
    source: 'https://www.factor75.com/about/how-to-cancel-factor-subscription',
    web: ['Sign in to the Factor account paying for deliveries.', 'Open plan or subscription settings and select cancellation.', 'Review the displayed order-change cutoff and any locked upcoming order.', 'Confirm cancellation and keep the email; ask support whether the final processed delivery remains scheduled.'],
    refund: 'Cancellation affects future eligible orders; it does not automatically refund an order already processed. Ask Factor support to review the order, cutoff and any meal issue.', storeBilling: false
  },
  'home-chef': {
    source: 'https://support.homechef.com/hc/en-us/articles/210097853-How-do-I-cancel-my-subscription',
    web: ['Sign in to Home Chef and open the account’s subscription settings.', 'Use the pause-subscription process described in the official cancellation article.', 'Complete the reason and confirmation prompts.', 'Check the next delivery and its cutoff, and retain confirmation. Home Chef says this pause process cancels recurring deliveries until you reactivate.'],
    refund: 'Future cancellation and a refund for an existing order are separate. Check Home Chef’s terms and contact support promptly for the specific order.', refundSource: 'https://www.homechef.com/terms', storeBilling: false
  },
  'washington-post': {
    source: 'https://helpcenter.washingtonpost.com/hc/en-us/articles/360000177571-How-to-cancel-your-digital-only-subscription',
    web: ['Sign in to the account paying for your digital Washington Post subscription.', 'Open subscription management and follow the cancellation route in the linked digital-only instructions.', 'If a store bills you, use that store’s subscription settings instead.', 'Keep confirmation of the final access and billing date. Print subscriptions use a different process.'],
    refund: 'Ask the billing provider to review the relevant subscription terms and payment. These digital-only cancellation instructions do not establish a universal refund entitlement.'
  },
  medium: {
    source: 'https://help.medium.com/hc/en-us/articles/360033418214-Trouble-canceling-membership-subscription',
    web: ['On desktop, sign in to Medium and open Settings.', 'Scroll to Membership and select Cancel your membership.', 'Complete confirmation and record the billing-cycle end date.', 'Apple- and Google Play-billed memberships must be cancelled through those stores.'],
    refund: 'Review Medium’s Membership Terms of Service and contact the biller about a specific charge. Stopping renewal does not itself grant a refund.', refundSource: 'https://help.medium.com/hc/en-us/articles/115004932468-Membership-Terms-of-Service'
  },
  masterclass: {
    source: 'https://www.masterclass.com/help-center/masterclass/answers/canceling-your-subscription-renewal--id--M2McWBvNTh-WNRR6llmkAw',
    web: ['Sign in at masterclass.com in a web browser; direct cancellation is not completed in the app.', 'Open the profile/account menu → Settings.', 'In Membership, choose Cancel Membership and finish the displayed cancellation process.', 'Check the confirmation. Certificates and OnCall are separate products with different terms.'],
    refund: 'An initial membership bought within the last 30 days may qualify under MasterClass’s satisfaction guarantee. Ask its support team while signed in; third-party marketplaces manage their own refunds.', refundSource: 'https://www.masterclass.com/help-center/masterclass/answers/requesting-a-refund--id--ffUda_F-TPqkca5o9hJc5g'
  },
  skillshare: {
    source: 'https://help.skillshare.com/hc/en-us/articles/205466548-How-do-I-cancel-my-Skillshare-membership-if-I-signed-up-through-the-app',
    web: ['Identify the biller using your receipt.', 'For website billing, sign in on Skillshare’s website and open account/payment management.', 'Choose cancellation and complete confirmation.', 'For Apple or Google Play purchases, use the store’s subscription settings; Skillshare cannot manage those subscriptions.'],
    refund: 'Skillshare’s rules differ for trial conversion, renewal and payment method. Check its refund article and submit a request promptly; app-store refunds are handled by the store.', refundSource: 'https://help.skillshare.com/hc/en-us/articles/204536798-Can-I-get-a-refund-for-my-Skillshare-subscription-or-purchase'
  },
  coursera: {
    source: 'https://www.coursera.support/s/learner-help-center?language=en_US',
    web: ['Sign in to Coursera and open My Purchases.', 'Select the subscription you intend to cancel, distinguishing Coursera Plus from an individual program.', 'Use Manage subscription → Cancel subscription and complete the prompts.', 'Check the confirmation and whether another subscription remains active.'],
    refund: 'Refund rules differ among subscriptions, annual plans, courses and degree programs. In the official Learner Help Center, open Refund policies for your exact purchase before requesting a refund.',
    note: 'Completing one course does not necessarily stop every subscription. Review the actual plan in My Purchases.'
  },
  'kindle-unlimited': {
    source: 'https://digprjsurvey.amazon.com/csad/help/node/GLSQ4722655M4ZEJ?theme=light',
    web: ['Sign in to the Amazon account paying for the reading subscription.', 'Open Manage your Kindle Unlimited Membership (the product name may appear as Kindle+ in some current help pages).', 'Under Your Membership, choose Cancel membership and complete confirmation.', 'Record the end date; borrowed-content access ends when the paid membership expires.'],
    refund: 'Amazon’s help page says prepaid gift/bundle memberships do not receive a partial refund for unused months. Ask Amazon support about other charges; cancelling renewal does not guarantee a refund.', storeBilling: false
  },
  scribd: {
    source: 'https://support.scribd.com/hc/en-us/articles/210134046-How-to-cancel-your-Scribd-subscription',
    web: ['Sign in to the Scribd account paying for the subscription.', 'Open account settings and Manage your subscription.', 'Choose Cancel subscription and complete all confirmation steps.', 'If Apple or Google bills you, cancel through that store. Check whether you also have a separate Everand subscription.'],
    refund: 'Scribd says a partially used billing period is not refunded simply because you cancel. Other refund conditions and store policies apply; review the official refunds page.', refundSource: 'https://support.scribd.com/hc/en-us/articles/210133986-Refunds'
  },
  tidal: {
    source: 'https://support.tidal.com/hc/en-us/articles/201314601-Cancel-Tidal-Subscription-or-Trial',
    web: ['Sign in to the account that pays for TIDAL.', 'Open subscription management and choose cancellation.', 'Confirm and save the displayed end date.', 'If billed through Apple, Google or another third party, cancel with that provider instead.'],
    refund: 'TIDAL says policy varies by residence; in the US, a forgotten cancellation followed by renewal is not normally refunded. Contact official support for your actual charge.', refundSource: 'https://support.tidal.com/hc/en-us/articles/22401976776593-Refund-FAQs'
  },
  'walmart-plus': {
    source: 'https://www.walmart.com/help/article/cancel-walmart/126c9a990a944c3abd8531de52a87440',
    web: ['Sign in to your Walmart account.', 'Open Account → Walmart+ → Manage Membership.', 'Choose the cancellation option and complete confirmation rather than selecting a temporary pause.', 'Record the final benefit date and check any bundled or upgraded benefits.'],
    refund: 'Check the current Walmart+ membership terms and ask Walmart support about your fee. A merchandise-return refund policy does not establish a membership refund.', storeBilling: false
  },
  costco: {
    source: 'https://customerservice.costco.com/app/answers/detail/a_id/1308/~/how-can-i-cancel-my-costco-membership',
    web: ['Have the primary member open the official membership cancellation instructions.', 'Speak to a warehouse membership-counter team member or use the membership-support option provided in that article.', 'Request cancellation and, if dissatisfied, review eligibility under the membership satisfaction guarantee.', 'Keep the cancellation/refund receipt. Turning off Auto Renewal alone is a different action.'],
    refund: 'Costco’s membership satisfaction guarantee provides cancellation and refund of membership fees if dissatisfied, subject to the current membership terms. This is separate from merchandise return rules.', storeBilling: false
  },
  box: {
    source: 'https://support.box.com/hc/en-us/articles/360043694874-How-To-Cancel-Your-Box-Account-Subscription',
    web: ['Sign in as the Box account administrator.', 'Open the account’s billing/cancellation controls described in Box’s official cancellation article.', 'Follow the process for your plan; if you cannot cancel or receive no email, contact Box support.', 'Back up needed content and retain the cancellation date and final billing confirmation.'],
    refund: 'Refund and notice rules depend on your Box plan and agreement. Contact Box billing support about the specific invoice; account deletion does not imply a refund.', storeBilling: false
  },
  evernote: {
    source: 'https://help.evernote.com/hc/en-us/articles/115005949208-How-to-cancel-your-Evernote-subscription',
    web: ['Sign in to Account Settings in Evernote Web.', 'On Billing, select Manage subscription.', 'Choose Evernote Free and complete the downgrade confirmation.', 'Keep the email confirmation; Apple/Google plans must be managed with the relevant store.'],
    refund: 'Evernote sets refund-request windows by plan and payment. Its policy includes a 20-day request window for monthly individual paid-service payments; annual, business and store purchases have different conditions. Check the full policy.', refundSource: 'https://help.evernote.com/hc/en-us/articles/115010561808-Evernote-Refund-Policy'
  },
  babbel: {
    source: 'https://support.babbel.com/hc/en-us/articles/205600298-Canceling-a-subscription',
    web: ['Identify whether Babbel, Apple or Google bills you.', 'For a website purchase, sign in on Babbel and open account/subscription management.', 'Choose cancellation of renewal and finish confirmation.', 'For store purchases, cancel with the store. Deleting the app or account does not cancel the subscription.'],
    refund: 'Ask Babbel support to assess your purchase under its current guarantee and local terms. A prepaid term does not automatically become refundable when renewal is cancelled.'
  },
  'insight-timer': {
    source: 'https://help.insighttimer.com/support/solutions/articles/67000664939-how-do-i-cancel-my-subscription-',
    web: ['Find the subscription receipt and determine who bills you.', 'For a website credit-card purchase, sign in to Insight Timer’s website subscription management.', 'Use the cancellation option and complete confirmation.', 'For Apple/Google purchases, cancel through the store; deleting the app or your account is insufficient.'],
    refund: 'Website purchases require a request to Insight Timer support; store purchases use the applicable store process. Check its cancellation/refund policy for purchase-specific conditions.', refundSource: 'https://help.insighttimer.com/support/solutions/articles/67000675827-subscription-donation-cancellation-and-refund-policy'
  },
  dashlane: {
    source: 'https://support.dashlane.com/hc/en-us/articles/12247552144786-Cancel-my-Dashlane-subscription-and-stop-autorenewal',
    web: ['Sign in to Dashlane’s web app with the account owning the subscription.', 'Open subscription management and choose cancellation of renewal.', 'Complete confirmation and review any Request refund option.', 'If an option is missing, use Chat on the official support page. Store purchases have their own billing route.'],
    refund: 'Dashlane’s web app can offer an eligible refund request during cancellation. If it is missing, ask official support to review eligibility instead of assuming a refund.', refundSource: 'https://support.dashlane.com/hc/en-us/articles/12248372111506-Get-a-refund-for-my-Dashlane-subscription'
  },
  substack: {
    source: 'https://support.substack.com/hc/en-us/articles/360037489252-How-do-I-cancel-my-paid-subscription-on-Substack',
    web: ['Sign in to Substack and open Settings → Subscriptions.', 'Choose the specific paid publication and open Manage subscription.', 'In Account actions, follow the paid-cancellation link and confirm Cancel Subscription.', 'Repeat for each paid publication you want to cancel. Apple in-app purchases must be managed through Apple.'],
    refund: 'Substack says cancellation does not give a refund. For web payments, ask the publication about its refund policy; the publisher can decide whether to issue one. Apple manages Apple in-app refunds.'
  },
  miro: {
    source: 'https://help.miro.com/hc/en-us/articles/360011986179-Cancel-your-Miro-subscription',
    web: ['Sign in with billing-administration access to the paid Miro team.', 'Open team settings → Billing.', 'Choose cancellation of the subscription and complete confirmation.', 'Review the effective date, team access and board limits; repeat for separately billed teams if needed.'],
    refund: 'Ask Miro billing support about your invoice under the current cancellation terms. Cancelling renewal or moving to Free does not automatically establish a refund.', storeBilling: false
  },
  'sam-club': {
    source: 'https://help.samsclub.com/app/answers/detail/a_id/4075',
    web: ['Have the primary member retrieve the membership number and current terms.', 'Contact Sam’s Club through its official help center or a club’s Member Services desk.', 'Request membership cancellation, distinguishing it from simply disabling Auto Renew.', 'Ask for the cancellation and any approved refund receipt.'],
    refund: 'Sam’s Club’s satisfaction guarantee describes a refund of the current-year membership fee when dissatisfied, with exceptions such as specified sponsored memberships. Check the full terms for exclusions.', storeBilling: false
  },
  'lyft-pink': {
    source: 'https://help.lyft.com/hc/en-us/rider/articles/360037342653-Lyft-Pink',
    web: ['Open the Lyft app using the account paying for Pink.', 'Open the menu and select Lyft Pink.', 'Choose membership management, then cancellation and confirm.', 'Record the membership end date. Ride cancellation and Pink cancellation are different actions.'],
    refund: 'Use the Lyft Pink terms and official support for a membership-charge review. A refund or credit for a cancelled ride is not a refund policy for Pink membership.', storeBilling: false
  },
  bloomberg: {
    source: 'https://www.bloomberg.com/help',
    web: ['Sign in to your Bloomberg account.', 'Select Contact Support to Cancel.', 'Complete support verification and request cancellation.', 'Save confirmation.'],
    refund: 'Refund terms need account-specific review.', needsReview: true,
    note: 'The readable public terms establish a support-assisted route; further plan/refund details were not verifiable in this review.'
  },
  'chatgpt-plus': {
    source: 'https://help.openai.com/en/articles/7232927-canceling-your-chatgpt-subscription',
    web: ['Sign in to the ChatGPT account that purchased the subscription.', 'Open Settings and the subscription/account billing controls.', 'Choose Manage, then Cancel subscription and complete confirmation.', 'Cancel through Apple or Google Play instead if that is where you purchased. Retain the displayed end date.'],
    refund: 'Request a review while signed in to the purchasing OpenAI account using the help-center chat. Eligibility depends on region, purchase and timing; Apple processes its own refunds. Cancellation does not automatically create a refund.',
    refundSource: 'https://help.openai.com/en/articles/7232895-how-do-i-request-a-refund-for-my-chatgpt-subscription',
    note: 'Personal subscriptions, self-serve Business, Enterprise and API billing are different products. These steps concern a personal ChatGPT subscription.'
  }
};

// Do not present inaccessible provider documentation as verified. These guides
// still provide the sourced Apple/Google routes, confirmation checklist and a
// safe support escalation while the individual provider instructions are checked.
const pending: Record<string, string> = {
  duolingo: 'https://www.duolingo.com/help',
  nyt: 'https://help.nytimes.com/',
  wsj: 'https://customercenter.wsj.com/',
  'paramount-plus': 'https://help.paramountplus.com/',
  'the-athletic': 'https://help.nytimes.com/',
  'espn-plus': 'https://support.espn.com/',
  lastpass: 'https://support.lastpass.com/',
  grubhub: 'https://www.grubhub.com/help/contact-us',
  'financial-times': 'https://help.ft.com/'
};

export function getGuideDetails(service: Service): GuideDetails {
  if (rows[service.slug]) return rows[service.slug];
  const source = pending[service.slug];
  if (!source) throw new Error(`Missing guide coverage: ${service.slug}`);
  return {
    source, needsReview: true,
    web: [
      `Find your ${service.name} receipt and identify the company that actually bills you.`,
      `Sign in to the paying account and open the official help center linked below. Ask for the current cancellation route for your exact plan.`,
      'If the account provides a cancellation option, review its effective date and complete every confirmation prompt. If unavailable, ask official support to stop renewal and confirm the final bill in writing.',
      'Save the confirmation and compare the next statement with the confirmed cancellation date.'
    ],
    refund: 'The current provider-specific refund terms could not be verified in this review. Ask the billing provider to review your purchase date, plan, usage and country before relying on a refund. Apple/Google purchases use the store policies below.',
    note: 'Provider-specific menu labels and refund conditions are awaiting source verification. No phone number, email address, refund deadline or outcome has been inferred.'
  };
}

export function guideFaqs(service: Service, guide: GuideDetails) {
  return [
    { question: `Does deleting the ${service.name} app cancel my subscription?`, answer: 'Do not treat deleting an app as cancellation. Use the billing provider’s cancellation process and retain confirmation of the end date.' },
    { question: `How do I cancel ${service.name} on iPhone or Android?`, answer: guide.storeBilling === false ? 'Use the provider’s direct-billing or contract route on this page. Installing its app does not make an existing membership an Apple or Google Play subscription.' : 'First identify the biller. For an Apple-billed purchase use Settings → your name → Subscriptions. For a Google Play purchase use Play Store → profile → Payments & subscriptions → Subscriptions. Direct purchases use the provider’s website or support route.' },
    { question: `Will cancelling ${service.name} give me a refund?`, answer: guide.refund },
    { question: `What if I cannot find my ${service.name} subscription?`, answer: 'Compare your receipt with the account you are signed into. Check other Apple/Google accounts and any partner named on the receipt. Ask the actual biller for help; do not send a password, full card number or one-time sign-in code.' },
    { question: `Can CancelKits cancel ${service.name} for me?`, answer: 'CancelKits provides instructions and tools to help prepare your request. You must complete the provider’s process and check its confirmation. Reading a guide, checking a box or generating a message does not cancel a subscription.' }
  ];
}

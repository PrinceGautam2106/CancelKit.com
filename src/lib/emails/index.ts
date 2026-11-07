/**
 * index.ts — Barrel export for all email templates.
 *
 * Usage from any server-side file:
 *   import { welcomeSubject, welcomeHtml } from '../lib/emails';
 */

export { welcomeSubject, welcomeHtml, type WelcomeEmailData } from './welcome';

export {
	cancelConfirmationSubject,
	cancelConfirmationHtml,
	type CancelConfirmationData,
} from './cancel-confirmation';

export {
	renewalAlertSubject,
	renewalAlertHtml,
	type RenewalAlertData,
} from './renewal-alert';

export {
	paymentFailedSubject,
	paymentFailedHtml,
	type PaymentFailedData,
} from './payment-failed';

export {
	weeklySavingsSubject,
	weeklySavingsHtml,
	type WeeklySavingsData,
} from './weekly-savings';

export {
	referralRewardSubject,
	referralRewardHtml,
	type ReferralRewardEmailData,
} from './referral-reward';

export {
	auditReportSubject,
	auditReportHtml,
	type AuditReportData,
} from './audit-report';

export {
	weeklyRenewalRadarSubject,
	weeklyRenewalRadarHtml,
	type WeeklyRenewalRadarData,
	type UpcomingRenewalItem,
} from './weekly-renewal-radar';

export {
	liveSubscriptionAlertSubject,
	liveSubscriptionAlertHtml,
	type LiveSubscriptionAlertData,
} from './live-subscription-alert';

export {
	familyInviteSubject,
	familyInviteHtml,
	type FamilyInviteEmailData,
} from './family-invite';

export {
	cancelDispatchSubject,
	cancelDispatchHtml,
	type CancelDispatchData,
} from './cancel-dispatch';

export { emailLayout, styles, SITE } from './layout';

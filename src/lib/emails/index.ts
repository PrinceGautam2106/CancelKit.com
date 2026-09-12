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

export { emailLayout, styles, SITE } from './layout';

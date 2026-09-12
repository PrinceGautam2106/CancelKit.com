import { Resend } from 'resend';

const apiKey =
	import.meta.env.RESEND_API_KEY ??
	(typeof process !== 'undefined' ? process.env?.RESEND_API_KEY : undefined) ??
	'';

export const resend = new Resend(apiKey);

export const EMAIL_FROM = 'CancelKit <hello@cancelkits.com>';

/** Audience-level defaults shared across every outbound email. */
export const EMAIL_DEFAULTS = {
	from: EMAIL_FROM,
	replyTo: 'support@cancelkits.com',
} as const;

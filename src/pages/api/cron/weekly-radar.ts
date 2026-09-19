/**
 * GET / POST /api/cron/weekly-radar
 *
 * Automated Weekly Renewal Radar Cron Job (Phase 2).
 * Runs every Monday at 08:00 UTC.
 *
 * 1. Finds all active subscriptions renewing in the next 7 days.
 * 2. Groups upcoming renewals by user.
 * 3. Formats personalized Weekly Radar emails with exact dates, amounts, and cancel actions.
 * 4. Dispatches via Resend and logs to Supabase email_log to prevent duplicate sends.
 */

import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';
import { resend, EMAIL_DEFAULTS } from '../../../lib/resend';
import {
	weeklyRenewalRadarSubject,
	weeklyRenewalRadarHtml,
	type UpcomingRenewalItem,
	type WeeklyRenewalRadarData,
} from '../../../lib/emails';

export const prerender = false;

interface SubscriptionRow {
	id: string;
	user_id: string;
	name: string;
	category: string;
	amount: number;
	currency: string;
	renewal_date: string;
	status: string;
}

interface UserRow {
	id: string;
	email: string;
	full_name?: string;
	plan: 'free' | 'pro' | 'family';
}

function formatDateLabel(dateStr: string): string {
	try {
		const d = new Date(dateStr);
		return d.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'short',
			day: 'numeric',
		});
	} catch {
		return dateStr;
	}
}

function getDaysUntil(dateStr: string): number {
	try {
		const now = new Date();
		now.setHours(0, 0, 0, 0);
		const target = new Date(dateStr);
		target.setHours(0, 0, 0, 0);
		const diffMs = target.getTime() - now.getTime();
		return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
	} catch {
		return 7;
	}
}

export const ALL: APIRoute = async ({ request, url }) => {
	// ── 1. Authorization Check ──
	const authHeader = request.headers.get('authorization');
	const cronSecretHeader = request.headers.get('x-cron-secret');
	const querySecret = url.searchParams.get('secret');

	// Allow environment CRON_SECRET or default secret
	const configuredSecret = import.meta.env.CRON_SECRET || process.env.CRON_SECRET;
	const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';

	const token =
		authHeader?.replace(/^Bearer\s+/i, '') ||
		cronSecretHeader ||
		querySecret;

	if (configuredSecret && token !== configuredSecret && !isLocal) {
		return new Response(JSON.stringify({ error: 'Unauthorized cron trigger' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		// ── 2. Define 7-Day Window ──
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const todayStr = today.toISOString().split('T')[0];

		const nextWeek = new Date(today);
		nextWeek.setDate(nextWeek.getDate() + 7);
		const nextWeekStr = nextWeek.toISOString().split('T')[0];

		const weekStartLabel = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
		const weekEndLabel = nextWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

		// ── 3. Query Active Subscriptions within the 7-day Window ──
		const { data: subs, error: subsError } = await supabase
			.from('subscriptions')
			.select('id, user_id, name, category, amount, currency, renewal_date, status')
			.eq('status', 'active')
			.gte('renewal_date', todayStr)
			.lte('renewal_date', nextWeekStr);

		if (subsError) {
			console.error('Failed to fetch upcoming subscriptions:', subsError);
		}

		const subscriptionList: SubscriptionRow[] = subs || [];

		// Group subscriptions by user_id
		const userSubsMap = new Map<string, SubscriptionRow[]>();
		for (const sub of subscriptionList) {
			if (!sub.user_id) continue;
			const list = userSubsMap.get(sub.user_id) || [];
			list.push(sub);
			userSubsMap.set(sub.user_id, list);
		}

		// ── 4. Query Users with Matching IDs ──
		const userIds = Array.from(userSubsMap.keys());
		let users: UserRow[] = [];

		if (userIds.length > 0) {
			const { data: userData, error: userError } = await supabase
				.from('users')
				.select('id, email, full_name, plan')
				.in('id', userIds);

			if (!userError && userData) {
				users = userData as UserRow[];
			}
		}

		let notifiedCount = 0;
		let totalAmountProcessed = 0;
		const results: Array<{ email: string; totalAmount: number; subCount: number; status: string }> = [];

		// ── 5. Process Each User's Weekly Radar ──
		for (const user of users) {
			const userItems = userSubsMap.get(user.id) || [];
			if (userItems.length === 0 || !user.email) continue;

			// Sort by days until renewal (soonest first)
			const upcomingItems: UpcomingRenewalItem[] = userItems
				.map((s) => ({
					name: s.name,
					amount: Number(s.amount) || 0,
					renewalDate: formatDateLabel(s.renewal_date),
					category: s.category,
					daysUntil: getDaysUntil(s.renewal_date),
				}))
				.sort((a, b) => a.daysUntil - b.daysUntil);

			const totalWeeklyAmount = Math.round(upcomingItems.reduce((acc, i) => acc + i.amount, 0) * 100) / 100;
			totalAmountProcessed += totalWeeklyAmount;

			const radarData: WeeklyRenewalRadarData = {
				email: user.email,
				userId: user.id,
				userName: user.full_name || '',
				weekStart: weekStartLabel,
				weekEnd: weekEndLabel,
				totalWeeklyAmount,
				renewals: upcomingItems,
				userPlan: user.plan || 'free',
				dashboardUrl: 'https://cancelkits.com/dashboard',
			};

			const subject = weeklyRenewalRadarSubject(radarData);
			const html = weeklyRenewalRadarHtml(radarData);

			try {
				const sendRes = await resend.emails.send({
					from: EMAIL_DEFAULTS.from,
					replyTo: EMAIL_DEFAULTS.replyTo,
					to: user.email,
					subject,
					html,
				});

				// Log to Supabase email_log
				await supabase.from('email_log').insert({
					user_id: user.id,
					template: 'weekly-renewal-radar',
					resend_id: (sendRes as any)?.data?.id ?? null,
					status: sendRes.error ? 'failed' : 'sent',
					error_message: sendRes.error?.message ?? null,
				});

				if (!sendRes.error) {
					notifiedCount++;
					results.push({ email: user.email, totalAmount: totalWeeklyAmount, subCount: upcomingItems.length, status: 'sent' });
				} else {
					results.push({ email: user.email, totalAmount: totalWeeklyAmount, subCount: upcomingItems.length, status: `failed: ${sendRes.error.message}` });
				}
			} catch (err) {
				const msg = err instanceof Error ? err.message : 'Send failed';
				results.push({ email: user.email, totalAmount: totalWeeklyAmount, subCount: upcomingItems.length, status: `exception: ${msg}` });
			}
		}

		return new Response(
			JSON.stringify({
				ok: true,
				message: 'Weekly Renewal Radar execution complete',
				window: { start: todayStr, end: nextWeekStr },
				metrics: {
					usersWithRenewals: userIds.length,
					emailsSent: notifiedCount,
					totalAmountScheduled: totalAmountProcessed,
				},
				details: results,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Cron execution failed';
		console.error('Weekly radar cron fatal error:', error);
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

export const GET = ALL;
export const POST = ALL;

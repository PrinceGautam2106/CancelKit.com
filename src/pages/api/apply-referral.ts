import type { APIRoute } from 'astro';
import { stripe } from '../../lib/stripe';
import { supabase } from '../../lib/supabase';
import { resend, EMAIL_DEFAULTS } from '../../lib/resend';
import { referralRewardSubject, referralRewardHtml } from '../../lib/emails';

export const prerender = false;

interface ApplyReferralBody {
	referralCode?: string;
	newUserId?: string;
	newUserEmail?: string;
	stripeCustomerId?: string;
}

export const POST: APIRoute = async ({ request }) => {
	try {
		let body: ApplyReferralBody;
		try {
			body = await request.json();
		} catch {
			return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const { referralCode, newUserId, newUserEmail, stripeCustomerId } = body;

		if (!referralCode && !newUserEmail) {
			return new Response(
				JSON.stringify({ error: 'Missing referralCode or newUserEmail' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// 1. Locate referral record in Supabase
		let referralRecord: any = null;

		if (referralCode) {
			const { data, error } = await supabase
				.from('referrals')
				.select('*')
				.eq('referral_code', referralCode)
				.order('created_at', { ascending: false })
				.limit(1)
				.maybeSingle();

			if (!error && data) {
				referralRecord = data;
			}
		}

		if (!referralRecord && newUserEmail) {
			const { data } = await supabase
				.from('referrals')
				.select('*')
				.eq('referred_email', newUserEmail)
				.maybeSingle();

			if (data) referralRecord = data;
		}

		const referrerUserId = referralRecord?.referrer_user_id;

		// 2. Apply Stripe Credit to both users ($9.00 = 1 month free CancelKit Pro)
		const creditAmount = -900; // -$9.00 in cents

		// A. Credit newly upgraded customer
		if (stripeCustomerId && !stripeCustomerId.startsWith('cus_mock')) {
			try {
				await stripe.customers.createBalanceTransaction(stripeCustomerId, {
					amount: creditAmount,
					currency: 'usd',
					description: 'Referral reward: 1 month free CancelKit Pro',
				});
			} catch (stripeErr) {
				console.warn('Could not credit new customer on Stripe:', stripeErr);
			}
		}

		// B. Credit referrer
		let referrerEmail = '';
		let referrerName = '';

		if (referrerUserId) {
			try {
				const { data: refUser } = await supabase
					.from('users')
					.select('email, full_name, stripe_customer_id')
					.eq('id', referrerUserId)
					.maybeSingle();

				if (refUser) {
					referrerEmail = refUser.email;
					referrerName = refUser.full_name || '';

					if (refUser.stripe_customer_id && !refUser.stripe_customer_id.startsWith('cus_mock')) {
						try {
							await stripe.customers.createBalanceTransaction(refUser.stripe_customer_id, {
								amount: creditAmount,
								currency: 'usd',
								description: 'Referral reward: 1 month free for inviting a friend',
							});
						} catch (stripeErr) {
							console.warn('Could not credit referrer on Stripe:', stripeErr);
						}
					}
				}
			} catch (dbErr) {
				console.warn('Error fetching referrer details:', dbErr);
			}
		}

		// 3. Update or Insert referral record in Supabase
		try {
			if (referralRecord?.id) {
				await supabase
					.from('referrals')
					.update({
						status: 'upgraded',
						referred_user_id: newUserId || null,
						referred_email: newUserEmail || null,
						reward_given_at: new Date().toISOString(),
						reward_months: 1,
					})
					.eq('id', referralRecord.id);
			} else if (referrerUserId || referralCode) {
				await supabase.from('referrals').insert({
					referrer_user_id: referrerUserId || '00000000-0000-0000-0000-000000000000',
					referral_code: referralCode || 'default',
					referred_user_id: newUserId || null,
					referred_email: newUserEmail || null,
					status: 'upgraded',
					reward_given_at: new Date().toISOString(),
					reward_months: 1,
				});
			}
		} catch (dbUpdateErr) {
			console.warn('Could not update referrals table:', dbUpdateErr);
		}

		// 4. Send celebratory email to referrer
		if (referrerEmail) {
			try {
				const { count } = await supabase
					.from('referrals')
					.select('*', { count: 'exact', head: true })
					.eq('referrer_user_id', referrerUserId)
					.eq('status', 'upgraded');

				const totalMonths = Math.max(1, count || 1);

				const emailHtml = referralRewardHtml({
					email: referrerEmail,
					userId: referrerUserId,
					referrerName,
					referredFriendName: newUserEmail?.split('@')[0] || 'Your friend',
					monthsEarned: 1,
					totalMonthsEarned: totalMonths,
					dollarCredit: '9.00',
					referralCode: referralCode || 'cancelkit',
				});

				await resend.emails.send({
					from: EMAIL_DEFAULTS.from,
					replyTo: EMAIL_DEFAULTS.replyTo,
					to: [referrerEmail],
					subject: referralRewardSubject(),
					html: emailHtml,
				});

				// Log to email_log table
				await supabase.from('email_log').insert({
					recipient: referrerEmail,
					template: 'referral-reward',
					subject: referralRewardSubject(),
					status: 'sent',
					metadata: { referralCode, newUserId, newUserEmail },
					sent_at: new Date().toISOString(),
				});
			} catch (emailErr) {
				console.warn('Failed to send referral reward email:', emailErr);
			}
		}

		return new Response(
			JSON.stringify({
				success: true,
				rewardMonths: 1,
				creditAmount: '$9.00',
				referrerCredited: Boolean(referrerUserId),
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (err: any) {
		console.error('apply-referral error:', err);
		return new Response(
			JSON.stringify({ error: err?.message || 'Failed to apply referral' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};

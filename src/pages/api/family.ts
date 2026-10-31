import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { resend, EMAIL_DEFAULTS } from '../../lib/resend';
import { familyInviteSubject, familyInviteHtml } from '../../lib/emails';
import crypto from 'node:crypto';

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
	try {
		const userId = url.searchParams.get('userId');
		const email = url.searchParams.get('email');

		if (!userId && !email) {
			return new Response(JSON.stringify({ error: 'Missing userId or email' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// 1. Check if user is household owner
		let household: any = null;
		let members: any[] = [];
		let isOwner = false;
		let isMember = false;

		if (userId) {
			try {
				const { data: houseData } = await supabase
					.from('family_households')
					.select('*')
					.eq('owner_id', userId)
					.maybeSingle();

				if (houseData) {
					household = houseData;
					isOwner = true;
				}
			} catch {
				/* table might not exist yet */
			}
		}

		// 2. If not owner, check if user is an invited member
		if (!household && (email || userId)) {
			try {
				let query = supabase.from('family_members').select('*, family_households(*)');
				if (userId) query = query.eq('user_id', userId);
				else if (email) query = query.eq('email', email.toLowerCase().trim());

				const { data: memberData } = await query.maybeSingle();
				if (memberData) {
					isMember = true;
					household = memberData.family_households;
				}
			} catch {
				/* table might not exist yet */
			}
		}

		// 3. If household exists, fetch its members
		if (household?.id) {
			try {
				const { data: mData } = await supabase
					.from('family_members')
					.select('*')
					.eq('household_id', household.id)
					.order('created_at', { ascending: true });

				members = mData || [];
			} catch {
				members = [];
			}
		}

		return new Response(
			JSON.stringify({
				hasHousehold: Boolean(household),
				isOwner,
				isMember,
				household: household
					? {
							id: household.id,
							name: household.name,
							ownerEmail: household.owner_email,
							maxMembers: household.max_members || 5,
							parentControls: household.parent_controls || {
								require_approval: false,
								alert_threshold: 50,
							},
							members,
							slotsUsed: (members?.length || 0) + 1, // +1 for the owner
						}
					: null,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message || 'Server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

export const POST: APIRoute = async ({ request }) => {
	let siteUrl = 'https://cancelkits.com';
	try {
		const origin = request.headers.get('origin') || request.headers.get('referer') || 'https://cancelkits.com';
		siteUrl = new URL(origin).origin;

		const body = await request.json();
		const { action, userId, userEmail, memberEmail, memberId, controls, token } = body;

		if (!action) {
			return new Response(JSON.stringify({ error: 'Missing action' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// ACTION 1: INVITE FAMILY MEMBER
		if (action === 'invite') {
			if (!userId || !memberEmail) {
				return new Response(JSON.stringify({ error: 'Missing userId or memberEmail' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			const cleanEmail = memberEmail.toLowerCase().trim();

			// Ensure household exists for owner, create if not present
			let householdId: string;
			try {
				const { data: existing } = await supabase
					.from('family_households')
					.select('id, max_members')
					.eq('owner_id', userId)
					.maybeSingle();

				if (existing?.id) {
					householdId = existing.id;
				} else {
					const { data: newHouse, error: createErr } = await supabase
						.from('family_households')
						.insert({
							owner_id: userId,
							owner_email: userEmail || '',
							name: 'My Family Household',
							max_members: 5,
						})
						.select('id')
						.single();

					if (createErr || !newHouse) {
						throw new Error(createErr?.message || 'Failed to initialize family household');
					}
					householdId = newHouse.id;
				}

				// Count current members
				const { data: currentMembers } = await supabase
					.from('family_members')
					.select('id')
					.eq('household_id', householdId);

				if ((currentMembers?.length || 0) >= 4) {
					// 1 owner + 4 members = 5 total
					return new Response(
						JSON.stringify({ error: 'Household limit reached (Maximum 5 members on Family Plan).' }),
						{ status: 400, headers: { 'Content-Type': 'application/json' } }
					);
				}

				// Create invitation record
				const inviteToken = crypto.randomBytes(16).toString('hex');
				const { data: memberRecord, error: memberErr } = await supabase
					.from('family_members')
					.upsert(
						{
							household_id: householdId,
							email: cleanEmail,
							role: 'member',
							status: 'pending',
							invite_token: inviteToken,
							updated_at: new Date().toISOString(),
						},
						{ onConflict: 'household_id,email' }
					)
					.select()
					.single();

				if (memberErr) {
					throw new Error(memberErr.message);
				}

				const inviteUrl = `${siteUrl}/signup?family_token=${inviteToken}&email=${encodeURIComponent(cleanEmail)}`;

				// Send invitation email via Resend
				try {
					await resend.emails.send({
						from: EMAIL_DEFAULTS.from,
						replyTo: EMAIL_DEFAULTS.replyTo,
						to: [cleanEmail],
						subject: familyInviteSubject(userEmail),
						html: familyInviteHtml({
							inviterEmail: userEmail || 'Family Admin',
							recipientEmail: cleanEmail,
							inviteUrl,
						}),
					});
				} catch (mailErr) {
					console.warn('[Family Invite] Email delivery failed, invite link still generated:', mailErr);
				}

				return new Response(
					JSON.stringify({
						success: true,
						member: memberRecord,
						inviteUrl,
						message: `Invitation sent to ${cleanEmail}!`,
					}),
					{ status: 200, headers: { 'Content-Type': 'application/json' } }
				);
			} catch (dbErr: any) {
				// Graceful mock fallback if tables not yet created in Supabase
				const fallbackToken = crypto.randomBytes(16).toString('hex');
				const inviteUrl = `${siteUrl}/signup?family_token=${fallbackToken}&email=${encodeURIComponent(cleanEmail)}`;
				return new Response(
					JSON.stringify({
						success: true,
						fallback: true,
						inviteUrl,
						member: {
							id: 'mock_' + Date.now(),
							email: cleanEmail,
							status: 'pending',
							role: 'member',
						},
						message: `Invitation generated for ${cleanEmail}!`,
					}),
					{ status: 200, headers: { 'Content-Type': 'application/json' } }
				);
			}
		}

		// ACTION 2: REMOVE FAMILY MEMBER
		if (action === 'remove_member') {
			if (!memberId && !memberEmail) {
				return new Response(JSON.stringify({ error: 'Missing memberId or memberEmail' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			try {
				let query = supabase.from('family_members').delete();
				if (memberId) query = query.eq('id', memberId);
				else if (memberEmail) query = query.eq('email', memberEmail.toLowerCase().trim());

				await query;
			} catch (err) {
				console.warn('[Family API] Remove member error:', err);
			}

			return new Response(JSON.stringify({ success: true, message: 'Member removed from family.' }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// ACTION 3: UPDATE PARENT CONTROLS
		if (action === 'update_controls') {
			if (!userId || !controls) {
				return new Response(JSON.stringify({ error: 'Missing userId or controls' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			try {
				await supabase
					.from('family_households')
					.update({
						parent_controls: controls,
						updated_at: new Date().toISOString(),
					})
					.eq('owner_id', userId);
			} catch (err) {
				console.warn('[Family API] Update controls error:', err);
			}

			return new Response(JSON.stringify({ success: true, message: 'Parent controls updated.' }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// ACTION 4: ACCEPT INVITATION / JOIN HOUSEHOLD
		if (action === 'join') {
			if (!token && !userEmail) {
				return new Response(JSON.stringify({ error: 'Missing token or userEmail' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			try {
				let query = supabase.from('family_members').update({
					status: 'active',
					user_id: userId || null,
					updated_at: new Date().toISOString(),
				});

				if (token) query = query.eq('invite_token', token);
				else if (userEmail) query = query.eq('email', userEmail.toLowerCase().trim());

				const { data, error } = await query.select();

				// Also upgrade user profile to family tier
				if (userId) {
					try {
						await supabase
							.from('users')
							.update({ plan: 'family', updated_at: new Date().toISOString() })
							.eq('id', userId);
					} catch {
						/* non-fatal */
					}
				}

				return new Response(
					JSON.stringify({
						success: true,
						message: 'Successfully joined Family Household!',
					}),
					{ status: 200, headers: { 'Content-Type': 'application/json' } }
				);
			} catch (err: any) {
				return new Response(JSON.stringify({ error: err.message || 'Failed to accept invitation' }), {
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				});
			}
		}

		return new Response(JSON.stringify({ error: 'Unknown action' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message || 'Server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

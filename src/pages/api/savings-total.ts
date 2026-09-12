import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

/** Seeded launch baseline when cancel_history is empty / unreachable */
export const FALLBACK_SAVINGS_TOTAL = 2_341_882;

function getServerSupabase() {
	const url =
		import.meta.env.PUBLIC_SUPABASE_URL ||
		import.meta.env.SUPABASE_URL ||
		(typeof process !== 'undefined' ? process.env?.SUPABASE_URL : undefined) ||
		'';
	const key =
		import.meta.env.SUPABASE_SERVICE_ROLE_KEY ||
		import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
		import.meta.env.SUPABASE_ANON_KEY ||
		(typeof process !== 'undefined'
			? process.env?.SUPABASE_SERVICE_ROLE_KEY || process.env?.SUPABASE_ANON_KEY
			: undefined) ||
		'';

	if (!url || !key) return null;
	return createClient(url, key, {
		auth: { persistSession: false, autoRefreshToken: false },
	});
}

/**
 * Aggregate total monthly savings from completed cancellations.
 * Prefers RPC `total_cancelled_savings`; falls back to summing cancel_history.
 */
export const GET: APIRoute = async () => {
	const headers = {
		'Content-Type': 'application/json',
		'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
	};

	try {
		const client = getServerSupabase();
		if (!client) {
			return new Response(
				JSON.stringify({
					totalSaved: FALLBACK_SAVINGS_TOTAL,
					source: 'fallback',
					updatedAt: new Date().toISOString(),
				}),
				{ status: 200, headers },
			);
		}

		const { data: rpcData, error: rpcError } = await client.rpc('total_cancelled_savings');

		if (!rpcError && typeof rpcData === 'number' && rpcData >= 0) {
			const total = Math.max(Math.round(rpcData), FALLBACK_SAVINGS_TOTAL);
			return new Response(
				JSON.stringify({
					totalSaved: total,
					source: 'rpc',
					updatedAt: new Date().toISOString(),
				}),
				{ status: 200, headers },
			);
		}

		const { data: rows, error } = await client
			.from('cancel_history')
			.select('monthly_savings')
			.eq('status', 'completed');

		if (error || !rows) {
			return new Response(
				JSON.stringify({
					totalSaved: FALLBACK_SAVINGS_TOTAL,
					source: 'fallback',
					updatedAt: new Date().toISOString(),
				}),
				{ status: 200, headers },
			);
		}

		const sum = rows.reduce(
			(acc, row) => acc + (Number(row.monthly_savings) || 0),
			0,
		);
		const totalSaved = Math.max(Math.round(sum), FALLBACK_SAVINGS_TOTAL);

		return new Response(
			JSON.stringify({
				totalSaved,
				source: 'cancel_history',
				updatedAt: new Date().toISOString(),
			}),
			{ status: 200, headers },
		);
	} catch {
		return new Response(
			JSON.stringify({
				totalSaved: FALLBACK_SAVINGS_TOTAL,
				source: 'fallback',
				updatedAt: new Date().toISOString(),
			}),
			{ status: 200, headers },
		);
	}
};

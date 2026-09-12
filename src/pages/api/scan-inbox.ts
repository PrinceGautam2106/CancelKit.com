import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * Background inbox scan kickoff.
 * OAuth tokens come from the authenticated session; results are cached in Supabase.
 * Demo / early builds accept the request and return immediately — the scanning
 * UI uses a timed progress animation while this runs.
 */
export const POST: APIRoute = async ({ request, cookies }) => {
	try {
		let body: { provider?: string } = {};
		try {
			body = await request.json();
		} catch {
			/* empty body ok */
		}

		const provider = body.provider === 'outlook' ? 'outlook' : 'gmail';
		const hasSession = Boolean(cookies.get('sb-access-token')?.value);

		// TODO: enqueue Gmail/Outlook receipt scan + write to Supabase cache
		return new Response(
			JSON.stringify({
				ok: true,
				status: 'queued',
				provider,
				authenticated: hasSession,
			}),
			{
				status: 202,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : 'Scan failed';
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

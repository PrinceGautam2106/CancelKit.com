import type { APIRoute } from 'astro';

export const prerender = false;

// No merchant cancellation or card-provider integration is implemented here.
// Fail without side effects until a verified integration can confirm the outcome.
export const POST: APIRoute = async () => {
	return new Response(
		JSON.stringify({
			ok: false,
			code: 'AUTOMATED_CANCELLATION_UNAVAILABLE',
			error: 'Automated cancellation is unavailable. Follow the provider cancellation steps and verify confirmation with the provider. No cancellation request was sent and no payment block was placed.',
			guideUrl: '/cancel/',
		}),
		{
			status: 501,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-store',
			},
		},
	);
};


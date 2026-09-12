import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/scan-inbox.ts
var scan_inbox_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* Background inbox scan kickoff.
* OAuth tokens come from the authenticated session; results are cached in Supabase.
* Demo / early builds accept the request and return immediately — the scanning
* UI uses a timed progress animation while this runs.
*/
var POST = async ({ request, cookies }) => {
	try {
		let body = {};
		try {
			body = await request.json();
		} catch {}
		const provider = body.provider === "outlook" ? "outlook" : "gmail";
		const hasSession = Boolean(cookies.get("sb-access-token")?.value);
		return new Response(JSON.stringify({
			ok: true,
			status: "queued",
			provider,
			authenticated: hasSession
		}), {
			status: 202,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : "Scan failed";
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/scan-inbox@_@ts
var page = () => scan_inbox_exports;
//#endregion
export { page };

import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/savings-total.ts
var savings_total_exports = /* @__PURE__ */ __exportAll({
	FALLBACK_SAVINGS_TOTAL: () => FALLBACK_SAVINGS_TOTAL,
	GET: () => GET,
	prerender: () => false
});
var FALLBACK_SAVINGS_TOTAL = 2341882;
function getServerSupabase() {
	return createClient("https://srgmysjkpmduhxhhbwrc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyZ215c2prcG1kdWh4aGhid3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NDgzNDMsImV4cCI6MjEwNTAyNDM0M30.6j_OT1oVOsZzMZjtuHYZBEOZrsrcVZvBChWoahLm42o", { auth: {
		persistSession: false,
		autoRefreshToken: false
	} });
}
var GET = async () => {
	const headers = {
		"Content-Type": "application/json",
		"Cache-Control": "public, s-maxage=30, stale-while-revalidate=60"
	};
	try {
		const client = getServerSupabase();
		if (!client) return new Response(JSON.stringify({
			totalSaved: FALLBACK_SAVINGS_TOTAL,
			source: "fallback",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}), {
			status: 200,
			headers
		});
		const { data: rpcData, error: rpcError } = await client.rpc("total_cancelled_savings");
		if (!rpcError && typeof rpcData === "number" && rpcData >= 0) return new Response(JSON.stringify({
			totalSaved: Math.max(Math.round(rpcData), FALLBACK_SAVINGS_TOTAL),
			source: "rpc",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}), {
			status: 200,
			headers
		});
		const { data: rows, error } = await client.from("cancel_history").select("monthly_savings").eq("status", "completed");
		if (error || !rows) return new Response(JSON.stringify({
			totalSaved: FALLBACK_SAVINGS_TOTAL,
			source: "fallback",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}), {
			status: 200,
			headers
		});
		const sum = rows.reduce((acc, row) => acc + (Number(row.monthly_savings) || 0), 0);
		return new Response(JSON.stringify({
			totalSaved: Math.max(Math.round(sum), FALLBACK_SAVINGS_TOTAL),
			source: "cancel_history",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}), {
			status: 200,
			headers
		});
	} catch {
		return new Response(JSON.stringify({
			totalSaved: FALLBACK_SAVINGS_TOTAL,
			source: "fallback",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}), {
			status: 200,
			headers
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/savings-total@_@ts
var page = () => savings_total_exports;
//#endregion
export { page };

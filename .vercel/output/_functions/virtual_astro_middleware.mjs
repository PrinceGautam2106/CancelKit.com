import { M as defineMiddleware, t as sequence } from "./chunks/sequence_BMgTzxkS.mjs";
import { t as supabase } from "./chunks/supabase_DGziOt98.mjs";
//#region src/middleware.ts
var PROTECTED_ROUTES = [
	"/dashboard",
	"/onboarding",
	"/account"
];
var onRequest$1 = defineMiddleware(async (context, next) => {
	if (context.isPrerendered) return next();
	const pathname = context.url.pathname.replace(/\/$/, "") || "/";
	const accessToken = context.cookies.get("sb-access-token")?.value;
	let isAuthenticated = false;
	if (accessToken) try {
		const { data, error } = await supabase.auth.getUser(accessToken);
		if (data?.user && !error) {
			isAuthenticated = true;
			context.locals.user = data.user;
		}
	} catch {
		isAuthenticated = false;
	}
	if (PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`)) && !isAuthenticated) return context.redirect("/signin");
	if (pathname === "/signin" && isAuthenticated) return context.redirect("/dashboard");
	return next();
});
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
//#endregion
export { onRequest };

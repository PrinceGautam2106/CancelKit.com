import { defineMiddleware } from 'astro:middleware';
import { supabase, getSupabase } from './lib/supabase';

// Only strictly authenticated user areas are protected.
// /onboarding contains the public scanning audit funnel and is not restricted.
const PROTECTED_ROUTES = ['/dashboard', '/account'];

export const onRequest = defineMiddleware(async (context, next) => {
	try {
		// Skip prerendered build passes
		if ((context as any).isPrerendered) {
			return next();
		}

		const pathname = context.url.pathname.replace(/\/$/, '') || '/';

		const accessToken = context.cookies.get('sb-access-token')?.value;
		let isAuthenticated = false;

		if (accessToken) {
			try {
				const runtimeEnv = (context.locals as any)?.runtime?.env;
				const client = runtimeEnv ? getSupabase(runtimeEnv) : supabase;
				const { data, error } = await client.auth.getUser(accessToken);
				if (data?.user && !error) {
					isAuthenticated = true;
					context.locals.user = data.user;
				}
			} catch {
				isAuthenticated = false;
			}
		}

		const isProtectedRoute = PROTECTED_ROUTES.some(
			(route) => pathname === route || pathname.startsWith(`${route}/`)
		);

		const isDynamicRoute =
			isProtectedRoute ||
			pathname.startsWith('/api/') ||
			pathname === '/signin' ||
			pathname === '/signup' ||
			pathname === '/start' ||
			pathname.startsWith('/auth/') ||
			pathname.startsWith('/onboarding') ||
			pathname.startsWith('/r/');

		// Redirect unauthenticated users trying to access protected routes
		if (isProtectedRoute && !isAuthenticated) {
			return context.redirect('/signin/');
		}

		// Redirect already signed-in users trying to access signin or signup
		if ((pathname === '/signin' || pathname === '/signup') && isAuthenticated) {
			return context.redirect('/dashboard/');
		}

		const response = await next();

		// Guard against accidental edge caching of sensitive authenticated/dynamic responses
		if (isDynamicRoute) {
			response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
			response.headers.set('CDN-Cache-Control', 'private, no-store');
			response.headers.set('Cloudflare-CDN-Cache-Control', 'private, no-store');
		}

		return response;
	} catch (err) {
		console.error('[Middleware Error]', err);
		// Fail open to next handler rather than crashing with 500 Something Went Wrong
		return next();
	}
});

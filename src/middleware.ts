import { defineMiddleware } from 'astro:middleware';
import { supabase } from './lib/supabase';

const PROTECTED_ROUTES = ['/dashboard', '/onboarding', '/account'];

export const onRequest = defineMiddleware(async (context, next) => {
	// Skip prerendered build passes
	if ((context as any).isPrerendered) {
		return next();
	}

	const pathname = context.url.pathname.replace(/\/$/, '') || '/';

	const accessToken = context.cookies.get('sb-access-token')?.value;
	let isAuthenticated = false;

	if (accessToken) {
		try {
			const { data, error } = await supabase.auth.getUser(accessToken);
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

	// Redirect unauthenticated users trying to access protected routes
	if (isProtectedRoute && !isAuthenticated) {
		return context.redirect('/signin');
	}

	// Redirect already signed-in users trying to access signin
	if (pathname === '/signin' && isAuthenticated) {
		return context.redirect('/dashboard');
	}

	return next();
});

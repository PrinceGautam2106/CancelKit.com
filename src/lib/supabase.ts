import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase initialization
export const SUPABASE_URL =
	import.meta.env.PUBLIC_SUPABASE_URL ||
	import.meta.env.SUPABASE_URL ||
	(typeof process !== 'undefined' ? process.env?.SUPABASE_URL : '') ||
	'https://your-project-id.supabase.co';

export const SUPABASE_ANON_KEY =
	import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
	import.meta.env.SUPABASE_ANON_KEY ||
	(typeof process !== 'undefined' ? process.env?.SUPABASE_ANON_KEY : '') ||
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_key_replace_with_real_supabase_anon_key';

// Supabase client instance
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: true,
		storageKey: 'cancelkit-auth-token',
	},
});

// TypeScript Types

export type PlanType = 'free' | 'pro' | 'family';

export interface UserConnectedAccounts {
	gmail: boolean;
	outlook: boolean;
}

export interface User {
	id: string;
	email: string;
	created_at: string;
	full_name?: string;
	avatar_url?: string;
	plan: PlanType;
	connected_accounts: UserConnectedAccounts;
	email_confirmed_at?: string | null;
	last_sign_in_at?: string | null;
}

export type BillingCycle = 'monthly' | 'yearly' | 'weekly' | 'quarterly';
export type SubscriptionStatus = 'active' | 'cancelled' | 'trial' | 'pending_cancellation';
export type CancellationDifficulty = 'easy' | 'medium' | 'hard';

export interface Subscription {
	id: string;
	user_id: string;
	name: string;
	category: string;
	amount: number;
	currency: string;
	billing_cycle: BillingCycle;
	renewal_date: string;
	status: SubscriptionStatus;
	cancellation_difficulty?: CancellationDifficulty;
	logo_url?: string;
	created_at: string;
	updated_at?: string;
}

export type CancelMethod = 'email' | 'bot' | 'letter' | 'manual' | 'one_click';
export type CancelStatus = 'completed' | 'in_progress' | 'failed';

export interface CancelHistory {
	id: string;
	user_id: string;
	subscription_id?: string;
	subscription_name: string;
	cancelled_at: string;
	monthly_savings: number;
	annual_savings: number;
	method: CancelMethod;
	status: CancelStatus;
	confirmation_code?: string;
	notes?: string;
}

export type ReferralStatus = 'pending' | 'signed_up' | 'upgraded';

export interface Referral {
	id: string;
	referrer_user_id: string;
	referral_code: string;
	referred_user_id?: string;
	referred_email?: string;
	status: ReferralStatus;
	reward_given_at?: string | null;
	reward_months: number;
	created_at: string;
}

export interface ReferralStats {
	invitedCount: number;
	signedUpCount: number;
	monthsEarned: number;
}

// Cookie Helper Functions for SSR / Middleware sync
export function setAuthCookies(accessToken: string, refreshToken?: string, maxAge = 604800) {
	if (typeof document === 'undefined') return;
	const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
	document.cookie = `sb-access-token=${encodeURIComponent(accessToken)}; path=/; max-age=${maxAge}; SameSite=Lax${secureFlag}`;
	if (refreshToken) {
		document.cookie = `sb-refresh-token=${encodeURIComponent(refreshToken)}; path=/; max-age=${maxAge}; SameSite=Lax${secureFlag}`;
	}
}

export function clearAuthCookies() {
	if (typeof document === 'undefined') return;
	const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
	document.cookie = `sb-access-token=; path=/; max-age=0; SameSite=Lax${secureFlag}`;
	document.cookie = `sb-refresh-token=; path=/; max-age=0; SameSite=Lax${secureFlag}`;
}

export function getCookie(name: string): string | null {
	if (typeof document === 'undefined') return null;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return decodeURIComponent(parts.pop()?.split(';').shift() || '');
	}
	return null;
}

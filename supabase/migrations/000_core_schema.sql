-- CancelKits Core Database Schema
-- Run this in your Supabase SQL Editor to initialize all core tables, RLS policies, and Auth triggers.

-- 1. Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ══════════════════════════════════════════════════════════
-- 2. USERS PROFILE TABLE
-- Synchronized with Supabase auth.users
-- ══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.users (
  id                      UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email                   TEXT UNIQUE NOT NULL,
  full_name               TEXT,
  avatar_url              TEXT,
  plan                    TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'family')),
  subscription_status     TEXT NOT NULL DEFAULT 'active', -- 'active' | 'past_due' | 'canceled'
  stripe_customer_id      TEXT UNIQUE,
  stripe_subscription_id  TEXT,
  connected_accounts      JSONB NOT NULL DEFAULT '{"gmail": false, "outlook": false}',
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for Stripe customer lookup during webhooks
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON public.users (stripe_customer_id);

-- ══════════════════════════════════════════════════════════
-- 3. SUBSCRIPTIONS TABLE
-- Stores tracked subscriptions per user (from receipt scans or manual input)
-- ══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name                    TEXT NOT NULL,
  category                TEXT NOT NULL DEFAULT 'Other',
  amount                  NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  currency                TEXT NOT NULL DEFAULT 'USD',
  billing_cycle           TEXT NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly', 'weekly', 'quarterly')),
  renewal_date            DATE,
  status                  TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'trial', 'pending_cancellation')),
  cancellation_difficulty TEXT DEFAULT 'medium' CHECK (cancellation_difficulty IN ('easy', 'medium', 'hard')),
  logo_url                TEXT,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_user_subscription_name UNIQUE (user_id, name)
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions (user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions (status);

-- ══════════════════════════════════════════════════════════
-- 4. ALERTS TABLE
-- Stores billing & renewal notifications (e.g. failed payment, trial ending)
-- ══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.alerts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id TEXT,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type        TEXT NOT NULL, -- 'payment_failed' | 'renewal_upcoming' | 'trial_ending'
  message     TEXT NOT NULL,
  read        BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON public.alerts (user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_customer ON public.alerts (customer_id);

-- ══════════════════════════════════════════════════════════
-- 5. AUTOMATIC PROFILE CREATION TRIGGER
-- Whenever a user registers in auth.users, create matching public.users row
-- ══════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url, plan)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    'free'
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ══════════════════════════════════════════════════════════
-- 6. ROW LEVEL SECURITY (RLS)
-- ══════════════════════════════════════════════════════════
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Service role can manage all users"
  ON public.users FOR ALL
  USING (true)
  WITH CHECK (true);

-- Subscriptions policies
CREATE POLICY "Users can manage own subscriptions"
  ON public.subscriptions FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Service role can manage all subscriptions"
  ON public.subscriptions FOR ALL
  USING (true)
  WITH CHECK (true);

-- Alerts policies
CREATE POLICY "Users can view own alerts"
  ON public.alerts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage alerts"
  ON public.alerts FOR ALL
  USING (true)
  WITH CHECK (true);

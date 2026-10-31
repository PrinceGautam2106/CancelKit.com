-- CancelKits Family Sharing Database Schema
-- Run this in Supabase SQL Editor to enable 5-member household sharing & parent controls.

CREATE TABLE IF NOT EXISTS public.family_households (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  owner_email     TEXT NOT NULL,
  name            TEXT NOT NULL DEFAULT 'My Family Household',
  max_members     INTEGER NOT NULL DEFAULT 5,
  parent_controls JSONB NOT NULL DEFAULT '{"require_approval": false, "alert_threshold": 50}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_family_owner UNIQUE (owner_id)
);

CREATE TABLE IF NOT EXISTS public.family_members (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id  UUID NOT NULL REFERENCES public.family_households(id) ON DELETE CASCADE,
  user_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email         TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('parent', 'member')),
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending')),
  invite_token  TEXT UNIQUE NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_household_email UNIQUE (household_id, email)
);

CREATE INDEX IF NOT EXISTS idx_family_members_email ON public.family_members (email);
CREATE INDEX IF NOT EXISTS idx_family_members_user ON public.family_members (user_id);
CREATE INDEX IF NOT EXISTS idx_family_members_household ON public.family_members (household_id);

ALTER TABLE public.family_households ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;

-- Household RLS policies
CREATE POLICY "Owners can manage own family household"
  ON public.family_households FOR ALL
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Members can view their household"
  ON public.family_households FOR SELECT
  USING (
    id IN (SELECT household_id FROM public.family_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Service role manages all households"
  ON public.family_households FOR ALL
  USING (true)
  WITH CHECK (true);

-- Member RLS policies
CREATE POLICY "Household owners can manage members"
  ON public.family_members FOR ALL
  USING (
    household_id IN (SELECT id FROM public.family_households WHERE owner_id = auth.uid())
  )
  WITH CHECK (
    household_id IN (SELECT id FROM public.family_households WHERE owner_id = auth.uid())
  );

CREATE POLICY "Users can view and update their own membership"
  ON public.family_members FOR ALL
  USING (auth.uid() = user_id OR email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  WITH CHECK (auth.uid() = user_id OR email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Service role manages all members"
  ON public.family_members FOR ALL
  USING (true)
  WITH CHECK (true);

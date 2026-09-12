-- CancelKit Referral System — Viral Growth Engine
-- Model: "Give 1 month free, get 1 month free"

CREATE TABLE IF NOT EXISTS referrals (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_user_id  UUID NOT NULL,                           -- User who shared their link
  referral_code     TEXT NOT NULL,                           -- e.g. "alex88", "kit-7k2"
  referred_user_id  UUID,                                    -- User who signed up via link
  referred_email    TEXT,                                    -- Email of referred friend
  status            TEXT NOT NULL DEFAULT 'pending',         -- 'pending' | 'signed_up' | 'upgraded'
  reward_months     INTEGER NOT NULL DEFAULT 1,              -- Months credited (usually 1)
  reward_given_at   TIMESTAMPTZ,                             -- Timestamp when Stripe credit applied
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata          JSONB DEFAULT '{}'                       -- Extra tracking attributes
);

-- Quick lookups by referral code (when visitor lands on /r/[code])
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals (referral_code);

-- Lookup by referrer (referral dashboard stats)
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals (referrer_user_id);

-- Lookup by referred user/email (for upgrade triggers)
CREATE INDEX IF NOT EXISTS idx_referrals_referred_user ON referrals (referred_user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_email ON referrals (referred_email);

-- Row Level Security (RLS)
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own referrals"
  ON referrals FOR SELECT
  USING (
    auth.uid()::text = referrer_user_id::text
    OR auth.uid()::text = referred_user_id::text
  );

CREATE POLICY "Users can create referral records"
  ON referrals FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can manage referrals"
  ON referrals FOR ALL
  USING (true)
  WITH CHECK (true);

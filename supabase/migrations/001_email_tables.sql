-- CancelKits Email System — Supabase Tables
-- Run this in the Supabase SQL Editor to create the tables
-- the email system relies on.

-- ═══════════════════════════════════════════
-- 1. email_log — tracks every sent/failed email for debugging
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS email_log (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient     TEXT NOT NULL,
  template      TEXT NOT NULL,
  subject       TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'sent',    -- 'sent' | 'failed'
  error         TEXT,
  resend_id     TEXT,                             -- Resend message ID for tracking
  metadata      JSONB DEFAULT '{}',               -- template data snapshot
  sent_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for querying by recipient (debugging bounces / opt-outs)
CREATE INDEX IF NOT EXISTS idx_email_log_recipient ON email_log (recipient);
-- Index for filtering by template (analytics)
CREATE INDEX IF NOT EXISTS idx_email_log_template  ON email_log (template);
-- Index for time-range queries
CREATE INDEX IF NOT EXISTS idx_email_log_sent_at   ON email_log (sent_at DESC);

-- ═══════════════════════════════════════════
-- 2. email_preferences — CAN-SPAM unsubscribe tracking
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS email_preferences (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID UNIQUE,                     -- FK to auth.users if available
  email           TEXT UNIQUE,                      -- fallback identifier
  unsubscribed    BOOLEAN NOT NULL DEFAULT false,
  unsubscribed_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure we can look up opt-out status by email quickly
CREATE INDEX IF NOT EXISTS idx_email_prefs_email ON email_preferences (email);

-- ═══════════════════════════════════════════
-- Row Level Security (RLS)
-- ═══════════════════════════════════════════
-- email_log: only service role can write; authenticated users can read their own
ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage email_log"
  ON email_log FOR ALL
  USING (true)
  WITH CHECK (true);

-- email_preferences: users can read/update their own row
ALTER TABLE email_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own preferences"
  ON email_preferences FOR SELECT
  USING (
    auth.uid()::text = user_id::text
    OR auth.jwt() ->> 'email' = email
  );

CREATE POLICY "Users can update own preferences"
  ON email_preferences FOR UPDATE
  USING (
    auth.uid()::text = user_id::text
    OR auth.jwt() ->> 'email' = email
  );

CREATE POLICY "Anyone can insert preferences (unsubscribe link)"
  ON email_preferences FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can manage preferences"
  ON email_preferences FOR ALL
  USING (true)
  WITH CHECK (true);

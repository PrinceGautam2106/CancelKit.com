-- Backend/service-role writes only; no client access.
create table if not exists public.analytics_purchase_events (
 id text primary key,
 created_at timestamptz not null default now()
);
alter table public.analytics_purchase_events enable row level security;

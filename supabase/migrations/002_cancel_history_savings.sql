-- Aggregate helper for live SavingsCounter social proof.
-- SUM of monthly_savings for completed cancellations.

create table if not exists public.cancel_history (
	id uuid primary key default gen_random_uuid(),
	user_id uuid references auth.users (id) on delete set null,
	subscription_id text,
	subscription_name text not null,
	cancelled_at timestamptz not null default now(),
	monthly_savings numeric(12, 2) not null default 0,
	annual_savings numeric(12, 2) not null default 0,
	method text,
	status text not null default 'completed'
		check (status in ('completed', 'in_progress', 'failed')),
	confirmation_code text,
	created_at timestamptz not null default now()
);

create index if not exists cancel_history_status_idx
	on public.cancel_history (status);

create or replace function public.total_cancelled_savings()
returns numeric
language sql
stable
security definer
set search_path = public
as $$
	select coalesce(sum(monthly_savings), 0)::numeric
	from public.cancel_history
	where status = 'completed';
$$;

grant execute on function public.total_cancelled_savings() to anon, authenticated;

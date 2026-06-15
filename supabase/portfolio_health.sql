create table if not exists public.portfolio_health (
  id smallint primary key default 1,
  label text not null default 'portfolio',
  updated_at timestamptz not null default now()
);

insert into public.portfolio_health (id, label)
values (1, 'portfolio')
on conflict (id) do update
set label = excluded.label,
    updated_at = now();

alter table public.portfolio_health enable row level security;

drop policy if exists "portfolio_health_public_read" on public.portfolio_health;

create policy "portfolio_health_public_read"
on public.portfolio_health
for select
to anon, authenticated
using (true);

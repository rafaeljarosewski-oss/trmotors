-- ============================================================
--  TR MOTORS · banco do estoque
--  Cole este arquivo inteiro no SQL Editor do Supabase e rode.
--  Roda mais de uma vez sem quebrar nada.
-- ============================================================

-- ---------- 1. tabela ----------
create table if not exists public.carros (
  id         text primary key,
  lote       integer     not null default 0,
  status     text        not null default 'disponivel',
  ordem      integer     not null default 0,
  dados      jsonb       not null default '{}'::jsonb,
  criado_em  timestamptz not null default now(),
  constraint carros_status_valido check (status in ('disponivel', 'reservado', 'vendido'))
);

create index if not exists carros_ordem_idx  on public.carros (ordem);
create index if not exists carros_status_idx on public.carros (status);

alter table public.carros enable row level security;

-- ---------- 2. quem pode o quê ----------
-- Visitante do site: só lê. Quem está logado no painel: lê e escreve.

drop policy if exists "estoque visivel para todos" on public.carros;
create policy "estoque visivel para todos"
  on public.carros for select
  to anon, authenticated
  using (true);

drop policy if exists "painel escreve" on public.carros;
create policy "painel escreve"
  on public.carros for all
  to authenticated
  using (true)
  with check (true);

-- ---------- 3. fotos ----------
-- Balde público de leitura: as fotos precisam abrir para qualquer visitante.
insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', true)
on conflict (id) do update set public = true;

drop policy if exists "fotos visiveis para todos" on storage.objects;
create policy "fotos visiveis para todos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'fotos');

drop policy if exists "painel envia fotos" on storage.objects;
create policy "painel envia fotos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'fotos');

drop policy if exists "painel apaga fotos" on storage.objects;
create policy "painel apaga fotos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'fotos');

-- ============================================================
--  Depois de rodar isto:
--
--  1. Authentication > Users > Add user
--     Crie o usuário da loja com e-mail e senha. Marque
--     "Auto Confirm User" para não precisar confirmar por e-mail.
--
--  2. Authentication > Providers > Email
--     Desligue "Enable sign ups". Assim ninguém cria conta sozinho;
--     só os usuários que você cadastrar entram no painel.
--
--  3. Project Settings > API
--     Copie "Project URL" e a chave "anon public" e cole em
--     assets/store.js, no bloco TR.supabase.
-- ============================================================

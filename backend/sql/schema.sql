-- ═══════════════════════════════════════════════
-- ShilpMitra — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ═══════════════════════════════════════════════

-- Enable RLS on all tables
-- Policy: user can only read/write their own rows

-- USERS
create table if not exists users (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  name          text not null,
  phone         text unique,
  upi_id        text,
  craft_type    text,
  location      text,
  state         text,
  income_band   text,       -- "<1L" | "1-3L" | "3-5L" | ">5L"
  family_size   int,
  group_status  text,       -- "SC"|"ST"|"OBC"|"General"|"Women"|"None"
  language      text default 'en',
  aadhaar_last4 text
);
alter table users enable row level security;

-- PRODUCTS
create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  seller_id   uuid references users(id) on delete cascade,
  title       text not null,
  description text,
  craft_type  text,
  category    text,
  material    text,
  region      text,
  tags        text[],
  price       numeric(10,2),
  photo_url   text,
  is_active   boolean default true
);
alter table products enable row level security;

-- CLUSTERS (must be before transactions)
create table if not exists clusters (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  name        text not null,
  admin_id    uuid references users(id),
  description text
);
alter table clusters enable row level security;

-- TRANSACTIONS
create table if not exists transactions (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz default now(),
  seller_id      uuid references users(id) on delete cascade,
  product_id     uuid references products(id),
  cluster_id     uuid references clusters(id),
  buyer_name     text,
  amount         numeric(10,2) not null,
  upi_ref        text,
  payment_status text default 'completed',
  notes          text
);
alter table transactions enable row level security;

-- CLUSTER_MEMBERS
create table if not exists cluster_members (
  id         uuid primary key default gen_random_uuid(),
  cluster_id uuid references clusters(id) on delete cascade,
  user_id    uuid references users(id) on delete cascade,
  role       text,
  split_pct  numeric(5,2),
  is_locked  boolean default false,
  unique(cluster_id, user_id)
);
alter table cluster_members enable row level security;

-- NOTIFICATIONS
create table if not exists notifications (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  user_id    uuid references users(id) on delete cascade,
  type       text,
  title_en   text,
  title_hi   text,
  title_kn   text,
  body_en    text,
  body_hi    text,
  body_kn    text,
  scheme_id  text,
  is_read    boolean default false,
  metadata   jsonb
);
alter table notifications enable row level security;

-- SCHEME_CRITERIA — live policy store
create table if not exists scheme_criteria (
  scheme_id     text primary key,
  scheme_name   text not null,
  criteria_json jsonb not null,
  source_url    text,
  updated_at    timestamptz default now(),
  version       int default 1,
  updated_by    text
);
alter table scheme_criteria enable row level security;

-- ═══════════════════════════════════════════════
-- RLS POLICIES (permissive for hackathon demo)
-- ═══════════════════════════════════════════════

-- Allow all reads for demo (tighten in production)
create policy "Public read" on users for select using (true);
create policy "Public read" on products for select using (true);
create policy "Public read" on transactions for select using (true);
create policy "Public read" on clusters for select using (true);
create policy "Public read" on cluster_members for select using (true);
create policy "Public read" on notifications for select using (true);
create policy "Public read" on scheme_criteria for select using (true);

-- Allow all inserts/updates for demo
create policy "Public write" on users for all using (true);
create policy "Public write" on products for all using (true);
create policy "Public write" on transactions for all using (true);
create policy "Public write" on clusters for all using (true);
create policy "Public write" on cluster_members for all using (true);
create policy "Public write" on notifications for all using (true);
create policy "Public write" on scheme_criteria for all using (true);

-- ═══════════════════════════════════════════════
-- STORAGE BUCKETS (create via Supabase Dashboard)
-- ═══════════════════════════════════════════════
-- 1. product-photos  (public, 5MB limit)
-- 2. trade-pdfs      (public)
-- 3. policy-docs     (public)

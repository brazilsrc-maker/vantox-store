-- Vantox.store — run in Supabase SQL Editor (once per project)

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  name text not null,
  supplier_price numeric(12, 2),
  sale_price numeric(12, 2) not null,
  supplier_url text,
  description text,
  video_url text,
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products (id) on delete set null,
  customer_name text not null,
  shipping_address text not null,
  phone text not null,
  city text,
  postal_code text,
  country text default 'DE',
  payment_status text default 'pending',
  shipping_status text default 'pending',
  created_at timestamptz default now()
);

create index if not exists orders_product_id_idx on public.orders (product_id);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

alter table public.products enable row level security;
alter table public.orders enable row level security;

drop policy if exists "Products are viewable by everyone" on public.products;
create policy "Products are viewable by everyone" on public.products for select using (true);

drop policy if exists "Anyone can insert orders" on public.orders;
create policy "Anyone can insert orders" on public.orders for insert with check (true);

-- Demo product (LED Deep Mirror Garage Key Holder)
insert into public.products (id, slug, name, supplier_price, sale_price, description, video_url)
values (
  'a0000000-0000-4000-8000-000000000001',
  'led-garage-key-holder',
  'LED Deep Mirror Garage Key Holder',
  29.99,
  49.99,
  'Infinity-mirror LED key organizer with motion sensor and garage-style design. Ships within Germany.',
  null
)
on conflict (id) do nothing;

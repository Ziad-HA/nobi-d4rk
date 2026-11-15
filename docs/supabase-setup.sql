-- D4RK store: tables, security and the place_order function for Supabase.
-- Run this whole file once in Supabase -> SQL Editor -> New query -> Run.
-- It can be run again safely (it uses IF NOT EXISTS / OR REPLACE / ON CONFLICT).

-- 1) Tables -------------------------------------------------------------
create table if not exists public.products (
  id     text primary key,
  name   text not null,
  price  integer not null check (price > 0),
  active boolean not null default true
);

create table if not exists public.orders (
  id           uuid primary key default gen_random_uuid(),
  number       text not null unique,
  name         text not null,
  phone        text not null,
  email        text,
  governorate  text not null,
  city         text not null,
  address      text not null,
  notes        text,
  payment      text not null check (payment in ('cod', 'instapay', 'wallet')),
  subtotal     integer not null,
  shipping_fee integer not null,
  total        integer not null,
  status       text not null default 'new' check (status in ('new', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at   timestamptz not null default now()
);

create table if not exists public.order_items (
  id         bigint generated always as identity primary key,
  order_id   uuid not null references public.orders(id) on delete cascade,
  product_id text not null references public.products(id),
  name       text not null,
  size       text,
  qty        integer not null check (qty between 1 and 10),
  price      integer not null
);

create index if not exists order_items_order_id_idx on public.order_items(order_id);

-- 2) Row Level Security -------------------------------------------------
-- No policies on purpose: the browser (anon key) cannot read or write these tables directly.
-- Orders can only be created through place_order() below, which checks everything.
alter table public.products    enable row level security;
alter table public.orders      enable row level security;
alter table public.order_items enable row level security;

-- Visitors may read the product list (handy later if you load products from the database).
drop policy if exists "products are public" on public.products;
create policy "products are public" on public.products for select to anon, authenticated using (active);

-- 3) Products (prices the server trusts). Keep in sync with src/data/products.js ----
insert into public.products (id, name, price) values
  ('flame-cap', 'Flame Cap', 450),
  ('patch-trucker', 'Patch Trucker', 520),
  ('star-trucker', 'Star Trucker', 480),
  ('thorn-beanie', 'Thorn Beanie', 350),
  ('shadow-beanie', 'Shadow Beanie', 320),
  ('cross-beanie', 'Cross Beanie', 400),
  ('shark-backpack', 'Shark Backpack', 850),
  ('crystal-backpack', 'Crystal Backpack', 1100),
  ('smoke-backpack', 'Smoke Backpack', 900),
  ('ribbed-ring', 'Ribbed Ring', 380),
  ('numbers-ring', 'Numbers Ring', 320),
  ('signet-ring', 'Signet Ring', 420),
  ('cross-frame', 'Cross Frame', 480),
  ('clear-frame', 'Clear Frame', 420),
  ('plate-tag', 'Plate Tag Chain', 550),
  ('double-tag', 'Double Tag Chain', 600),
  ('opener-tag', 'Opener Tag Chain', 480)
on conflict (id) do update set name = excluded.name, price = excluded.price;

-- 4) place_order: the only way to create an order ----------------------
create or replace function public.place_order(
  p_customer jsonb,
  p_shipping jsonb,
  p_payment  text,
  p_items    jsonb
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  c_free_shipping_from constant integer := 2000;
  c_shipping_fee       constant integer := 60;
  v_name   text := btrim(coalesce(p_customer->>'name', ''));
  v_phone  text := regexp_replace(coalesce(p_customer->>'phone', ''), '[^0-9]', '', 'g');
  v_email  text := nullif(btrim(coalesce(p_customer->>'email', '')), '');
  v_gov    text := btrim(coalesce(p_shipping->>'governorate', ''));
  v_city   text := btrim(coalesce(p_shipping->>'city', ''));
  v_addr   text := btrim(coalesce(p_shipping->>'address', ''));
  v_notes  text := nullif(btrim(coalesce(p_shipping->>'notes', '')), '');
  v_subtotal integer := 0;
  v_fee      integer;
  v_order_id uuid;
  v_number   text;
  it         jsonb;
  v_qty      integer;
  v_price    integer;
  v_pname    text;
begin
  if length(v_name) < 2 or length(v_name) > 100 then raise exception 'Please enter your full name.'; end if;
  if v_phone !~ '^01[0125][0-9]{8}$' then raise exception 'Please enter a valid Egyptian mobile number.'; end if;
  if v_email is not null and v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then raise exception 'That email does not look right.'; end if;
  if length(v_gov) = 0 or length(v_city) = 0 or length(v_addr) < 6 then raise exception 'Please add your governorate, city and full address.'; end if;
  if length(v_addr) > 300 or length(coalesce(v_notes, '')) > 300 then raise exception 'Address or notes are too long.'; end if;
  if p_payment not in ('cod', 'instapay', 'wallet') then raise exception 'Unknown payment method.'; end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) not between 1 and 20 then
    raise exception 'Your bag is empty.';
  end if;

  -- price everything from the products table, never from the browser
  for it in select * from jsonb_array_elements(p_items) loop
    v_qty := coalesce((it->>'qty')::integer, 0);
    if v_qty < 1 or v_qty > 10 then raise exception 'Invalid quantity.'; end if;
    select price into v_price from products where id = it->>'productId' and active;
    if v_price is null then raise exception 'One of the items is no longer available.'; end if;
    v_subtotal := v_subtotal + v_price * v_qty;
  end loop;

  v_fee := case when v_subtotal >= c_free_shipping_from then 0 else c_shipping_fee end;
  v_number := 'D4RK-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));

  insert into orders (number, name, phone, email, governorate, city, address, notes, payment, subtotal, shipping_fee, total)
  values (v_number, v_name, v_phone, v_email, v_gov, v_city, v_addr, v_notes, p_payment, v_subtotal, v_fee, v_subtotal + v_fee)
  returning id into v_order_id;

  for it in select * from jsonb_array_elements(p_items) loop
    select name, price into v_pname, v_price from products where id = it->>'productId';
    insert into order_items (order_id, product_id, name, size, qty, price)
    values (v_order_id, it->>'productId', v_pname, nullif(it->>'size', ''), (it->>'qty')::integer, v_price);
  end loop;

  return v_number;
end;
$$;

revoke all on function public.place_order(jsonb, jsonb, text, jsonb) from public;
grant execute on function public.place_order(jsonb, jsonb, text, jsonb) to anon, authenticated;

-- 5) track_order: safe public lookup by order number + mobile number ---
create or replace function public.track_order(
  p_number text,
  p_phone  text
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_num   text := upper(btrim(coalesce(p_number, '')));
  v_phone text := regexp_replace(coalesce(p_phone, ''), '[^0-9]', '', 'g');
  v_rec   record;
  v_items jsonb;
begin
  if length(v_num) = 0 or length(v_phone) < 9 then
    raise exception 'Please enter a valid order number and mobile number.';
  end if;

  select id, number, name, governorate, city, payment, status, total, created_at
  into v_rec
  from public.orders
  where upper(number) = v_num
    and (phone = v_phone or phone like '%' || right(v_phone, 9));

  if v_rec.id is null then
    raise exception 'Order not found. Please verify your order number and phone number.';
  end if;

  select coalesce(jsonb_agg(jsonb_build_object(
    'name', name,
    'size', size,
    'qty', qty,
    'price', price
  )), '[]'::jsonb)
  into v_items
  from public.order_items
  where order_id = v_rec.id;

  return jsonb_build_object(
    'number', v_rec.number,
    'name', v_rec.name,
    'governorate', v_rec.governorate,
    'city', v_rec.city,
    'payment', v_rec.payment,
    'status', v_rec.status,
    'total', v_rec.total,
    'createdAt', v_rec.created_at,
    'items', v_items
  );
end;
$$;

revoke all on function public.track_order(text, text) from public;
grant execute on function public.track_order(text, text) to anon, authenticated;

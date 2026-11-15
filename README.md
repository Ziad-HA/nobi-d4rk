# D4RK

Streetwear accessories storefront made in Alexandria. Built with React, Vite, Tailwind CSS and React Router.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## What's included

- Home page: announcement bar, hero, perks strip, categories, trending, drops banners, Instagram strip, footer
- Shop with category filters and search, product pages, collections, about, contact
- Prices in EGP, flat shipping fee with a free-shipping threshold, 14-day exchange
- Egyptian checkout: mobile number validation, governorate list, cash on delivery / InstaPay / e-wallet
- Client-side cart (localStorage) and a demo checkout (no real payments)

## Brand settings

Name, Instagram handle, email, WhatsApp number, shipping fee and free-shipping threshold all live in
`src/data/brand.js`. The WhatsApp number and email there are placeholders — replace them with the real ones.

Demo catalog uses Unsplash photography; swap in your own product photos in `src/data/products.js`.

## Orders (Supabase)

Run `docs/supabase-setup.sql` once in Supabase (SQL Editor). It creates the `products`, `orders` and `order_items` tables, turns on Row Level Security and adds `place_order()`, the only way the website can create an order. Then put `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` (see `.env.example`) and in Vercel. Never use the service_role key in the website.

`place_order()` checks the data and recalculates all prices from the `products` table, so the browser cannot change a price. When you change a price in `src/data/products.js`, update the `products` table too (re-running the file does it). Without the variables the site runs in test mode and keeps orders in the browser only.

## Deploy (Vercel)

`vercel.json` rewrites every route to `index.html` so React Router links work on refresh. Build command `npm run build`, output directory `dist`.

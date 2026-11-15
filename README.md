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

## Orders and MongoDB

The checkout posts the order through `src/api/orders.js`. Put `VITE_API_URL` in `.env` (see `.env.example`) and the order is sent to `POST ${VITE_API_URL}/api/orders` as JSON, expecting `201 { "id": "..." }` back. The payload shape is documented at the top of that file. Recalculate prices on the server from your own product list. With no `VITE_API_URL` the site runs in test mode and keeps orders in the browser only.

## Deploy (Vercel)

`vercel.json` rewrites every route to `index.html` so React Router links work on refresh. Build command `npm run build`, output directory `dist`.

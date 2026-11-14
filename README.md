# D4RK

Calm streetwear storefront made in Alexandria. Built with React, Vite, Tailwind CSS and React Router.

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

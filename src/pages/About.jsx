import { brand, FREE_SHIPPING_FROM, RETURN_DAYS, SHIPPING_FEE } from '../data/brand'
import { formatPrice } from '../data/products'

export default function About() {
  return (
    <div>
      <section className="bg-black py-20 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">About us</p>
          <h1 className="mt-4 font-display text-6xl tracking-[0.16em]">{brand.name}</h1>
          <p className="font-ar mt-2 text-xl text-neutral-300" lang="ar">
            {brand.arabic}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-neutral-300">{brand.tagline}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm leading-relaxed text-neutral-700">
        <p>
          {brand.name} (Common) is the quiet hour when the city slows down. We make calm, clean streetwear in {brand.city}:
          heavy cotton, simple cuts, and small details instead of loud logos. Every hoodie, tee, cargo and cap is
          checked by hand before it leaves the studio.
        </p>

        <h2 className="mt-10 font-display text-3xl tracking-wide text-black">Shipping & delivery</h2>
        <p className="mt-3">
          We deliver to all governorates in Egypt. Shipping is {formatPrice(SHIPPING_FEE)}, and free on orders above{' '}
          {formatPrice(FREE_SHIPPING_FROM)}. Orders leave the studio within 1–2 working days and usually arrive in 2–5
          working days, depending on your governorate.
        </p>

        <h2 className="mt-10 font-display text-3xl tracking-wide text-black">Payment methods</h2>
        <p className="mt-3">
          Pay cash on delivery, or by InstaPay or Vodafone Cash / any e-wallet. For wallet and InstaPay orders we’ll
          send you the payment details on WhatsApp once you place the order.
        </p>

        <h2 className="mt-10 font-display text-3xl tracking-wide text-black">Exchange & returns</h2>
        <p className="mt-3">
          Not the right size? Exchange within {RETURN_DAYS} days of delivery as long as the piece is unworn with its tags.
          Sale items can be exchanged for size only, unless damaged.
        </p>

        <h2 className="mt-10 font-display text-3xl tracking-wide text-black">Size guide</h2>
        <p className="mt-3">
          Our tees and hoodies are cut relaxed and slightly oversized. Between two sizes? Go down for a closer fit, or stay
          true-to-size for the drape you see in our photos.
        </p>

        <h2 className="mt-10 font-display text-3xl tracking-wide text-black">Privacy</h2>
        <p className="mt-3">
          We only use your details to deliver your order and to send drops you asked for. We never sell personal data.
          This is a demo store — no real orders or payments are processed.
        </p>
      </div>
    </div>
  )
}

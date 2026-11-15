import { brand, FREE_SHIPPING_FROM, RETURN_DAYS, SHIPPING_FEE } from '../data/brand'
import { formatPrice } from '../data/products'

export default function About() {
  return (
    <div>
      <section className="bg-pure-black py-20 text-pure-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">About us</p>
          <h1 className="mt-4 font-display uppercase text-4xl sm:text-5xl tracking-tight">{brand.name}</h1>
          <p className="mt-5 text-sm leading-relaxed text-neutral-300">{brand.tagline}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm leading-relaxed text-neutral-700">
        <p>
          {brand.name} is a streetwear accessories brand. We make the finishing pieces in {brand.city}:
          caps, beanies, backpacks, jewelry and eyewear with clean shapes and small details instead of loud logos. Every piece is
          checked by hand before it leaves the studio.
        </p>

        <h2 className="mt-10 font-display uppercase text-xl tracking-tight text-black">Shipping & delivery</h2>
        <p className="mt-3">
          We deliver to all governorates in Egypt. Shipping is {formatPrice(SHIPPING_FEE)}, and free on orders above{' '}
          {formatPrice(FREE_SHIPPING_FROM)}. Orders leave the studio within 1–2 working days and usually arrive in 2–5
          working days, depending on your governorate.
        </p>

        <h2 className="mt-10 font-display uppercase text-xl tracking-tight text-black">Payment methods</h2>
        <p className="mt-3">
          Pay cash on delivery, or by InstaPay or Vodafone Cash / any e-wallet. For wallet and InstaPay orders we’ll
          send you the payment details on WhatsApp once you place the order.
        </p>

        <h2 className="mt-10 font-display uppercase text-xl tracking-tight text-black">Exchange & returns</h2>
        <p className="mt-3">
          Changed your mind? Exchange within {RETURN_DAYS} days of delivery as long as the piece is unused and in its packaging.
          Sale items can only be exchanged if damaged.
        </p>

        <h2 className="mt-10 font-display uppercase text-xl tracking-tight text-black">Sizing</h2>
        <p className="mt-3">
          Caps, beanies and backpacks are one size. Rings come in S, M and L. Chains come in 45, 50 and 55 cm: 45 cm sits at the collarbone, 55 cm falls on the chest. Not sure? Message us on WhatsApp.
        </p>

        <h2 className="mt-10 font-display uppercase text-xl tracking-tight text-black">Privacy</h2>
        <p className="mt-3">
          We only use your details to deliver your order and to send drops you asked for. We never sell personal data.
          This is a demo store — no real orders or payments are processed.
        </p>
      </div>
    </div>
  )
}

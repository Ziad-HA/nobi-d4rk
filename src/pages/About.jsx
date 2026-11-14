export default function About() {
  return (
    <div>
      <section className="bg-black py-20 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">About us</p>
          <h1 className="mt-4 font-display text-6xl tracking-wide">Nobi2-brand</h1>
          <p className="mt-5 text-sm leading-relaxed text-neutral-300">
            Thrifted culture. Curated style. Pieces with a past, made for the present.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm leading-relaxed text-neutral-700">
        <p>
          Nobi2 started as a rack of found pieces and a simple rule: if it wouldn’t sit in our own closet, it doesn’t
          ship. Every hoodie, tee, cargo, and cap is handpicked, cleaned, and checked for fabric, print, and fit.
        </p>
        <h2 className="mt-10 font-display text-3xl tracking-wide text-black">Shipping & delivery</h2>
        <p className="mt-3">
          Free shipping on all orders above ₹1499. Orders usually leave the studio within 1–2 business days.
        </p>
        <h2 className="mt-10 font-display text-3xl tracking-wide text-black">Returns & refunds</h2>
        <p className="mt-3">
          Hassle-free returns within 7 days if the piece isn’t what you expected. Sale items are final unless damaged
          in transit.
        </p>
        <h2 className="mt-10 font-display text-3xl tracking-wide text-black">Size guide</h2>
        <p className="mt-3">
          Most tees and hoodies run oversized. If you’re between sizes, size down for a closer fit, or stay true-to-size
          for the drape you see on our lookbook.
        </p>
        <h2 className="mt-10 font-display text-3xl tracking-wide text-black">Privacy</h2>
        <p className="mt-3">
          We only use your details to fulfill orders and send drops you asked for. No selling of personal data. Demo
          store — no real payments are processed.
        </p>
      </div>
    </div>
  )
}

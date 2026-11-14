import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Banknote, PackageCheck, RefreshCw, Truck, ChevronRight } from 'lucide-react'
import { categories, collections, formatPrice, instagramPosts, products } from '../data/products'
import { brand, FREE_SHIPPING_FROM, RETURN_DAYS } from '../data/brand'
import ProductCard from '../components/ProductCard'

const perks = [
  { icon: Truck, title: 'Free shipping', text: `On orders above ${formatPrice(FREE_SHIPPING_FROM)}`, ar: 'شحن لكل المحافظات' },
  { icon: PackageCheck, title: 'Quality checked', text: 'Heavy cotton, checked by hand', ar: 'جودة مضمونة' },
  { icon: RefreshCw, title: 'Easy exchange', text: `${RETURN_DAYS} days, no stress`, ar: 'استبدال سهل' },
  { icon: Banknote, title: 'Cash on delivery', text: 'Pay when it arrives', ar: 'الدفع عند الاستلام' },
]

export default function Home() {
  const trending = products.filter((p) => p.trending)
  const [page, setPage] = useState(0)
  const pages = Math.max(1, Math.ceil(trending.length / 6))

  return (
    <div>
      <section className="relative overflow-hidden bg-black text-white">
        <div className="mx-auto grid min-h-[72vh] max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-0">
          <div className="relative z-10 max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-neutral-300">
              New collection · {brand.est}
            </p>
            <h1 className="mt-5 font-display text-6xl leading-[0.9] tracking-wide sm:text-7xl lg:text-8xl">
              MADE QUIET.
              <br />
              MADE IN EGYPT.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-300">
              Clean cuts, heavy cotton, no noise. Designed and made in Cairo.
            </p>
            <p className="font-ar mt-2 max-w-sm text-sm text-neutral-400" lang="ar">
              {brand.taglineAr}
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex bg-white px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-neutral-200"
            >
              Shop now
            </Link>
          </div>
          <div className="relative hidden min-h-[72vh] lg:block">
            <img
              src="https://images.unsplash.com/photo-1496360166961-10a51d5f367a?auto=format&fit=crop&w=1400&q=80"
              alt={`Model wearing a ${brand.name} black oversized tee`}
              className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
            <div className="absolute bottom-24 right-16 text-right">
              <p className="font-display text-5xl tracking-[0.24em]">{brand.name}</p>
              <p className="font-ar mt-1 text-lg text-neutral-200" lang="ar">
                {brand.arabic}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-neutral-400">
                Cairo · Est. {brand.est}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-sand/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {perks.map(({ icon: Icon, title, text, ar }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em]">{title}</p>
                <p className="mt-1 text-sm text-neutral-600">{text}</p>
                <p className="font-ar mt-0.5 text-xs text-neutral-500" lang="ar">
                  {ar}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-xl font-semibold uppercase tracking-[0.18em]">
          Shop by category
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          {categories.map((c) => (
            <Link key={c.slug} to={`/shop?category=${c.slug}`} className="group relative block overflow-hidden bg-sand">
              <img
                src={c.image}
                alt=""
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.14em]">{c.name}</p>
                <p className="font-ar text-xs text-neutral-200" lang="ar">
                  {c.nameAr}
                </p>
                <span className="mt-2 inline-block border border-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.16em]">
                  Shop now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-xl font-semibold uppercase tracking-[0.18em]">
          Trending now
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {trending.slice(page * 6, page * 6 + 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {pages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show trending page ${i + 1}`}
                aria-current={page === i}
                onClick={() => setPage(i)}
                className={`h-2.5 w-2.5 rounded-full ${page === i ? 'bg-black' : 'bg-neutral-300'}`}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto grid max-w-7xl gap-3 px-4 pb-16 sm:px-6 md:grid-cols-3 lg:px-8">
        {collections.map((c) => (
          <Link key={c.slug} to={`/collections/${c.slug}`} className="group relative min-h-[240px] overflow-hidden bg-black">
            <img
              src={c.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
            />
            <div className="relative flex h-full min-h-[240px] flex-col justify-end p-6 text-white">
              <h3 className="font-display text-3xl tracking-wide">{c.name}</h3>
              <p className="mt-1 text-sm text-neutral-200">{c.tagline}</p>
              <span className="mt-4 inline-flex w-fit border border-white px-4 py-2 text-[10px] uppercase tracking-[0.16em]">
                {c.cta}
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto flex max-w-7xl items-end justify-between px-4 pb-4 pt-10 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">Follow us on Instagram</h2>
            <p className="mt-1 text-xs text-neutral-400">@{brand.instagram}</p>
          </div>
          <a
            href={`https://instagram.com/${brand.instagram}`}
            className="hidden h-10 w-10 items-center justify-center border border-white/40 sm:flex"
            aria-label="Open Instagram"
          >
            <ChevronRight size={18} />
          </a>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-7">
          {instagramPosts.map((src, i) => (
            <a
              key={src}
              href={`https://instagram.com/${brand.instagram}`}
              className="block aspect-square overflow-hidden"
              aria-label={`Instagram look ${i + 1}`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition hover:opacity-80" />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

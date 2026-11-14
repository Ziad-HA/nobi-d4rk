import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { categories, formatPrice, products } from "../data/products";
import { siteImages } from "../data/images";
import { brand, FREE_SHIPPING_FROM, RETURN_DAYS } from "../data/brand";
import ProductCard from "../components/ProductCard";
import Photo from "../components/Photo";

const label =
  "font-display text-xs font-extrabold uppercase tracking-tight sm:text-sm";

const perks = [
  ["Free shipping", `Above ${formatPrice(FREE_SHIPPING_FROM)}`],
  ["Cash on delivery", "Pay when it arrives"],
  ["Easy exchange", `${RETURN_DAYS} days, no stress`],
  ["Small runs", "Checked by hand"],
];

export default function Home() {
  const newDrops = products.filter((p) => p.collection === "new-drops").slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="page pt-3 sm:pt-5">
        <div className="relative isolate flex min-h-[78vh] flex-col justify-between overflow-hidden bg-pure-black p-4 sm:p-8">
          <Photo
            src={siteImages.hero}
            alt=""
            loading="eager"
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-80"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-b from-pure-black/55 via-transparent to-pure-black/70"
            aria-hidden="true"
          />
          <h1 className="text-center font-display text-[15vw] font-extrabold uppercase leading-none tracking-tight text-pure-white sm:text-[13vw] lg:text-[12vw]">
            {brand.name}
          </h1>
          <div className="grid grid-cols-3 items-end gap-3">
            <span />
            <Link
              to="/shop"
              className="justify-self-center whitespace-nowrap rounded-lg border border-pure-white/50 px-6 py-3 text-[11px] uppercase tracking-[0.1em] text-pure-white/90 backdrop-blur-sm transition hover:bg-pure-white hover:text-pure-black sm:px-12 sm:py-4 sm:text-xs"
            >
              Go to catalog
            </Link>
            <p className="justify-self-end font-display text-xs font-extrabold text-pure-white sm:text-sm">
              EST.{brand.est}
            </p>
          </div>
        </div>
      </section>

      {/* New collection */}
      <section className="page pt-10 sm:pt-14">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className={label}>New collection</h2>
          <Link
            to="/collections/new-drops"
            className="text-[11px] uppercase tracking-[0.14em] text-neutral-500 transition hover:text-black"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {newDrops.map((p) => (
            <ProductCard key={p.id} product={p} bare />
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="page pt-24 sm:pt-36">
        <h2 className="relative z-10 max-w-[17em] font-display text-[7.2vw] font-extrabold uppercase leading-[1.05] tracking-tight sm:text-[5vw] lg:text-[4.4vw]">
          {brand.name} is a quiet answer to a loud city because it is made to
          last
        </h2>
        <div className="relative -mt-[2vw] aspect-[16/9] overflow-hidden bg-neutral-100 sm:-mt-[1.4vw]">
          <Photo
            src={siteImages.manifesto}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Lookbook */}
      <section className="page pt-24 sm:pt-36">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className={label}>Lookbook</h2>
            <Link
              to="/collections"
              className="text-[11px] uppercase tracking-[0.14em] text-neutral-500 transition hover:text-black"
            >
              All collections
            </Link>
          </div>
          <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-4">
            {siteImages.lookbook.map((src, i) => (
              <div
                key={src}
                className={`aspect-[3/4] overflow-hidden bg-neutral-100 ${
                  i % 2 ? "mt-8 sm:mt-16" : ""
                }`}
              >
                <Photo src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="page pt-24 sm:pt-36">
        <h2 className={`${label} mb-4`}>Catalog</h2>
        <ul className="border-t border-neutral-200">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/shop?category=${c.slug}`}
                className="group flex items-center justify-between border-b border-neutral-200 py-5 font-display text-2xl font-extrabold uppercase tracking-tight transition-all hover:pl-4 sm:text-5xl"
              >
                <span>{c.name}</span>
                <ArrowUpRight
                  className="text-neutral-500 transition group-hover:text-black"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Perks */}
      <section className="page py-16 sm:py-24">
        <dl className="grid grid-cols-2 gap-6 border-t border-neutral-200 pt-8 lg:grid-cols-4">
          {perks.map(([title, text]) => (
            <div key={title}>
              <dt className="font-display text-[10px] font-extrabold uppercase tracking-tight sm:text-xs">
                {title}
              </dt>
              <dd className="mt-1 text-sm text-neutral-500">{text}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

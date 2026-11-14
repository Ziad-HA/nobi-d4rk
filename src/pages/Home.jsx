import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Banknote,
  ChevronLeft,
  ChevronRight,
  PackageCheck,
  RefreshCw,
  Truck,
} from "lucide-react";
import {
  categories,
  collections,
  formatPrice,
  instagramPosts,
  products,
} from "../data/products";
import { siteImages, tickerLines } from "../data/images";
import { brand, FREE_SHIPPING_FROM, RETURN_DAYS } from "../data/brand";
import ProductCard from "../components/ProductCard";
import Photo from "../components/Photo";

const perks = [
  {
    icon: Truck,
    title: "Free shipping",
    text: `On orders above ${formatPrice(FREE_SHIPPING_FROM)}`,
    ar: "شحن لكل المحافظات",
  },
  {
    icon: PackageCheck,
    title: "Quality checked",
    text: "Heavy cotton, checked by hand",
    ar: "جودة مضمونة",
  },
  {
    icon: RefreshCw,
    title: "Easy exchange",
    text: `${RETURN_DAYS} days, no stress`,
    ar: "استبدال سهل",
  },
  {
    icon: Banknote,
    title: "Cash on delivery",
    text: "Pay when it arrives",
    ar: "الدفع عند الاستلام",
  },
];

const pill =
  "inline-flex items-center justify-center rounded-full px-8 py-4 text-[11px] font-bold uppercase tracking-[0.14em] transition";

function Ticker() {
  return (
    <div className="overflow-hidden border-y border-neutral-200 bg-white py-5">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center gap-16 pr-16"
            aria-hidden={copy === 1}
          >
            {tickerLines.map(([light, bold]) => (
              <li
                key={light}
                className="whitespace-nowrap text-sm uppercase tracking-tight sm:text-base"
              >
                {light} <strong className="font-extrabold">{bold}</strong>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const bestsellers = products.filter((p) => p.trending);
  const rail = useRef(null);
  const scrollRail = (dir) => {
    const el = rail.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
  const leftLinks = ["hoodies", "t-shirts", "jackets"].map((s) => bySlug[s]);
  const rightLinks = ["pants", "accessories"].map((s) => bySlug[s]);
  const linkClass =
    "block py-1 text-xs font-medium uppercase tracking-[0.12em] text-white drop-shadow transition hover:opacity-70";

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-neutral-300 text-white">
        <div className="grid h-[84vh] min-h-[540px] grid-cols-1 md:grid-cols-3">
          {siteImages.hero.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden bg-neutral-300 ${
                i !== 1 ? "max-md:hidden" : ""
              }`}
            >
              <Photo
                src={src}
                alt=""
                loading="eager"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/15" aria-hidden="true" />

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="flex w-full max-w-[1500px] items-center justify-between font-black uppercase leading-[0.85] tracking-tighter drop-shadow-[0_8px_30px_rgba(0,0,0,0.25)] max-md:flex-col max-md:text-[30vw] md:px-[7vw] md:text-[12vw]">
            <span>Out</span>
            <span>Now</span>
          </h1>
          <p className="mt-4 text-lg font-extrabold uppercase tracking-tight drop-shadow-md sm:text-2xl md:text-3xl">
            Drop 01 · {brand.name}
          </p>
          <Link
            to="/collections/new-drops"
            className={`${pill} pointer-events-auto mt-8 bg-white text-black hover:bg-black hover:text-white`}
          >
            Shop the drop
          </Link>
        </div>
      </section>

      <Ticker />

      {/* Category split */}
      <section className="relative">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[70vh] bg-neutral-300">
            <Photo
              src={siteImages.splitLeft}
              alt=""
              className="absolute inset-0 h-full w-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            <ul className="relative px-6 py-10 sm:px-10 lg:px-16">
              {leftLinks.map((c) => (
                <li key={c.slug}>
                  <Link to={`/shop?category=${c.slug}`} className={linkClass}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[50vh] bg-neutral-200 md:min-h-[70vh]">
            <Photo
              src={siteImages.splitRight}
              alt=""
              className="absolute inset-0 h-full w-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            <ul className="relative px-6 py-10 text-right sm:px-10 lg:px-16">
              {rightLinks.map((c) => (
                <li key={c.slug}>
                  <Link to={`/shop?category=${c.slug}`} className={linkClass}>
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/shop" className={linkClass}>
                  All products
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
          <Link
            to="/collections/new-drops"
            className="pointer-events-auto text-center text-white drop-shadow-lg"
          >
            <span className="block font-display text-2xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              Winter collection
            </span>
            <span className="mt-2 block text-xs tracking-[0.3em] opacity-80">
              2026
            </span>
          </Link>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="wrap py-16 sm:py-20">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-4xl">
            Bestsellers
          </h2>
          <Link
            to="/shop"
            className={`${pill} border border-black/70 px-6 py-3 hover:bg-black hover:text-white sm:px-10`}
          >
            All products
          </Link>
        </div>
        <div className="relative">
          <div
            ref={rail}
            className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1"
          >
            {bestsellers.map((p) => (
              <div
                key={p.id}
                className="w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-[calc(25%-12px)]"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <button
            type="button"
            aria-label="Previous products"
            onClick={() => scrollRail(-1)}
            className="absolute -left-2 top-[38%] hidden h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-black hover:text-white lg:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next products"
            onClick={() => scrollRail(1)}
            className="absolute -right-2 top-[38%] hidden h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-black hover:text-white lg:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Collections */}
      <section className="wrap grid gap-3 pb-16 md:grid-cols-3">
        {collections.map((c) => (
          <Link
            key={c.slug}
            to={`/collections/${c.slug}`}
            className="group relative min-h-[260px] overflow-hidden bg-neutral-800"
          >
            <Photo
              src={c.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />
            <div className="relative flex h-full min-h-[260px] flex-col justify-end p-6 text-white">
              <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                {c.name}
              </h3>
              <p className="mt-1 text-sm text-neutral-200">{c.tagline}</p>
              <span className="mt-4 inline-flex w-fit rounded-full border border-white px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition group-hover:bg-white group-hover:text-black">
                {c.cta}
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Perks */}
      <section className="border-y border-neutral-200 bg-sand/60">
        <div className="wrap grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, text, ar }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                  {title}
                </p>
                <p className="mt-1 text-sm text-neutral-600">{text}</p>
                <p className="font-ar mt-0.5 text-xs text-neutral-500" lang="ar">
                  {ar}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram */}
      <section className="bg-black text-white">
        <div className="wrap flex items-end justify-between pb-4 pt-10">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">
              Follow us on Instagram
            </h2>
            <p className="mt-1 text-xs text-neutral-400">@{brand.instagram}</p>
          </div>
          <a
            href={`https://instagram.com/${brand.instagram}`}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/40 sm:flex"
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
              className="block aspect-square overflow-hidden bg-neutral-800 max-md:last:hidden"
              aria-label={`Instagram look ${i + 1}`}
            >
              <Photo
                src={src}
                alt=""
                className="h-full w-full object-cover transition hover:opacity-80"
              />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

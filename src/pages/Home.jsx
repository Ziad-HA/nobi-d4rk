import { useEffect, useRef } from "react";
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
  const videoRef = useRef(null);

  // Phones sometimes ignore autoplay until the page is ready or touched, so ask for playback explicitly.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    window.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    return () => window.removeEventListener("touchstart", tryPlay);
  }, []);

  const newDrops = products.filter((p) => p.collection === "new-drops").slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="page pt-3 sm:pt-5">
        <div className="relative isolate flex aspect-square flex-col justify-between sm:aspect-auto sm:min-h-[78vh] overflow-hidden bg-pure-black p-4 sm:p-8">
          <video
            ref={videoRef}
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_35%]"
            src={siteImages.heroVideo}
            poster={siteImages.hero}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="auto"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-b from-pure-black/40 via-transparent to-pure-black/50"
            aria-hidden="true"
          />
          <h1
            data-text={brand.name}
            className="wordmark mt-[0.35em] text-center text-[14vw] uppercase leading-none text-pure-white sm:text-[12vw] lg:text-[11vw]"
          >
            {brand.name}
          </h1>
          <div className="grid grid-cols-3 items-end gap-3">
            <span />
            <Link
              to="/shop"
              className="justify-self-center whitespace-nowrap rounded-lg border border-pure-white/50 px-4 py-3 text-[11px] uppercase tracking-[0.1em] text-pure-white/90 backdrop-blur-sm transition hover:bg-pure-white hover:text-pure-black sm:px-12 sm:py-4 sm:text-xs"
            >
              Go to catalog
            </Link>
            <p className="justify-self-end font-display text-[10px] font-extrabold text-pure-white sm:text-sm">
              EST.{brand.est}
            </p>
          </div>
        </div>
      </section>

      {/* New collection */}
      <section className="page pt-8 sm:pt-14">
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
      <section className="page py-16 sm:py-24">
        <h2 className="mx-auto max-w-[550px] text-center font-sans text-lg sm:text-[22px] font-medium leading-relaxed tracking-normal text-neutral-400">
          <span className="font-semibold text-pure-white">{brand.name}</span> finishes the fit because the small details are made to last
        </h2>
        <div className="relative mt-8 sm:mt-12 aspect-[16/9] overflow-hidden bg-neutral-100">
          <Photo
            src="/images/grillz.jpg"
            alt="Silver Grillz"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </section>

      {/* Lookbook */}
      <section className="page pt-14 sm:pt-36">
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
                <Photo
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="page pt-14 sm:pt-36">
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

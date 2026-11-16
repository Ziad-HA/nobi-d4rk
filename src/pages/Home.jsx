import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { categories, formatPrice, products } from "../data/products";
import { siteImages } from "../data/images";
import { brand, FREE_SHIPPING_FROM, RETURN_DAYS } from "../data/brand";
import ProductCard from "../components/ProductCard";
import Photo from "../components/Photo";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const wordRef = useRef(null);

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

  // 3D motion: cursor depth on the hero, plus perspective reveals on scroll. All of it is skipped for reduced motion.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const hero = heroRef.current;
        const word = wordRef.current;
        const video = videoRef.current;

        // Hero card tips back and shrinks as you scroll away from it.
        gsap.set(hero, { transformPerspective: 1200, transformOrigin: "50% 100%" });
        // The hero clips its children, which flattens 3D, so the wordmark carries its own perspective.
        gsap.set(word, { transformPerspective: 900 });
        gsap.to(hero, {
          rotationX: 9,
          scale: 0.93,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(word, {
          yPercent: -18,
          z: 120,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });

        // Manifesto photo swings up from a tilted plane.
        gsap.fromTo(
          ".manifesto-img",
          { rotationX: 24, scale: 0.88, transformPerspective: 1000, transformOrigin: "50% 100%" },
          {
            rotationX: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: ".manifesto-img", start: "top 95%", end: "top 35%", scrub: true },
          },
        );

        // Product tiles, lookbook tiles and catalog rows each enter on their own 3D axis.
        gsap.set(".drop-card", { opacity: 0, y: 70, rotationX: -24, transformPerspective: 900, transformOrigin: "50% 100%" });
        ScrollTrigger.batch(".drop-card", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 }),
        });

        gsap.set(".lb-tile", {
          opacity: 0,
          z: -260,
          rotationY: (i) => (i % 2 ? -38 : 38),
          transformPerspective: 1000,
        });
        ScrollTrigger.batch(".lb-tile", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, z: 0, rotationY: 0, duration: 1.1, ease: "power3.out", stagger: 0.12 }),
        });

        gsap.set(".cat-row", { opacity: 0, rotationX: -80, transformPerspective: 900, transformOrigin: "50% 0%" });
        ScrollTrigger.batch(".cat-row", {
          start: "top 92%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, rotationX: 0, duration: 0.8, ease: "back.out(1.4)", stagger: 0.09 }),
        });

        // Cursor depth on devices with a mouse; a slow idle sway on touch screens.
        const mouse = window.matchMedia("(hover: hover)").matches;
        if (mouse) {
          gsap.set(video, { scale: 1.1 });
          const opts = { duration: 0.7, ease: "power3.out" };
          const wy = gsap.quickTo(word, "rotationY", opts);
          const wx = gsap.quickTo(word, "rotationX", opts);
          const vx = gsap.quickTo(video, "x", opts);
          const vy = gsap.quickTo(video, "y", opts);
          const onMove = (e) => {
            const r = hero.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            wy(px * 26);
            wx(-py * 18);
            vx(-px * 30);
            vy(-py * 20);
          };
          const onLeave = () => {
            wy(0);
            wx(0);
            vx(0);
            vy(0);
          };
          hero.addEventListener("pointermove", onMove);
          hero.addEventListener("pointerleave", onLeave);
          return () => {
            hero.removeEventListener("pointermove", onMove);
            hero.removeEventListener("pointerleave", onLeave);
          };
        }
        gsap.to(word, { rotationY: 10, rotationX: -4, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
        return undefined;
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const newDrops = products.filter((p) => p.collection === "new-drops").slice(0, 4);

  return (
    <div ref={rootRef}>
      {/* Hero */}
      <section className="page pt-3 sm:pt-5">
        <div ref={heroRef} className="relative isolate flex aspect-square flex-col justify-between sm:aspect-auto sm:min-h-[78vh] overflow-hidden bg-pure-black p-4 sm:p-8">
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
            ref={wordRef}
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
            <div key={p.id} className="drop-card">
              <ProductCard product={p} bare />
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="page py-16 sm:py-24">
        <h2 className="mx-auto max-w-[550px] text-center font-sans text-lg sm:text-[22px] font-medium leading-relaxed tracking-normal text-neutral-400">
          <span className="font-semibold text-pure-white">{brand.name}</span> finishes the fit because the small details are made to last
        </h2>
        <div className="manifesto-img relative mt-8 sm:mt-12 aspect-[16/9] overflow-hidden bg-neutral-100">
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
              <Link
                key={src}
                to="/collections"
                className={`lb-tile group block aspect-[3/4] overflow-hidden bg-neutral-100 transition-opacity hover:opacity-90 ${
                  i % 2 ? "mt-8 sm:mt-16" : ""
                }`}
              >
                <Photo
                  src={src}
                  alt="D4RK Lookbook Collection"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="page pt-14 sm:pt-36">
        <h2 className={`${label} mb-4`}>Catalog</h2>
        <ul className="border-t border-neutral-200">
          {categories.map((c) => (
            <li key={c.slug} className="cat-row">
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

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { brand } from "../data/brand";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path
        d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21Z"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.5c0 3.3 3.2 6.5 6.5 6.5l1-1.6-2-1-1 .8c-.9-.4-1.9-1.4-2.3-2.3l.8-1-1-2L9 8.5Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14.5 3c.4 2.6 1.9 4.4 4.5 4.7v3.1c-1.5 0-2.9-.5-4.1-1.3v6.8c0 3.4-2.6 6.2-6.2 6.2S2.5 19.7 2.5 16.3c0-3.4 2.6-6.1 6.1-6.2v3.2c-1.6.1-2.8 1.4-2.8 3 0 1.6 1.3 3 3 3s3-1.3 3-3V3h2.7Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="wrap grid grid-cols-2 gap-8 py-10 sm:py-14 md:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <p className="flex items-baseline gap-2">
            <span className="font-display uppercase text-xl tracking-tight">
              {brand.name}
            </span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">
            Streetwear accessories, designed and made in ALEX. Caps, backpacks,
            jewelry and eyewear to finish the fit.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://tiktok.com"
              className="flex h-10 w-10 items-center justify-center border border-neutral-300"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
            <a
              href={`https://instagram.com/${brand.instagram}`}
              className="flex h-10 w-10 items-center justify-center border border-neutral-300"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href={`https://wa.me/${brand.whatsapp}`}
              className="flex h-10 w-10 items-center justify-center border border-neutral-300"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">
            Shop
          </h2>
          <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-neutral-600">
            <li>
              <Link to="/shop" className="hover:text-black">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/shop?category=caps" className="hover:text-black">
                Caps
              </Link>
            </li>
            <li>
              <Link to="/shop?category=beanies" className="hover:text-black">
                Beanies
              </Link>
            </li>
            <li>
              <Link to="/shop?category=bags" className="hover:text-black">
                Backpacks
              </Link>
            </li>
            <li>
              <Link to="/shop?category=jewelry" className="hover:text-black">
                Jewelry
              </Link>
            </li>
            <li>
              <Link to="/shop?category=eyewear" className="hover:text-black">
                Eyewear
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">
            Company
          </h2>
          <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-neutral-600">
            <li>
              <Link to="/about" className="hover:text-black">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-black">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black">
                Shipping & Delivery
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">
            Help
          </h2>
          <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-neutral-600">
            <li>
              <Link to="/contact" className="hover:text-black">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/track-order" className="hover:text-black">
                Track Your Order
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black">
                Payment Methods
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black">
                Sizing
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1 md:col-span-3 lg:col-span-1">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">
            Newsletter
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-600">
            Get exclusive updates on new drops and special offers.
          </p>
          {done ? (
            <p className="mt-3 text-xs sm:text-sm text-emerald-600">
              You’re on the list. Thanks for subscribing!
            </p>
          ) : (
            <form
              className="mt-3 flex border border-neutral-300"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) return;
                setDone(true);
              }}
            >
              <label htmlFor="nl-email" className="sr-only">
                Email
              </label>
              <input
                id="nl-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-10 min-w-0 flex-1 px-3 text-xs outline-none"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center bg-black text-white"
                aria-label="Subscribe"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="border-t border-neutral-200 px-4 py-5 text-center text-xs text-neutral-500">
        <p>
          Cash on delivery · InstaPay · Vodafone Cash · Delivery across Egypt
        </p>
        <p className="mt-1">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

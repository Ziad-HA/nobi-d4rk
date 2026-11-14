import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M14.5 3c.4 2.6 1.9 4.4 4.5 4.7v3.1c-1.5 0-2.9-.5-4.1-1.3v6.8c0 3.4-2.6 6.2-6.2 6.2S2.5 19.7 2.5 16.3c0-3.4 2.6-6.1 6.1-6.2v3.2c-1.6.1-2.8 1.4-2.8 3 0 1.6 1.3 3 3 3s3-1.3 3-3V3h2.7Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-1">
          <p className="font-display text-3xl tracking-[0.12em]">NOBI2</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-600">
            Thrifted culture. Curated style. Pieces with a past, made for the present.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://tiktok.com" className="flex h-10 w-10 items-center justify-center border border-neutral-300" aria-label="TikTok">
              <TikTokIcon />
            </a>
            <a href="https://instagram.com" className="flex h-10 w-10 items-center justify-center border border-neutral-300" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">Shop</h2>
          <ul className="mt-4 space-y-2 text-sm text-neutral-600">
            <li><Link to="/shop" className="hover:text-black">All Products</Link></li>
            <li><Link to="/shop?category=hoodies" className="hover:text-black">Hoodies</Link></li>
            <li><Link to="/shop?category=t-shirts" className="hover:text-black">T-Shirts</Link></li>
            <li><Link to="/shop?category=pants" className="hover:text-black">Pants</Link></li>
            <li><Link to="/shop?category=accessories" className="hover:text-black">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">Company</h2>
          <ul className="mt-4 space-y-2 text-sm text-neutral-600">
            <li><Link to="/about" className="hover:text-black">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-black">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-black">Shipping & Delivery</Link></li>
            <li><Link to="/about" className="hover:text-black">Returns & Refunds</Link></li>
            <li><Link to="/about" className="hover:text-black">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">Help</h2>
          <ul className="mt-4 space-y-2 text-sm text-neutral-600">
            <li><Link to="/contact" className="hover:text-black">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-black">Track Your Order</Link></li>
            <li><Link to="/about" className="hover:text-black">Size Guide</Link></li>
            <li><Link to="/about" className="hover:text-black">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">Newsletter</h2>
          <p className="mt-4 text-sm text-neutral-600">
            Get exclusive updates on new drops and special offers.
          </p>
          {done ? (
            <p className="mt-4 text-sm">You’re on the list.</p>
          ) : (
            <form
              className="mt-4 flex border border-neutral-300"
              onSubmit={(e) => {
                e.preventDefault()
                if (!email.includes('@')) return
                setDone(true)
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
                className="h-11 min-w-0 flex-1 px-3 text-sm outline-none"
              />
              <button
                type="submit"
                className="flex h-11 w-11 items-center justify-center bg-black text-white"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
      <p className="border-t border-neutral-200 py-5 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Nobi2. All rights reserved.
      </p>
    </footer>
  )
}

import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { products, formatPrice } from '../data/products'
import { brand, FREE_SHIPPING_FROM } from '../data/brand'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/collections', label: 'Collections' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { count, setIsOpen, searchOpen, setSearchOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const results = query.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : []

  const submitSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setSearchOpen(false)
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
    setQuery('')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
      <p className="border-b border-pure-white/10 bg-pure-black py-1.5 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-pure-white">
        Free shipping above {formatPrice(FREE_SHIPPING_FROM)}
        <span className="mx-3 hidden text-neutral-500 sm:inline" aria-hidden="true">
          |
        </span>
        <span className="hidden sm:inline">Cash on delivery</span>
      </p>
      <div className="flex h-16 items-stretch">
        <button
          type="button"
          className="flex w-14 items-center justify-center border-r border-neutral-200 lg:hidden"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={20} aria-hidden="true" />
        </button>

        <Link to="/" className="flex items-center px-4 text-black sm:px-6 lg:px-10" aria-label={`${brand.name} home`}>
          <span className="font-display text-lg font-extrabold uppercase tracking-tight sm:text-xl">{brand.name}</span>
        </Link>

        <nav className="ml-6 hidden items-stretch border-r border-neutral-200 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center border-l border-neutral-200 px-6 text-[11px] uppercase tracking-[0.1em] transition hover:bg-neutral-50 ${
                  isActive ? 'font-semibold text-black' : 'text-neutral-600 hover:text-black'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="flex items-stretch">
          <button
            type="button"
            className="flex items-center gap-2 border-l border-neutral-200 px-4 text-[11px] text-neutral-500 transition hover:bg-neutral-50 lg:px-6"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={18} aria-hidden="true" className="text-black" />
            <span className="hidden xl:inline">Search products</span>
          </button>
          <Link
            to="/account"
            className="flex w-14 items-center justify-center border-l border-neutral-200 transition hover:bg-neutral-50"
            aria-label="Account"
          >
            <User size={18} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="relative flex w-16 items-center justify-center bg-black text-white transition hover:bg-neutral-800"
            aria-label={`Cart, ${count} items`}
            onClick={() => setIsOpen(true)}
          >
            <ShoppingBag size={18} aria-hidden="true" />
            {count > 0 && (
              <span className="absolute right-3 top-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <span className="font-display uppercase text-lg tracking-tight">{brand.name}</span>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-6 py-6" aria-label="Mobile">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-lg uppercase tracking-[0.16em]"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      {searchOpen && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-neutral-200 bg-white shadow-lg">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4">
            <Search size={18} className="shrink-0 text-neutral-500" aria-hidden="true" />
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search caps, bags, chains…"
              className="h-11 w-full bg-transparent text-base outline-none"
            />
            <button type="button" className="h-11 px-2 text-sm" onClick={() => setSearchOpen(false)}>
              Close
            </button>
          </form>
          {results.length > 0 && (
            <ul className="mx-auto max-w-3xl border-t border-neutral-100 px-4 py-2">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/product/${p.id}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 py-2 hover:bg-neutral-50"
                  >
                    <img src={p.image} alt="" className="h-12 w-10 object-cover" />
                    <span>{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </header>
  )
}

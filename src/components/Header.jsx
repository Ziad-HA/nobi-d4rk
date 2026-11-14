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
    <header className="sticky top-0 z-40 bg-white">
      <p className="bg-black py-2 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-white">
        Free shipping on orders above {formatPrice(FREE_SHIPPING_FROM)}
        <span className="font-ar mx-3 hidden text-neutral-500 sm:inline" aria-hidden="true">
          |
        </span>
        <span className="font-ar hidden text-[12px] normal-case tracking-normal sm:inline" lang="ar">
          الدفع عند الاستلام متاح
        </span>
      </p>
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} aria-hidden="true" />
        </button>

        <Link to="/" className="flex items-baseline gap-2 text-black" aria-label={`${brand.name} home`}>
          <span className="font-display text-3xl tracking-[0.16em]">{brand.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-[12px] font-medium uppercase tracking-[0.18em] ${
                  isActive ? 'text-black' : 'text-neutral-600 hover:text-black'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={20} aria-hidden="true" />
          </button>
          <Link to="/account" className="flex h-11 w-11 items-center justify-center" aria-label="Account">
            <User size={20} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center"
            aria-label={`Cart, ${count} items`}
            onClick={() => setIsOpen(true)}
          >
            <ShoppingBag size={20} aria-hidden="true" />
            {count > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <span className="font-display text-2xl tracking-[0.16em]">{brand.name}</span>
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
              placeholder="Search hoodies, tees, cargos… / ابحث"
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

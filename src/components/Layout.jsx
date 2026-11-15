  import { Outlet } from 'react-router-dom'
  import Header from './Header'
  import Footer from './Footer'
  import CartDrawer from './CartDrawer'
  import { useCart } from '../context/CartContext'
  import { ShoppingBag } from 'lucide-react'

  export default function Layout() {
    const { toast } = useCart()

    return (
      <div className="flex min-h-dvh flex-col bg-white text-neutral-900">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-black focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
        {toast && (
  <div
    role="status"
    className="fixed right-5 top-24 z-[60] flex items-center gap-4 rounded-lg bg-black px-5 py-4 text-white shadow-2xl animate-in slide-in-from-right-5 duration-300"
  >
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
      <ShoppingBag size={22} />
    </div>

    <div>
      <p className="text-sm font-bold uppercase tracking-wider">
        Added to bag
      </p>
      <p className="mt-1 text-xs text-neutral-400">
        Your item is waiting for you
      </p>
    </div>

    <div className="ml-2 flex flex-col items-center text-white">
      <span className="text-xl">↑</span>
      <span className="text-[9px] uppercase tracking-widest">
        Bag
      </span>
    </div>
  </div>
)}
      </div>
    )
  }

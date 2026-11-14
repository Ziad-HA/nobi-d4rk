import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import { useCart } from '../context/CartContext'

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
        <p
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 bg-black px-4 py-2 text-xs uppercase tracking-wide text-white"
        >
          {toast}
        </p>
      )}
    </div>
  )
}

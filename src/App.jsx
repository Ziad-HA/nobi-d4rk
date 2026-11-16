
import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { CartProvider } from './context/CartContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Collections from './pages/Collections'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import TrackOrder from './pages/TrackOrder'
import { playSound } from './utils/sound'

const WHATSAPP_NUMBER = '+201276390301'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function GlobalSounds() {
  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target

      if (!(target instanceof Element)) return

      const interactiveElement = target.closest(
        'button, a, [role="button"], input[type="submit"], input[type="button"]'
      )

      if (!interactiveElement) return
      if (interactiveElement.hasAttribute('disabled')) return
      if (interactiveElement.getAttribute('aria-disabled') === 'true') return

      const soundType = interactiveElement.dataset.sound || 'click'

      playSound(soundType)
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return null
}

function WhatsAppButton() {
  const message = encodeURIComponent(
    'Hello D4RK! I need help with my order.'
  )

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110 hover:bg-[#20bd5a]"
    >
      <MessageCircle size={27} strokeWidth={2.2} />
    </a>
  )
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <GlobalSounds />

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:slug" element={<Collections />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>

        <WhatsAppButton />
      </BrowserRouter>
    </CartProvider>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export default function Checkout() {
  const { items, subtotal, shipping, total, clear } = useCart()
  const [placed, setPlaced] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    pin: '',
  })

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-5xl tracking-wide">Order received</h1>
        <p className="mt-4 text-sm text-neutral-600">
          This is a demo checkout — no payment was taken. You’ll get a confirmation if this were live.
        </p>
        <Link to="/shop" className="mt-8 inline-block bg-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
          Keep shopping
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-5xl">Nothing to check out</h1>
        <Link to="/shop" className="mt-6 inline-block underline">
          Shop now
        </Link>
      </div>
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.includes('@') || !form.address.trim() || !form.city.trim() || form.pin.length < 4) {
      setError('Please complete name, email, address, city, and PIN.')
      return
    }
    setError('')
    clear()
    setPlaced(true)
  }

  const field = (id, label, extra = {}) => (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide">
        {label}
      </label>
      <input
        id={id}
        required
        value={form[id]}
        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
        className="mt-2 h-11 w-full border border-neutral-300 px-3"
        {...extra}
      />
    </div>
  )

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 lg:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <h1 className="font-display text-5xl tracking-wide">Checkout</h1>
        {error && (
          <p role="alert" className="border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}
        {field('name', 'Full name', { autoComplete: 'name' })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
        {field('address', 'Address', { autoComplete: 'street-address' })}
        {field('city', 'City', { autoComplete: 'address-level2' })}
        {field('pin', 'PIN code', { autoComplete: 'postal-code' })}
        <button type="submit" className="mt-4 w-full bg-black py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
          Place order — {formatPrice(total)}
        </button>
        <p className="text-xs text-neutral-500">Demo only. No card is charged.</p>
      </form>
      <aside className="h-fit border border-neutral-200 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">Order</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((item) => (
            <li key={`${item.id}-${item.size}`} className="flex justify-between gap-3">
              <span>
                {item.name} × {item.qty}
              </span>
              <span className="tabular-nums">{formatPrice(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-sm">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        <div className="mt-4 flex justify-between font-medium">
          <span>Total</span>
          <span className="tabular-nums">{formatPrice(total)}</span>
        </div>
      </aside>
    </div>
  )
}

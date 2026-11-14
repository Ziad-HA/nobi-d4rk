import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import { governorates, paymentMethods } from '../data/brand'

// Egyptian mobile numbers: 01[0125]xxxxxxxx (11 digits). Accepts +20 / 0020 prefixes and spaces.
const normalizePhone = (raw) => {
  const digits = raw.replace(/[\s\-()]/g, '').replace(/^(\+20|0020)/, '0')
  return digits
}
const isEgyptianMobile = (raw) => /^01[0125]\d{8}$/.test(normalizePhone(raw))

const inputClass = 'mt-2 h-11 w-full border border-neutral-300 px-3'
const labelClass = 'text-xs font-semibold uppercase tracking-wide'

export default function Checkout() {
  const { items, subtotal, shipping, total, clear } = useCart()
  const [placed, setPlaced] = useState(null)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    governorate: '',
    city: '',
    address: '',
    payment: 'cod',
  })

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display uppercase text-3xl sm:text-4xl tracking-tight">Order received</h1>
        <p className="font-ar mt-2 text-lg" lang="ar">
          تم استلام طلبك
        </p>
        <p className="mt-4 text-sm text-neutral-600">
          Thanks {placed.name}. We’ll message you on WhatsApp at {placed.phone} to confirm your order
          {placed.payment === 'cod'
            ? ' before delivery. You pay in cash when it arrives.'
            : ' and send the payment details.'}
        </p>
        <p className="mt-2 text-xs text-neutral-500">This is a demo store — no real order was placed.</p>
        <Link to="/shop" className="mt-8 inline-block bg-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
          Keep shopping
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display uppercase text-3xl sm:text-4xl">Nothing to check out</h1>
        <Link to="/shop" className="mt-6 inline-block underline">
          Shop now
        </Link>
      </div>
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return setError('Please enter your full name.')
    if (!isEgyptianMobile(form.phone)) return setError('Please enter a valid Egyptian mobile number, like 01012345678.')
    if (form.email && !form.email.includes('@')) return setError('That email doesn’t look right.')
    if (!form.governorate) return setError('Please choose your governorate.')
    if (!form.city.trim() || form.address.trim().length < 6) return setError('Please add your city/area and full address.')
    setError('')
    setPlaced({ name: form.name.trim().split(' ')[0], phone: normalizePhone(form.phone), payment: form.payment })
    clear()
  }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 lg:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <h1 className="font-display uppercase text-3xl sm:text-4xl tracking-tight">Checkout</h1>
        {error && (
          <p role="alert" className="border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="name" className={labelClass}>Full name</label>
          <input id="name" required autoComplete="name" value={form.name} onChange={set('name')} className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Mobile number</label>
          <input
            id="phone"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="01X XXXX XXXX"
            value={form.phone}
            onChange={set('phone')}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email (optional)</label>
          <input id="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} className={inputClass} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="governorate" className={labelClass}>Governorate</label>
            <select id="governorate" required value={form.governorate} onChange={set('governorate')} className={`${inputClass} bg-white`}>
              <option value="">Select…</option>
              {governorates.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className={labelClass}>City / area</label>
            <input id="city" required autoComplete="address-level2" value={form.city} onChange={set('city')} className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="address" className={labelClass}>Address</label>
          <input
            id="address"
            required
            autoComplete="street-address"
            placeholder="Street, building, floor, apartment"
            value={form.address}
            onChange={set('address')}
            className={inputClass}
          />
        </div>

        <fieldset>
          <legend className={labelClass}>Payment</legend>
          <div className="mt-2 space-y-2">
            {paymentMethods.map((m) => (
              <label
                key={m.id}
                className={`flex cursor-pointer items-center justify-between gap-3 border px-3 py-3 text-sm ${
                  form.payment === m.id ? 'border-black' : 'border-neutral-300'
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={form.payment === m.id}
                    onChange={set('payment')}
                    className="accent-black"
                  />
                  {m.label}
                </span>
                <span className="font-ar text-xs text-neutral-500" lang="ar">{m.labelAr}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="mt-4 w-full bg-black py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
          Place order — {formatPrice(total)}
        </button>
        <p className="text-xs text-neutral-500">Demo only. No real order or payment is processed.</p>
      </form>

      <aside className="h-fit border border-neutral-200 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">Order</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((item) => (
            <li key={`${item.id}-${item.size}`} className="flex justify-between gap-3">
              <span>
                {item.name}{item.size !== "OS" ? ` (${item.size})` : ""} × {item.qty}
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

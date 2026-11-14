import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.includes('@') || form.message.trim().length < 8) {
      setError('Please add your name, a valid email, and a message (at least 8 characters).')
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">Contact</p>
        <h1 className="mt-2 font-display text-5xl tracking-wide">We’re here to help</h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          Questions about sizing, a drop, or an order? Write us — 24/7 support, human replies during studio hours.
        </p>
        <dl className="mt-8 space-y-3 text-sm">
          <div>
            <dt className="font-medium">Email</dt>
            <dd className="text-neutral-600">hello@nobi2.brand</dd>
          </div>
          <div>
            <dt className="font-medium">Studio</dt>
            <dd className="text-neutral-600">Mumbai, India</dd>
          </div>
          <div>
            <dt className="font-medium">Track an order</dt>
            <dd className="text-neutral-600">Include your order ID in the message.</dd>
          </div>
        </dl>
      </div>

      {sent ? (
        <p className="self-center text-sm">Thanks — we’ll get back within a day.</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          {error && (
            <p role="alert" className="border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide">
              Name
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 h-11 w-full border border-neutral-300 px-3"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 h-11 w-full border border-neutral-300 px-3"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full border border-neutral-300 p-3"
            />
          </div>
          <button type="submit" className="bg-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
            Send
          </button>
        </form>
      )}
    </div>
  )
}

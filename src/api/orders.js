// Order submission. This is the one place to connect your backend (MongoDB).
//
// How it works:
//  - Set VITE_API_URL in .env (for example https://your-api.vercel.app, or "" for the same domain) and
//    this file will POST the order as JSON to `${VITE_API_URL}/api/orders`.
//  - Your API should answer 201 with { "id": "<order number>" } and save the order in MongoDB.
//  - With no VITE_API_URL the orders are only kept in this browser (localStorage, "d4rk-orders"),
//    so the whole flow can be tested before the backend exists.
//
// Payload sent to the API (shape of the MongoDB document):
// {
//   customer: { name, phone, email },
//   shipping: { governorate, city, address, notes },
//   payment: "cod" | "instapay" | "wallet",
//   items: [{ productId, name, size, qty, price }],
//   subtotal, shippingFee, total, currency: "EGP",
//   createdAt: ISO string
// }
// Important: on the server, recalculate the prices from your own products list. Never trust the totals
// coming from the browser.

const API_URL = import.meta.env.VITE_API_URL

export const isBackendConnected = API_URL !== undefined

export async function createOrder(order) {
  if (!isBackendConnected) {
    const id = `D4RK-${Date.now().toString(36).toUpperCase()}`
    try {
      const saved = JSON.parse(localStorage.getItem('d4rk-orders') || '[]')
      saved.push({ id, ...order })
      localStorage.setItem('d4rk-orders', JSON.stringify(saved))
    } catch {
      /* storage blocked: still show the success screen in demo mode */
    }
    return { id, demo: true }
  }

  let res
  try {
    res = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
  } catch {
    throw new Error('Could not reach the server. Check your connection and try again.')
  }
  if (!res.ok) {
    let message = 'Something went wrong while placing your order. Please try again.'
    try {
      const data = await res.json()
      if (data?.message) message = data.message
    } catch {
      /* keep the default message */
    }
    throw new Error(message)
  }
  const data = await res.json()
  return { id: data.id, demo: false }
}

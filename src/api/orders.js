// Order submission, connected to Supabase.
//
// Setup (once):
//  1. Run docs/supabase-setup.sql in Supabase -> SQL Editor. It creates the tables, turns on Row Level
//     Security and adds the place_order() function that saves an order safely.
//  2. Copy .env.example to .env and fill in (Supabase -> Project Settings -> API):
//       VITE_SUPABASE_URL=https://xxxx.supabase.co
//       VITE_SUPABASE_ANON_KEY=<the publishable key (sb_publishable_...) or the legacy anon key>
//     Use only the anon key here. Never put the service_role key in the website.
//  3. Add the same two variables in Vercel (Settings -> Environment Variables) and redeploy.
//
// The browser never writes to the tables directly: it calls place_order(), which validates the data and
// recalculates every price from the products table. Without the two variables the site runs in test mode and
// only keeps orders in this browser (localStorage, "d4rk-orders").

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isBackendConnected = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

export async function createOrder(order) {
  if (!isBackendConnected) {
    const id = `D4RK-${Date.now().toString(36).toUpperCase()}`
    try {
      const saved = JSON.parse(localStorage.getItem('d4rk-orders') || '[]')
      saved.push({ id, ...order })
      localStorage.setItem('d4rk-orders', JSON.stringify(saved))
    } catch {
      /* storage blocked: still show the success screen in test mode */
    }
    return { id, demo: true }
  }

  let res
  try {
    res = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/place_order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        // Legacy anon keys are JWTs and go in Authorization too. New "sb_publishable_..." keys are not JWTs, so
        // they are sent in the apikey header only.
        ...(SUPABASE_ANON_KEY.startsWith('eyJ') ? { Authorization: `Bearer ${SUPABASE_ANON_KEY}` } : {}),
      },
      body: JSON.stringify({
        p_customer: order.customer,
        p_shipping: order.shipping,
        p_payment: order.payment,
        // only ids, sizes and quantities are sent for pricing; the server uses its own prices
        p_items: order.items.map(({ productId, size, qty }) => ({ productId, size, qty })),
      }),
    })
  } catch {
    throw new Error('Could not reach the server. Check your connection and try again.')
  }

  if (!res.ok) {
    let message = 'Something went wrong while placing your order. Please try again.'
    try {
      const data = await res.json()
      // messages raised by place_order() are written for customers; anything else stays generic
      if (data?.code === 'P0001' && data?.message) message = data.message
    } catch {
      /* keep the default message */
    }
    throw new Error(message)
  }

  const number = await res.json()
  return { id: number, demo: false }
}

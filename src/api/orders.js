
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isBackendConnected = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY
);

export async function createOrder(order) {
  if (!isBackendConnected) {
    throw new Error(
      "Supabase is not configured. Please try again later."
    );
  }

  let res;

  try {
    res = await fetch(
      `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/rpc/place_order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          ...(SUPABASE_ANON_KEY.startsWith("eyJ")
            ? { Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
            : {}),
        },
        body: JSON.stringify({
          p_customer: order.customer,
          p_shipping: order.shipping,
          p_payment: order.payment,
          p_items: order.items.map(
            ({ productId, size, qty }) => ({
              productId,
              size,
              qty,
            })
          ),
          p_coupon: order.couponCode?.trim().toUpperCase() || null,
        }),
      }
    );
  } catch {
    throw new Error(
      "Could not reach the server. Check your connection and try again."
    );
  }

  if (!res.ok) {
    let message = "Something went wrong while placing your order.";

    try {
      const data = await res.json();

      if (data?.message) {
        message = data.message;
      }
    } catch {
      // Keep the default error message.
    }

    throw new Error(message);
  }

  const number = await res.json();

  return {
    id: number,
    demo: false,
  };
}

export async function trackOrder({ number, phone }) {
  if (!isBackendConnected) {
    throw new Error("Supabase is not configured.");
  }

  let res;

  try {
    res = await fetch(
      `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/rpc/track_order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          ...(SUPABASE_ANON_KEY.startsWith("eyJ")
            ? { Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
            : {}),
        },
        body: JSON.stringify({
          p_number: number.trim().toUpperCase(),
          p_phone: phone.replace(/[^0-9]/g, ""),
        }),
      }
    );
  } catch {
    throw new Error(
      "Could not reach the server. Please check your connection."
    );
  }

  if (!res.ok) {
    let msg = "Order not found or details do not match.";

    try {
      const data = await res.json();
      if (data?.message) msg = data.message;
    } catch {
      // Keep fallback.
    }

    throw new Error(msg);
  }

  return await res.json();
}

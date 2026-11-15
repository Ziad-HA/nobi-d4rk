const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isBackendConnected = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const getHeaders = () => ({
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  ...(SUPABASE_ANON_KEY.startsWith("eyJ")
    ? { Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
    : {}),
});

async function getErrorMessage(res, fallback) {
  try {
    const data = await res.json();
    return data?.message || fallback;
  } catch {
    return fallback;
  }
}

export async function createOrder(order) {
  if (!isBackendConnected) {
    throw new Error("Supabase is not configured. Please try again later.");
  }

  let res;

  try {
    res = await fetch(
      `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/rpc/place_order`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          p_customer: order.customer,
          p_shipping: order.shipping,
          p_payment: order.payment,
          p_items: order.items.map(({ productId, size, qty }) => ({
            productId,
            size,
            qty,
          })),
          p_coupon: order.couponCode || null,
        }),
      },
    );
  } catch {
    throw new Error(
      "Could not reach the server. Check your connection and try again.",
    );
  }

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(
        res,
        "Something went wrong while placing your order.",
      ),
    );
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
        headers: getHeaders(),
        body: JSON.stringify({
          p_number: number.trim().toUpperCase(),
          p_phone: phone.replace(/[^0-9]/g, ""),
        }),
      },
    );
  } catch {
    throw new Error(
      "Could not reach the server. Please check your connection.",
    );
  }

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(res, "Order not found or details do not match."),
    );
  }

  return await res.json();
}

// Change payment method for an existing order.
export async function changeOrderPayment({ number, phone, payment }) {
  if (!isBackendConnected) {
    throw new Error("Supabase is not configured.");
  }

  if (!["cod", "instapay", "wallet"].includes(payment)) {
    throw new Error("Invalid payment method.");
  }

  let res;

  try {
    res = await fetch(
      `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/rpc/change_order_payment`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          p_number: number.trim().toUpperCase(),
          p_phone: phone.replace(/[^0-9]/g, ""),
          p_payment: payment,
        }),
      },
    );
  } catch {
    throw new Error(
      "Could not reach the server. Please check your connection.",
    );
  }

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(res, "Could not change the payment method."),
    );
  }

  return await res.json();
}

export async function sendOrderConfirmation({ number, phone }) {
  if (!isBackendConnected) {
    throw new Error("Supabase is not configured.");
  }

  const headers = {
    ...getHeaders(),
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  };

  const res = await fetch(
    `${SUPABASE_URL.replace(/\/$/, "")}/functions/v1/D4RK`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        order_number: number,
        phone: phone.replace(/[^0-9]/g, ""),
      }),
    },
  );

  if (!res.ok) {
    const message = await getErrorMessage(
      res,
      "Could not send order confirmation email.",
    );

    throw new Error(message);
  }

  return await res.json();
}

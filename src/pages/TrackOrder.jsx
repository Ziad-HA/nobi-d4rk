import { useState } from "react";
import { Link } from "react-router-dom";
import { trackOrder } from "../api/orders";
import { formatPrice } from "../data/products";
import { brand } from "../data/brand";

const statusMap = {
  new: { label: "Received / Processing", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  confirmed: { label: "Confirmed", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  shipped: { label: "Out for Delivery", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
  delivered: { label: "Delivered", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  cancelled: { label: "Cancelled", color: "text-red-400 bg-red-400/10 border-red-400/20" },
};

export default function TrackOrder() {
  const [number, setNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!number.trim() || !phone.trim()) {
      return setError("Please enter both your order number and phone number.");
    }
    setError("");
    setLoading(true);
    setOrder(null);

    try {
      const data = await trackOrder({ number, phone });
      setOrder(data);
    } catch (err) {
      setError(err.message || "Order not found. Please verify your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">D4RK Order Status</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
          Track Your Order
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Enter your order number (e.g. D4RK-XXXXXX) and the mobile number used during checkout.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded border border-neutral-800 bg-neutral-900/40 p-6" noValidate>
        {error && (
          <p role="alert" className="border border-red-500/30 bg-red-950/40 px-4 py-2.5 text-sm text-red-300 rounded">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="orderNumber" className="text-xs font-semibold uppercase tracking-wide text-neutral-300">
            Order Number
          </label>
          <input
            id="orderNumber"
            type="text"
            required
            placeholder="D4RK-XXXXXX"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="mt-2 h-11 w-full border border-neutral-700 bg-black px-3 text-pure-white focus:border-white uppercase"
          />
        </div>
        <div>
          <label htmlFor="trackPhone" className="text-xs font-semibold uppercase tracking-wide text-neutral-300">
            Mobile Number
          </label>
          <input
            id="trackPhone"
            type="tel"
            required
            placeholder="01012345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 h-11 w-full border border-neutral-700 bg-black px-3 text-pure-white focus:border-white"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pure-white py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-pure-black transition hover:bg-neutral-200 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Track Order"}
        </button>
      </form>

      {order && (
        <div className="mt-8 rounded border border-neutral-800 bg-neutral-900/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-4">
            <div>
              <p className="text-xs uppercase text-neutral-500">Order Number</p>
              <p className="font-mono text-lg font-bold text-pure-white tracking-wider">{order.number}</p>
            </div>
            <div>
              <span className={`inline-block rounded border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${statusMap[order.status]?.color || "text-neutral-300 bg-neutral-800 border-neutral-700"}`}>
                {statusMap[order.status]?.label || order.status}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-neutral-500">Customer</p>
              <p className="font-medium text-pure-white">{order.name}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Destination</p>
              <p className="font-medium text-pure-white">{order.city}, {order.governorate}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Payment</p>
              <p className="font-medium text-pure-white uppercase">{order.payment}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Total</p>
              <p className="font-semibold text-pure-white">{formatPrice(order.total)}</p>
            </div>
          </div>

          {order.items && order.items.length > 0 && (
            <div className="mt-6 border-t border-neutral-800 pt-4">
              <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">Items in Order</p>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-neutral-300">
                      {item.name} {item.size ? `(${item.size})` : ""} × {item.qty}
                    </span>
                    <span className="font-mono text-neutral-400">{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 text-center border-t border-neutral-800 pt-4">
            <a
              href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`Hello D4RK, inquiring about my order ${order.number}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-400 hover:text-emerald-300 underline"
            >
              Need help with this order? Chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/shop" className="text-xs uppercase tracking-wider text-neutral-500 hover:text-white underline">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

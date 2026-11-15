import { useState } from "react";
import { Link } from "react-router-dom";
import { trackOrder } from "../api/orders";
import { formatPrice } from "../data/products";
import { brand } from "../data/brand";

const inputClass = "mt-2 h-11 w-full border border-neutral-300 px-3 bg-transparent text-sm";
const labelClass = "text-xs font-semibold uppercase tracking-wide";

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
        <h1 className="font-display uppercase text-3xl sm:text-4xl tracking-tight">
          Track Your Order
        </h1>
        <p className="font-ar mt-2 text-lg" lang="ar">
          متابعة حالة طلبك
        </p>
        <p className="mt-4 text-sm text-neutral-600">
          Enter your order number (e.g. D4RK-XXXXXX) and your phone number.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
        {error && (
          <p role="alert" className="border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="orderNumber" className={labelClass}>
            Order Number
          </label>
          <input
            id="orderNumber"
            type="text"
            required
            placeholder="D4RK-XXXXXX"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className={`${inputClass} uppercase`}
          />
        </div>
        <div>
          <label htmlFor="trackPhone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="trackPhone"
            type="tel"
            required
            placeholder="01012345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white disabled:opacity-60"
        >
          {loading ? "Searching…" : "Track order"}
        </button>
      </form>

      {order && (
        <div className="mt-10 border border-neutral-200 p-6 text-sm">
          <div className="flex justify-between items-baseline border-b border-neutral-200 pb-3">
            <div>
              <p className="text-xs text-neutral-500 uppercase">Order</p>
              <p className="font-semibold tabular-nums text-base">{order.number}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-500 uppercase">Status</p>
              <p className="font-semibold uppercase tracking-wider text-xs">
                {order.status}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-neutral-600">
            <p>Customer: <span className="font-medium text-black">{order.name}</span></p>
            <p>Address: <span className="font-medium text-black">{order.city}, {order.governorate}</span></p>
            <p>Payment: <span className="font-medium uppercase text-black">{order.payment}</span></p>
            <p>Total: <span className="font-semibold text-black">{formatPrice(order.total)}</span></p>
          </div>

          {order.items && order.items.length > 0 && (
            <div className="mt-4 border-t border-neutral-200 pt-3">
              <p className="text-xs font-semibold uppercase tracking-wide mb-2">Items</p>
              <ul className="space-y-1 text-xs text-neutral-600">
                {order.items.map((it, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{it.name} {it.size ? `(${it.size})` : ""} × {it.qty}</span>
                    <span>{formatPrice(it.price * it.qty)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 border-t border-neutral-200 pt-3 text-center">
            <a
              href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`Hello D4RK, inquiring about order ${order.number}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 hover:text-black underline"
            >
              Have a question about this order? WhatsApp us
            </a>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/shop" className="text-xs underline text-neutral-500 hover:text-black">
          Back to shop
        </Link>
      </div>
    </div>
  );
}


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import { brand, governorates, paymentMethods } from "../data/brand";
import {
  createOrder,
  changeOrderPayment,
  sendOrderConfirmation,
  isBackendConnected,
} from "../api/orders";

// Egyptian mobile numbers: 01[0125]xxxxxxxx (11 digits).
const normalizePhone = (raw) => {
  const digits = raw.replace(/[\s\-()]/g, "").replace(/^(\+20|0020)/, "0");
  return digits;
};

const isEgyptianMobile = (raw) => /^01[0125]\d{8}$/.test(normalizePhone(raw));

const inputClass = "mt-2 h-11 w-full border border-neutral-300 px-3";
const labelClass = "text-xs font-semibold uppercase tracking-wide";
const PLACED_STORAGE_KEY = "d4rk-placed-order";
const FORM_STORAGE_KEY = "d4rk-checkout-form";
const VALID_COUPON = "D4RK10";

export default function Checkout() {
  const { items, subtotal, shipping, clear } = useCart();

  const [placed, setPlaced] = useState(() => {
    try {
      const saved = sessionStorage.getItem(PLACED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [error, setError] = useState("");
  const [emailNotice, setEmailNotice] = useState("");

  const [confirmedPayment, setConfirmedPayment] = useState(() => {
    try {
      return sessionStorage.getItem("d4rk-payment-confirmed") === "true";
    } catch {
      return false;
    }
  });

  const [submitting, setSubmitting] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [changingPayment, setChangingPayment] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [couponError, setCouponError] = useState(false);

  const [form, setForm] = useState(() => {
    const defaults = {
      name: "",
      phone: "",
      email: "",
      governorate: "",
      city: "",
      address: "",
      notes: "",
      payment: "cod",
    };

    try {
      const saved = localStorage.getItem(FORM_STORAGE_KEY);
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch {
      return defaults;
    }
  });

  const discount = appliedCoupon ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = subtotal - discount + shipping;

  useEffect(() => {
    try {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form));
    } catch {
      // Ignore storage errors.
    }
  }, [form]);

  useEffect(() => {
    if (placed) {
      try {
        sessionStorage.setItem(PLACED_STORAGE_KEY, JSON.stringify(placed));
      } catch {
        // Ignore storage errors.
      }

      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const el = document.getElementById("order-received-top");
      if (el) {
        el.scrollIntoView({ block: "start", inline: "nearest" });
      }
    }
  }, [placed]);

  const applyCoupon = () => {
    const normalized = couponCode.trim().toUpperCase();

    if (!normalized) {
      setAppliedCoupon("");
      setCouponError(true);
      setCouponMessage("Please enter a coupon code.");
      return;
    }

    if (normalized !== VALID_COUPON) {
      setAppliedCoupon("");
      setCouponError(true);
      setCouponMessage("Invalid coupon code.");
      return;
    }

    setAppliedCoupon(VALID_COUPON);
    setCouponCode(VALID_COUPON);
    setCouponError(false);
    setCouponMessage("Coupon applied! You saved 10%.");
  };

  const removeCoupon = () => {
    setAppliedCoupon("");
    setCouponCode("");
    setCouponMessage("");
    setCouponError(false);
  };

  const handleChangePayment = async (payment) => {
    if (changingPayment || !placed || confirmedPayment) return;

    if (payment === placed.payment) {
      setShowPaymentOptions(false);
      return;
    }

    setChangingPayment(true);
    setError("");

    try {
      await changeOrderPayment({
        number: placed.id,
        phone: placed.phone,
        payment,
      });

      setPlaced((prev) => ({
        ...prev,
        payment,
      }));

      setForm((prev) => ({
        ...prev,
        payment,
      }));

      setConfirmedPayment(false);

      try {
        sessionStorage.removeItem("d4rk-payment-confirmed");
      } catch {}

      if (payment === "cod") {
        clear();
      }

      setShowPaymentOptions(false);
    } catch (err) {
      setError(err.message || "Could not change your payment method.");
    } finally {
      setChangingPayment(false);
    }
  };

  if (placed) {
    const waMsg = encodeURIComponent(
      `Hello D4RK! Order ${placed.id} - ${formatPrice(placed.total)} (${placed.payment === "cod" ? "Cash on Delivery" : placed.payment === "instapay" ? "InstaPay" : "Vodafone Cash"}).`,
    );

    const waUrl = `https://wa.me/${brand.whatsapp}?text=${waMsg}`;

    return (
      <div
        id="order-received-top"
        className="mx-auto max-w-xl px-4 py-16 text-center sm:py-24"
      >
        <h1 className="font-display uppercase text-3xl tracking-tight sm:text-4xl">
          Order received
        </h1>

        <p className="font-ar mt-2 text-lg" lang="ar">
          تم استلام طلبك
        </p>

        <p className="mt-4 text-sm text-neutral-600">
          Thanks {placed.name}. We’ll contact you via WhatsApp or phone call at{" "}
          {placed.phone} to confirm your order
          {placed.payment === "cod"
            ? " before delivery. You pay in cash when it arrives."
            : " and verify your payment transfer."}
        </p>

        {emailNotice && (
          <p
            role="status"
            className={`mt-4 border px-3 py-3 text-sm ${
              emailNotice.includes("could not")
                ? "border-amber-300 bg-amber-50 text-amber-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            {emailNotice}
          </p>
        )}

        <p className="mt-4 text-sm">
          Order number:{" "}
          <span className="font-semibold tabular-nums">{placed.id}</span>
        </p>

        <div className="mt-6 border border-neutral-200 p-5 text-left">
          <h2 className="text-xs font-semibold uppercase tracking-wider">
            Order summary
          </h2>

          <div className="mt-4 flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(placed.subtotal ?? placed.total)}</span>
          </div>

          {placed.discount > 0 && (
            <div className="mt-2 flex justify-between text-sm text-emerald-700">
              <span>Discount ({placed.couponCode})</span>
              <span>-{formatPrice(placed.discount)}</span>
            </div>
          )}

          <div className="mt-2 flex justify-between text-sm">
            <span>Shipping</span>
            <span>
              {placed.shipping === 0
                ? "Free"
                : formatPrice(placed.shipping ?? 0)}
            </span>
          </div>

          <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 font-semibold">
            <span>Total</span>
            <span>{formatPrice(placed.total)}</span>
          </div>
        </div>

        <div className="mt-6 border border-neutral-200 p-5 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider">
            Payment method
          </p>

          <p className="mt-2 text-sm font-medium">
            {placed.payment === "cod"
              ? "Cash on Delivery"
              : placed.payment === "instapay"
                ? "InstaPay"
                : "Vodafone Cash"}
          </p>

          {!confirmedPayment && (
            <>
              <button
                type="button"
                onClick={() => {
                  setShowPaymentOptions((prev) => !prev);
                  setError("");
                }}
                disabled={changingPayment}
                className="mt-4 border border-black px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white disabled:opacity-50"
              >
                {showPaymentOptions ? "Cancel" : "Change payment method"}
              </button>

              {showPaymentOptions && (
                <div className="mt-4 space-y-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      disabled={changingPayment}
                      onClick={() => handleChangePayment(method.id)}
                      className={`flex w-full items-center justify-between border px-3 py-3 text-sm disabled:opacity-50 ${
                        placed.payment === method.id
                          ? "border-black bg-neutral-50"
                          : "border-neutral-200 hover:border-black"
                      }`}
                    >
                      <span>{method.label}</span>
                      <span>
                        {changingPayment
                          ? "Updating..."
                          : placed.payment === method.id
                            ? "Current"
                            : "Select"}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {error && (
                <p role="alert" className="mt-3 text-xs text-red-600">
                  {error}
                </p>
              )}
            </>
          )}

          {confirmedPayment && (
            <p className="mt-3 text-xs text-neutral-500">
              Payment has already been marked as transferred.
            </p>
          )}
        </div>

        {placed.payment !== "cod" && (
          <div className="mt-6 space-y-3 border border-neutral-200 p-5 text-left text-sm">
            {placed.payment === "instapay" && (
              <>
                <p className="font-semibold text-black">InstaPay details:</p>
                <p className="text-neutral-600">
                  Send{" "}
                  <span className="font-semibold text-black">
                    {formatPrice(placed.total)}
                  </span>{" "}
                  to{" "}
                  <button
                    type="button"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        brand.instapayUsername || "ziad.nobii99",
                      )
                    }
                    className="cursor-pointer font-mono font-semibold text-black underline hover:text-black"
                    title="Click to copy"
                  >
                    {brand.instapayUsername || "ziad.nobii99"}
                  </button>{" "}
                  (click to copy).
                </p>
              </>
            )}

            {placed.payment === "wallet" && (
              <>
                <p className="font-semibold text-black">
                  Vodafone Cash details:
                </p>
                <p className="text-neutral-600">
                  Send{" "}
                  <span className="font-semibold text-black">
                    {formatPrice(placed.total)}
                  </span>{" "}
                  to{" "}
                  <button
                    type="button"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        brand.vodafoneCash || "01098616961",
                      )
                    }
                    className="cursor-pointer font-mono font-semibold text-black underline hover:text-black"
                    title="Click to copy"
                  >
                    {brand.vodafoneCash || "01098616961"}
                  </button>{" "}
                  (click to copy).
                </p>
              </>
            )}

            <div className="border-t border-neutral-200 pt-2">
              {confirmedPayment ? (
                <p className="text-xs font-semibold text-emerald-600">
                  ✓ Payment transfer confirmed. Thank you!
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setConfirmedPayment(true);
                    try {
                      sessionStorage.setItem("d4rk-payment-confirmed", "true");
                    } catch {}
                    clear();
                  }}
                  className="w-full bg-black px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:opacity-90 sm:w-auto"
                >
                  I have transferred the money (أنا حولت المبلغ خلاص)
                </button>
              )}
            </div>

            <p className="text-xs text-neutral-500">
              After transfer, you can also send the screenshot on WhatsApp or
              Instagram DM (@{brand.instagram}).
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => clear()}
            className="inline-block bg-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
          >
            {placed.payment === "cod"
              ? "Confirm on WhatsApp"
              : "Send receipt on WhatsApp"}
          </a>

          <Link
            to="/shop"
            onClick={() => {
              try {
                sessionStorage.removeItem(PLACED_STORAGE_KEY);
                sessionStorage.removeItem("d4rk-payment-confirmed");
              } catch {}
            }}
            className="inline-block border border-neutral-200 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] hover:border-black"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display uppercase text-3xl sm:text-4xl">
          Nothing to check out
        </h1>

        <Link to="/shop" className="mt-6 inline-block underline">
          Shop now
        </Link>
      </div>
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    if (!form.name.trim()) {
      return setError("Please enter your full name.");
    }

    if (!isEgyptianMobile(form.phone)) {
      return setError(
        "Please enter a valid Egyptian mobile number, like 01012345678.",
      );
    }

    const customerEmail = form.email.trim();

    if (!customerEmail) {
      return setError("Please enter your email address.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return setError("Please enter a valid email address.");
    }

    if (!form.governorate) {
      return setError("Please choose your governorate.");
    }

    if (!form.city.trim() || form.address.trim().length < 6) {
      return setError("Please add your city/area and full address.");
    }

    setError("");
    setEmailNotice("");
    setSubmitting(true);

    const phone = normalizePhone(form.phone);

    try {
      const result = await createOrder({
        customer: {
          name: form.name.trim(),
          phone,
          email: customerEmail,
        },

        shipping: {
          governorate: form.governorate,
          city: form.city.trim(),
          address: form.address.trim(),
          notes: form.notes.trim(),
        },

        payment: form.payment,

        items: items.map((i) => ({
          productId: i.id,
          name: i.name,
          size: i.size,
          qty: i.qty,
          price: i.price,
        })),

        subtotal,
        shippingFee: shipping,
        discount,
        couponCode: appliedCoupon || null,
        total: finalTotal,
        currency: "EGP",
        createdAt: new Date().toISOString(),
      });

      setPlaced({
        name: form.name.trim().split(" ")[0],
        phone,
        email: customerEmail,
        payment: form.payment,
        id: result.id,
        subtotal,
        discount,
        couponCode: appliedCoupon || null,
        shipping,
        total: finalTotal,
        demo: result.demo,
      });

      window.scrollTo({ top: 0, behavior: "instant" });

      if (form.payment === "cod") {
        clear();
      }

      // Send confirmation email after the order is successfully created.
      try {
        await sendOrderConfirmation({
          number: result.id,
          phone,
          email: customerEmail,
        });

        setEmailNotice(
          `A confirmation email has been sent to ${customerEmail}. Please check your inbox and spam folder.`,
        );
      } catch (emailError) {
        console.error("Order email error:", emailError);

        setEmailNotice(
          "Your order was received successfully, but we could not send the confirmation email. Please contact us if needed.",
        );
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const set = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 lg:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <h1 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
          Checkout
        </h1>

        {error && (
          <p
            role="alert"
            className="border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800"
          >
            {error}
          </p>
        )}

        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            required
            autoComplete="name"
            value={form.name}
            onChange={set("name")}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Mobile number
          </label>
          <input
            id="phone"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="01X XXXX XXXX"
            value={form.phone}
            onChange={set("phone")}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            required
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={set("email")}
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="governorate" className={labelClass}>
              Governorate
            </label>
            <select
              id="governorate"
              required
              value={form.governorate}
              onChange={set("governorate")}
              className={`${inputClass} bg-white`}
            >
              <option value="">Select…</option>
              {governorates.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="city" className={labelClass}>
              City / area
            </label>
            <input
              id="city"
              required
              autoComplete="address-level2"
              value={form.city}
              onChange={set("city")}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className={labelClass}>
            Address
          </label>
          <input
            id="address"
            required
            autoComplete="street-address"
            placeholder="Street, building, floor, apartment"
            value={form.address}
            onChange={set("address")}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="notes" className={labelClass}>
            Notes (optional)
          </label>
          <input
            id="notes"
            placeholder="Landmark, preferred delivery time…"
            value={form.notes}
            onChange={set("notes")}
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
                  form.payment === m.id ? "border-black" : "border-neutral-300"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={form.payment === m.id}
                    onChange={set("payment")}
                    className="accent-black"
                  />
                  {m.label}
                </span>

                <span className="font-ar text-xs text-neutral-500" lang="ar">
                  {m.labelAr}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 w-full bg-black py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white disabled:opacity-60"
        >
          {submitting
            ? "Placing order…"
            : `Place order — ${formatPrice(finalTotal)}`}
        </button>

        <p className="text-xs text-neutral-500">
          {isBackendConnected
            ? `Questions about your order? WhatsApp us on +${brand.whatsapp}.`
            : "Backend is not connected. Orders cannot be submitted right now."}
        </p>
      </form>

      <aside className="h-fit border border-neutral-200 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
          Order
        </h2>

        <ul className="mt-4 space-y-3 text-sm">
          {items.map((item) => (
            <li
              key={`${item.id}-${item.size}`}
              className="flex justify-between gap-3"
            >
              <span>
                {item.name}
                {item.size !== "OS" ? ` (${item.size})` : ""} × {item.qty}
              </span>

              <span className="tabular-nums">
                {formatPrice(item.price * item.qty)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-neutral-200 pt-5">
          <label htmlFor="coupon" className={labelClass}>
            Promo code
          </label>

          <div className="mt-2 flex gap-2">
            <input
              id="coupon"
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              disabled={Boolean(appliedCoupon)}
              onChange={(e) => {
                setCouponCode(e.target.value);
                setCouponMessage("");
                setCouponError(false);
              }}
              className="h-11 min-w-0 flex-1 border border-neutral-300 px-3 text-sm uppercase disabled:bg-neutral-100"
            />

            {appliedCoupon ? (
              <button
                type="button"
                onClick={removeCoupon}
                className="h-11 border border-neutral-300 px-4 text-xs font-semibold uppercase tracking-wider hover:border-black"
              >
                Remove
              </button>
            ) : (
              <button
                type="button"
                onClick={applyCoupon}
                className="h-11 bg-black px-5 text-xs font-semibold uppercase tracking-wider text-white hover:opacity-90"
              >
                Apply
              </button>
            )}
          </div>

          {couponMessage && (
            <p
              role="status"
              className={`mt-2 text-xs ${
                couponError ? "text-red-600" : "text-emerald-700"
              }`}
            >
              {couponMessage}
            </p>
          )}
        </div>

        <div className="mt-5 flex justify-between border-t border-neutral-200 pt-4 text-sm">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>

        {appliedCoupon && (
          <div className="mt-2 flex justify-between text-sm text-emerald-700">
            <span>Discount (D4RK10 · 10%)</span>
            <span className="tabular-nums">-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="mt-2 flex justify-between text-sm">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>

        <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 font-semibold">
          <span>Total</span>
          <span className="tabular-nums">{formatPrice(finalTotal)}</span>
        </div>

        {appliedCoupon && (
          <p className="mt-3 text-xs text-emerald-700">
            You saved {formatPrice(discount)} with D4RK10.
          </p>
        )}
      </aside>
    </div>
  );
}

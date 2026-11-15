import { useState } from "react";
import { brand } from "../data/brand";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.email.includes("@") ||
      form.message.trim().length < 8
    ) {
      setError(
        "Please add your name, a valid email, and a message (at least 8 characters).",
      );
      return;
    }
    setError("");

    // Open WhatsApp directly with the filled message
    const msg = `*New Contact Message - D4RK*\n\n*Name:* ${form.name.trim()}\n*Email:* ${form.email.trim()}\n*Message:* ${form.message.trim()}`;
    const waUrl = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");

    setSent(true);
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">
          Contact
        </p>
        <h1 className="mt-2 font-display uppercase text-3xl sm:text-4xl tracking-tight">
          We’re here to help
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          Questions about sizing, a drop, or an order? Message us on WhatsApp or
          by email. We reply daily from 11am to 9pm ALEX time.
        </p>
        <p className="font-ar mt-1 text-sm text-neutral-500" lang="ar">
          كلمنا على واتساب في أي وقت، وبنرد عليك في نفس اليوم.
        </p>
        <dl className="mt-8 space-y-3 text-sm">
          <div>
            <dt className="font-medium">WhatsApp</dt>
            <dd>
              <a
                className="text-neutral-600 underline"
                href={`https://wa.me/${brand.whatsapp}`}
              >
                Chat with us
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-medium">Email</dt>
            <dd className="text-neutral-600">{brand.email}</dd>
          </div>
          <div>
            <dt className="font-medium">Instagram</dt>
            <dd>
              <a
                className="text-neutral-600 underline"
                href={`https://instagram.com/${brand.instagram}`}
              >
                @{brand.instagram}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-medium">Studio</dt>
            <dd className="text-neutral-600">{brand.city}</dd>
          </div>
          <div>
            <dt className="font-medium">Track an order</dt>
            <dd className="text-neutral-600">
              Include your order ID in the message.
            </dd>
          </div>
        </dl>
      </div>

      {sent ? (
        <div className="self-center space-y-4 border border-neutral-200 p-8 text-center text-sm">
          <p className="font-display uppercase text-xl">Opening WhatsApp…</p>
          <p className="text-neutral-600">
            Thanks! We’ll reply to your message as soon as possible.
          </p>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setForm({ name: "", email: "", message: "" });
            }}
            className="mt-2 inline-block border border-neutral-300 px-6 py-2 text-xs uppercase tracking-wider hover:border-black"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          {error && (
            <p
              role="alert"
              className="border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800"
            >
              {error}
            </p>
          )}
          <div>
            <label
              htmlFor="name"
              className="text-xs font-semibold uppercase tracking-wide"
            >
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
            <label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-wide"
            >
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
            <label
              htmlFor="message"
              className="text-xs font-semibold uppercase tracking-wide"
            >
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
          <button
            type="submit"
            className="bg-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}

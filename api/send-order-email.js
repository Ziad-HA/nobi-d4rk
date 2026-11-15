// Vercel serverless function: sends the order emails through Brevo.
//
// Required env vars on Vercel:
//   BREVO_API_KEY          - Brevo API key
//   VITE_SUPABASE_URL      - (or SUPABASE_URL) used to verify the order
//   VITE_SUPABASE_ANON_KEY - (or SUPABASE_ANON_KEY)
// Optional:
//   BREVO_SENDER_EMAIL     - default orders@d4rk.eu.org (must be a verified sender in Brevo)
//   BREVO_SENDER_NAME      - default D4RK
//   OWNER_EMAIL            - where new-order alerts go
//   SITE_URL               - default https://d4rk.eu.org

import { sendBrevoEmail, SITE_URL } from './_brevo.js';

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const money = (n) => `${Number(n || 0).toLocaleString('en-US')} EGP`;

async function verifyOrder({ number, phone }) {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Supabase is not configured on Vercel (missing URL or anon key).');
  }

  const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/rpc/track_order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      ...(key.startsWith('eyJ') ? { Authorization: `Bearer ${key}` } : {}),
    },
    body: JSON.stringify({
      p_number: String(number).trim().toUpperCase(),
      p_phone: String(phone).replace(/[^0-9]/g, ''),
    }),
  });

  if (!res.ok) {
    let message = 'Order could not be verified.';
    try {
      message = (await res.json())?.message || message;
    } catch {
      // ignore
    }
    const err = new Error(message);
    err.status = res.status === 400 || res.status === 404 ? 404 : 502;
    throw err;
  }

  return res.json();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { number, phone, email } = req.body || {};

  if (!number || !phone) {
    return res.status(400).json({ error: 'Order number and phone are required.' });
  }

  const OWNER_EMAIL = process.env.OWNER_EMAIL || 'zh.nobii@gmail.com';

  // Only send emails for a real order (number + phone must match in Supabase).
  let order;
  try {
    order = await verifyOrder({ number, phone });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }

  const itemsHtml = (order.items || [])
    .map(
      (it) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#dddddd;font-size:13px;">
          ${esc(it.name)} ${it.size && it.size !== 'OS' ? `(${esc(it.size)})` : ''} <span style="color:#777;">× ${esc(it.qty)}</span>
        </td>
        <td align="right" style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#ffffff;font-size:13px;font-weight:600;font-family:monospace;">
          ${money(it.price * it.qty)}
        </td>
      </tr>`,
    )
    .join('');

  const ownerHtml = `<!DOCTYPE html>
<html>
<body style="background:#000;color:#fff;font-family:sans-serif;padding:25px;">
  <div style="max-width:500px;border:1px solid #333;padding:20px;background:#0a0a0a;">
    <h2 style="margin-top:0;text-transform:uppercase;">New Order: ${esc(order.number)}</h2>
    <div style="background:#141414;padding:12px;margin:15px 0;border-radius:4px;">
      <p style="margin:4px 0;"><strong>Customer:</strong> ${esc(order.name)}</p>
      <p style="margin:4px 0;"><strong>Phone:</strong> ${esc(phone)}</p>
      <p style="margin:4px 0;"><strong>Email:</strong> ${esc(email || 'None')}</p>
      <p style="margin:4px 0;"><strong>Location:</strong> ${esc(order.city)}, ${esc(order.governorate)}</p>
      <p style="margin:4px 0;"><strong>Payment:</strong> ${esc(String(order.payment || '').toUpperCase())}</p>
      <p style="margin:4px 0;"><strong>Total:</strong> ${money(order.total)}</p>
    </div>
    <table width="100%" style="border-collapse:collapse;">${itemsHtml}</table>
  </div>
</body>
</html>`;

  const customerHtml = `<!DOCTYPE html>
<html>
<body style="background:#000;color:#f4f4f4;font-family:sans-serif;padding:30px;">
  <div style="max-width:520px;margin:0 auto;background:#090909;border:1px solid #222;padding:30px;">
    <h1 style="color:#fff;text-transform:uppercase;margin:0;">D4RK</h1>
    <p style="color:#777;font-size:11px;text-transform:uppercase;">Streetwear Accessories · Made in ALEX</p>
    <p style="margin-top:25px;color:#fff;font-size:16px;">Thanks ${esc(order.name)}, your order is received.</p>
    <p style="color:#aaa;font-size:13px;">Order Number: <strong style="color:#fff;">${esc(order.number)}</strong></p>
    <table width="100%" style="margin:20px 0;">${itemsHtml}</table>
    <p style="color:#fff;font-weight:bold;text-align:right;font-size:16px;">Total: ${money(order.total)}</p>
    ${
      SITE_URL
        ? `<div style="text-align:center;margin-top:30px;">
      <a href="${esc(SITE_URL)}/track-order" style="background:#fff;color:#000;padding:12px 25px;text-decoration:none;font-size:12px;font-weight:bold;text-transform:uppercase;">Track Your Order</a>
    </div>`
        : ''
    }
  </div>
</body>
</html>`;

  const hasCustomerEmail = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const [owner, customer] = await Promise.allSettled([
    sendBrevoEmail({
      to: OWNER_EMAIL,
      subject: `NEW ORDER: ${order.number} (${money(order.total)})`,
      html: ownerHtml,
    }),
    hasCustomerEmail
      ? sendBrevoEmail({
          to: email.trim(),
          subject: `ORDER CONFIRMED // ${order.number}`,
          html: customerHtml,
        })
      : Promise.reject(new Error('No valid customer email.')),
  ]);

  const result = {
    owner: owner.status === 'fulfilled' ? 'sent' : owner.reason.message,
    customer: customer.status === 'fulfilled' ? 'sent' : customer.reason.message,
  };

  if (customer.status === 'rejected') {
    console.error('Customer email failed:', customer.reason.message);
    return res.status(502).json({ error: customer.reason.message, ...result });
  }

  return res.status(200).json({ success: true, ...result });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { order } = req.body || {};

  if (!order) {
    return res.status(400).json({ error: 'No order provided' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Resend API key not configured' });
  }

  const OWNER_EMAIL = 'zh.nobii@gmail.com';

  const itemsHtml = (order.items || [])
    .map(
      (it) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #dddddd; font-size: 13px;">
          ${it.name} ${it.size && it.size !== 'OS' ? `(${it.size})` : ''} <span style="color: #777;">× ${it.qty}</span>
        </td>
        <td align="right" style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #ffffff; font-size: 13px; font-weight: 600; font-family: monospace;">
          ${(it.price * it.qty).toLocaleString()} EGP
        </td>
      </tr>`
    )
    .join('');

  try {
    // 1) Send Owner Notification Email (Always to you, regardless of customer email)
    const ownerEmailHtml = `
<!DOCTYPE html>
<html>
<body style="background-color: #000; color: #fff; font-family: sans-serif; padding: 25px;">
  <div style="max-width: 500px; border: 1px solid #333; padding: 20px; background: #0a0a0a;">
    <h2 style="color: #fff; text-transform: uppercase; margin-top: 0;">🔥 New Order Alert: ${order.id}</h2>
    <p style="color: #bbb; font-size: 14px;">A new order has just been placed on D4RK!</p>
    
    <div style="background: #141414; padding: 12px; margin: 15px 0; border-radius: 4px;">
      <p style="margin: 4px 0;"><strong>Customer:</strong> ${order.customer?.name || 'N/A'}</p>
      <p style="margin: 4px 0;"><strong>Phone:</strong> <a href="tel:${order.customer?.phone}" style="color: #fff;">${order.customer?.phone || 'N/A'}</a></p>
      <p style="margin: 4px 0;"><strong>WhatsApp:</strong> <a href="https://wa.me/2${order.customer?.phone}" style="color: #10b981;">Chat with Customer</a></p>
      <p style="margin: 4px 0;"><strong>Email:</strong> ${order.customer?.email || 'None'}</p>
      <p style="margin: 4px 0;"><strong>Address:</strong> ${order.shipping?.address || ''}, ${order.shipping?.city || ''}, ${order.shipping?.governorate || ''}</p>
      <p style="margin: 4px 0;"><strong>Payment Method:</strong> ${order.payment?.toUpperCase()}</p>
      <p style="margin: 4px 0;"><strong>Total:</strong> ${order.total?.toLocaleString()} EGP</p>
    </div>

    <table width="100%" style="margin-top: 15px; border-collapse: collapse;">
      ${itemsHtml}
    </table>
  </div>
</body>
</html>
    `;

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'D4RK Store <orders@resend.dev>',
        to: [OWNER_EMAIL],
        subject: `🔥 NEW ORDER: ${order.id} (${(order.total || 0).toLocaleString()} EGP)`,
        html: ownerEmailHtml,
      }),
    });

    // 2) If customer provided an email and it matches your test email or custom domain
    if (order.customer?.email && order.customer.email.includes('@')) {
      // Attempt customer confirmation
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'D4RK <orders@resend.dev>',
          to: [order.customer.email],
          subject: `ORDER CONFIRMED // ${order.id}`,
          html: `
<!DOCTYPE html>
<html>
<body style="background-color: #000; color: #f4f4f4; font-family: sans-serif; padding: 30px;">
  <div style="max-width: 520px; margin: 0 auto; background-color: #090909; border: 1px solid #222; padding: 30px;">
    <h1 style="color: #fff; text-transform: uppercase; margin: 0;">D4RK</h1>
    <p style="color: #777; font-size: 11px; text-transform: uppercase;">Streetwear Accessories · Made in ALEX</p>
    <p style="margin-top: 25px; color: #fff; font-size: 16px;">Thanks ${order.customer.name}, your order is received.</p>
    <p style="color: #aaa; font-size: 13px;">Order Number: <strong style="color: #fff;">${order.id}</strong></p>
    <table width="100%" style="margin: 20px 0;">${itemsHtml}</table>
    <p style="color: #fff; font-weight: bold; text-align: right; font-size: 16px;">Total: ${(order.total || 0).toLocaleString()} EGP</p>
    <div style="text-align: center; margin-top: 30px;">
      <a href="https://nobi-dusk.vercel.app/track-order" style="background: #fff; color: #000; padding: 12px 25px; text-decoration: none; font-size: 12px; font-weight: bold; text-transform: uppercase;">Track Your Order</a>
    </div>
  </div>
</body>
</html>
          `,
        }),
      }).catch(() => {});
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

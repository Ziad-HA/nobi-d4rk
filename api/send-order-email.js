export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { order } = req.body || {};

  if (!order || !order.customer?.email) {
    return res.status(200).json({ message: 'No email provided, skipped.' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Resend API key not configured' });
  }

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
    const response = await fetch('https://api.resend.com/emails', {
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
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Order Confirmation - D4RK</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f4;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 520px; background-color: #090909; border: 1px solid #222222; border-radius: 4px; padding: 36px 32px; text-align: left;">
          
          <!-- Header -->
          <tr>
            <td style="padding-bottom: 24px; border-bottom: 1px solid #1a1a1a;">
              <h1 style="margin: 0; font-size: 26px; font-weight: 900; letter-spacing: 0.12em; color: #ffffff; text-transform: uppercase;">D4RK</h1>
              <p style="margin: 4px 0 0 0; font-size: 11px; letter-spacing: 0.18em; color: #777777; text-transform: uppercase;">Order Confirmation</p>
            </td>
          </tr>

          <!-- Greeting & Order Status -->
          <tr>
            <td style="padding-top: 28px;">
              <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #ffffff; text-transform: uppercase;">
                Thanks ${order.customer.name || ''}, your order is received.
              </p>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #aaaaaa;">
                We’re preparing your pieces. Here are the details of your order:
              </p>

              <!-- Order Number Badge -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; background-color: #121212; border: 1px solid #262626; border-radius: 4px; padding: 14px 18px;">
                <tr>
                  <td>
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #888;">Order Number</span>
                    <p style="margin: 4px 0 0 0; font-size: 18px; font-weight: 800; letter-spacing: 0.1em; color: #ffffff; font-family: monospace;">${order.id}</p>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #888;">Payment</span>
                    <p style="margin: 4px 0 0 0; font-size: 13px; font-weight: 700; color: #ffffff; text-transform: uppercase;">${order.payment === 'cod' ? 'Cash on Delivery' : order.payment}</p>
                  </td>
                </tr>
              </table>

              <!-- Items Table -->
              <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #888;">Items</p>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                ${itemsHtml}
              </table>

              <!-- Totals -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-top: 12px; border-top: 1px solid #1a1a1a;">
                <tr>
                  <td style="font-size: 13px; color: #888; padding: 4px 0;">Shipping to ${order.shipping?.city || ''}, ${order.shipping?.governorate || ''}</td>
                  <td align="right" style="font-size: 13px; color: #888; padding: 4px 0;">${order.shippingFee === 0 ? 'FREE' : `${order.shippingFee} EGP`}</td>
                </tr>
                <tr>
                  <td style="font-size: 15px; font-weight: 800; color: #ffffff; padding: 8px 0;">Total Amount</td>
                  <td align="right" style="font-size: 16px; font-weight: 900; color: #ffffff; padding: 8px 0; font-family: monospace;">${(order.total || 0).toLocaleString()} EGP</td>
                </tr>
              </table>

              <!-- Action Link -->
              <table border="0" cellspacing="0" cellpadding="0" style="margin-top: 28px; width: 100%;">
                <tr>
                  <td align="center">
                    <a href="https://nobi-dusk.vercel.app/track-order" target="_blank" style="display: block; width: 85%; background-color: #ffffff; color: #000000; text-decoration: none; font-size: 12px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; padding: 14px 20px; border-radius: 2px; text-align: center;">
                      Track Order Status
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 36px; border-top: 1px solid #1a1a1a; margin-top: 32px; font-size: 11px; color: #555555; text-align: center; line-height: 1.5;">
              <p style="margin: 0 0 4px 0;">D4RK — Alexandria, Egypt</p>
              <p style="margin: 0;">Questions about your order? WhatsApp us at +201276390301</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      }),
    });

    const data = await response.json();
    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

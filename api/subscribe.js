export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Resend API Key is not configured on Vercel.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'D4RK <onboarding@resend.dev>',
        to: [email],
        subject: "WELCOME TO D4RK // YOU'RE IN",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Welcome to D4RK</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f4;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 520px; background-color: #090909; border: 1px solid #222222; border-radius: 4px; padding: 36px 32px; text-align: left;">
          
          <!-- Header / Wordmark -->
          <tr>
            <td style="padding-bottom: 24px; border-bottom: 1px solid #1a1a1a;">
              <h1 style="margin: 0; font-size: 26px; font-weight: 900; letter-spacing: 0.12em; color: #ffffff; text-transform: uppercase;">D4RK</h1>
              <p style="margin: 4px 0 0 0; font-size: 11px; letter-spacing: 0.18em; color: #777777; text-transform: uppercase;">Streetwear Accessories · Made in ALEX</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding-top: 28px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #ffffff; letter-spacing: 0.05em; text-transform: uppercase;">
                You're on the priority list.
              </p>
              <p style="margin: 0 0 18px 0; font-size: 14px; line-height: 1.6; color: #aaaaaa;">
                Welcome in. You will now get secret drop announcements, early restock alerts, and exclusive access to pieces before they drop publicly.
              </p>
              
              <!-- Quote -->
              <div style="margin: 24px 0; padding: 14px 18px; border-left: 2px solid #ffffff; background-color: #121212;">
                <p style="margin: 0; font-size: 13px; font-style: italic; color: #dddddd; line-height: 1.5;">
                  “D4RK finishes the fit because the small details are made to last.”
                </p>
              </div>

              <!-- Promo Code Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 24px 0; background-color: #111111; border: 1px dashed #333333; border-radius: 4px; padding: 16px; text-align: center;">
                <tr>
                  <td>
                    <p style="margin: 0 0 6px 0; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #888888;">
                      Welcome Gift · 10% Off Your First Order
                    </p>
                    <p style="margin: 0; font-size: 20px; font-weight: 900; letter-spacing: 0.2em; color: #ffffff; font-family: monospace;">
                      D4RK10
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Action Button -->
              <table border="0" cellspacing="0" cellpadding="0" style="margin-top: 28px; width: 100%;">
                <tr>
                  <td align="center">
                    <a href="https://nobi-dusk.vercel.app/shop" target="_blank" style="display: block; width: 85%; background-color: #ffffff; color: #000000; text-decoration: none; font-size: 12px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; padding: 14px 20px; border-radius: 2px; text-align: center;">
                      Shop The Collection
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 36px; border-top: 1px solid #1a1a1a; margin-top: 32px; font-size: 11px; color: #555555; text-align: center; line-height: 1.5;">
              <p style="margin: 0 0 4px 0;">Alexandria, Egypt</p>
              <p style="margin: 0;">Instagram: @zi4dddd · WhatsApp: +201276390301</p>
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

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Failed to send email.' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    return res.status(500).json({ error: 'Server error while sending newsletter email.' });
  }
}

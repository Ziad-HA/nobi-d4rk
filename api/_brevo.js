// Shared Brevo (transactional email) helper for the Vercel functions.
// Files starting with "_" inside /api are not exposed as routes.
//
// Env vars on Vercel:
//   BREVO_API_KEY       - Brevo API key (SMTP & API -> API Keys, starts with "xkeysib-")
//   BREVO_SENDER_EMAIL  - sender address on a verified Brevo sender/domain (default: orders@d4rk.eu.org)
//   BREVO_SENDER_NAME   - sender display name (default: D4RK)
//   SITE_URL            - public store URL (default: https://d4rk.eu.org)

export const SITE_URL = (process.env.SITE_URL || 'https://d4rk.eu.org').replace(/\/$/, '');

export async function sendBrevoEmail({ to, subject, html }) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error('BREVO_API_KEY is not configured on Vercel.');
  }

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME || 'D4RK',
        email: process.env.BREVO_SENDER_EMAIL || 'orders@d4rk.eu.org',
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    // empty body
  }

  if (!res.ok) {
    throw new Error(data?.message || `Brevo error (${res.status})`);
  }

  return data; // { messageId }
}

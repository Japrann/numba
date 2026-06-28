// api/submit.js
// Deploy this on Vercel (or any platform that supports Node serverless functions).
// It keeps your Discord webhook URL secret on the server side.
//
// SETUP:
// 1. In your hosting dashboard (e.g. Vercel project settings -> Environment Variables),
//    add a variable named DISCORD_WEBHOOK_URL with your actual Discord webhook URL as the value.
// 2. Deploy. The frontend calls POST /api/submit and never sees the webhook URL.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { number } = req.body || {};

    if (!number || typeof number !== 'string' || number.trim().length < 6) {
      return res.status(400).json({ error: 'Invalid number' });
    }

    // basic sanitation: keep only digits, spaces, +, -, ()
    const cleanNumber = number.trim().slice(0, 30).replace(/[^0-9+\-\s()]/g, '');

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL is not set');
      return res.status(500).json({ error: 'Server not configured' });
    }

    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `💌 Kirana's number just came in: **${cleanNumber}**`
      })
    });

    if (!discordRes.ok) {
      throw new Error(`Discord webhook responded with ${discordRes.status}`);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

# "May I get your number?" — for Kirana 🤍

## Files
- `index.html` — the whole site (single page app, no build step needed)
- `api/submit.js` — serverless function that securely forwards the number to your Discord webhook

## Why two files
Discord webhook URLs are secret — if you put one directly in `index.html`'s JavaScript,
anyone could open dev tools and steal it (and spam your channel). So the number is sent
to `/api/submit` instead, and that serverless function (running on the server, not the
browser) is the only place that knows your real webhook URL.

## How to deploy (Vercel — free, ~2 minutes)
1. Create a free account at vercel.com if you don't have one.
2. Create a new project and upload this folder (or push it to a GitHub repo and import it).
   Keep the folder structure as-is: `index.html` at the root, `api/submit.js` inside `api/`.
3. In your Discord server: Server Settings → Integrations → Webhooks → New Webhook → copy the URL.
4. In your Vercel project: Settings → Environment Variables → add:
   - Name: `DISCORD_WEBHOOK_URL`
   - Value: (paste your Discord webhook URL)
5. Deploy. Vercel automatically turns `api/submit.js` into a live endpoint at `/api/submit`.
6. Open your live URL on your phone and test the flow.

That's it — the webhook URL never appears in any file the browser can see.

## Notes
- Everything is mobile-first and works full-screen on a phone (max-width 480px container,
  centered on larger screens).
- No external libraries, no audio, very lightweight — it's just one HTML file + one tiny function.
- The "no" button has no real click handler tied to a result — it only ever repositions
  itself, so it truly can't be pressed.

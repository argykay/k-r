# GitHub Pages

Project site: `https://<username>.github.io/k-r/`

## Locale URLs (no hash)

| Language | Home URL |
|----------|----------|
| English (default) | `/` or `/en` |
| Greek | `/el` |
| Latvian | `/lv` |

On GitHub Pages, paths are prefixed: `/k-r/`, `/k-r/el`, etc. (`PUBLIC_URL` in `.env.production`).

## Deploy

1. Change `PUBLIC_URL` in `.env.production` if the repo name is not `k-r`.
2. **Settings → Pages → Source**: branch `gh-pages`, folder `/ (root)`.
3. Run `npm run deploy`.

`public/404.html` handles direct links and refresh on GitHub Pages (e.g. `/k-r/el`).

## Local dev

Open **http://localhost:3000/** for English, or **http://localhost:3000/el** for Greek (`PUBLIC_URL` is empty in `.env.development`).

Dev uses `REACT_APP_SITE_PASSWORD=test` from `.env.development` (password: `test`). Override in `.env.development.local`.

**Restart `npm start` after any env change** — CRA does not hot-reload `.env` files.

If you already unlocked the site, open **http://localhost:3000/?lock** to clear the session and see the gate again.

## Site access

The site can be protected with a guest password. The gate is **disabled** when `REACT_APP_SITE_PASSWORD` is unset.

### Setup

1. Copy [`.env.example`](../.env.example) to `.env.production.local` (gitignored).
2. Set your password:

   ```
   REACT_APP_SITE_PASSWORD=your-guest-password
   ```

3. Run `npm run build` or `npm run deploy` — CRA inlines the env var at build time.

Guests enter the password on the gate screen. After a correct login they stay unlocked for the browser session (`sessionStorage`).

### Security

This is **client-side** protection — it keeps casual visitors out but is not strong against a technical user who inspects the JS bundle. Suitable for wedding guest privacy, not for highly sensitive data.

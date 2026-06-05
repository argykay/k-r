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

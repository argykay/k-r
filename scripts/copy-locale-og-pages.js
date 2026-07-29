/**
 * GitHub Pages serves real files for `/el` and `/lv` so link previews get OG
 * tags (crawlers often ignore JS redirects from 404.html).
 */
const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://theforestwedding.com';
const LOCALES = ['en', 'el', 'lv'];
const BUILD_DIR = path.join(__dirname, '..', 'build');
const indexPath = path.join(BUILD_DIR, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('copy-locale-og-pages: build/index.html not found. Run build first.');
  process.exit(1);
}

const rootHtml = fs.readFileSync(indexPath, 'utf8');

for (const locale of LOCALES) {
  const localeUrl = `${SITE_ORIGIN}/${locale}`;
  let html = rootHtml.replace(/<html\s+lang="[^"]*"/, `<html lang="${locale}"`);

  html = html.replace(
    /property="og:url"\s+content="[^"]*"/,
    `property="og:url" content="${localeUrl}"`,
  );

  const localeDir = path.join(BUILD_DIR, locale);
  fs.mkdirSync(localeDir, { recursive: true });
  fs.writeFileSync(path.join(localeDir, 'index.html'), html);
  console.log(`copy-locale-og-pages: wrote ${locale}/index.html (og:url=${localeUrl})`);
}

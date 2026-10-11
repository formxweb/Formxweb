// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Canonical address of the site (used by canonical links, Open Graph, sitemap and
 * JSON-LD). Set SITE_URL on every host. Vercel and Netlify production builds
 * fall back to their production URL; local previews use `npm run build:local`.
 */
const resolved =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  (process.env.CONTEXT === 'production' && process.env.URL) ||
  '';

const isBuild = process.argv.includes('build');
const allowLocal = process.env.ALLOW_LOCAL_SITE === '1';
const bad = !resolved || /localhost|127\.0\.0\.1|alanadiniz\.com/.test(resolved);

if (isBuild && bad && !allowLocal) {
  throw new Error(
    '\n\nSITE_URL tanımlı değil. Canonical, Open Graph ve sitemap adresleri yanlış olur.\n' +
      'Örnek: SITE_URL=https://veryaxz.com npm run build\n' +
      'Yalnızca yerel önizleme için: npm run build:local\n',
  );
}

export default defineConfig({
  site: bad ? 'http://localhost:4321' : resolved.replace(/\/$/, ''),
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});

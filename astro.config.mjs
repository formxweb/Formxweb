// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Canonical address of the site. Set SITE_URL when deploying to a custom domain.
 * Vercel and Netlify expose their production URL automatically, so previews and
 * first deploys still get absolute Open Graph / canonical URLs.
 */
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  process.env.URL ||
  'http://localhost:4321';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
});

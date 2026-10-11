import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { services } from '../data/services';
import { site } from '../data/site';

export const GET: APIRoute = ({ site: base }) => {
  const root = base ?? new URL('http://localhost:4321');
  const lastmod = site.legal.updated;
  const urls: { path: string; priority: string }[] = [
    { path: '/', priority: '1.0' },
    { path: '/work/', priority: '0.9' },
    { path: '/hizmetler/', priority: '0.9' },
    ...services.map((s) => ({ path: `/hizmetler/${s.slug}/`, priority: '0.8' })),
    ...projects.map((p) => ({ path: `/work/${p.slug}/`, priority: '0.8' })),
    { path: '/teklif/', priority: '0.8' },
    { path: '/studyo/', priority: '0.7' },
    { path: '/sss/', priority: '0.7' },
    { path: '/kvkk/', priority: '0.3' },
    { path: '/gizlilik/', priority: '0.3' },
    { path: '/kullanim-kosullari/', priority: '0.3' },
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${new URL(u.path, root).href}</loc><lastmod>${lastmod}</lastmod><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

/**
 * JSON-LD helpers. One @graph per page: the studio, the website, the page and
 * whatever the page adds (breadcrumbs, case study, FAQ, service).
 * Only facts that exist are emitted; nothing about clients, reviews or prices.
 */
import { site } from '../data/site';
import { services } from '../data/services';

export type Node = Record<string, unknown>;

export const abs = (path: string, base: URL | undefined) => new URL(path, base ?? 'http://localhost:4321').href;

export function studioNode(base: URL | undefined): Node {
  const l = site.legal;
  const hasAddress = Boolean(l.address);
  const node: Node = {
    '@type': hasAddress ? ['Organization', 'ProfessionalService'] : 'Organization',
    '@id': abs('/#studio', base),
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url: abs('/', base),
    logo: { '@type': 'ImageObject', url: abs('/icon-512.png', base), width: 512, height: 512 },
    image: abs('/og.jpg', base),
    telephone: site.contact.phoneHref,
    sameAs: [site.contact.instagram],
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.contact.phoneHref,
      contactType: 'sales',
      availableLanguage: ['tr'],
      areaServed: 'TR',
    },
    knowsAbout: ['Web tasarımı', 'Web geliştirme', 'E-ticaret', 'Landing page', 'Sanat yönetimi', 'Yerel SEO'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hizmetler',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.h1, description: s.text, url: abs(`/hizmetler/${s.slug}/`, base) },
      })),
    },
  };
  if (l.controller) node.legalName = l.controller;
  if (l.email || site.contact.email) node.email = l.email || site.contact.email;
  if (hasAddress) node.address = { '@type': 'PostalAddress', streetAddress: l.address, addressCountry: 'TR' };
  return node;
}

export function websiteNode(base: URL | undefined): Node {
  return {
    '@type': 'WebSite',
    '@id': abs('/#website', base),
    url: abs('/', base),
    name: site.name,
    inLanguage: 'tr-TR',
    publisher: { '@id': abs('/#studio', base) },
  };
}

export function pageNode(base: URL | undefined, path: string, title: string, description: string, image?: string): Node {
  const node: Node = {
    '@type': 'WebPage',
    '@id': abs(`${path}#page`, base),
    url: abs(path, base),
    name: title,
    description,
    inLanguage: 'tr-TR',
    isPartOf: { '@id': abs('/#website', base) },
    about: { '@id': abs('/#studio', base) },
  };
  if (image) node.primaryImageOfPage = { '@type': 'ImageObject', url: image };
  return node;
}

export function breadcrumbNode(base: URL | undefined, path: string, items: { name: string; path: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': abs(`${path}#breadcrumbs`, base),
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path, base) })),
  };
}

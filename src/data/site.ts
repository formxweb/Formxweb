/**
 * VERYAXZ STUDIO — site configuration.
 *
 * Everything the owner may need to change lives here: contact channels, legal
 * identity, studio facts, the quote form and analytics. Empty strings are never
 * printed: every block that depends on a field renders only when it is filled.
 */

const env = import.meta.env;

export const site = {
  name: 'VERYAXZ STUDIO',
  shortName: 'VERYAXZ',
  /** Turkish one-liner used in titles, the hero meta row and JSON-LD. */
  role: 'Web tasarım ve geliştirme stüdyosu',
  description:
    'VERYAXZ STUDIO; restoran, kafe, spor salonu, butik ve e-ticaret markaları için özel web sitesi, e-ticaret ve landing page tasarlayıp geliştirir. Strateji, tasarım ve kod tek elden.',
  locale: 'tr_TR',

  contact: {
    /** WhatsApp number in international format, digits only (no +, spaces or leading 0). */
    whatsapp: '905446552099',
    /** Phone number as shown on the page. */
    phoneDisplay: '0544 655 20 99',
    /** Phone number for tel: links. */
    phoneHref: '+905446552099',
    instagram: 'https://instagram.com/veryaxz_studio',
    instagramHandle: '@veryaxz_studio',
    /** Public e-mail (ideally on your own domain). Empty = hidden everywhere. */
    email: '',
    /** e.g. 'Genellikle aynı iş günü içinde'. Empty = hidden. */
    responseTime: '',
  },

  /**
   * Studio facts. Each line renders only when filled; nothing is invented.
   * city: 'İstanbul' · serviceArea: 'Türkiye genelinde uzaktan' · hours: 'Hafta içi 10:00–19:00'
   */
  studio: {
    city: '',
    serviceArea: '',
    hours: '',
    founder: { name: '', role: '' },
  },

  /**
   * Legal identity (künye) used by the footer, the KVKK notice and the terms.
   * controller: şahıs işletmesi → owner's full name; şirket → ticaret unvanı.
   * Fields left empty are simply not shown.
   */
  legal: {
    controller: '',
    tradeName: 'VERYAXZ STUDIO',
    address: '',
    email: '',
    kep: '',
    mersis: '',
    taxOffice: '',
    taxNo: '',
    /** Hosting provider of this site, e.g. { name: 'Vercel Inc.', country: 'ABD' }. */
    hosting: { name: '', country: '' },
    /** Form processor when PUBLIC_FORM_ENDPOINT is used, e.g. { name: 'Formspree', country: 'ABD' }. */
    formProcessor: { name: '', country: '' },
    /** Retention period for quote requests, e.g. 'talebin sonuçlanmasından itibaren 2 yıl'. */
    retention: '',
    updated: '2026-10-10',
  },

  /** Set registered: true only with a TÜRKPATENT registration; the ® sign follows it. */
  trademark: { registered: false, number: '' },

  /**
   * Quote form delivery.
   *
   * endpoint: a form backend that accepts POST + FormData and answers 2xx on
   * success (Formspree, Web3Forms, Getform, Basin or your own API). Also settable
   * with PUBLIC_FORM_ENDPOINT. accessKey: Web3Forms "access_key"
   * (PUBLIC_FORM_ACCESS_KEY).
   *
   * Without an endpoint the form writes the brief into a WhatsApp message that the
   * visitor sends. It never shows success unless a service accepted the request.
   */
  form: {
    endpoint: env.PUBLIC_FORM_ENDPOINT ?? '',
    accessKey: env.PUBLIC_FORM_ACCESS_KEY ?? '',
  },

  /**
   * Cookieless analytics (Plausible-compatible). Set PUBLIC_ANALYTICS_DOMAIN to the
   * site domain and, for self-hosted Plausible/Umami-style scripts, PUBLIC_ANALYTICS_SRC.
   * Nothing is loaded while the domain is empty.
   */
  analytics: {
    domain: env.PUBLIC_ANALYTICS_DOMAIN ?? '',
    src: env.PUBLIC_ANALYTICS_SRC || 'https://plausible.io/js/script.tagged-events.outbound-links.js',
  },
} as const;

export const trademarkSign = site.trademark.registered ? '®' : '';
export const brand = `${site.name}${trademarkSign}`;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const whatsappHello = 'Merhaba VERYAXZ, işletmem için bir web sitesi düşünüyorum.';

/** Primary navigation. Functional language is Turkish; English lives only in display type. */
export const nav = [
  { href: '/work/', home: '/#work', label: 'İşler', en: 'Work' },
  { href: '/hizmetler/', home: '/#capabilities', label: 'Hizmetler', en: 'Capabilities' },
  { href: '/#approach', home: '/#approach', label: 'Süreç', en: 'Approach' },
  { href: '/studyo/', home: '/studyo/', label: 'Stüdyo', en: 'Studio' },
  { href: '/sss/', home: '/#sss', label: 'SSS', en: 'FAQ' },
] as const;

export const legalLinks = [
  { href: '/kvkk/', label: 'KVKK Aydınlatma Metni' },
  { href: '/gizlilik/', label: 'Gizlilik ve Çerezler' },
  { href: '/kullanim-kosullari/', label: 'Kullanım Koşulları' },
] as const;

/** Act names used by rails and the header indicator. */
export const acts = {
  I: 'Kimlik',
  II: 'İşler',
  III: 'Hizmetler',
  IV: 'Yaklaşım',
  V: 'Başlayalım',
} as const;

/** Lists the legal fields still empty, so the build can warn about them. */
export function missingLegalFields(): string[] {
  const l = site.legal;
  const missing: string[] = [];
  if (!l.controller) missing.push('legal.controller (veri sorumlusu)');
  if (!l.address && !l.email && !l.kep) missing.push('legal.address / legal.email / legal.kep (KVKK başvuru kanalı)');
  return missing;
}

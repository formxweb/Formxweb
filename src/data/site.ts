/**
 * VERYAXZ STUDIO — site configuration.
 * Contact channels and the quote form live here, so they can be changed without
 * touching any component.
 */

export const site = {
  name: 'VERYAXZ STUDIO',
  shortName: 'VERYAXZ',
  description:
    'Markalar için özgün dijital deneyimler. Strateji, tasarım ve geliştirme tek bir bütün olarak. Özel web sitesi, e-ticaret, landing page ve yeniden tasarım.',
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
    /** Optional public e-mail. Leave empty to hide it everywhere. */
    email: '',
  },

  /**
   * Quote form delivery.
   *
   * endpoint: a form backend that accepts POST requests with FormData and answers
   * with a 2xx status on success (Formspree: https://formspree.io/f/xxxxxxx,
   * Web3Forms: https://api.web3forms.com/submit, Getform, Basin or your own API).
   * It can also be set at build time with the PUBLIC_FORM_ENDPOINT variable.
   *
   * accessKey: only for services that need a key in the body (Web3Forms
   * "access_key"). Also settable with PUBLIC_FORM_ACCESS_KEY.
   *
   * With no endpoint, the form writes the brief into a WhatsApp message and the
   * visitor sends it from WhatsApp. It never shows a success message unless a
   * service has actually accepted the submission.
   */
  form: {
    endpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '',
    accessKey: import.meta.env.PUBLIC_FORM_ACCESS_KEY ?? '',
  },
} as const;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const nav = [
  { href: '/#work', label: 'Work', tr: 'İşler' },
  { href: '/#capabilities', label: 'Capabilities', tr: 'Yetkinlikler' },
  { href: '/#approach', label: 'Approach', tr: 'Yaklaşım' },
  { href: '/#contact', label: 'Contact', tr: 'İletişim' },
] as const;

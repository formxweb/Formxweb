/**
 * Services — single source for the home Capabilities act, the /hizmetler/ pages,
 * the quote form chips, the "what we do" strip and the work × services matrix.
 * No prices or durations: those are quoted per project.
 */

export type ServiceId = 'ozel' | 'isletme' | 'eticaret' | 'landing' | 'yenileme';

export interface Service {
  id: ServiceId;
  no: string;
  slug: string;
  /** English display name (art layer). */
  en: string;
  /** Turkish functional name; identical to the quote form chip. */
  tr: string;
  /** H1 of the service page. */
  h1: string;
  /** One line for the "what we do" strip. */
  short: string;
  /** Kimin için. */
  for: string;
  text: string;
  value: string;
  gets: string[];
  /** Longer, factual list for the service page. */
  includes: string[];
  proof: { slug: string; note?: string }[];
  proofLabel: 'Örnek' | 'İlgili';
  /** One real screen that shows the service at work (project slug, shot index, what it shows). */
  evidence: { slug: string; shot: number; label: string; position?: string };
  seo: { title: string; description: string };
}

export const services: Service[] = [
  {
    id: 'ozel',
    no: '01',
    slug: 'ozel-web-tasarim',
    en: 'Custom website design',
    tr: 'Özel web sitesi',
    h1: 'Özel web sitesi tasarımı',
    short: 'Markaya özel konsept, tasarım ve kod',
    for: 'Hikâyesiyle öne çıkmak isteyen restoran, mekân ve markalar',
    text: 'Markanın karakterine göre geliştirilen özel dijital deneyimler.',
    value:
      'Şablon yok. Konsept markanın kendi adından, ürününden ya da hikâyesinden çıkıyor; tipografi, renk ve hareket o konsepte göre kuruluyor.',
    gets: ['Birbirinden farklı üç sanat yönetimi yaklaşımı', 'Markaya özel tipografi, renk ve hareket sistemi', 'Sıfırdan yazılan, hızlı ve erişilebilir kod'],
    includes: [
      'Marka, hedef ve kitle üzerine kısa bir inceleme',
      'Tipografi, renk ve kompozisyon bakımından birbirinden farklı üç sanat yönetimi yaklaşımı',
      'Seçilen yön için tipografi, renk, grid ve hareket sistemi',
      'Telefon, tablet ve masaüstü için ayrı ayrı düşünülmüş ekranlar',
      'Üretim kalitesinde kod, temel SEO ve yapılandırılmış veri',
      'Yayına alma ve içeriğin nasıl güncelleneceğini anlatan teslim',
    ],
    proof: [{ slug: 'bogazdayiz' }, { slug: 'cupistan' }, { slug: 'marmara-blue' }, { slug: 'mas-vip-transfer' }],
    proofLabel: 'Örnek',
    evidence: { slug: 'bogazdayiz', shot: 0, label: 'Markaya özel konsept: kelimeler sudan yükseliyor' },
    seo: {
      title: 'Özel Web Sitesi Tasarımı',
      description:
        'Şablon kullanmadan, markanızın kendi hikâyesinden çıkan konseptle tasarlanan ve sıfırdan kodlanan özel web siteleri. Tipografi, renk ve hareket sistemiyle.',
    },
  },
  {
    id: 'isletme',
    no: '02',
    slug: 'isletme-web-sitesi',
    en: 'Business websites',
    tr: 'İşletme sitesi',
    h1: 'İşletme web sitesi',
    short: 'Hizmetler, saatler, konum ve WhatsApp',
    for: 'Kafe, restoran, spor salonu ve yerel hizmet işletmeleri',
    text: 'İşletmenin güvenilirliğini ve hizmetlerini güçlü biçimde sunan siteler.',
    value:
      'Ziyaretçinin aradığı her şey ilk bakışta: ne yaptığınız, nerede olduğunuz, ne zaman açık olduğunuz ve size nasıl ulaşacağı.',
    gets: ['Hizmetler, menü, saatler ve konum net', 'Yerel SEO ve yapılandırılmış işletme verisi', 'WhatsApp ve telefona tek dokunuş'],
    includes: [
      'Hizmet, menü, ders ya da ürün bölümleri',
      'Çalışma saatleri ve “şu an açık mı?” bilgisi',
      'Harita, yol tarifi ve konum bilgisi',
      'Talep ve rezervasyonları hazır mesajla WhatsApp’a taşıyan akışlar',
      'İşletme bilgisinin arama motorlarına işaretlenmesi (yerel SEO)',
      'Telefonda hızlı açılan, mobil öncelikli yapı',
    ],
    proof: [{ slug: 'swiss-fit-club' }, { slug: 'la-joie' }, { slug: 'cupistan' }, { slug: 'mas-vip-transfer' }],
    proofLabel: 'Örnek',
    evidence: { slug: 'swiss-fit-club', shot: 3, label: 'Çalışma saatleri ve “şu an açık mı?” bilgisi' },
    seo: {
      title: 'İşletme Web Sitesi',
      description:
        'Kafe, restoran, spor salonu ve yerel işletmeler için hizmetleri, saatleri, konumu ve WhatsApp’ı ilk bakışta gösteren, Google’a hazır işletme siteleri.',
    },
  },
  {
    id: 'eticaret',
    no: '03',
    slug: 'e-ticaret-sitesi',
    en: 'E‑commerce',
    tr: 'E-ticaret',
    h1: 'E-ticaret sitesi tasarımı ve geliştirme',
    short: 'Ödeme, stok ve sipariş takibi',
    for: 'Ürününü kendi sitesinden satmak isteyen butik, atölye ve markalar',
    text: 'Ürün keşfinden satın alma akışına kadar düşünülmüş satış deneyimleri.',
    value: 'Vitrinden kargo takibine kadar tek bir sistem: stok, varyant, güvenli ödeme, sipariş takibi ve yönetim paneli.',
    gets: ['Renk, beden ve stok yönetimi', 'Shopier veya iyzico ile güvenli ödeme', 'Sipariş takibi ve yönetim paneli'],
    includes: [
      'Kategori, arama, filtre ve sıralama',
      'Renk ve bedene göre stok ve fiyat',
      'Kişiye özel ürünler için müşterinin doldurduğu yazı alanları',
      'Shopier veya iyzico güvenli ödeme sayfası; kart bilgisi sitenize gelmez',
      'Alındı → Hazırlanıyor → Kargoda → Teslim edildi sipariş takibi',
      'Sipariş, ürün, stok, iade ve indirim kodları için yönetim paneli',
      'Otomatik e-postalar; mesafeli satış, KVKK ve iade sayfaları için altyapı',
    ],
    proof: [{ slug: 'motorcu-chopper' }],
    proofLabel: 'Örnek',
    evidence: { slug: 'motorcu-chopper', shot: 4, label: 'Renk ve bedene göre stok, sepete ekleme' },
    seo: {
      title: 'E-Ticaret Sitesi Tasarımı ve Geliştirme',
      description:
        'Shopier veya iyzico ile güvenli ödeme, renk ve beden bazlı stok, sipariş takibi ve yönetim paneliyle markanıza özel e-ticaret siteleri.',
    },
  },
  {
    id: 'landing',
    no: '04',
    slug: 'landing-page',
    en: 'Landing pages',
    tr: 'Landing page',
    h1: 'Landing page ve kampanya sayfası',
    short: 'Tek hedef, tek eylem',
    for: 'Açılış, kampanya, etkinlik ya da tek bir hizmet için müşteri arayan işletmeler',
    text: 'Kampanyalar ve müşteri kazanımı için hedef odaklı sayfalar.',
    value: 'Tek hedef, tek eylem. Her bölüm ziyaretçiyi aynı noktaya taşıyor: talep, rezervasyon ya da satın alma.',
    gets: ['Kampanya hikâyesine göre kurgu', 'Tek ve net bir eylem çağrısı', 'Hızlı yükleme, ölçüme hazır yapı'],
    includes: [
      'Kampanyanın tek hedefine göre kurulan sayfa akışı',
      'Markanın kendi görsel malzemesiyle (fotoğraf, film) sanat yönetimi',
      'Talep formu ya da WhatsApp’a giden hazır mesaj',
      'Reklam trafiği için hızlı açılan, hafif yapı',
      'İstenirse çerezsiz ziyaret ölçümü',
    ],
    proof: [{ slug: 'marmara-blue' }, { slug: 'mas-vip-transfer' }],
    proofLabel: 'Örnek',
    evidence: { slug: 'marmara-blue', shot: 0, label: 'Markanın kendi filmi sayfanın arkasında' },
    seo: {
      title: 'Landing Page ve Kampanya Sayfası',
      description:
        'Açılış, kampanya ya da tek bir hizmet için ziyaretçiyi tek bir eyleme taşıyan, hızlı açılan landing page ve kampanya sayfaları.',
    },
  },
  {
    id: 'yenileme',
    no: '05',
    slug: 'web-sitesi-yenileme',
    en: 'Website redesign',
    tr: 'Yeniden tasarım',
    h1: 'Web sitesi yenileme',
    short: 'Mevcut siteyi hızlı ve tutarlı hale getirme',
    for: 'Sitesi eski, yavaş ya da telefonda zor kullanılan işletmeler',
    text: 'Mevcut dijital varlığı daha tutarlı, modern ve işlevsel hale getirme.',
    value:
      'Elinizdeki içeriği, menüyü ve bilgiyi koruyarak daha tutarlı bir görsel dil, daha hızlı bir altyapı ve telefonda daha kolay bir kullanım.',
    gets: ['Mevcut içerik ve verinin korunması', 'Tutarlı yeni bir görsel dil', 'Telefonda daha hızlı ve kullanışlı'],
    includes: [
      'Mevcut sitenin içerik, hız ve mobil kullanım açısından incelenmesi',
      'Korunacak içerik, menü ve verilerin yeni siteye taşınması',
      'Yeni görsel dil ve sadeleşmiş bilgi mimarisi',
      'Eski adreslerin yeni sayfalara yönlendirilmesi',
      'Hız ve erişilebilirlik iyileştirmeleri',
    ],
    proof: [{ slug: 'la-joie', note: 'mevcut logo ve menü verisi korunarak' }],
    proofLabel: 'İlgili',
    evidence: { slug: 'la-joie', shot: 4, label: 'Mevcut menü verisi yeni tasarımda canlı okunuyor' },
    seo: {
      title: 'Web Sitesi Yenileme',
      description:
        'Mevcut içeriğinizi, menünüzü ve bilgilerinizi koruyarak sitenizi daha hızlı, tutarlı ve telefonda kolay kullanılan hale getiriyoruz.',
    },
  },
];

export const getService = (id: ServiceId) => services.find((s) => s.id === id)!;
export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/** Form chip values: the five services plus an honest "not sure". */
export const formTypes = [...services.map((s) => s.tr), 'Henüz emin değilim'];

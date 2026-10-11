/**
 * Frequently asked questions. Answers describe how the studio works; they never
 * quote prices, durations or results that depend on a project's scope.
 * `home: true` puts a question on the home page; all of them live on /sss/.
 */

export interface Faq {
  q: string;
  /** Plain text paragraphs. Links are written as [label](/path/). */
  a: string[];
  group: 'Fiyat ve süre' | 'Süreç' | 'Teknik' | 'Sonrası';
  home?: boolean;
}

export const faqs: Faq[] = [
  {
    group: 'Fiyat ve süre',
    home: true,
    q: 'Bir web sitesi ne kadara mal olur?',
    a: [
      'Sabit bir paket fiyatımız yok, çünkü şablon satmıyoruz. Fiyatı belirleyen şeyler belli: sayfa ve bölüm sayısı, rezervasyon, e-ticaret ya da çok dil gibi özel geliştirmeler ve içeriğin ne kadarının hazır olduğu.',
      'Kısa bir görüşmeden sonra kapsamı, takvimi ve ödeme planını içeren yazılı bir teklif gönderiyoruz. Teklif sizin onayınız olmadan bağlayıcı değildir.',
    ],
  },
  {
    group: 'Fiyat ve süre',
    home: true,
    q: 'Site ne kadar sürede hazır olur?',
    a: [
      'Kapsama bağlı. Tek sayfalık bir kampanya sayfasıyla ödeme ve yönetim paneli olan bir e-ticaret sitesi aynı sürede bitmez. Takvim, teklifle birlikte yazılı olarak verilir.',
      'Süreyi en çok belirleyen şey içerik: metinler, fotoğraflar, menü ya da ürün bilgisi ne kadar hazırsa site o kadar hızlı yayına girer.',
    ],
  },
  {
    group: 'Süreç',
    home: true,
    q: 'Nasıl başlıyoruz?',
    a: [
      '[Proje formunu](/teklif/) doldurun ya da WhatsApp’tan yazın. İşletmenizi, hedefinizi ve elinizdeki malzemeyi konuştuğumuz kısa bir görüşme yapıyoruz; ardından yazılı teklif geliyor.',
      'Onayınızdan sonra süreç beş adımda ilerliyor: dinlemek, üç farklı yön, sistem, inşa ve yayın. Her adımın sonunda sizin onayınız var.',
    ],
  },
  {
    group: 'Süreç',
    q: 'Neden üç farklı tasarım yönü?',
    a: [
      'Tek bir taslak, ilk aklımıza geleni gösterir. Tipografi, renk ve kompozisyon bakımından birbirinden gerçekten farklı üç yaklaşım ise markanın nerede durabileceğini görmenizi sağlar. En güçlüsünü birlikte seçiyor, oradan devam ediyoruz.',
    ],
  },
  {
    group: 'Süreç',
    home: true,
    q: 'Metinleri ve fotoğrafları kim hazırlıyor?',
    a: [
      'İşletmenizi en iyi siz tanırsınız; bilgi sizden gelir. Biz bu bilgiyi sitenin kurgusuna, başlıklarına ve metinlerine dönüştürüyoruz.',
      'Fotoğraf yoksa stok görsele başvurmuyoruz. Boğazdayız projesinde olduğu gibi site fotoğrafsız da eksiksiz çalışacak şekilde tasarlanabiliyor; çekimler geldiğinde yerlerine yerleşiyor.',
    ],
  },
  {
    group: 'Süreç',
    q: 'Farklı bir şehirdeyim. Birlikte çalışabilir miyiz?',
    a: [
      'Evet. Süreç WhatsApp, telefon ve paylaşılan bağlantılar üzerinden yürüyor. Taslakları tarayıcınızda, telefonunuzda ve bilgisayarınızda canlı olarak inceliyorsunuz.',
    ],
  },
  {
    group: 'Teknik',
    home: true,
    q: 'Site telefonda düzgün çalışır mı?',
    a: [
      'Ziyaretçilerin çoğu siteye telefondan geliyor. Bu yüzden her ekranı telefon, tablet ve masaüstü için ayrı ayrı düşünüyor; yayından önce gerçek cihaz genişliklerinde test ediyoruz.',
    ],
  },
  {
    group: 'Teknik',
    q: 'Google’da çıkar mıyım?',
    a: [
      'Her projede teknik SEO temeli var: doğru başlık ve açıklamalar, yapılandırılmış veri, site haritası, hızlı açılış ve erişilebilir kod. İşletme siteleri için adres, saat ve iletişim bilgisi arama motorlarına ayrıca işaretleniyor.',
      'Sıralama garantisi vermiyoruz; kimse dürüstçe veremez. Sıralama zamanla, içerikle ve rekabetle oluşur.',
    ],
  },
  {
    group: 'Teknik',
    q: 'Online ödeme alabilir miyim?',
    a: [
      'Evet. E-ticaret projelerinde Shopier veya iyzico gibi Türkiye’de çalışan ödeme altyapılarıyla güvenli ödeme sayfası kuruyoruz. Kart bilgisi sizin sitenize gelmez; doğrudan ödeme kuruluşunda işlenir. [E-ticaret hizmeti](/hizmetler/e-ticaret-sitesi/)',
    ],
  },
  {
    group: 'Teknik',
    q: 'Alan adı ve barındırma kimin adına olur?',
    a: [
      'Alan adının ve barındırma hesabının sizin adınıza açılmasını öneriyoruz; böylece site her zaman sizin kalır. Kurulum ve yayına alma sürecinde yanınızdayız.',
    ],
  },
  {
    group: 'Teknik',
    q: 'Mevcut sitemi yenileyebilir misiniz?',
    a: [
      'Evet. Elinizdeki içeriği, menüyü ve bilgiyi koruyarak siteyi daha tutarlı, daha hızlı ve telefonda daha kolay kullanılır hale getiriyoruz. Eski adresler yeni sayfalara yönlendiriliyor, böylece arama motorundaki yeriniz kaybolmuyor. [Yenileme hizmeti](/hizmetler/web-sitesi-yenileme/)',
    ],
  },
  {
    group: 'Sonrası',
    q: 'Siteyi sonra kendim güncelleyebilir miyim?',
    a: [
      'Teslimde içeriğin nasıl güncelleneceğini anlatıyoruz. Menü, ürün ya da fiyat gibi sık değişen içerik için projeye uygun bir yönetim yolu kapsamda belirleniyor; e-ticaret projelerinde sipariş, ürün ve stok için yönetim paneli var.',
    ],
  },
  {
    group: 'Sonrası',
    q: 'Yayından sonra destek veriyor musunuz?',
    a: [
      'Yayından sonraki destek ve bakımın kapsamı teklifte ayrıca ve yazılı olarak belirtiliyor. Ne yapılacağı ve ne yapılmayacağı baştan belli oluyor.',
    ],
  },
  {
    group: 'Sonrası',
    q: 'KVKK ve yasal sayfalar ne olacak?',
    a: [
      'Formlar, çerezler ve e-ticaret için gereken aydınlatma, gizlilik, mesafeli satış ve iade sayfalarının yerini ve altyapısını kuruyoruz. Metinlerin içeriğini işletmenize göre bir hukuk danışmanıyla netleştirmenizi öneriyoruz.',
    ],
  },
];

export const faqGroups = ['Fiyat ve süre', 'Süreç', 'Teknik', 'Sonrası'] as const;

/** Strips the [label](/path/) markup for JSON-LD and meta text. */
export const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

/** Turns [label](/path/) into links; everything else is escaped. */
export function rich(text: string): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc(text).replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2">$1</a>');
}

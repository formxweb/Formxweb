import type { ImageMetadata } from 'astro';
import type { ServiceId } from './services';

/**
 * Selected work.
 *
 * Every image is a desktop screenshot (1440 × 900 viewport, 2× density) taken
 * from a running build of the project. Nothing is mocked up.
 *
 * liveUrl: add the public address once a project is online. The case study
 * then shows a "visit the live site" link. Left empty, the page offers a
 * WhatsApp conversation about the project instead of an external link.
 */

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/work/*/*.webp', { eager: true });
const tourFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/tour/*/*.webp', { eager: true });

function imagesIn(set: typeof files, dir: string, slug: string): ImageMetadata[] {
  return Object.keys(set)
    .filter((key) => key.includes(`/${dir}/${slug}/`))
    .sort()
    .map((key) => set[key].default);
}
const shotsFor = (slug: string) => imagesIn(files, 'work', slug);

export type Layout = 'fullbleed' | 'asymmetric' | 'filmstrip' | 'spread' | 'system' | 'poster' | 'diptych';

export interface Shot {
  src: ImageMetadata;
  alt: string;
  caption: string;
}

export interface Project {
  slug: string;
  no: string;
  name: string;
  /** Language of the brand name, so uppercase settings stay correct (SWISS, not SWİSS). */
  nameLang?: 'tr' | 'en' | 'fr';
  category: string;
  sector: string;
  year: string;
  layout: Layout;
  tagline: string;
  summary: string;
  approach: string;
  concept: string[];
  details: { title: string; text: string }[];
  scope: string[];
  stack: string[];
  type: { name: string; role: string }[];
  palette: { name: string; hex: string }[];
  /** accentInk: a darker accent for small text on light backgrounds (WCAG AA). */
  theme: { bg: string; fg: string; accent: string; accentInk?: string; dark: boolean };
  /** Services this project demonstrates (drives the work × services matrix). */
  services: ServiceId[];
  /** Who a similar site suits, in an owner's words. */
  audience: string;
  /** What the site had to solve. */
  need: string;
  /** Concrete features, in owner language. */
  features: string[];
  note?: string;
  /**
   * Publication facts, supplied by the owner. Undefined = nothing is rendered.
   * status: 'live' (public URL), 'delivered', 'concept'.
   */
  status?: 'live' | 'delivered' | 'concept';
  liveUrl?: string;
  /** Text for the live link, e.g. 'cupistan.com'. Defaults to the URL host. */
  liveLabel?: string;
  shots: Shot[];
  /** The site from top to bottom, one desktop viewport per frame (contact sheet on the case page). */
  tour: ImageMetadata[];
}

interface ProjectInput extends Omit<Project, 'shots' | 'tour'> {
  shots: { alt: string; caption: string }[];
}

const input: ProjectInput[] = [
  {
    slug: 'bogazdayiz',
    no: '01',
    name: 'Boğazdayız',
    category: 'Restoran gemisi',
    sector: 'Hospitality',
    year: '2026',
    layout: 'fullbleed',
    tagline: 'Bir sayfa değil, bir gece.',
    summary:
      'Tosun Paşa restoran gemisinin 19:30’dan 23:30’a uzanan bir Boğaz gecesi olarak kurgulanan dijital deneyimi.',
    approach:
      'Gerçek zamanlı bir WebGL Boğaz sahnesi. Kaydırdıkça gecenin saati ve rengi ilerliyor.',
    concept: [
      'Boğazdayız’ın sattığı şey bir menü değil, bir gece. Site bu yüzden sayfa sayfa değil, saat saat ilerliyor: Kabataş’ta biniş, Boğaz’a açılış, sofra, sahne ve dönüş.',
      'Bütün sahnelerin arkasında tek bir WebGL geçişi çalışıyor: suyun yüzeyi, iki yakanın ışıkları ve köprü. Açılıştaki kelimeler sudan yükseliyor ve suya yansıyor. Kaydırma konumu kamerayı, saati ve gecenin rengini birlikte yönetiyor.',
      'Markanın kendi fotoğrafları olmadığı için stok görsel kullanılmadı. Sahneler fotoğrafsız da eksiksiz çalışıyor. Çekimler geldiğinde her biri hazır olan yerine yerleşiyor.',
    ],
    details: [
      { title: 'Saat yönetmeni', text: 'Kaydırma konumu kamera, saat ve renk izlerine bağlı. Herhangi bir noktaya atlandığında doğru sahne birebir açılıyor.' },
      { title: 'Menü diyaloğu', text: '18 yemeğin tamamı tek bir kaynaktan açılıyor. Tıklanan tabak diyaloğa uçuyor; ok tuşları, Esc ve geri tuşu çalışıyor.' },
      { title: 'Gerçek rezervasyon', text: 'Form, rezervasyon hattına gidecek hazır bir WhatsApp mesajı yazıyor. Sahte bir onay ekranı göstermiyor.' },
      { title: 'Herkes için gece', text: 'Azaltılmış hareket tercihinde sabitlemeler ve kaymalar kapanıyor. Atlama bağlantısı, odak tuzağı ve görünür odak stilleri var.' },
    ],
    scope: ['Sanat yönetimi', 'Deneyim tasarımı', 'WebGL geliştirme', 'SEO ve yapılandırılmış veri'],
    stack: ['TypeScript', 'Vite', 'WebGL · GLSL', 'GSAP'],
    type: [
      { name: 'Anybody', role: 'Değişken genişlikte display' },
      { name: 'Newsreader', role: 'Editoryal metin ve italik' },
    ],
    palette: [
      { name: 'Gece', hex: '#06080D' },
      { name: 'Lacivert', hex: '#0C121C' },
      { name: 'Keten', hex: '#ECE5D8' },
      { name: 'Fener', hex: '#EC9A5E' },
    ],
    theme: { bg: '#080b12', fg: '#ece5d8', accent: '#ec9a5e', dark: true },
    services: ['ozel', 'isletme'],
    audience: "Restoran, mekân ve etkinlik işletmeleri",
    need: "Bir restoran gemisi bir menü değil, bir gece satar. Sitenin de o geceyi ilk saniyeden hissettirmesi ve rezervasyona götürmesi gerekiyordu.",
    features: ["Saat saat ilerleyen gece akışı: 19:30 → 23:30", "18 yemeğin tamamı için açılan menü diyaloğu", "Rezervasyon hattına hazır WhatsApp mesajı", "Restoran ve menü için yapılandırılmış veri", "Azaltılmış hareket desteği ve klavye erişimi"],
    shots: [
      { alt: 'Boğazdayız açılış ekranı: gece Boğaz’ında sudan yükselen BOĞAZ DAYIZ kelimeleri ve sudaki yansımaları.', caption: 'Açılış — kelimeler sudan yükseliyor' },
      { alt: 'Program sahnesi: “İki kıta arasında, üç saat.” başlığı, büyük 20:30 saati ve dikey zaman çizelgesi.', caption: 'Akış — saat kaydırmayla ilerliyor' },
      { alt: 'Işıkları yanan Tosun Paşa restoran gemisi, gece Boğaz’da suya yansıyor.', caption: 'İskele — “Işıklar yanık, masa hazır.”' },
      { alt: 'Keten zemin üzerinde başlangıç ve mezeler menüsü; her yemek bir tabak üzerinde.', caption: 'Sofra — menü keten üzerinde' },
      { alt: 'Sahne bölümü: dönen semazen yazısı ve gecenin programı listesi.', caption: 'Sahne — yalnızca semazen dönüyor' },
      { alt: 'Kapanış: köprünün önünde BOĞAZDAYIZ yazısı ve “Gece biter.” notu.', caption: 'Dönüş — 23:30, iki yaka birleşiyor' },
      { alt: 'Rezervasyon bölümü: “Bu gece?” başlığı ve WhatsApp’a mesaj hazırlayan form.', caption: 'Rezervasyon — WhatsApp’a hazır mesaj' },
    ],
  },
  {
    slug: 'cupistan',
    no: '02',
    name: 'CUPISTAN',
    category: 'Tatlıcı',
    sector: 'Food & dessert',
    year: '2026',
    layout: 'asymmetric',
    tagline: 'Tek hece, bütün bir dünya: KAP.',
    summary:
      'Gebze’deki tatlıcı için markanın kendi #Kapistan şakasından doğan, tek bir hece üzerine kurulu dijital dünya.',
    approach:
      'KAP hecesi hem navigasyon hem ilerleme göstergesi. Her bölüm bir kap tatlının bir katmanı.',
    concept: [
      'Marka Instagram’da kendini zaten iki dilde söylüyor: Cup bi mutluluk, Kap bi mutluluk. Türkçede KAP hem içine bir şey konan şey hem de “yakala” demek. Site bu heceyi bir sisteme dönüştürüyor.',
      'Açılışta CUPİSTAN, KAPİSTAN’a dönüşüyor. KAP hecesi köşeye uçup sitenin omurgası oluyor ve kaydırdıkça eki değişiyor: KAPAK, KAP, KAPRİS, KAPIŞ KAPIŞ, KAPAK OLSUN, KAPI, KAP!',
      'Bölümler üst üste dizilmiş bloklar değil; bir kap tatlının katmanları gibi birbirine geçiyor: krema dalgası, sos damlası, kırıntı. Maskot dükkânın gerçek saatiyle yaşıyor; iki şube de kapalıysa uyuyor.',
    ],
    details: [
      { title: 'Canlı saat', text: 'Site İstanbul saatiyle çalışıyor. Ana eylem her zaman o an açık olan şubeye gidiyor.' },
      { title: 'Krema etkileşimi', text: 'Tıklanan her şey bir kaşık krema gibi önce eziliyor, sonra geri geliyor. Hiçbir şey sıradan bir fade-up ile gelmiyor.' },
      { title: 'Renk markadan', text: 'Palet, markanın kendi gönderilerinden ve maskotundan ölçüldü: krema, çilek, adaçayı, kara tahta.' },
      { title: 'Derlemesiz yayın', text: 'Saf HTML, CSS ve JavaScript. Herhangi bir statik sunucuya doğrudan yükleniyor.' },
    ],
    scope: ['Konsept', 'Sanat yönetimi', 'Etkileşim tasarımı', 'Geliştirme'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Statik yayın'],
    type: [
      { name: 'Coiny', role: 'KAP omurgası ve bölüm kelimeleri' },
      { name: 'Fraunces SOFT', role: 'Ürün adları ve editoryal cümleler' },
      { name: 'DM Mono', role: 'Saat, fiyat ve adres' },
    ],
    palette: [
      { name: 'Krema', hex: '#F8E8D6' },
      { name: 'Çilek', hex: '#E9555A' },
      { name: 'Bitter', hex: '#3A2A22' },
      { name: 'Adaçayı', hex: '#929876' },
      { name: 'Kara tahta', hex: '#2F4338' },
      { name: 'Limon', hex: '#F2C95C' },
    ],
    theme: { bg: '#f6e6d3', fg: '#3a2a22', accent: '#d8434a', accentInk: '#b52a33', dark: false },
    services: ['ozel', 'isletme'],
    audience: "Tatlıcı, pastane ya da kafe",
    need: "İki şubeli bir tatlıcının sitesi hem markanın neşesini taşımalı hem de “şu an hangi şube açık, nasıl giderim?” sorusunu hemen yanıtlamalıydı.",
    features: ["Ana düğme o an açık olan şubeye gidiyor", "Her şube için tek dokunuşla yol tarifi", "Ürünler kendi kaplarının silüetinde", "Özel gün pastası için doğrudan mesaj çağrısı", "Derleme gerektirmeyen statik yayın"],
    shots: [
      { alt: 'CUPISTAN açılışı: krema taçlı kap maskotu, adaçayı yeşili daire ve CUPİSTAN logosu.', caption: 'KAPAK — maskot, kabın kendisi' },
      { alt: 'Kara tahta zeminli KAPIŞ KAPIŞ bölümü: kova waffle fotoğrafı ve büyük 250₺ fiyatı.', caption: 'KAPIŞ KAPIŞ — Kova Waffle Menü' },
      { alt: 'KAPRİS bölümü: kırmızı zeminde bir tabağa düşmüş dört renkli ekler ve fiş biçiminde açıklama.', caption: 'KAPRİS — ekler tabağa düşüyor' },
      { alt: 'KAP bölümü: kap silüetinde magnolya ve dondurma fotoğrafları, ürün adları ve kısa açıklamaları.', caption: 'KAP — ürünler kabın silüetinde' },
      { alt: 'KAPAK OLSUN bölümü: şeftali zeminde pasta kutusu kapağı ve mühür biçiminde düğme.', caption: 'KAPAK OLSUN — kutu kapanıyor' },
      { alt: 'Kapanış: iki şube kapısı, çalışma saatleri ve büyük kırmızı KAP! yazısı.', caption: 'KAPI → KAP! — iki şube, gerçek saatler' },
    ],
  },
  {
    slug: 'marmara-blue',
    no: '03',
    name: 'Marmara Blue',
    nameLang: 'en',
    category: 'Tekne organizasyonu',
    sector: 'Events',
    year: '2026',
    layout: 'filmstrip',
    tagline: 'Markanın kendi filmi, durdurulmuş kareler.',
    summary:
      'Boğaz’da tekne düğünü, kurumsal etkinlik ve kahvaltı organizasyonları için markanın kendi filmi etrafında kurulan kampanya sitesi.',
    approach:
      'Film hiç durmuyor. Kelimeler köprüler gibi ekranı boydan boya geçiyor, kareler sütun gibi dikiliyor.',
    concept: [
      'Marmara Blue’nun tek görsel kaynağı kendi filmi. Stok fotoğrafla süslemek yerine, bir kurgucunun makarayı durdurması gibi filmin karelerini tuttuk: büyüttük, kırptık, not düştük.',
      'Film sayfanın arkasında sabit duruyor ve hiç durmuyor; sayfa onun üzerinden akıyor. Dikey çekilmiş görüntüler bir kısıt değil, mimari olarak ele alındı: kareler sütun, devasa yatay kelimeler Boğaz köprüleri gibi açıklık.',
      'Hareket yalnızca açılışta, bir kez oluyor. Kaydırma sadece sayfayı kaydırıyor. Etkileşim tıklamayla geliyor ve her zaman geri alınabiliyor.',
    ],
    details: [
      { title: 'Tek aile, iki yön', text: 'Archivo’nun genişlik ekseni: %62 genişlikte dikilen sütun kelimeler, %125 genişlikte ekranı geçen açıklıklar.' },
      { title: 'Boğaz çizgisi', text: 'Avrupa ile Asya’yı ayıran tek bir şampanya rengi kıl çizgi. Bölünmede, filo kataloğunda ve kapanışta tekrar ediyor.' },
      { title: 'Ölçülmüş bilgi', text: 'Filo bilgileri pazarlama diliyle değil, bir mimarın ölçü çizimi gibi küçük notlarla veriliyor. Yalnızca doğrulanmış bilgi.' },
      { title: 'Tek dosyada site', text: 'İstenirse site; film, yazı tipleri ve görsellerle birlikte tek bir HTML dosyası olarak da derlenebiliyor.' },
    ],
    scope: ['Sanat yönetimi', 'Kampanya sitesi', 'Hareket tasarımı', 'Geliştirme'],
    stack: ['Vite', 'JavaScript', 'HTML5 video', 'CSP güvenlik başlıkları'],
    type: [
      { name: 'Archivo', role: 'Genişlik ekseniyle display ve metin' },
      { name: 'Bodoni Moda Italic', role: 'Bölüm başına tek duygu kelimesi' },
      { name: 'DM Mono', role: 'Meta ve notlar' },
    ],
    palette: [
      { name: 'Abyss', hex: '#05080F' },
      { name: 'Midnight', hex: '#0A1628' },
      { name: 'Navy', hex: '#0E2341' },
      { name: 'Ivory', hex: '#EFE7D8' },
      { name: 'Champagne', hex: '#BFA779' },
    ],
    theme: { bg: '#0a1628', fg: '#efe7d8', accent: '#bfa779', dark: true },
    services: ['ozel', 'landing'],
    audience: "Tekne, etkinlik ve organizasyon işletmeleri",
    need: "Bir tekne organizasyon markasının en güçlü malzemesi kendi filmi. Site bu filmi stok görselle sulandırmadan etkinlik talebi toplamalıydı.",
    features: ["Sayfanın arkasında hiç durmayan marka filmi", "Düğün, kurumsal, özel davet ve kahvaltı sahneleri", "Filmi ilgili andan oynatan “view moment” bağlantıları", "Etkinlik talep formu ve WhatsApp", "İstenirse tek dosyalık site sürümü"],
    shots: [
      { alt: 'Marmara Blue açılışı: Boğaz’da ilerleyen tekne filmi üzerinde MARMARA ve dev BLUE kelimeleri.', caption: 'Açılış — film sayfanın arkasında' },
      { alt: 'WEDDINGS bölümü: teknede kollarını açmış gelin, kırmızı halı ve dev WEDDINGS kelimesi.', caption: 'Düğün — sütun kare' },
      { alt: 'CORPORATE bölümü: gece teknesinde kurumsal etkinlik fotoğrafları ve dikey CORPORATE kelimesi.', caption: 'Kurumsal — gece diptiği' },
      { alt: 'Krem zeminde Brunch bölümü: büyük italik Brunch kelimesi, köprü fotoğrafı ve kahvaltı menüsü.', caption: 'Kahvaltı — sabah manifestosu' },
      { alt: 'Moments bölümü: ışık masası üzerinde dağınık film kareleri ve dikey MOMENTS kelimesi.', caption: 'Anlar — ışık masası' },
      { alt: 'Kapanış: film üzerinde LET’S go. yazısı ve etkinlik talebi, WhatsApp, iletişim bağlantıları.', caption: 'Kapanış — doğrudan film üzerinde' },
    ],
  },
  {
    slug: 'la-joie',
    no: '04',
    name: 'La Joie',
    nameLang: 'fr',
    category: 'Kafe ve mutfak',
    sector: 'Café',
    year: '2026',
    layout: 'spread',
    tagline: 'Bir nokta, bütün bir marka.',
    summary:
      'Mersin’deki La Joie Kitchen & Coffee için logodaki altın noktadan doğan, canlı menü fiyatlarıyla çalışan editoryal marka sitesi.',
    approach:
      'Logodaki altın nokta sitenin tek vurgusu: başlıkların noktalaması, günün güneşi, menünün imleci.',
    concept: [
      'La Joie Fransızcada neşe demek. Logodaki i harfinin üstündeki altın nokta ve gülümseme sitenin tek vurgusu oldu. Renkler doğrudan logodan geliyor: koyu yeşil, kağıt kreması ve yalnızca bu nokta için kullanılan altın.',
      'Nokta her bölüm başlığının sonunda noktalama işareti. Kapakta masthead’in üstüne düşüyor, “Gün” bölümünde 09:00’dan 22:00’ye güneş gibi yol alıyor, menüde seçili kategoriyi işaretliyor.',
      'Sitede uydurma bilgi yok. Adres, saatler, menü ve fiyatlar işletmenin mevcut menü uygulamasından geliyor. Fiyatlar sayfa açıldığında canlı olarak okunuyor; tükenen ürün işaretleniyor.',
    ],
    details: [
      { title: 'Canlı menü', text: 'Fiyat değişirse sayfadaki fiyat da değişiyor, menüden kaldırılan ürün gizleniyor. Bağlantı kurulamazsa son senkronizasyon görünüyor.' },
      { title: 'Natürmort masa', text: '“Masa” bölümü, arka planı temizlenmiş ürün kesimleriyle kurulan bir natürmort: önce kahve, sonra tatlı, bir çay daha.' },
      { title: 'Logo restorasyonu', text: 'Bitmap’ten otomatik çizilmiş orijinal logo, harf formları korunarak yumuşatıldı. Büyük boyutta da temiz.' },
      { title: 'Statik ve hızlı', text: 'Astro ile üretilen statik site. Herhangi bir barındırmada çalışıyor.' },
    ],
    scope: ['Marka sitesi', 'Sanat yönetimi', 'Menü entegrasyonu', 'Geliştirme'],
    stack: ['Astro', 'JavaScript', 'Canlı menü verisi', 'Görsel işleme'],
    type: [
      { name: 'Fraunces', role: 'Başlıklar ve italik vurgular' },
      { name: 'Jost', role: 'Metin ve arayüz' },
    ],
    palette: [
      { name: 'Yeşil', hex: '#173F32' },
      { name: 'Krem', hex: '#F7F0E2' },
      { name: 'Altın', hex: '#C6A15B' },
    ],
    theme: { bg: '#f4ecdc', fg: '#173f32', accent: '#b08a40', accentInk: '#7d5f24', dark: false },
    services: ['ozel', 'isletme'],
    audience: "Kafe, restoran ve fırın",
    need: "Menüsü zaten bir menü uygulamasında yaşayan bir kafe için site, o bilgiyi yeniden yazmadan markayı anlatmalıydı.",
    features: ["Menü fiyatları menü uygulamasından canlı okunuyor", "Tükenen ürün işaretleniyor, kaldırılan ürün gizleniyor", "Ön sipariş bağlantısı, ödeme kasada", "Gün boyunca menüyü anlatan “La Joie’de bir gün” bölümü", "Restore edilmiş, büyük boyutta da temiz logo"],
    shots: [
      { alt: 'La Joie kapağı: krem zeminde büyük yeşil La Joie yazısı, i harfinin üstünde altın nokta ve latte fincanı.', caption: 'Kapak — nokta masthead’e düşüyor' },
      { alt: 'Koyu yeşil zeminde “la joie [la ʒwa] · isim · Fransızca — Neşe.” sözlük maddesi ve kahve fincanı.', caption: 'Sözlük — neşe' },
      { alt: '“Önce kahve. Sonra tatlı. Bir çay daha.” başlıkları; masada espresso, tatlı ve çay kesimleri.', caption: 'Masa — ürünlerle kurulan natürmort' },
      { alt: 'Koyu yeşil zeminde büyük Kitchen kelimesi ve makarna tabağı.', caption: 'Mutfak' },
      { alt: 'Menü bölümü: büyük Menü başlığı, kategori listesi ve Kahve & İçecekler bölümü.', caption: 'Menü — fiyatlar canlı okunuyor' },
      { alt: '“La Joie’de bir gün” bölümü: güneş gibi ilerleyen altın nokta, 11:30 saati ve öğle ürünleri.', caption: 'Gün — nokta güneş gibi yol alıyor' },
    ],
  },
  {
    slug: 'motorcu-chopper',
    no: '05',
    name: 'Motorcu Chopper',
    category: 'Motorcu yeleği ve arma',
    sector: 'E-commerce',
    year: '2026',
    layout: 'system',
    tagline: 'Vitrinden kargo takibine, tek sistem.',
    summary:
      'Motorcu yeleği, kulüp yeleği ve kişiye özel arma satan mağaza için ödeme, sipariş takibi ve yönetim paneliyle eksiksiz e-ticaret sistemi.',
    approach:
      'Atölye karakteri taşıyan koyu, pirinç vurgulu bir vitrin. Arkasında siparişten iadeye kadar işleyen bir yönetim paneli.',
    concept: [
      'Bir motorcu mağazasının ihtiyacı katalog değil, satış yapan bir sistemdi. Ürünler renk ve bedene göre stok ve fiyat taşıyor. Kişiye özel ürünlerde müşteri rocker ya da isim yazısını kendisi yazıyor; yazı sipariş ekranında aynen görünüyor.',
      'Kartla ödeme Shopier veya iyzico’nun güvenli ödeme sayfasıyla alınıyor; kart bilgisi siteye hiç gelmiyor. Müşteri siparişini Alındı → Hazırlanıyor → Kargoda → Teslim edildi adımlarıyla izliyor.',
      'Yönetim panelinde günlük satış, kargolanacak siparişler, azalan stok, iade talepleri ve kurulum kontrol listesi tek ekranda. Telefonla çekilen ürün fotoğrafları otomatik küçültülüyor.',
    ],
    details: [
      { title: 'Kişiselleştirme', text: 'Rocker yazısı, isim ve yazı tipi ürün sayfasında seçiliyor ve siparişe aynen taşınıyor.' },
      { title: 'Yasal altyapı', text: 'Ön bilgilendirme, mesafeli satış sözleşmesi, KVKK ve iade sayfaları. Sözleşme her siparişte o anki hâliyle kaydediliyor.' },
      { title: 'Otomatik e-postalar', text: 'Sipariş onayı, kargo, teslim, iptal ve iade bildirimleri. Satıcıya yeni sipariş ve talep uyarısı.' },
      { title: 'Hızlı kurulum', text: 'Vercel ve Postgres üzerinde birkaç dakikada yayına çıkan altyapı. Kategoriler ve yönetim paneli hazır geliyor.' },
    ],
    scope: ['E-ticaret tasarımı', 'Yönetim paneli', 'Ödeme entegrasyonu', 'Geliştirme'],
    stack: ['Next.js', 'PostgreSQL', 'Drizzle ORM', 'Shopier · iyzico'],
    type: [
      { name: 'Big Shoulders Display', role: 'Başlıklar' },
      { name: 'Pirata One', role: 'Logo ve rozet' },
      { name: 'Archivo', role: 'Metin ve arayüz' },
    ],
    palette: [
      { name: 'Deri', hex: '#17110E' },
      { name: 'Yüzey', hex: '#201814' },
      { name: 'Pirinç', hex: '#D4AD5F' },
      { name: 'Dikiş', hex: '#8A6D4C' },
      { name: 'Krem', hex: '#F1E8DC' },
    ],
    theme: { bg: '#17110e', fg: '#f1e8dc', accent: '#d4ad5f', dark: true },
    services: ['eticaret'],
    audience: "Butik, atölye ve ürün satan markalar",
    need: "Bir motorcu mağazasının ihtiyacı katalog değil, satış yapan bir sistemdi: ödeme, stok, kişiye özel ürün ve sipariş takibi.",
    features: ["Shopier veya iyzico ile kartla ödeme", "Renk ve bedene göre stok ve fiyat", "Müşterinin kendi yazısıyla kişiye özel ürün", "Alındı → Kargoda → Teslim edildi sipariş takibi", "Yönetim paneli ve otomatik e-postalar", "Mesafeli satış, KVKK ve iade sayfaları"],
    note: 'Ekran görüntüleri, mağazanın örnek ürün verisiyle çalışan sürümünden alınmıştır.',
    shots: [
      { alt: 'Motorcu Chopper ana sayfası: “Kulüp yeleği, deri yelek ve sırt arması” başlığı ve armalı deri yelek.', caption: 'Vitrin' },
      { alt: 'Tüm ürünler sayfası: kategori, renk ve beden filtreleri, yelek ürün kartları ve fiyatlar.', caption: 'Katalog — filtre ve sıralama' },
      { alt: 'Kişiye Özel Rocker Seti ürün sayfası: renk, yazı tipi, üst ve alt rocker yazısı alanları.', caption: 'Kişiselleştirme — müşteri yazısını yazıyor' },
      { alt: 'Yönetim paneli ürünler listesi: kategori, fiyat, stok ve satış durumu.', caption: 'Yönetim paneli — ürün ve stok' },
      { alt: 'Klasik Deri Yelek ürün sayfası: renk ve beden seçimi, beden tablosu bağlantısı.', caption: 'Ürün — renk ve bedene göre stok' },
      { alt: 'Yönetim paneli özeti: günlük satış, kargolanacak siparişler, kurulum kontrol listesi ve azalan stok.', caption: 'Yönetim paneli — günlük özet' },
    ],
  },
  {
    slug: 'swiss-fit-club',
    no: '06',
    name: 'Swiss Fit Club',
    nameLang: 'en',
    category: 'Spor salonu',
    sector: 'Fitness',
    year: '2026',
    layout: 'poster',
    tagline: 'İlk ekranda atmosfer, her adımda tek eylem.',
    summary:
      'Beylikdüzü’ndeki Swiss Fit Club için kulübün atmosferini taşıyan ve tüm talepleri hazır mesajla WhatsApp’a yönlendiren tanıtım sitesi.',
    approach:
      'Kırmızı ışık altında siyah salon. Kütüphanesiz bir WebGL hero ve her bölümde aynı çağrı: ücretsiz deneme dersi.',
    concept: [
      'Bir spor salonu sitesinin işi, ziyaretçiyi ilk derse getirmek. Site bu yüzden kulübün atmosferini ilk ekranda hissettiriyor ve her adımda tek bir eyleme çağırıyor: ücretsiz deneme dersi.',
      'Dersler, saatler, üyelik ve sık sorulan sorular tek sayfada. İletişim formu ve tüm “bilgi al” düğmeleri hazır bir mesajla WhatsApp’a gidiyor. Sunucu gerektirmiyor.',
    ],
    details: [
      { title: 'WebGL hero', text: 'Kütüphane kullanmadan yazılmış bir WebGL efekti ilk ekrana derinlik veriyor.' },
      { title: 'Canlı saatler', text: 'Çalışma saatleri tablosu o anki günü ve saati işaretliyor; salonun açık olup olmadığı ilk bakışta görünüyor.' },
      { title: 'Yerel SEO', text: 'JSON-LD işletme verisi, harita ve çalışma saatleri arama motorlarına hazır.' },
      { title: 'Kolay güncelleme', text: 'Saatler, üyelik açıklamaları ve WhatsApp numarası tek dosyalardan değişiyor.' },
    ],
    scope: ['İşletme sitesi', 'Arayüz tasarımı', 'Geliştirme', 'Yerel SEO'],
    stack: ['Vite', 'GSAP', 'Lenis', 'WebGL'],
    type: [
      { name: 'Archivo', role: 'Başlıklar' },
      { name: 'Michroma', role: 'Teknik etiketler' },
      { name: 'Manrope', role: 'Metin' },
    ],
    palette: [
      { name: 'Siyah', hex: '#060606' },
      { name: 'Yüzey', hex: '#111113' },
      { name: 'Kırmızı', hex: '#E60000' },
      { name: 'Sıcak kırmızı', hex: '#FF2B2B' },
      { name: 'Beyaz', hex: '#F5F4F2' },
    ],
    theme: { bg: '#e8e4da', fg: '#121211', accent: '#e60000', accentInk: '#b00000', dark: false },
    services: ['isletme'],
    audience: "Spor salonu, stüdyo ve yerel hizmet işletmeleri",
    need: "Bir spor salonu sitesinin işi, ziyaretçiyi ilk derse getirmek. Her bölüm aynı eyleme çağırmalıydı.",
    features: ["Her bölümde ücretsiz deneme dersi çağrısı", "“Şu an açık mı?” gösteren çalışma saatleri", "Tüm talepler hazır mesajla WhatsApp’a", "Dersler, üyelik ve sık sorulan sorular tek sayfada", "Harita ve saatlerle yerel SEO"],
    shots: [
      { alt: 'Swiss Fit Club açılışı: kırmızı ışıklı karanlık salon önünde GÜCÜNÜ KEŞFET başlığı ve deneme dersi düğmesi.', caption: 'Açılış — GÜCÜNÜ KEŞFET' },
      { alt: '“Farkı hisset.” bölümü: kırmızı ışıklı salon fotoğrafı ve modern ekipman, profesyonel eğitmen kartları.', caption: 'Neden Swiss Fit — farkı hisset' },
      { alt: '“Her şey tek çatı altında.” bölümü: kişisel antrenör fotoğrafı ve hizmet kartları.', caption: 'Hizmetler — tek çatı altında' },
      { alt: 'Çalışma saatleri: salonun o anki durumu ve günlere göre saat çizelgesi.', caption: 'Saatler — şu an açık mı?' },
      { alt: 'Üyelik bölümü: “Hedefine uygun planı seç.” başlığı ve yıllık üyelik kartı.', caption: 'Üyelik — önce dene' },
      { alt: 'Grup dersleri: “Birlikte daha güçlü.” başlığı, ders filtreleri ve HIIT, Pilates listesi.', caption: 'Dersler — birlikte daha güçlü' },
    ],
  },
  {
    slug: 'mas-vip-transfer',
    no: '07',
    name: 'MAS VIP Transfer',
    nameLang: 'en',
    category: 'Şoförlü özel transfer',
    sector: 'Mobility',
    year: '2026',
    layout: 'diptych',
    tagline: 'A’dan B’ye tek bir yolculuk.',
    summary:
      'Havalimanı, özel, kurumsal, etkinlik ve şehirler arası transferler için A’dan B’ye bir yolculuk olarak kurgulanan, Türkçe ve İngilizce çalışan tek sayfalık site.',
    approach:
      'Sayfanın kendisi bir rota: üstteki A → B çizgisi kaydırdıkça ilerliyor, her bölüm bir durak.',
    concept: [
      'Bir transfer firmasının sattığı şey araç değil, kapıdan kapıya kesintisiz bir yolculuk. Site bu yüzden A’dan B’ye bir rota olarak kuruldu: Kalkış, Rota, Filo, Hizmet, Hassasiyet, Rezervasyon ve Varış.',
      'Üst bardaki ince rota çizgisi okumanın nerede olduğunu gösteriyor. Açılıştaki gece yolu tek bir 2D canvas ile çiziliyor; araçlar fotoğraf yerine teknik çizgilerle sunuluyor.',
      'Rezervasyon formu talebi WhatsApp’ta gönderilmeye hazır bir mesaja çeviriyor ve dürüst konuşuyor: mesaj gönderilip yanıt alınana kadar hiçbir şeyin rezerve edilmediğini açıkça söylüyor.',
    ],
    details: [
      { title: 'İki dil, tek dosya', text: 'Türkçe ve İngilizce metinlerin tamamı aynı sayfada. Dil, ziyaretçinin tarayıcısına göre seçiliyor ve tek dokunuşla değişiyor.' },
      { title: 'Rota çizgisi', text: 'Üst bardaki A → B çizgisi yedi durağı işaretliyor ve kaydırdıkça ilerliyor; navigasyon ve ilerleme aynı çizgide.' },
      { title: 'Dürüst rezervasyon', text: 'Form bir ödeme ya da sahte onay ekranı değil. Talep WhatsApp’ta hazır açılıyor; açılmazsa mesaj kopyalanıp Instagram’dan gönderilebiliyor.' },
      { title: 'Derlemesiz yayın', text: 'Bütün site tek bir HTML dosyası. Derleme adımı olmadan her sunucuda çalışıyor.' },
    ],
    scope: ['Konsept', 'Sanat yönetimi', 'İki dilli içerik', 'Geliştirme'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas 2D'],
    type: [
      { name: 'Archivo', role: 'Genişlik ekseniyle display ve metin' },
      { name: 'Martian Mono', role: 'Rota etiketleri, saat ve teknik bilgi' },
    ],
    palette: [
      { name: 'Obsidian', hex: '#0A0B0D' },
      { name: 'Graphite', hex: '#131518' },
      { name: 'Bone', hex: '#ECE9E3' },
      { name: 'Metal', hex: '#8F949B' },
      { name: 'Signal', hex: '#EE7A68' },
      { name: 'Xenon', hex: '#BFD2E2' },
    ],
    theme: { bg: '#0b0c0e', fg: '#ece9e3', accent: '#ee7a68', dark: true },
    services: ['ozel', 'isletme', 'landing'],
    audience: "Transfer, turizm ve rezervasyonla çalışan işletmeler",
    need: "Şoförlü transfer satan bir işletme için site, yolculuğun kendisini anlatmalı ve talebi tek bir mesajda toplamalıydı.",
    features: ["Türkçe ve İngilizce; dil tarayıcıya göre seçiliyor", "A → B rota çizgisiyle ilerleyen tek sayfa", "Nereden, nereye, tarih, yolcu ve araç seçen rezervasyon formu", "Talebi WhatsApp’ta hazır açan dürüst gönderim", "Derleme gerektirmeyen tek HTML dosyası"],
    shots: [
      { alt: 'MAS VIP Transfer Türkçe açılışı: gece yolunda arka lambaları yanan araç, üstte FARKLA, altta VARIN. yazısı.', caption: 'TR — FARKLA VARIN.' },
      { alt: 'Aynı açılışın İngilizce hali: ARRIVE DIFFERENT. başlığı ve A Departure, Destination B rota çizgisi.', caption: 'EN — ARRIVE DIFFERENT.' },
      { alt: 'Kalkış bölümü: “Her yolculuğun başlamadan önce bir anı vardır.” başlığı, yerel saat ve rota alanları.', caption: '01 Kalkış — yolculuktan önceki an' },
      { alt: 'Filo bölümü: VIP Van aracının teknik çizgi çizimi, kapasite bilgileri ve kabin seçimi.', caption: '03 Filo — araç, çizgiyle' },
      { alt: 'Hizmet bölümü: Havalimanı, Özel, Kurumsal, Etkinlik ve Şehirler Arası listesi, seçili hizmetin görseli.', caption: '04 Hizmet — beş tür yolculuk' },
      { alt: 'Hassasiyet bölümü: açık zeminde ZAMAN, ROTA, VARIŞ, KONFOR, ÖZEN kelimeleri ve “Lüks, fazlalık değildir.” cümlesi.', caption: '05 Hassasiyet — lüks, fazlalık değildir' },
      { alt: 'Rezervasyon formu: nereden, nereye, tarih, saat, yolcu sayısı ve araç seçimi.', caption: '06 Rezervasyon — WhatsApp’a hazır talep' },
      { alt: 'Varış bölümü: “Sıradaki varış noktanız neresi?” kapanışı ve yolculuk planla bağlantısı.', caption: '07 Varış — sıradaki durak' },
    ],
  },
];

export const projects: Project[] = input.map((p) => {
  const images = shotsFor(p.slug);
  if (images.length < p.shots.length) {
    throw new Error(`Project "${p.slug}" lists ${p.shots.length} shots but has ${images.length} images.`);
  }
  return { ...p, shots: p.shots.map((s, i) => ({ ...s, src: images[i] })), tour: imagesIn(tourFiles, 'tour', p.slug) };
});

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

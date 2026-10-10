# VERYAXZ STUDIO® — Digital flagship

**Your brand. A different presence.**
VERYAXZ STUDIO'nun web tasarım ve geliştirme hizmetlerini satan dijital flagship sitesi.

## Konsept: X / Y / Z

Stüdyonun adı üç ekseni zaten içinde taşıyor: VER**Y**A**XZ**. Site bunu bir tasarım sistemine dönüştürüyor.

| Eksen | Disiplin | Sitedeki karşılığı |
| --- | --- | --- |
| **X** | Strateji | Yatay okunan akışlar, cetveller, geniş (%125) tipografi |
| **Y** | Tasarım | Dikey ritim, dar (%75) "dikilen" kelimeler |
| **Z** | Geliştirme | Derinlik: "PRESENCE." ve "DIFFERENT." kelimelerindeki katman izleri |
| **P** | Markanız | Üç eksenin kesiştiği tek nokta |

Kurulan üç sanat yönetimi yaklaşımından (editoryal gazete, karanlık oda / kontak baskı, eksen sistemi) markanın kendi adından çıktığı için eksen sistemi seçildi.

- **Tipografi:** Hubot Sans (genişlik ekseni %75–125, display), Mona Sans (metin), Spectral ExtraLight Italic (bölüm başına tek duygu cümlesi), Fragment Mono (etiketler ve koordinatlar).
- **Renk:** kemik kağıt `#E8E4DA`, karbon mürekkep `#121211`, tek vurgu rengi eksen mavisi `#2433FF`. Mavi yalnızca eksenler, Y·X·Z harfleri, ana eylemler ve kapanış bölümünde kullanılıyor.
- **Hareket:** tek eğri (`cubic-bezier(.2,.7,0,1)`), dört süre. Kural: her hareket tek bir eksende olur. Satırlar Y'de yükselir, çizgiler X'te çizilir, derinlik Z'de açılır. Döndürme, zıplama ya da sürekli dönen dekor yok. `prefers-reduced-motion` açıkken hareket kapanır.

### Sayfa kurgusu

1. **Act I — Identity:** Eksen cetvelleriyle çerçevelenmiş tipografik açılış ve proje dizini.
2. **Act II — Selected Work:** Her proje kendi renginde, kendi kompozisyonunda: tam genişlik (Boğazdayız), asimetrik (CUPISTAN), film şeridi ve dikey isim (Marmara Blue), dergi açılımı (La Joie), X ekseninde satış akışı (Motorcu Chopper), poster (Swiss Fit Club). Sonunda imleci yalnızca Y ekseninde takip eden önizlemeli bir dizin var.
3. **Act III — Capabilities:** Beş hizmet; her birinin başlık genişliği, yerleşimi ve çizimi kendi amacına göre.
4. **Act IV — Approach:** X·Y·Z modeli, beş adımlık süreç ve ilkeler.
5. **Act V — Let's build:** Mavi kapanış, doğrudan kanallar ve teklif formu.

Her proje için `/work/<slug>/` adresinde bir vaka çalışması sayfası var: konsept, ekran görüntüleri, tipografi ve renk sistemi, detaylar ve iletişim çağrısı.

## Komutlar

Node.js 22.12 veya üstü gerekir.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # tip kontrolü + üretim derlemesi → dist/
npm run preview    # dist/ klasörünü yerelde sunar
```

İlk derleme ekran görüntülerinin AVIF/WebP sürümlerini ürettiği için birkaç dakika sürer. Sonraki derlemeler önbellekten birkaç saniyede biter.

## İçerik ve ayarlar

| Ne | Nerede |
| --- | --- |
| WhatsApp, telefon, Instagram, e-posta | `src/data/site.ts` → `contact` |
| Teklif formunun gönderileceği servis | `src/data/site.ts` → `form` veya ortam değişkenleri (aşağıda) |
| Projeler, metinler, renkler, canlı site bağlantıları | `src/data/projects.ts` |
| Proje ekran görüntüleri | `src/assets/work/<slug>/01.webp`, `02.webp` … (ilk görsel kapak olur) |
| Renk, tipografi, grid ve hareket değişkenleri | `src/styles/global.css` → `:root` |
| Paylaşım görseli | `public/og.jpg` (1200×630) |

### Proje bağlantıları

Ekran görüntüleri projelerin çalışan sürümlerinden (1440×900, 2× yoğunluk) alındı. Projelerin yayındaki adresleri bu ortamdan doğrulanamadığı için `liveUrl` alanları boş bırakıldı. Bir proje yayındaysa `src/data/projects.ts` içinde ilgili projeye ekleyin:

```ts
liveUrl: 'https://ornek.com',
```

Vaka çalışması sayfasında "Canlı siteyi ziyaret et" düğmesi kendiliğinden görünür. Boşken sayfa ziyaretçiyi WhatsApp görüşmesine ve teklif formuna yönlendirir.

### Teklif formu

Form sahte bir "gönderildi" mesajı göstermez. İki çalışma biçimi var:

1. **WhatsApp (varsayılan):** Form servisi tanımlı değilse, girilen bilgiler hazır bir WhatsApp mesajına dönüşür ve `wa.me/905446552099` açılır. Mesaj, ziyaretçi WhatsApp'ta gönder tuşuna bastığında ulaşır; ekrandaki metin de bunu söyler.
2. **Form servisi:** Formspree, Web3Forms, Getform ya da kendi API'niz. Derleme sırasında tanımlayın:

```bash
PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
# Web3Forms için ayrıca:
PUBLIC_FORM_ENDPOINT=https://api.web3forms.com/submit
PUBLIC_FORM_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Başarı mesajı yalnızca servis 2xx yanıt verdiğinde görünür. Hata olursa aynı mesaj WhatsApp bağlantısıyla sunulur. Form istemci tarafında doğrulanır ve bot tuzağı (honeypot) alanı içerir.

## Yayına alma

Site tamamen statiktir; `dist/` klasörü herhangi bir statik barındırmada çalışır.

- **Vercel:** Depoyu içe aktarın. Çerçeve otomatik algılanır (`npm run build`, çıktı `dist`). `vercel.json` güvenlik başlıklarını ve `/_astro/` için uzun önbelleği ayarlar.
- **Netlify / Cloudflare Pages:** Derleme komutu `npm run build`, yayın klasörü `dist`. Başlıklar `public/_headers` dosyasından gelir.
- **cPanel / Hostinger:** `npm run build` sonrası `dist/` içeriğini `public_html/` içine yükleyin.

Canonical, Open Graph ve site haritası adresleri için alan adınızı `SITE_URL` ile verin (örnek: `SITE_URL=https://alanadiniz.com`). Vercel ve Netlify'da tanımlanmazsa platformun üretim adresi kullanılır.

## Kalite

- **Erişilebilirlik:** axe-core (WCAG 2.1 AA + best practice) ana sayfada, altı vaka çalışmasında ve 404 sayfasında 1440 px ve 390 px genişlikte hatasız. Atlama bağlantısı, görünür odak, klavyeyle kullanılabilen menü (`<dialog>`, Esc ile kapanır), azaltılmış hareket desteği, açık renk zeminlerde AA kontrastlı vurgu renkleri.
- **Performans:** Lighthouse mobil (yavaş 4G simülasyonu, yerel derleme) ölçümleri: Performans 94–99, Erişilebilirlik 100, En iyi uygulamalar 100, SEO 100. CLS 0. Görseller AVIF + WebP ve `srcset` ile sunulur, ekran dışındakiler tembel yüklenir. Yazı tipleri yalnızca Latin ve Latin Extended alt kümeleriyle kendi sunucunuzdan gelir.
- **SEO:** Sayfa başına başlık ve açıklama, canonical, Open Graph / Twitter kartları, `ProfessionalService` ve `CreativeWork` yapılandırılmış verileri, `sitemap.xml`, `robots.txt`.
- **Bağımlılık:** Çalışma zamanında hiçbir JavaScript kütüphanesi yok. Bütün etkileşim (başlık, menü, açılışlar, saat, dizin önizlemesi, form) birkaç kilobaytlık düz TypeScript.

## Yapı

```
src/
  data/site.ts            iletişim kanalları ve form ayarı
  data/projects.ts        proje içerikleri, renkler, ekran görüntüsü açıklamaları
  layouts/Base.astro      <head>, SEO, yazı tipleri, başlık ve altbilgi
  components/             Hero, Work, Capabilities, Approach, Contact, Header, Footer…
  components/work/        altı ayrı proje kompozisyonu
  pages/index.astro       ana sayfa
  pages/work/[slug].astro vaka çalışması sayfaları
  scripts/main.ts         sayfa davranışları
  styles/global.css       tasarım sistemi
public/                   favicon, paylaşım görseli, başlık dosyaları
```

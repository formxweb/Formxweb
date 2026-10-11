# VERYAXZ STUDIO — Digital flagship

**Your brand. A different presence.**
VERYAXZ STUDIO'nun web tasarım ve geliştirme hizmetlerini satan site: 23 sayfa, tamamen statik, çalışma zamanında JavaScript kütüphanesi yok.

## Yayından önce: sahibin dolduracakları

Site, bilinmeyen hiçbir bilgiyi uydurmaz. Aşağıdaki alanlar boşken ilgili satırlar sitede hiç görünmez; dolduruldukları anda kendiliğinden yerlerine yerleşir.

| # | Ne | Nerede | Neden |
| --- | --- | --- | --- |
| 1 | **Alan adı** | `SITE_URL` ortam değişkeni | Canonical, sitemap, paylaşım kartları. Tanımsızken `npm run build` bilerek hata verir. |
| 2 | **Veri sorumlusu** (şahıs işletmesinde ad soyad, şirkette ticaret unvanı) | `src/data/site.ts` → `legal.controller` | KVKK aydınlatma metni ve künye. |
| 3 | **KVKK başvuru kanalı**: adres, e-posta ya da KEP | `legal.address`, `legal.email`, `legal.kep` | Boşken metin, başvuru adresinin telefonla istenmesini söyler. |
| 4 | MERSİS, vergi dairesi ve numarası | `legal.mersis`, `legal.taxOffice`, `legal.taxNo` | Altbilgideki künye. |
| 5 | Barındırma ve form servisi (ad, ülke) | `legal.hosting`, `legal.formProcessor` | KVKK’daki aktarım bölümü. |
| 6 | Talep saklama süresi | `legal.retention` | KVKK’daki saklama bölümü. |
| 7 | E-posta adresi | `contact.email` | İletişim, teklif sayfası, altbilgi. |
| 8 | Dönüş süresi, çalışma saatleri, şehir | `contact.responseTime`, `studio.hours`, `studio.city`, `studio.serviceArea` | Teklif sayfası, stüdyo sayfası. |
| 9 | Kurucu adı ve unvanı | `studio.founder` | Stüdyo sayfasındaki künye. |
| 10 | **Projelerin durumu ve canlı adresleri** | `src/data/projects.ts` → `status`, `liveUrl`, `liveLabel` | Vaka sayfasında "Yayında" etiketi ve "Canlı siteyi ziyaret et" düğmesi. |
| 11 | Marka tescili | `site.trademark.registered` | `true` olduğunda logodaki ® işareti görünür. Tescil yokken kullanmayın. |
| 12 | Form servisi (isteğe bağlı) | `PUBLIC_FORM_ENDPOINT` | Boşken form WhatsApp mesajı hazırlar. |
| 13 | Ziyaret ölçümü (isteğe bağlı) | `PUBLIC_ANALYTICS_DOMAIN` | Boşken hiçbir ölçüm betiği yüklenmez; gizlilik sayfası buna göre yazılır. |

Derleme sırasında künye alanları boşsa terminalde bir uyarı çıkar.

## Sayfalar

| Adres | İçerik |
| --- | --- |
| `/` | Beş bölüm: Kimlik, Seçili işler, Hizmetler, Yaklaşım, Başlayalım. Arada "Ne yapıyoruz" şeridi ve SSS. |
| `/work/` | Bütün projeler ve "hangi işte hangi hizmet" tablosu |
| `/work/<proje>/` | Vaka çalışması: kısaca, konsept, ekranlar (büyütülebilir), projenin gerçek yazı tipleriyle tipografi, renk, detaylar, sitenin baştan sona kareleri |
| `/hizmetler/`, `/hizmetler/<hizmet>/` | Beş hizmet: kimin için, neler dahil, örnek işler, süreç, sorular |
| `/teklif/` | Proje formu, doğrudan kanallar, sonraki adımlar |
| `/studyo/` | Adın içindeki üç eksen, çalışma biçimi (sizden / bizden), ilkeler, yapmadıklarımız |
| `/sss/` | Fiyat, süre, süreç ve sonrası |
| `/kvkk/`, `/gizlilik/`, `/kullanim-kosullari/` | Yasal metinler; `site.ts`'deki künyeden beslenir |
| `/tesekkurler/` | Form servisinin yönlendirdiği onay sayfası (arama motorlarına kapalı) |

## Komutlar

Node.js 22.12 veya üstü gerekir.

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # tip kontrolü + üretim derlemesi (SITE_URL gerekir)
npm run build:local  # yerel deneme derlemesi (SITE_URL olmadan)
npm run preview      # dist/ klasörünü yerelde sunar
```

İlk derleme ekran görüntülerinin AVIF/WebP sürümlerini ürettiği için birkaç dakika sürer; sonrakiler önbellekten birkaç saniyede biter.

## İçerik nerede

| Ne | Dosya |
| --- | --- |
| İletişim, künye, form, ölçüm, menü | `src/data/site.ts` |
| Hizmetler (ana sayfa, hizmet sayfaları, form seçenekleri) | `src/data/services.ts` |
| Projeler, metinler, renkler, yazı tipleri | `src/data/projects.ts` |
| Süreç adımları ve ilkeler | `src/data/process.ts` |
| Sıkça sorulan sorular | `src/data/faq.ts` |
| Proje ekran görüntüleri | `src/assets/work/<proje>/01.webp …` (ilk görsel kapak olur) |
| "Baştan sona" kareleri | `src/assets/tour/<proje>/01.webp …` |
| Vaka sayfası yazı tipi örnekleri | `src/assets/fonts/specimens/` (SIL OFL 1.1, lisans `OFL.txt`) |
| Paylaşım kartları | `public/og.jpg`, `public/og/<proje>.jpg` (1200×630) |
| Tasarım değişkenleri | `src/styles/global.css` → `:root` |

## Teklif formu

Form sahte bir "gönderildi" mesajı göstermez.

1. **WhatsApp (varsayılan):** Bilgiler hazır bir WhatsApp mesajına dönüşür. Ekran, mesajın ancak ziyaretçi WhatsApp'ta gönderdiğinde ulaşacağını açıkça söyler ve metni kopyalama seçeneği sunar.
2. **Form servisi:** POST + FormData kabul eden herhangi bir servis (Formspree, Web3Forms, Getform ya da kendi API'niz):

   ```bash
   PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
   # Web3Forms için ayrıca:
   PUBLIC_FORM_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

   Onay yalnızca servis 2xx yanıt verip hata bildirmediğinde görünür; 15 saniyede yanıt gelmezse ya da hata olursa yazılanlar kaybolmadan WhatsApp seçeneği açılır. JavaScript kapalıyken form doğrudan servise gider ve `/tesekkurler/` sayfasına yönlenir.

Ön doldurma: `/teklif/?hizmet=e-ticaret-sitesi` ya da `/teklif/?ref=cupistan&tur=Özel%20web%20sitesi`. Vaka ve hizmet sayfalarındaki düğmeler bunu kendiliğinden yapar.

## Ziyaret ölçümü

`PUBLIC_ANALYTICS_DOMAIN=alanadiniz.com` tanımlanınca Plausible uyumlu, çerezsiz betik yüklenir (kendi sunucunuz için `PUBLIC_ANALYTICS_SRC`). WhatsApp, telefon, Instagram ve teklif düğmeleri `data-event` ile olay olarak sayılır. Site çerez kullanmadığı için çerez onay penceresi yoktur.

## Yayına alma

- **Vercel:** Depoyu içe aktarın; adres `VERCEL_PROJECT_PRODUCTION_URL`'den okunur (özel alan adı için `SITE_URL` tanımlayın). Başlıklar `vercel.json`'da.
- **Netlify / Cloudflare Pages:** Derleme `npm run build`, klasör `dist`. Başlıklar `public/_headers`'ta. Cloudflare'de `SITE_URL` tanımlayın.
- **cPanel / Hostinger / paylaşımlı hosting:** `SITE_URL=https://alanadiniz.com npm run build`, ardından `dist/` içeriğini `public_html/`'e yükleyin. `.htaccess` HTTPS yönlendirmesini, 404 sayfasını, güvenlik başlıklarını ve önbelleği ayarlar.

Yayından sonra Google Search Console'a `https://alanadiniz.com/sitemap.xml` adresini ekleyin. Doğrulama için `PUBLIC_GOOGLE_SITE_VERIFICATION` / `PUBLIC_YANDEX_VERIFICATION` kullanılabilir.

## Kalite (yerel derleme, bu sürüm)

- **Erişilebilirlik:** axe-core (WCAG 2.1 AA + best practice) bütün sayfa türlerinde 1440 px ve 390 px genişlikte hatasız. Atlama bağlantısı, görünür odak, `<dialog>` menü ve görsel büyütücü (Esc ile kapanır, ok tuşları çalışır), `<details>` ile SSS, azaltılmış hareket desteği.
- **Lighthouse (mobil, yavaş 4G simülasyonu):** Performans 93–99, Erişilebilirlik 100, En iyi uygulamalar 100, SEO 100; CLS 0.
- **Düzen:** 360, 390, 768, 1024 ve 1440 px genişlikte hiçbir sayfada yatay kaydırma yok.
- **Bağlantılar:** derlenen 23 sayfadaki bütün iç bağlantılar ve çapalar çalışıyor.
- **SEO:** Türkçe sayfa başlıkları ve açıklamaları, canonical, Open Graph / Twitter kartları (sayfa başına marka kartı), tek bir `@graph` içinde Organization, WebSite, WebPage, BreadcrumbList, Service, CreativeWork ve FAQPage verileri, `sitemap.xml`, `robots.txt`.
- **JavaScript kapalıyken** bütün içerik görünür; sayfa betiği yüklenemezse 2,5 saniye sonra gizli kalan öğeler kendiliğinden açılır.

## Tasarım sistemi: X / Y / Z

Stüdyonun adı üç ekseni içinde taşıyor: VER**Y**A**XZ**. X strateji (geniş, %125 tipografi, yatay akışlar), Y tasarım (dar, %75 "dikilen" kelimeler), Z geliştirme (derinlik izleri), P ise markanızın üç eksenin kesiştiği nokta.

- **Tipografi:** Hubot Sans (genişlik ekseni %75–125), Mona Sans (metin), Spectral ExtraLight Italic (bölüm başına tek duygu cümlesi), Fragment Mono (etiketler). Hepsi kendi sunucunuzdan, yalnızca Latin + Latin Extended.
- **Renk:** kemik kağıt `#E8E4DA`, karbon mürekkep `#121211`, tek vurgu eksen mavisi `#2433FF`. Her proje kendi renkleriyle gelir.
- **Hareket:** tek eğri, dört süre; her hareket tek eksende. Sürekli dönen dekor, özel imleç, abartılı paralaks ya da bekleten açılış yok. Sayfalar arası geçiş tarayıcının kendi görünüm geçişiyle.
- **Dil:** büyük gösterim başlıkları İngilizce (markanın sesi), bütün işlevsel arayüz Türkçe.

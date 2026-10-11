/** How the studio works. Shared by the home Approach act, /studyo/ and the service pages. */

export const axes = [
  { k: 'X', name: 'Strateji', en: 'Strategy', text: 'Kime, ne için, hangi eylemle? Hedef, kitle ve dönüşüm.' },
  { k: 'Y', name: 'Tasarım', en: 'Design', text: 'Kimlik, tipografi, kompozisyon ve hareket.' },
  { k: 'Z', name: 'Geliştirme', en: 'Engineering', text: 'Hız, erişilebilirlik, arama motorları ve güvenilir altyapı.' },
];

export const steps = [
  {
    t: 'Dinlemek',
    d: 'İşletmenizi, müşterinizi ve hedefinizi anlıyoruz. Logo, fotoğraf, menü, Instagram: elinizdeki malzemeyi topluyoruz.',
    you: 'İşletmenizi anlatırsınız, elinizdeki malzemeyi paylaşırsınız.',
    out: 'Hedef, kitle ve kapsamın yazılı özeti.',
  },
  {
    t: 'Üç yön',
    d: 'Tipografi, renk, kompozisyon ve hareket bakımından birbirinden gerçekten farklı üç yaklaşım. En güçlüsünü birlikte seçiyoruz.',
    you: 'Üç yönü inceler, birini seçersiniz.',
    out: 'Seçilmiş bir sanat yönetimi.',
  },
  {
    t: 'Sistem',
    d: 'Tipografi, grid, renk ve hareket kuralları. Site büyüdükçe bozulmayan, markaya ait bir dil.',
    you: 'Ana sayfa tasarımını onaylarsınız.',
    out: 'Tüm sayfaların dayandığı tasarım sistemi.',
  },
  {
    t: 'İnşa',
    d: 'Üretim kalitesinde kod: hızlı, telefonda kusursuz, erişilebilir ve arama motorlarına hazır.',
    you: 'Çalışan siteyi kendi telefonunuzda ve bilgisayarınızda test edersiniz.',
    out: 'Yayına hazır site.',
  },
  {
    t: 'Yayın',
    d: 'Alan adı ve barındırma kurulumu, son kontroller ve içeriği nasıl güncelleyeceğinizi anlatan bir teslim.',
    you: 'Son onayı verirsiniz.',
    out: 'Yayındaki site ve teslim notları.',
  },
];

export const principles = [
  { t: 'Uydurma bilgi yok.', d: 'Fiyat, saat, adres ve menü markanın kendi kaynağından gelir. Doğrulanamayan bilgi yayına girmez.' },
  { t: 'Konsept markanın içinden çıkar.', d: 'CUPISTAN’da KAP hecesi, La Joie’de logodaki altın nokta, Marmara Blue’da markanın kendi filmi.' },
  { t: 'Gerçek kanallar.', d: 'Rezervasyon, sipariş ve teklif akışları WhatsApp’a ve gerçek ödeme altyapılarına bağlanır. Sahte onay ekranı yok.' },
  { t: 'Herkes için.', d: 'Klavyeyle gezinme, ekran okuyucu desteği ve hareket azaltma tercihine saygı. Her projede.' },
];

/** Baseline that every project ships with, whatever the service. */
export const baseline = [
  'Telefon, tablet ve masaüstü için ayrı ayrı düşünülmüş ekranlar',
  'Hızlı açılış: optimize görseller, gereksiz kod yok',
  'Başlıklar, açıklamalar, site haritası ve yapılandırılmış veri',
  'Klavye ve ekran okuyucu erişimi, hareket azaltma desteği',
  'WhatsApp, telefon ve formlar gerçek kanallara bağlı',
  'Sosyal medyada paylaşılınca doğru görünen önizleme kartları',
];

# Tarladan Tabağa

Çiftçinin ürününü daha güçlü bir satış değeriyle doğrudan vatandaşa ulaştırmayı; vatandaşın da daha taze ürünü daha kısa tedarik zinciriyle almasını hedefleyen tarım-gıda lojistiği platformu.

## Şu anda çalışan web katmanı

- Kayıtlı çiftçi / ürün / tarla konumu görünümü
- Sebze, meyve ve doğal ürün kategorileri
- Sipariş → çiftçi bildirimi → YZ operasyon planı → hasat → fotoğraf/onay → paket → drone kalkışı/ödeme → teslimat/dönüş demo akışı
- Tüketici, çiftçi, operasyon merkezi ve drone kamerası ekran senaryoları
- Resmi tarım fiyat referanslarını kullanan YZ fiyat merkezi
- Mobil ve masaüstü uyumlu arayüz

## Resmi fiyat veri katmanı

`data/prices.json` uygulamanın yayınladığı resmi fiyat anlık görüntüsüdür.

`scripts/update_prices.py` şu resmi kaynaklardan veri toplamayı dener:

- **T.C. Ticaret Bakanlığı Hal Kayıt Sistemi (HKS):** sebze/meyve hal fiyat referansları
- **TOBB Ticaret Borsaları Ürün Fiyat Bilgileri:** ticaret borsalarının ürün fiyatları

`.github/workflows/update-prices.yml` fiyat güncellemesini **3 saatte bir** çalıştıracak şekilde kuruludur. Kaynakta yeni fiyat oluşmamışsa önceki doğrulanmış kayıt korunur.

## YZ fiyat merkezi

Çiftçi satış fiyatı teklif etmez. Fiyatı operasyon merkezindeki YZ fiyat motoru oluşturur.

Aktif pilot politika `data/pricing-policy.json` dosyasındadır:

- Operasyon payı: **nihai kg fiyatının %20'si**
- Çiftçi hedef ödemesi: resmi tarım referansının **%5 üzerinde**
- Nihai tüketici fiyatı: `çiftçi_ödemesi / 0.80`
- Yetkili bir perakende tüketici referansı bağlandığında sistem, tüketici lehine fiyat hedefini ayrıca kontrol eder.
- Operasyon payı tüketici ekranında ayrı bir kalem olarak öne çıkarılmaz; muhasebe/operasyon hesabında ayrı tutulur.

Örnek: resmi tarım referansı 20 TL/kg ise çiftçi hedef ödemesi 21 TL/kg olur; nihai fiyat 26,25 TL/kg, operasyon payı 5,25 TL/kg olur.

**Not:** Buradaki %20, vergi, ödeme kuruluşu kesintisi, drone/enerji, sigorta ve diğer giderler düşülmeden önceki brüt operasyon payıdır; net kâr aynı şey değildir.

## Tüketici lehine fiyat doğrulaması

HKS/TOBB değerleri doğrudan Türkiye perakende tüketici ortalaması değildir. Bu nedenle uygulama, yetkili/izinli bir perakende fiyat kaynağı bağlanmadan “market ortalamasından kesin daha ucuz” iddiası üretmez. Perakende referansı geldiğinde YZ motoru, nihai fiyatın hedeflenen tasarruf sınırının altında kalmasını kontrol edecek şekilde hazırdır.

## Üretim sistemine geçiş için kalan gerçek entegrasyonlar

1. Çiftçi kimlik ve hesap doğrulaması
2. Çiftçinin ürün, stok ve tarla/iniş alanı kaydı
3. Kalıcı veritabanı ve gerçek sipariş altyapısı
4. Yetkili perakende tüketici fiyat veri kaynağı / API'si
5. Ödeme kuruluşu ve bekletilen ödeme / hakediş akışı
6. Drone operasyon sağlayıcısı, uçuş izinleri, rota ve telemetri API'si
7. Fotoğraf/video yükleme ve gerçek zamanlı takip altyapısı
8. KVKK, mesafeli satış, gıda ve operasyon mevzuatı kontrolleri

## Dosyalar

- `index.html` — tüketici ve operasyon deneyimi
- `styles.css` — arayüz
- `app.js` — ürün, YZ fiyat ve sipariş demo motoru
- `data/prices.json` — resmi fiyat anlık görüntüsü
- `data/pricing-policy.json` — YZ fiyat ve operasyon payı politikası
- `scripts/update_prices.py` — HKS/TOBB fiyat güncelleyici
- `scripts/apply_pricing_policy.py` — fiyat anlık görüntüsüne aktif fiyat politikasını uygular
- `.github/workflows/update-prices.yml` — otomatik fiyat güncelleme görevi

---

**Durum:** Resmi fiyat veri katmanı ve YZ fiyat motoru bağlı çalışan MVP. Gerçek satış, ödeme ve drone kontrolü için üretim entegrasyonları henüz tamamlanmamıştır.

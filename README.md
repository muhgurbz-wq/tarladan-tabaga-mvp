# Tarladan Tabağa

Çiftçinin ürününü daha güçlü bir satış değeriyle doğrudan vatandaşa ulaştırmayı; vatandaşın da daha taze ürünü daha kısa tedarik zinciriyle almasını hedefleyen tarım-gıda lojistiği platformu.

## Şu anda çalışan web katmanı

- Kayıtlı çiftçi / ürün / tarla konumu görünümü
- Sebze, meyve ve doğal ürün kategorileri
- Sipariş → çiftçi bildirimi → YZ operasyon planı → hasat → fotoğraf/onay → paket → drone kalkışı/ödeme → teslimat/dönüş demo akışı
- Tüketici, çiftçi, operasyon merkezi ve drone kamerası ekran senaryoları
- Resmi tarım fiyat referanslarını gösteren fiyat katmanı
- Mobil ve masaüstü uyumlu arayüz

## Resmi fiyat veri katmanı

`data/prices.json` uygulamanın yayınladığı fiyat anlık görüntüsüdür.

`scripts/update_prices.py` şu resmi kaynaklardan veri toplamayı dener:

- **T.C. Ticaret Bakanlığı Hal Kayıt Sistemi (HKS):** sebze/meyve ortalama hal fiyatları
- **TOBB Ticaret Borsaları Ürün Fiyat Bilgileri:** ticaret borsalarının ürün fiyatları

`.github/workflows/update-prices.yml` fiyat güncellemesini **3 saatte bir** çalıştıracak şekilde kuruludur. Kaynakta yeni fiyat oluşmamışsa önceki doğrulanmış kayıt korunur.

### Tarladan Tabağa öneri fiyatı

Mevcut pilot formül:

`öneri = çiftçi_teklifi + 0.40 × (resmi_referans − çiftçi_teklifi)`

Formül yalnızca `çiftçi_teklifi < resmi_referans` olduğunda fiyat üretir. Böylece öneri fiyatı çiftçinin teklifinden yüksek, çiftçi teklifi ile resmi referansın orta noktasından düşük olur.

**Önemli:** Uygulamadaki `Pilot çiftçi teklifi` değerleri gerçek çiftçilerden canlı alınmış fiyatlar değildir; üretim hesabı / çiftçi paneli devreye girene kadar örnek girişlerdir. HKS ve TOBB değerleri resmi referans veri katmanıdır; HKS/TOBB fiyatı doğrudan ülke çapı perakende tüketici ortalaması olarak sunulmaz.

## Üretim sistemine geçiş için kalan gerçek entegrasyonlar

1. Çiftçi kimlik ve hesap doğrulaması
2. Çiftçinin kendi ürün, stok, fiyat ve tarla/iniş alanı kaydı
3. Kalıcı veritabanı ve gerçek sipariş altyapısı
4. Yetkili perakende tüketici fiyat veri kaynağı / API'si
5. Ödeme kuruluşu ve bekletilen ödeme / hakediş akışı
6. Drone operasyon sağlayıcısı, uçuş izinleri, rota ve telemetri API'si
7. Fotoğraf/video yükleme ve gerçek zamanlı takip altyapısı
8. KVKK, mesafeli satış, gıda ve operasyon mevzuatı kontrolleri

## Dosyalar

- `index.html` — tüketici ve operasyon deneyimi
- `styles.css` — arayüz
- `app.js` — ürün, fiyat ve sipariş demo motoru
- `data/prices.json` — resmi fiyat anlık görüntüsü
- `scripts/update_prices.py` — HKS/TOBB fiyat güncelleyici
- `.github/workflows/update-prices.yml` — otomatik fiyat güncelleme görevi

---

**Durum:** Resmi fiyat veri katmanı bağlanmış çalışan MVP. Gerçek satış, ödeme ve drone kontrolü için yukarıdaki üretim entegrasyonları henüz tamamlanmamıştır.

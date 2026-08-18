# Tarladan Tabağa

Çiftçinin ürününü daha güçlü bir satış değeriyle doğrudan vatandaşa ulaştırmayı; vatandaşın da daha taze ürünü daha kısa tedarik zinciriyle almasını hedefleyen tarım-gıda lojistiği platformu.

## Şu anda çalışan web katmanı

- Tek-ekran uygulama yapısı: **Pazar / Sepet / Sipariş / Canlı / Proje**
- Sebze, meyve, tahıl, bakliyat ve doğal ürünlerden oluşan geniş ürün kataloğu
- Ürün adı ile görseli aynı ürün verisinden üretildiği için kart/detail görsel uyuşmazlığı engellenir
- Ürün seçimi → kg belirleme → **Sepete ekle** akışı
- Sepette toplam tutar, ürün miktar düzenleme ve ürün silme
- **Pilot güvenli ödeme kaydı** → sipariş başlatma akışı
- Sipariş → çiftçi bildirimi → YZ operasyon planı → hasat → fotoğraf/onay → drone yükleme → kalkış/üretici hakedişi → teslimat/dönüş senaryosu
- Drone rota haritası, telemetri ve gerçek video/telemetri bağlantısına hazır canlı takip ekranı
- Proje tanıtımı, sistem modülleri ve operasyon merkezi aynı uygulama içinde
- Resmi tarım fiyat referanslarını kullanan YZ fiyat merkezi

## Fiyat kaynakları

`data/prices.json` uygulamanın resmi fiyat anlık görüntüsüdür.

`scripts/update_prices.py` şu kaynaklardan veri toplamayı dener:

- **T.C. Ticaret Bakanlığı Hal Kayıt Sistemi (HKS)**
- **TOBB Ticaret Borsaları Ürün Fiyat Bilgileri**

`.github/workflows/update-prices.yml` fiyat güncellemesini **3 saatte bir** çalıştıracak şekilde kuruludur.

Resmi canlı kaynağı henüz eşleşmeyen katalog ürünleri uygulamada açıkça **Pilot referans** etiketiyle gösterilir; resmi veri gibi sunulmaz.

## YZ fiyat merkezi

Çiftçi satış fiyatı teklif etmez. Fiyatı operasyon merkezindeki YZ fiyat motoru oluşturur.

Aktif pilot politika `data/pricing-policy.json` dosyasındadır:

- Operasyon payı: nihai kg fiyatının **%20'si**
- Resmi canlı veri olan ürünlerde üretici hedef ödemesi: resmi tarım referansının **%5 üzerinde**
- Nihai tüketici fiyatı: `üretici_ödemesi / 0.80`
- Operasyon payı tüketici ekranında ayrı bir komisyon satırı olarak gösterilmez

## Güvenli ödeme durumu

Mevcut web katmanı gerçek kart bilgisi toplamaz. Sepetteki **Güvenli ödeme oluştur** adımı şu anda pilot bekleme kaydı üretir. Gerçek para hareketi için lisanslı ödeme kuruluşu / banka entegrasyonu gereklidir.

Üretim hedefi:

1. Vatandaş ödemesi güvenli bekleme hesabına alınır.
2. Sipariş çiftçiye ve operasyon merkezine düşer.
3. Foto onayı ve drone yükleme tamamlanır.
4. Drone kalkışı doğrulanınca üretici hakedişi serbest bırakılır.
5. Platform/operasyon mutabakatı arka planda tamamlanır.

## Üretim sistemine geçiş için kalan gerçek entegrasyonlar

1. Çiftçi kimlik ve hesap doğrulaması
2. Çiftçinin ürün, stok ve tarla/iniş alanı kaydı
3. Kalıcı veritabanı ve gerçek sipariş altyapısı
4. Yetkili perakende tüketici fiyat veri kaynağı / API'si
5. Lisanslı ödeme kuruluşu ve bekletilen ödeme / hakediş akışı
6. Drone operasyon sağlayıcısı, uçuş izinleri, rota ve telemetri API'si
7. Fotoğraf/video yükleme ve gerçek zamanlı takip altyapısı
8. KVKK, mesafeli satış, gıda ve operasyon mevzuatı kontrolleri

## Dosyalar

- `index.html` — tek-ekran tüketici/proje deneyimi
- `styles-v2.css` — güncel tek-ekran arayüz
- `styles.css` — önceki arayüz sürümü
- `app.js` — katalog, sepet, pilot ödeme, YZ fiyat ve sipariş/canlı takip motoru
- `data/prices.json` — resmi fiyat anlık görüntüsü
- `data/pricing-policy.json` — fiyat politikası
- `scripts/update_prices.py` — HKS/TOBB fiyat güncelleyici
- `.github/workflows/update-prices.yml` — otomatik fiyat güncelleme görevi

---

**Durum:** Geniş katalog + sepet + pilot güvenli ödeme + resmi fiyat katmanı + drone canlı takip entegrasyon noktaları bulunan çalışan MVP. Gerçek para tahsilatı ve gerçek drone kontrolü için dış servis entegrasyonları henüz tamamlanmamıştır.
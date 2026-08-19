# Tarladan Tabağa — TT Core

Tarladan Tabağa; resmi tarım fiyat verisi, yapay zekâ karar/orkestrasyon katmanı, üretici görevleri, görsel doğrulama, güvenli ödeme akışı ve otonom lojistik görevlerini tek sipariş kimliği altında birleştiren tarım-gıda platformu MVP'sidir.

## Jüri sürümü

Canlı demo: https://muhgurbz-wq.github.io/tarladan-tabaga-mvp/

Bu sürüm özellikle yarışma/jüri incelemesi için tek ekranlı, beş ana modüllü bir deneyim sunar:

- **Genel / TT Core:** değer önerisi, teknoloji çekirdeği, uçtan uca akış ve “Jüri demosu”
- **Pazar:** 48 ürün, 5 kategori, arama, resmi/pilot fiyat kaynağı etiketi ve ürün pasaportu
- **Sepet:** çoklu ürün/üretici sepeti, üretici hakedişi ve güvenli ödeme simülasyonu
- **Operasyon:** sipariş akışı, çoklu üretici görev planı, bölgesel rota, drone telemetrisi ve mutabakat
- **Proje:** vatandaş, çiftçi, sistem, operasyon merkezi ve pilot kanıt planı

## Ürün pasaportu

Her ürün aşağıdaki detay ekranlarıyla incelenebilir:

1. Çeşitler
2. Dalında
3. Bahçede
4. Hasat
5. Kasada
6. Tonaj

Çeşit bazında ayrı resmi fiyat yoksa sistem yapay fiyat farkı üretmez; aynı ürün fiyatı kullanılır. Tonaj, kasa, kalite, drone, ödeme ve canlı görev verileri jüri sürümünde açıkça **simülasyon** olarak etiketlenir.

## Fiyat politikası

`data/prices.json` resmi fiyat veri katmanıdır.

- Fiyat sahibi: `AI_OPERATION_CENTER`
- Çiftçi fiyat teklifi vermez.
- Üretici hakedişi: `official_agriculture_reference * 1.05`
- Nihai satış fiyatı: `farmer_payout / 0.80`
- Operasyon merkezi brüt payı: nihai fiyatın `%20`'si
- Operasyon payı vatandaş arayüzünde ayrı komisyon satırı olarak gösterilmez; yalnız iç mutabakat görünümünde izlenir.

Mevcut resmi eşleşmeler HKS/TOBB verisinden okunur. Resmi eşleşmesi olmayan ürünler `Pilot referans` olarak açıkça etiketlenir.

## Çoklu üretici görev planı

Sepette farklı üreticilere ait ürünler varsa TT Core her üreticiyi ayrı görev kümesine dönüştürür. Jüri simülasyonunda:

- üretici konumu şehir/bölge bazında türetilir,
- her bölge için yerel hub → üretici → teslim istasyonu → hub rotası oluşturulur,
- drone kapasitesi 20 kg/uçuş kabul edilir,
- gereken uçuş sayısı `ceil(total_weight / 20)` ile hesaplanır,
- Türkiye çapında tek drone ile gerçek dışı şehirler arası uçuş gösterilmez.

## Güvenli ödeme ve mutabakat

Bu statik MVP gerçek kart bilgisi toplamaz. Jüri testinde güvenli ödeme kaydı simüle edilir. Akış mantığı:

1. Sepet oluşturulur.
2. Güvenli bekleme kaydı oluşturulur.
3. Sipariş/üretici görevleri oluşur.
4. Görsel doğrulama aşamasında otomatik akış durur.
5. Jüri/vatandaş **Fotoğrafları onayla** düğmesiyle kalite kapısını manuel geçirir.
6. Paketleme ve drone görevi doğrulanır.
7. Drone kalkışıyla üretici hakedişi serbest bırakılır.
8. Teslimat tamamlanınca sipariş kapanır.

Operasyon ekranında **Sonraki adım** ve **Otomatik: açık/kapalı** kontrolleri vardır; böylece jüri akışı beklemeden adım adım test edebilir.

## Jüri demosu

Ana ekrandaki **“Jüri demosunu başlat”** butonu üç farklı üreticiden örnek sepet oluşturur ve çoklu görev akışını doğrudan çalıştırır:

- Bahçe Domatesi — Kahramanmaraş
- Elma — Niğde
- Nohut — Kırşehir

Bu akış; ödeme, görev planlama, uçuş sayısı, bölgesel rota, telemetri, manuel foto onayı ve mutabakat ekranlarının birlikte test edilmesini sağlar.

## Self-test

Uygulama açıldığında istemci tarafında **13 maddelik self-test** çalışır. Üst durum alanında `Self-test 13/13 PASS` görülmesi beklenir.

Ayrıca GitHub Actions üzerinde otomatik smoke test vardır:

```bash
node --check competition.js
node scripts/jury-smoke-test.mjs
```

Smoke test şu kapıları kontrol eder:

- tek final CSS/JS katmanı,
- 48 benzersiz ürün,
- 5 ana kategori,
- 5 ana navigasyon,
- 6 sekmeli ürün pasaportu,
- okunabilir mobil tipografi,
- benzersiz ana ürün görselleri,
- tüm ürün şehirleri için bölgesel koordinat desteği,
- çoklu üretici görev motoru,
- güvenli ödeme simülasyonu,
- manuel görsel onay / adım kontrolü,
- drone rota katmanı,
- mutabakat ve jüri demo modu.

## Dosya yapısı

```text
index.html
competition.css
competition.js
data/prices.json
scripts/jury-smoke-test.mjs
scripts/update_prices.py
.github/workflows/update-prices.yml
.github/workflows/jury-smoke.yml
```

Eski tasarım katmanları root dizinden kaldırılmıştır; canlı uygulama yalnız `competition.css` ve `competition.js` kullanır.

## Simülasyon sınırları

Jüri sürümünde şu alanlar simülasyondur ve arayüzde açıkça belirtilir:

- drone uçuşu / telemetri / dijital ikiz kamera,
- gerçek ödeme kuruluşu yerine güvenli ödeme kaydı,
- gerçek çiftçi stok sistemi bağlanana kadar tonaj/kasa/kalite,
- resmi canlı fiyat eşleşmesi olmayan ürünler.

Gerçek saha pilotunda bu katmanlar üretici hesabı, ödeme kuruluşu, drone/UTM/telemetri ve saha doğrulama verileriyle değiştirilir.

## Pilot başarı metrikleri

- üretici net geliri,
- tüketici toplam maliyeti,
- siparişten teslime toplam süre,
- ürün kaybı,
- görev/teslimat başarı oranı,
- hasat ile teslim arasındaki zaman.

Amaç, önce doğrulanabilir saha kanıtı üretmek; ardından bölgesel hub mimarisiyle ölçeklenmektir.

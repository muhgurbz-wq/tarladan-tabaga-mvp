<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Tarladan Tabağa — Örnek Teslimat Kaydı</title>
<meta name="description" content="Tarladan Tabağa: üreticiden tüketiciye aracısız, drone ile teslimat. Örnek teslimat kaydı ve pilot ölçüm planı.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --kagit:#E8E6DC;
  --kagit-2:#DEDBCF;
  --karbon:#232152;
  --karbon-soft:#4A4780;
  --muhur:#A83218;
  --tarla:#43663A;
  --hat:rgba(35,33,82,.22);
  --maxw:1080px;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{
  margin:0;
  background:var(--kagit);
  color:var(--karbon);
  font-family:"Newsreader",Georgia,serif;
  font-size:17px;
  line-height:1.55;
  background-image:
    repeating-linear-gradient(0deg,rgba(35,33,82,.028) 0 1px,transparent 1px 4px);
}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 20px}

/* ---- tipografi ---- */
h1,h2,h3,.disp{font-family:"Archivo Black",Impact,sans-serif;font-weight:400;letter-spacing:-.02em;line-height:1.02;text-transform:uppercase}
.mono,.mono *{font-family:"IBM Plex Mono",ui-monospace,monospace}
.eyebrow{
  font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.22em;
  text-transform:uppercase;color:var(--karbon-soft);
}

/* ---- üst şerit ---- */
.bar{
  border-bottom:1px solid var(--hat);
  background:rgba(232,230,220,.92);
  position:sticky;top:0;z-index:20;backdrop-filter:blur(6px);
}
.bar-in{display:flex;align-items:center;gap:14px;padding:11px 20px;max-width:var(--maxw);margin:0 auto;flex-wrap:wrap}
.mark{
  font-family:"Archivo Black",sans-serif;font-size:15px;letter-spacing:-.01em;
  border:2px solid var(--karbon);padding:2px 7px;
}
.bar-t{font-family:"IBM Plex Mono",monospace;font-size:12px;letter-spacing:.06em}
.uyari{
  margin-left:auto;font-family:"IBM Plex Mono",monospace;font-size:11px;
  color:var(--muhur);border:1px dashed var(--muhur);padding:3px 9px;letter-spacing:.04em;
}

/* ---- yırtma çizgisi ---- */
.tear{
  height:0;border-top:2px dashed var(--hat);
  max-width:var(--maxw);margin:0 auto;
}
section{padding:56px 0}

/* ---- hero ---- */
.hero-k{font-size:clamp(30px,6.4vw,62px);margin:16px 0 0;max-width:16ch}
.hero-k em{font-style:normal;color:var(--muhur)}
.hero-alt{
  margin:18px 0 0;max-width:52ch;font-size:19px;color:#33305e;
}

/* ---- irsaliye ---- */
.belge{
  margin-top:38px;border:2px solid var(--karbon);background:var(--kagit-2);
  position:relative;box-shadow:6px 6px 0 rgba(35,33,82,.14);
}
.belge-ust{
  display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;
  padding:12px 18px;border-bottom:2px solid var(--karbon);
  font-family:"IBM Plex Mono",monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;
}
.satirlar{display:grid;grid-template-columns:1fr 1fr}
.alan{
  padding:15px 18px;border-bottom:1px solid var(--hat);border-right:1px solid var(--hat);
  opacity:0;transform:translateY(6px);animation:gel .5s ease forwards;
}
.satirlar .alan:nth-child(2n){border-right:none}
.alan .et{
  display:block;font-family:"IBM Plex Mono",monospace;font-size:10.5px;
  letter-spacing:.18em;text-transform:uppercase;color:var(--karbon-soft);margin-bottom:5px;
}
.alan .dg{font-family:"IBM Plex Mono",monospace;font-size:20px;font-weight:600;line-height:1.2}
.alan .dg small{font-size:12px;font-weight:400;color:var(--karbon-soft);display:block;margin-top:3px;letter-spacing:.02em}
.alan.vurgu .dg{color:var(--tarla)}
.alan.vurgu-r .dg{color:var(--muhur)}
@keyframes gel{to{opacity:1;transform:none}}
.alan:nth-child(1){animation-delay:.15s}
.alan:nth-child(2){animation-delay:.3s}
.alan:nth-child(3){animation-delay:.45s}
.alan:nth-child(4){animation-delay:.6s}
.alan:nth-child(5){animation-delay:.75s}
.alan:nth-child(6){animation-delay:.9s}
.alan:nth-child(7){animation-delay:1.05s}
.alan:nth-child(8){animation-delay:1.2s}

.belge-alt{
  padding:16px 18px;display:flex;align-items:center;gap:20px;flex-wrap:wrap;
  font-family:"IBM Plex Mono",monospace;font-size:12px;color:var(--karbon-soft);
}
.muhur{
  margin-left:auto;border:3px double var(--muhur);color:var(--muhur);
  font-family:"Archivo Black",sans-serif;font-size:15px;letter-spacing:.06em;
  padding:8px 16px;transform:rotate(-7deg);opacity:0;
  animation:bas .45s cubic-bezier(.2,1.5,.4,1) 1.5s forwards;
}
@keyframes bas{from{opacity:0;transform:rotate(-7deg) scale(1.7)}to{opacity:.92;transform:rotate(-7deg) scale(1)}}

/* ---- karşılaştırma ---- */
.iki{display:grid;grid-template-columns:1fr 1fr;gap:0;border:2px solid var(--karbon);margin-top:26px}
.kutu{padding:22px 20px}
.kutu+.kutu{border-left:2px solid var(--karbon)}
.kutu h3{font-size:15px;margin:0 0 14px;letter-spacing:.04em}
.kutu ol{margin:0;padding-left:18px;font-size:15.5px}
.kutu li{margin-bottom:7px}
.kutu.tt{background:rgba(67,102,58,.09)}
.pay{font-family:"IBM Plex Mono",monospace;font-size:32px;font-weight:600;margin-top:16px;display:block}
.pay small{display:block;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--karbon-soft);font-weight:400;margin-top:4px}

/* ---- akış ---- */
.akis{margin-top:26px;border-top:1px solid var(--hat)}
.adim{
  display:grid;grid-template-columns:64px 1fr auto;gap:18px;align-items:baseline;
  padding:16px 4px;border-bottom:1px solid var(--hat);
}
.adim .no{font-family:"IBM Plex Mono",monospace;font-size:12px;letter-spacing:.1em;color:var(--karbon-soft)}
.adim .ne{font-family:"Archivo Black",sans-serif;font-size:15px;letter-spacing:0}
.adim .ac{font-size:15.5px;color:#3b3866;grid-column:2}
.adim .sr{font-family:"IBM Plex Mono",monospace;font-size:13px;color:var(--muhur);white-space:nowrap}

/* ---- ölçüm ---- */
.olcum{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:24px}
.slot{border:1px dashed var(--karbon-soft);padding:16px 14px;background:rgba(35,33,82,.03)}
.slot .et{font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--karbon-soft);display:block;margin-bottom:10px;min-height:2.6em}
.slot .bos{font-family:"Archivo Black",sans-serif;font-size:26px;color:var(--hat)}
.slot .hedef{font-family:"IBM Plex Mono",monospace;font-size:12px;margin-top:8px;color:var(--karbon-soft)}

/* ---- sınırlar ---- */
.sinir{border:2px solid var(--muhur);padding:22px 20px;margin-top:24px;background:rgba(168,50,24,.05)}
.sinir h2{color:var(--muhur);font-size:17px;margin:0 0 12px}
.sinir dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:8px 18px;font-size:15.5px}
.sinir dt{font-family:"IBM Plex Mono",monospace;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muhur);padding-top:4px}
.sinir dd{margin:0}

h2.blok{font-size:clamp(21px,3.4vw,30px);margin:0;max-width:22ch}
.alt-not{font-size:14.5px;color:var(--karbon-soft);margin-top:14px;max-width:62ch}

footer{border-top:2px solid var(--karbon);padding:26px 0 46px;margin-top:20px}
.f-in{display:flex;gap:22px;flex-wrap:wrap;font-family:"IBM Plex Mono",monospace;font-size:12px;color:var(--karbon-soft)}

a{color:var(--muhur)}
a:focus-visible,button:focus-visible{outline:3px solid var(--karbon);outline-offset:3px}

@media(max-width:760px){
  .satirlar{grid-template-columns:1fr}
  .satirlar .alan{border-right:none}
  .iki{grid-template-columns:1fr}
  .kutu+.kutu{border-left:none;border-top:2px solid var(--karbon)}
  .olcum{grid-template-columns:1fr 1fr}
  .adim{grid-template-columns:44px 1fr;gap:12px}
  .adim .sr{grid-column:2;grid-row:3}
  section{padding:40px 0}
}
@media(prefers-reduced-motion:reduce){
  .alan,.muhur{animation:none;opacity:1;transform:none}
  .muhur{transform:rotate(-7deg)}
}
</style>
</head>
<body>

<div class="bar">
  <div class="bar-in">
    <span class="mark">TT</span>
    <span class="bar-t">Tarladan Tabağa · Kahramanmaraş</span>
    <span class="uyari">Prototip — veriler örnektir</span>
  </div>
</div>

<main class="wrap">

  <section>
    <p class="eyebrow">Örnek teslimat kaydı · 18.08.2026</p>
    <h1 class="hero-k">Domates 07:12'de toplandı. <em>08:31'de balkonda.</em></h1>
    <p class="hero-alt">Aracı yok, soğuk hava deposu yok, bekleme yok. Sipariş üreticiye görev olarak düşer, ürün hasattan sonra doğrudan uçar. Aşağıdaki kayıt bu akışın tamamını gösteriyor.</p>

    <div class="belge">
      <div class="belge-ust">
        <span>Sipariş TT-2026-0184</span>
        <span>Dulkadiroğlu → Şeyhadil Mah.</span>
      </div>

      <div class="satirlar">
        <div class="alan">
          <span class="et">Ürün</span>
          <span class="dg">Domates<small>yerli, dalında</small></span>
        </div>
        <div class="alan">
          <span class="et">Miktar</span>
          <span class="dg">5,0 kg</span>
        </div>
        <div class="alan">
          <span class="et">Üretici</span>
          <span class="dg">M.K.<small>Dulkadiroğlu · 11,4 km</small></span>
        </div>
        <div class="alan">
          <span class="et">Hasat saati</span>
          <span class="dg">07:12<small>foto onaylı</small></span>
        </div>
        <div class="alan">
          <span class="et">Uçuş süresi</span>
          <span class="dg">19 dk<small>TT-D01 · otonom rota</small></span>
        </div>
        <div class="alan">
          <span class="et">Siparişten teslime</span>
          <span class="dg">79 dk</span>
        </div>
        <div class="alan vurgu-r">
          <span class="et">Tüketici ödedi</span>
          <span class="dg">132,50 ₺<small>26,50 ₺/kg</small></span>
        </div>
        <div class="alan vurgu">
          <span class="et">Üreticiye geçen</span>
          <span class="dg">104,00 ₺<small>tutarın %78'i</small></span>
        </div>
      </div>

      <div class="belge-alt">
        <span>Ödeme, teslim onayına kadar bloke tutuldu.</span>
        <span class="muhur">Teslim edildi</span>
      </div>
    </div>
    <p class="alt-not">Bu kayıt gerçek bir teslimattan değil, sistemin ürettiği örnek akıştan alınmıştır. Rakamlar pilot uçuşlarda ölçülecek; ölçüm sonuçları bu sayfada aynı formatta yayımlanacak.</p>
  </section>

  <div class="tear"></div>

  <section>
    <p class="eyebrow">Sorun</p>
    <h2 class="blok">Ürün sekiz gün yolda, para dört elde bölünüyor.</h2>

    <div class="iki">
      <div class="kutu">
        <h3>Bugünkü zincir</h3>
        <ol>
          <li>Üretici hasat eder, fiyatı kabul etmek zorundadır</li>
          <li>Toplayıcı / komisyoncu</li>
          <li>Hal</li>
          <li>Toptancı</li>
          <li>Market rafı</li>
          <li>Tüketici — daha pahalı, daha bayat</li>
        </ol>
        <span class="pay">? %<small>üreticiye kalan — sahada ölçülecek</small></span>
      </div>
      <div class="kutu tt">
        <h3>Tarladan Tabağa</h3>
        <ol>
          <li>Tüketici sipariş verir</li>
          <li>Sipariş, en yakın uygun üreticiye görev düşer</li>
          <li>Hasat + fotoğraf onayı</li>
          <li>Drone teslimatı</li>
        </ol>
        <span class="pay">%78<small>üreticiye kalan — örnek kayıtta</small></span>
      </div>
    </div>
    <p class="alt-not">Soldaki yüzdeyi bilerek boş bıraktık: mevcut zincirin üretici payı için doğrulanmış resmî bir kaynağa henüz sahip değiliz. Pilot ölçümünde aynı ürün, aynı hafta, iki kanaldan takip edilerek karşılaştırılacak.</p>
  </section>

  <div class="tear"></div>

  <section>
    <p class="eyebrow">Akış</p>
    <h2 class="blok">Bir siparişin fiziksel işe dönüşmesi</h2>

    <div class="akis">
      <div class="adim">
        <span class="no">01</span><span class="ne">Sipariş</span><span class="sr">00:00</span>
        <span class="ac">Ürün, kilogram ve teslim noktası seçilir.</span>
      </div>
      <div class="adim">
        <span class="no">02</span><span class="ne">Eşleşme</span><span class="sr">+3 dk</span>
        <span class="ac">Stok, mesafe ve hasat uygunluğuna göre üretici belirlenir; fiyat resmî referanslarla kontrol edilir.</span>
      </div>
      <div class="adim">
        <span class="no">03</span><span class="ne">Hasat</span><span class="sr">+41 dk</span>
        <span class="ac">Üretici ürünü toplar, fotoğrafla onaylar. Onay gelmeden uçuş açılmaz.</span>
      </div>
      <div class="adim">
        <span class="no">04</span><span class="ne">Ödeme bloke</span><span class="sr">+42 dk</span>
        <span class="ac">Tüketicinin ödemesi teslime kadar bekletilir. Teslim olmazsa iade edilir.</span>
      </div>
      <div class="adim">
        <span class="no">05</span><span class="ne">Uçuş</span><span class="sr">+60 dk</span>
        <span class="ac">Otonom rota, canlı telemetri, balkon teslim noktası.</span>
      </div>
      <div class="adim">
        <span class="no">06</span><span class="ne">Hakediş</span><span class="sr">+79 dk</span>
        <span class="ac">Teslim onayıyla üretici ödemesi serbest kalır, kayıt kapanır.</span>
      </div>
    </div>
    <p class="alt-not">Drone teslimatı bu modelde bir tercih değil, şartın kendisidir: ürünün tarladan doğrudan çıkması ancak aracısız ve depolamasız bir taşımayla mümkün.</p>
  </section>

  <div class="tear"></div>

  <section>
    <p class="eyebrow">Pilot</p>
    <h2 class="blok">Sahada ölçeceğimiz dört sayı</h2>

    <div class="olcum">
      <div class="slot">
        <span class="et">Üretici net geliri</span>
        <span class="bos">—</span>
        <span class="hedef">hedef: +%30</span>
      </div>
      <div class="slot">
        <span class="et">Tüketici toplam maliyeti</span>
        <span class="bos">—</span>
        <span class="hedef">hedef: −%15</span>
      </div>
      <div class="slot">
        <span class="et">Siparişten teslime süre</span>
        <span class="bos">—</span>
        <span class="hedef">hedef: &lt; 2 saat</span>
      </div>
      <div class="slot">
        <span class="et">Ürün kaybı</span>
        <span class="bos">—</span>
        <span class="hedef">hedef: &lt; %2</span>
      </div>
    </div>
    <p class="alt-not">Dördü de henüz ölçülmedi. Hedefler pilot uçuşların başarı ölçütüdür; sonuç bu kutulara yazıldığında proje kendini kanıtlamış olur.</p>
  </section>

  <div class="tear"></div>

  <section>
    <div class="sinir">
      <h2>Bu prototipte neyin gerçek olmadığı</h2>
      <dl>
        <dt>Ödeme</dt>
        <dd>Gerçek kart bilgisi toplanmaz. Ödeme kuruluşu entegrasyonu bağlanana kadar bloke akışı simüle edilir.</dd>
        <dt>Uçuş</dt>
        <dd>Kamera görüntüsü dijital ikizdir, canlı yayın değildir. Gerçek FPV bağlandığında bu alan değiştirilecektir.</dd>
        <dt>Fiyat</dt>
        <dd>HKS / TOBB veri katmanı henüz bağlı değil. Referans fiyatlar örnektir.</dd>
        <dt>Teslimat</dt>
        <dd>Yukarıdaki kayıt örnektir. Bugüne kadar gerçek bir drone teslimatı yapılmamıştır.</dd>
      </dl>
    </div>
    <p class="alt-not">Bunları gizlemek yerine yazıyoruz: hangi kısmın kurulu, hangi kısmın kurulacak olduğu belli olmadan bir pilot uçuş izni de, bir yatırım kararı da sağlıklı verilemez.</p>
  </section>

</main>

<footer>
  <div class="wrap f-in">
    <span>Tarladan Tabağa · Kahramanmaraş</span>
    <span>Akademik danışmanlık: Kahramanmaraş İstiklal Üniversitesi</span>
    <span>Prototip sürümü · 18.08.2026</span>
  </div>
</footer>

</body>
</html>

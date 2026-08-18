const products=[
  {name:'Bahçe Domatesi',farmer:'Bereket Çiftliği',location:'Kahramanmaraş / Dulkadiroğlu',station:'Merkez teslim istasyonu',farmerPrice:'24 ₺/kg',marketPrice:'40 ₺/kg',stock:'320 kg hazır stok',fresh:'Aynı gün hasat',cat:'Sebze',emoji:'🍅'},
  {name:'Kapya Biber',farmer:'Güneş Tarım',location:'Gaziantep / Oğuzeli',station:'Batı teslim istasyonu',farmerPrice:'31 ₺/kg',marketPrice:'49 ₺/kg',stock:'180 kg hazır stok',fresh:'Dalından toplama',cat:'Sebze',emoji:'🌶️'},
  {name:'Elma',farmer:'Yayla Bahçesi',location:'Niğde / Bor',station:'Kuzey teslim istasyonu',farmerPrice:'27 ₺/kg',marketPrice:'43 ₺/kg',stock:'250 kg hazır stok',fresh:'Yakın teslim',cat:'Meyve',emoji:'🍎'},
  {name:'Doğal Bal',farmer:'Dağ Arıcılığı',location:'Kahramanmaraş / Andırın',station:'Merkez teslim istasyonu',farmerPrice:'290 ₺/kg',marketPrice:'390 ₺/kg',stock:'42 kg hazır stok',fresh:'Doğrudan üreticiden',cat:'Doğal Ürün',emoji:'🍯'}
];
let current=0, timer=null;
const productGrid=document.querySelector('#productGrid');
const heroStatus=document.querySelector('#heroStatus');
const heroText=document.querySelector('#heroText');
const detailStep=document.querySelector('#detailStep');
const detailStatus=document.querySelector('#detailStatus');
const detailIcon=document.querySelector('#detailIcon');
const detailTitle=document.querySelector('#detailTitle');
const detailText=document.querySelector('#detailText');
const detailGrid=document.querySelector('#detailGrid');
const liveCode=document.querySelector('#liveCode');
const liveProduct=document.querySelector('#liveProduct');
const consumerStatus=document.querySelector('#consumerStatus');
const consumerHint=document.querySelector('#consumerHint');
const farmerStatus=document.querySelector('#farmerStatus');
const farmerHint=document.querySelector('#farmerHint');
const centerStatus=document.querySelector('#centerStatus');
const centerHint=document.querySelector('#centerHint');
const droneStatus=document.querySelector('#droneStatus');
const droneHint=document.querySelector('#droneHint');
const paymentStatus=document.querySelector('#paymentStatus');
const paymentHint=document.querySelector('#paymentHint');
const approvalStatus=document.querySelector('#approvalStatus');
const approvalHint=document.querySelector('#approvalHint');

function renderProducts(){
  productGrid.innerHTML=products.map((p,i)=>`<article class="product ${i===current?'selected':''}"><div class="top"><div class="emoji">${p.emoji}</div><span class="tag">${p.cat}</span></div><h3>${p.name}</h3><p>${p.farmer}<br>${p.location}</p><div class="prices"><div><span>Çiftçi fiyatı</span><strong>${p.farmerPrice}</strong></div><div><span>Referans fiyat</span><strong>${p.marketPrice}</strong></div></div><div class="meta"><div><span>Stok</span><b>${p.stock}</b></div><div><span>Tazelik</span><b>${p.fresh}</b></div></div><div class="actions"><button class="btn primary" data-order="${i}">Sipariş senaryosu</button><button class="btn ghost" data-select="${i}">Seç</button></div></article>`).join('');
  document.querySelectorAll('[data-select]').forEach(b=>b.addEventListener('click',()=>selectProduct(Number(b.dataset.select),false)));
  document.querySelectorAll('[data-order]').forEach(b=>b.addEventListener('click',()=>selectProduct(Number(b.dataset.order),true)));
}

function stages(){
  const p=products[current];
  return [
    {hero:'Sipariş oluştu',heroText:'Sipariş aynı anda çiftçiye ve operasyon merkezine düştü.',route:0,step:'ADIM 01',status:'SİPARİŞ OLUŞTU',icon:'📱',title:'Vatandaş ürün, kg ve teslim istasyonu seçer.',text:`${p.name} için sipariş oluşturulur ve teslim istasyonu olarak ${p.station} seçilir.`,grid:[['Ürün',p.name],['Miktar','20 kg'],['İstasyon',p.station],['Ödeme','Güvenli bekleme hesabı']],consumer:['Sipariş oluşturuldu','Ödeme güvenli hesapta tutulur.'],farmer:['Bildirim yolda','Sipariş birazdan çiftçi telefonuna düşecek.'],center:['Planlama başlıyor','Rota ve görev hesaplanıyor.'],drone:['Atama bekleniyor','İniş alanı hazırlanıyor.'],payment:['Beklemede','Kalkış anına kadar korunur.'],approval:['Henüz yok','Çiftçi ürün fotoğraflarını daha sonra gönderecek.']},
    {hero:'Çiftçiye bildirim gitti',heroText:'Telefon ekranında ürün, kg ve konum bilgisi görünür.',route:1,step:'ADIM 02',status:'ÇİFTÇİ BİLDİRİMİ',icon:'🌿',title:'Sipariş çiftçinin telefonuna bildirim olarak düşer.',text:`${p.farmer}, ${p.name} siparişini ve miktarı görür.`,grid:[['Çiftçi',p.farmer],['Ürün',p.name],['Miktar','20 kg'],['Tarla',p.location]],consumer:['Çiftçiye iletildi','Sipariş hazırlık süreci başladı.'],farmer:['Telefonuna sipariş düştü','Toplama için bahçeye geçiyor.'],center:['İlk doğrulama alındı','Operasyon planına geçiliyor.'],drone:['Hazırlıkta','İniş alanı doğrulanıyor.'],payment:['Beklemede','Süreç tamamlanana kadar korunur.'],approval:['Henüz yok','Fotoğraf adımı sırada.']},
    {hero:'YZ operasyon planı oluştu',heroText:'Merkez, siparişi fiziksel göreve çevirdi.',route:2,step:'ADIM 03',status:'YZ OPERASYON PLANI',icon:'✦',title:'Yapay zekâ merkezi drone/lojistik görevini oluşturur.',text:`${p.location} için iniş alanı ve ${p.station} teslim noktasıyla görev tanımlanır.`,grid:[['Merkez','Aktif'],['İniş alanı','Tanımlı'],['Teslim noktası',p.station],['Görev','Drone atandı']],consumer:['Süreç işleniyor','Operasyon hazırlanıyor.'],farmer:['Toplama görevi başladı','Siparişe göre hazırlık yapıyor.'],center:['Görev planı hazır','Rota hesaplandı.'],drone:['Görev atandı','Kalkış hazırlığı başladı.'],payment:['Beklemede','Fiziksel doğrulama bekleniyor.'],approval:['Henüz yok','Fotoğraf aşaması yaklaştı.']},
    {hero:'Bahçeden toplama başladı',heroText:'Çiftçi ürünleri bahçede toplamaya başladı.',route:2,step:'ADIM 04',status:'BAHÇEDEN TOPLAMA',icon:'🧺',title:'Çiftçi ürünleri toplar ve hazırlar.',text:`Siparişe uygun ${p.name} ürünleri bahçeden seçilir.`,grid:[['Süreç','Toplama devam ediyor'],['Ürün',p.name],['Kalite','İlk kontrol yapılıyor'],['Hedef','20 kg hazırlık']],consumer:['Toplama sürüyor','Uygulamada ilerleme görülür.'],farmer:['Toplama yapılıyor','Ürünler hazırlanıyor.'],center:['Sahadan veri geliyor','Foto onay aşamasına geçilecek.'],drone:['Beklemede','Onay sonrası çağrılacak.'],payment:['Beklemede','Görev tamamlanana kadar korunur.'],approval:['Hazırlanıyor','Fotoğraflar birazdan gönderilecek.']},
    {hero:'Fotoğraflar gönderildi',heroText:'Vatandaş ürünleri uygulama içinden inceliyor.',route:3,step:'ADIM 05',status:'FOTOĞRAF VE ONAY',icon:'📸',title:'Çiftçi ürün fotoğraflarını vatandaşa yollar.',text:'Vatandaş ürünleri görür ve onay verdiğinde süreç devam eder.',grid:[['Gönderim','Hasat fotoğrafları'],['İnceleme','Uygulama içi'],['Karar','Onay / düzeltme'],['Amaç','Şeffaflık']],consumer:['Fotoğraflar geldi','Vatandaş inceleyip onay veriyor.'],farmer:['Fotoğraflar gönderildi','Tüketici onayı bekleniyor.'],center:['Onay bekleniyor','Sonraki görev paketleme.'],drone:['Hazır bekliyor','Onayla birlikte çağrılacak.'],payment:['Beklemede','Onay sonrası paketleme akışı.'],approval:['Gönderildi','Vatandaş fotoğrafları inceliyor.']},
    {hero:'Paket hazırlandı',heroText:'Çiftçi görevi tamamla butonuna bastı.',route:4,step:'ADIM 06',status:'PAKET VE GÖREV TAMAMLAMA',icon:'📦',title:'Onay sonrası çiftçi paketi hazırlar.',text:'Paket hazırlanır, görev tamamlanır ve drone için iniş alanı aktif olur.',grid:[['Karar','Vatandaş onayı verdi'],['Paket','Hazır'],['Çiftçi işlemi','Görev tamamla'],['Saha','İniş alanı aktif']],consumer:['Onay verildi','Teslimat hazırlığı başladı.'],farmer:['Paket hazırlandı','Drone çağrıldı.'],center:['Toplama penceresi açıldı','Drone iniş süreci aktif.'],drone:['İniş için yaklaşıyor','Toplama alanına yöneldi.'],payment:['Beklemede','Kalkış anında serbest kalacak.'],approval:['Onaylandı','Ürün görselleri kabul edildi.']},
    {hero:'Drone kalktı, ödeme aktarıldı',heroText:'Paket alındı ve çiftçi ödemesi serbest bırakıldı.',route:4,step:'ADIM 07',status:'DRONE KALKIŞI + ÖDEME',icon:'🚁',title:'Drone kalkar ve ödeme çiftçiye aktarılır.',text:'Drone havalandığı anda bekletilen ödeme çiftçinin kayıtlı hesabına gönderilir.',grid:[['Drone','Havalandı'],['Paket','Kilitli'],['Ödeme','Çiftçi hesabına aktarıldı'],['Rota','Yasal uçuş hattı']],consumer:['Teslimat yolda','İstasyonda bekleme başladı.'],farmer:['Ödeme hesabına geçti','Sipariş bedeli aktarıldı.'],center:['Uçuş aktif','Teslim ve dönüş izleniyor.'],drone:['Havada','Teslim istasyonuna ilerliyor.'],payment:['Çiftçiye aktarıldı','Kalkış doğrulanınca serbest kaldı.'],approval:['Tamamlandı','Onay sonrası ürün yola çıktı.']},
    {hero:'Teslimat tamamlandı',heroText:'Ürün teslim istasyonuna bırakıldı, drone merkeze dönüyor.',route:5,step:'ADIM 08',status:'TESLİMAT VE DÖNÜŞ',icon:'🏠',title:'Ürün teslim edilir ve drone geri döner.',text:`Ürün ${p.station} noktasına bırakılır, drone aynı rota üzerinden merkeze döner.`,grid:[['Teslim','İstasyona bırakıldı'],['Vatandaş','Teslim aldı'],['Drone','Otonom dönüşte'],['Sipariş','Kapanış tamamlandı']],consumer:['Teslimat tamamlandı','Vatandaş ürünü teslim aldı.'],farmer:['Sipariş başarıyla kapandı','Teslim ve ödeme tamamlandı.'],center:['Görev tamamlandı','Uçuş kaydı kapandı.'],drone:['Merkeze dönüyor','Otonom park sürecinde.'],payment:['Tamamlandı','Çiftçi ödemesi başarılı.'],approval:['Sipariş kapandı','Süreç başarıyla tamamlandı.']}
  ];
}

function updateRoute(idx){document.querySelectorAll('[data-route]').forEach((n,i)=>{n.classList.toggle('active',i===idx);n.classList.toggle('done',i<idx);});}

function showStage(i){
  const s=stages()[i], p=products[current];
  heroStatus.textContent=s.hero;
  heroText.textContent=s.heroText;
  updateRoute(s.route);
  detailStep.textContent=s.step;
  detailStatus.textContent=s.status;
  detailIcon.textContent=s.icon;
  detailTitle.textContent=s.title;
  detailText.textContent=s.text;
  detailGrid.innerHTML=s.grid.map(([k,v])=>`<div><span>${k}</span><b>${v}</b></div>`).join('');
  liveCode.textContent=`TT-SIP-00${current+1}`;
  liveProduct.textContent=p.name;
  consumerStatus.textContent=s.consumer[0]; consumerHint.textContent=s.consumer[1];
  farmerStatus.textContent=s.farmer[0]; farmerHint.textContent=s.farmer[1];
  centerStatus.textContent=s.center[0]; centerHint.textContent=s.center[1];
  droneStatus.textContent=s.drone[0]; droneHint.textContent=s.drone[1];
  paymentStatus.textContent=s.payment[0]; paymentHint.textContent=s.payment[1];
  approvalStatus.textContent=s.approval[0]; approvalHint.textContent=s.approval[1];
  document.querySelectorAll('.step').forEach((b,idx)=>b.classList.toggle('active',idx===i));
}

function startFlow(){
  if(timer) clearInterval(timer);
  let i=0; showStage(i); document.querySelector('#akis').scrollIntoView({behavior:'smooth'});
  timer=setInterval(()=>{i+=1; if(i>=stages().length){clearInterval(timer); timer=null; return;} showStage(i);},1800);
}

function selectProduct(i,autoplay){current=i; renderProducts(); showStage(0); if(autoplay) startFlow();}

document.querySelectorAll('[data-start-flow]').forEach(b=>b.addEventListener('click',startFlow));
document.querySelectorAll('.step').forEach(b=>b.addEventListener('click',()=>{if(timer){clearInterval(timer); timer=null;} showStage(Number(b.dataset.stage));}));
renderProducts();
showStage(0);

const products=[
  {key:'domates',name:'Bahçe Domatesi',farmer:'Bereket Çiftliği',location:'Kahramanmaraş / Dulkadiroğlu',station:'Merkez teslim istasyonu',marketPrice:null,consumerReference:null,aiPrice:null,farmerPayout:null,stock:'320 kg hazır stok',fresh:'Aynı gün hasat',cat:'Sebze',emoji:'🍅'},
  {key:'kapya_biber',name:'Kapya Biber',farmer:'Güneş Tarım',location:'Gaziantep / Oğuzeli',station:'Batı teslim istasyonu',marketPrice:null,consumerReference:null,aiPrice:null,farmerPayout:null,stock:'180 kg hazır stok',fresh:'Dalından toplama',cat:'Sebze',emoji:'🌶️'},
  {key:'elma',name:'Elma',farmer:'Yayla Bahçesi',location:'Niğde / Bor',station:'Kuzey teslim istasyonu',marketPrice:null,consumerReference:null,aiPrice:null,farmerPayout:null,stock:'250 kg hazır stok',fresh:'Yakın teslim',cat:'Meyve',emoji:'🍎'},
  {key:'ceviz',name:'Ceviz',farmer:'Anadolu Bahçesi',location:'Malatya / Akçadağ',station:'Doğu teslim istasyonu',marketPrice:null,consumerReference:null,aiPrice:null,farmerPayout:null,stock:'75 kg hazır stok',fresh:'Yeni sezon',cat:'Doğal Ürün',emoji:'🌰'},
  {key:'bal',name:'Doğal Bal',farmer:'Dağ Arıcılığı',location:'Kahramanmaraş / Andırın',station:'Merkez teslim istasyonu',marketPrice:null,consumerReference:null,aiPrice:null,farmerPayout:null,stock:'42 kg hazır stok',fresh:'Doğrudan üreticiden',cat:'Doğal Ürün',emoji:'🍯'}
];

const PRICING_POLICY={platformRate:0.20,farmerUpliftRate:0.05,consumerDiscountTarget:0.10};
let current=0,timer=null;

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

function installPriceUi(){
  let status=document.querySelector('#priceFeedStatus');
  if(!status){status=[...document.querySelectorAll('.note-box')].find(el=>el.closest('#urunler'))||null;if(status)status.id='priceFeedStatus';}
  if(status)status.innerHTML='<b>YZ fiyat merkezi:</b> resmi tarım verileri yükleniyor…<br><small>Ticaret Bakanlığı HKS + TOBB ticaret borsaları.</small>';
  const style=document.createElement('style');
  style.textContent='.price-source{margin-top:12px;padding:11px 12px;border-radius:12px;background:rgba(95,176,255,.07);border:1px solid rgba(95,176,255,.18);display:flex;justify-content:space-between;gap:10px;align-items:center}.price-source span{font-size:10px;color:#8fb4ce}.price-source b{font-size:11px;color:#dff0fb}.fair-price{margin-top:12px;padding:14px;border-radius:14px;background:linear-gradient(135deg,rgba(56,210,122,.14),rgba(95,176,255,.08));border:1px solid rgba(56,210,122,.28)}.fair-price span{display:block;font-size:10px;letter-spacing:.08em;color:#8ff0ae;font-weight:800}.fair-price strong{display:block;font-size:24px;margin-top:7px}.fair-price small{display:block;color:#9db3c3;margin-top:6px;line-height:1.45}.producer-pay{margin-top:10px;padding:11px 12px;border-radius:12px;background:rgba(56,210,122,.06);border:1px solid rgba(56,210,122,.16)}.producer-pay span{display:block;font-size:10px;color:#89d9a6}.producer-pay b{display:block;margin-top:5px;font-size:14px}.feed-ok{color:#8ff0ae}.feed-warn{color:#f1c75c}';
  document.head.appendChild(style);
  document.querySelectorAll('.clip-card p').forEach(el=>el.textContent='YZ fiyat merkezi resmi tarım referansını kullanarak fiyatı otomatik oluşturur.');
}

function money(v){return Number.isFinite(v)?`${v.toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2})} ₺/kg`:'Veri bekleniyor';}

function computeAiPrice(p){
  if(!Number.isFinite(p.marketPrice)||p.marketPrice<=0)return null;
  const farmerPayout=Math.round((p.marketPrice*(1+PRICING_POLICY.farmerUpliftRate))*100)/100;
  const consumerPrice=Math.round((farmerPayout/(1-PRICING_POLICY.platformRate))*100)/100;
  const operationRevenue=Math.round((consumerPrice*PRICING_POLICY.platformRate)*100)/100;
  let consumerBenefitVerified=false,consumerSavingRate=null;
  if(Number.isFinite(p.consumerReference)&&p.consumerReference>0){
    consumerSavingRate=(p.consumerReference-consumerPrice)/p.consumerReference;
    consumerBenefitVerified=consumerSavingRate>=PRICING_POLICY.consumerDiscountTarget;
  }
  return {farmerPayout,consumerPrice,operationRevenue,consumerBenefitVerified,consumerSavingRate};
}

function renderProducts(){
  const internalLedger={};
  productGrid.innerHTML=products.map((p,i)=>{
    const calc=computeAiPrice(p);
    p.aiPrice=calc?.consumerPrice??null;
    p.farmerPayout=calc?.farmerPayout??null;
    if(calc)internalLedger[p.key]={operationRevenuePerKg:calc.operationRevenue,platformRate:PRICING_POLICY.platformRate};
    const sourceLabel=p.sourceName||'Resmi veri bekleniyor';
    const sourceDate=p.sourceDate||'—';
    const aiText=calc?money(calc.consumerPrice):'Resmi veri bekleniyor';
    let note='Çiftçi fiyat vermez; fiyatı YZ operasyon merkezi resmi referansa göre otomatik belirler.';
    if(calc&&Number.isFinite(p.consumerReference)){
      note=calc.consumerBenefitVerified?`Onaylı tüketici referansının %${Math.round(calc.consumerSavingRate*100)} altında.`:'Tüketici lehine hedef henüz doğrulanmadı; fiyat yayına alınmadan yeniden dengelenir.';
    }else if(calc){
      note='Çiftçi ödemesi resmi tarım referansının üzerinde hedeflenir; tüketici tasarrufu için onaylı perakende referansı bekleniyor.';
    }
    return `<article class="product ${i===current?'selected':''}"><div class="top"><div class="emoji">${p.emoji}</div><span class="tag">${p.cat}</span></div><h3>${p.name}</h3><p>${p.farmer}<br>${p.location}</p><div class="prices"><div><span>Resmi tarım referansı</span><strong>${money(p.marketPrice)}</strong></div><div><span>YZ satış fiyatı</span><strong>${aiText}</strong></div></div><div class="fair-price"><span>TARLADAN TABAĞA YZ FİYATI</span><strong>${aiText}</strong><small>${note}</small></div><div class="producer-pay"><span>ÜRETİCİYE DOĞRUDAN ÖDEME</span><b>${money(p.farmerPayout)}</b></div><div class="price-source"><span>${sourceLabel}</span><b>${sourceDate}</b></div><div class="meta"><div><span>Stok</span><b>${p.stock}</b></div><div><span>Tazelik</span><b>${p.fresh}</b></div></div><div class="actions"><button class="btn primary" data-order="${i}">Sipariş senaryosu</button><button class="btn ghost" data-select="${i}">Seç</button></div></article>`;
  }).join('');
  window.__ttInternalPricingLedger=internalLedger;
  document.querySelectorAll('[data-select]').forEach(b=>b.addEventListener('click',()=>selectProduct(Number(b.dataset.select),false)));
  document.querySelectorAll('[data-order]').forEach(b=>b.addEventListener('click',()=>selectProduct(Number(b.dataset.order),true)));
}

async function loadOfficialPrices(){
  const status=document.querySelector('#priceFeedStatus');
  try{
    const res=await fetch(`data/prices.json?v=${Date.now()}`,{cache:'no-store'});
    if(!res.ok)throw new Error(`HTTP ${res.status}`);
    const data=await res.json();
    products.forEach(p=>{
      const live=data.products?.[p.key];if(!live)return;
      const avg=live.official_avg===null||live.official_avg===undefined||live.official_avg===''?NaN:Number(live.official_avg);
      if(Number.isFinite(avg)&&avg>0)p.marketPrice=avg;
      const consumer=live.consumer_reference===null||live.consumer_reference===undefined||live.consumer_reference===''?NaN:Number(live.consumer_reference);
      if(Number.isFinite(consumer)&&consumer>0)p.consumerReference=consumer;
      p.sourceName=live.source_name||live.source||'Resmi kaynak';
      p.sourceDate=live.data_date||data.generated_at?.slice(0,10)||'—';
    });
    if(status){
      const hks=data.sources?.hks?.ok?'HKS ✓':'HKS bekleniyor';
      const tobb=data.sources?.tobb?.ok?'TOBB ✓':'TOBB bekleniyor';
      status.innerHTML=`<b class="feed-ok">YZ fiyat merkezi bağlı:</b> ${hks} • ${tobb}<br><small>Çiftçi fiyat girişi yok. Nihai fiyat operasyon merkezi tarafından otomatik oluşturulur. Son veri: ${data.generated_at||'—'}</small>`;
    }
  }catch(err){
    if(status)status.innerHTML='<b class="feed-warn">Resmi fiyat akışı geçici olarak alınamadı.</b><br><small>Yeni fiyat üretimi veri doğrulanana kadar bekletilir.</small>';
  }
  renderProducts();
}

function stages(){
  const p=products[current];
  return [
    {hero:'Sipariş oluştu',heroText:'Sipariş aynı anda çiftçiye ve operasyon merkezine düştü.',route:0,step:'ADIM 01',status:'SİPARİŞ OLUŞTU',icon:'📱',title:'Vatandaş ürün, kg ve teslim istasyonu seçer.',text:`${p.name} için sipariş oluşturulur ve teslim istasyonu olarak ${p.station} seçilir.`,grid:[['Ürün',p.name],['Miktar','20 kg'],['İstasyon',p.station],['YZ satış fiyatı',money(p.aiPrice)]],consumer:['Sipariş oluşturuldu','Ödeme güvenli hesapta tutulur.'],farmer:['Bildirim yolda','Sipariş birazdan çiftçi telefonuna düşecek.'],center:['Fiyat + rota planlanıyor','YZ fiyatı, rota ve görev aynı merkezde oluşturuluyor.'],drone:['Atama bekleniyor','İniş alanı hazırlanıyor.'],payment:['Beklemede','Kalkış anına kadar korunur.'],approval:['Henüz yok','Çiftçi ürün fotoğraflarını daha sonra gönderecek.']},
    {hero:'Çiftçiye bildirim gitti',heroText:'Telefon ekranında ürün, kg ve konum bilgisi görünür.',route:1,step:'ADIM 02',status:'ÇİFTÇİ BİLDİRİMİ',icon:'🌿',title:'Sipariş çiftçinin telefonuna bildirim olarak düşer.',text:`${p.farmer}, ${p.name} siparişini ve miktarı görür; fiyatı sistem belirlemiştir.`,grid:[['Çiftçi',p.farmer],['Ürün',p.name],['Miktar','20 kg'],['Üretici ödemesi',money(p.farmerPayout)]],consumer:['Çiftçiye iletildi','Sipariş hazırlık süreci başladı.'],farmer:['Telefonuna sipariş düştü','Toplama için bahçeye geçiyor.'],center:['İlk doğrulama alındı','Operasyon planına geçiliyor.'],drone:['Hazırlıkta','İniş alanı doğrulanıyor.'],payment:['Beklemede','Süreç tamamlanana kadar korunur.'],approval:['Henüz yok','Fotoğraf adımı sırada.']},
    {hero:'YZ operasyon planı oluştu',heroText:'Merkez, siparişi fiziksel göreve çevirdi.',route:2,step:'ADIM 03',status:'YZ OPERASYON PLANI',icon:'✦',title:'Yapay zekâ merkezi fiyatı, drone ve lojistik görevini birlikte yönetir.',text:`${p.location} için iniş alanı ve ${p.station} teslim noktasıyla görev tanımlanır.`,grid:[['Merkez','Aktif'],['İniş alanı','Tanımlı'],['Teslim noktası',p.station],['Görev','Drone atandı']],consumer:['Süreç işleniyor','Operasyon hazırlanıyor.'],farmer:['Toplama görevi başladı','Siparişe göre hazırlık yapıyor.'],center:['Görev planı hazır','Rota hesaplandı.'],drone:['Görev atandı','Kalkış hazırlığı başladı.'],payment:['Beklemede','Fiziksel doğrulama bekleniyor.'],approval:['Henüz yok','Fotoğraf aşaması yaklaştı.']},
    {hero:'Bahçeden toplama başladı',heroText:'Çiftçi ürünleri bahçede toplamaya başladı.',route:2,step:'ADIM 04',status:'BAHÇEDEN TOPLAMA',icon:'🧺',title:'Çiftçi ürünleri toplar ve hazırlar.',text:`Siparişe uygun ${p.name} ürünleri bahçeden seçilir.`,grid:[['Süreç','Toplama devam ediyor'],['Ürün',p.name],['Kalite','İlk kontrol yapılıyor'],['Hedef','20 kg hazırlık']],consumer:['Toplama sürüyor','Uygulamada ilerleme görülür.'],farmer:['Toplama yapılıyor','Ürünler hazırlanıyor.'],center:['Sahadan veri geliyor','Foto onay aşamasına geçilecek.'],drone:['Beklemede','Onay sonrası çağrılacak.'],payment:['Beklemede','Görev tamamlanana kadar korunur.'],approval:['Hazırlanıyor','Fotoğraflar birazdan gönderilecek.']},
    {hero:'Fotoğraflar gönderildi',heroText:'Vatandaş ürünleri uygulama içinden inceliyor.',route:3,step:'ADIM 05',status:'FOTOĞRAF VE ONAY',icon:'📸',title:'Çiftçi ürün fotoğraflarını vatandaşa yollar.',text:'Vatandaş ürünleri görür ve onay verdiğinde süreç devam eder.',grid:[['Gönderim','Hasat fotoğrafları'],['İnceleme','Uygulama içi'],['Karar','Onay / düzeltme'],['Amaç','Şeffaflık']],consumer:['Fotoğraflar geldi','Vatandaş inceleyip onay veriyor.'],farmer:['Fotoğraflar gönderildi','Tüketici onayı bekleniyor.'],center:['Onay bekleniyor','Sonraki görev paketleme.'],drone:['Hazır bekliyor','Onayla birlikte çağrılacak.'],payment:['Beklemede','Onay sonrası paketleme akışı.'],approval:['Gönderildi','Vatandaş fotoğrafları inceliyor.']},
    {hero:'Paket hazırlandı',heroText:'Çiftçi görevi tamamla butonuna bastı.',route:4,step:'ADIM 06',status:'PAKET VE GÖREV TAMAMLAMA',icon:'📦',title:'Onay sonrası çiftçi paketi hazırlar.',text:'Paket hazırlanır, görev tamamlanır ve drone için iniş alanı aktif olur.',grid:[['Karar','Vatandaş onayı verdi'],['Paket','Hazır'],['Çiftçi işlemi','Görev tamamla'],['Saha','İniş alanı aktif']],consumer:['Onay verildi','Teslimat hazırlığı başladı.'],farmer:['Paket hazırlandı','Drone çağrıldı.'],center:['Toplama penceresi açıldı','Drone iniş süreci aktif.'],drone:['İniş için yaklaşıyor','Toplama alanına yöneldi.'],payment:['Beklemede','Kalkış anında üretici ödemesi serbest kalacak.'],approval:['Onaylandı','Ürün görselleri kabul edildi.']},
    {hero:'Drone kalktı, çiftçi ödemesi aktarıldı',heroText:'Paket alındı ve üretici ödemesi serbest bırakıldı.',route:4,step:'ADIM 07',status:'DRONE KALKIŞI + ÖDEME',icon:'🚁',title:'Drone kalkar ve üretici ödemesi çiftçiye aktarılır.',text:'Drone havalandığı anda üreticiye ayrılan ödeme çiftçinin kayıtlı hesabına gönderilir.',grid:[['Drone','Havalandı'],['Paket','Kilitli'],['Üretici ödemesi',money(p.farmerPayout)],['Rota','Yasal uçuş hattı']],consumer:['Teslimat yolda','İstasyonda bekleme başladı.'],farmer:['Ödeme hesabına geçti','Üretici payı aktarıldı.'],center:['Uçuş aktif','Teslim ve dönüş izleniyor.'],drone:['Havada','Teslim istasyonuna ilerliyor.'],payment:['Üreticiye aktarıldı','Kalkış doğrulanınca üretici ödemesi serbest kaldı.'],approval:['Tamamlandı','Onay sonrası ürün yola çıktı.']},
    {hero:'Teslimat tamamlandı',heroText:'Ürün teslim istasyonuna bırakıldı, drone merkeze dönüyor.',route:5,step:'ADIM 08',status:'TESLİMAT VE DÖNÜŞ',icon:'🏠',title:'Ürün teslim edilir ve drone geri döner.',text:`Ürün ${p.station} noktasına bırakılır, drone aynı rota üzerinden merkeze döner.`,grid:[['Teslim','İstasyona bırakıldı'],['Vatandaş','Teslim aldı'],['Drone','Otonom dönüşte'],['Sipariş','Kapanış tamamlandı']],consumer:['Teslimat tamamlandı','Vatandaş ürünü teslim aldı.'],farmer:['Sipariş başarıyla kapandı','Teslim ve ödeme tamamlandı.'],center:['Görev tamamlandı','Uçuş kaydı kapandı.'],drone:['Merkeze dönüyor','Otonom park sürecinde.'],payment:['Tamamlandı','Üretici ödemesi başarılı.'],approval:['Sipariş kapandı','Süreç başarıyla tamamlandı.']}
  ];
}

function updateRoute(idx){document.querySelectorAll('[data-route]').forEach((n,i)=>{n.classList.toggle('active',i===idx);n.classList.toggle('done',i<idx);});}
function showStage(i){const s=stages()[i],p=products[current];heroStatus.textContent=s.hero;heroText.textContent=s.heroText;updateRoute(s.route);detailStep.textContent=s.step;detailStatus.textContent=s.status;detailIcon.textContent=s.icon;detailTitle.textContent=s.title;detailText.textContent=s.text;detailGrid.innerHTML=s.grid.map(([k,v])=>`<div><span>${k}</span><b>${v}</b></div>`).join('');liveCode.textContent=`TT-SIP-00${current+1}`;liveProduct.textContent=p.name;consumerStatus.textContent=s.consumer[0];consumerHint.textContent=s.consumer[1];farmerStatus.textContent=s.farmer[0];farmerHint.textContent=s.farmer[1];centerStatus.textContent=s.center[0];centerHint.textContent=s.center[1];droneStatus.textContent=s.drone[0];droneHint.textContent=s.drone[1];paymentStatus.textContent=s.payment[0];paymentHint.textContent=s.payment[1];approvalStatus.textContent=s.approval[0];approvalHint.textContent=s.approval[1];document.querySelectorAll('.step').forEach((b,idx)=>b.classList.toggle('active',idx===i));}
function startFlow(){if(timer)clearInterval(timer);let i=0;showStage(i);document.querySelector('#akis').scrollIntoView({behavior:'smooth'});timer=setInterval(()=>{i+=1;if(i>=stages().length){clearInterval(timer);timer=null;return;}showStage(i);},1800);}
function selectProduct(i,autoplay){current=i;renderProducts();showStage(0);if(autoplay)startFlow();}
function setupMediaTabs(){const tabs=document.querySelectorAll('.media-tab'),views=document.querySelectorAll('.media-view');tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.toggle('active',t===tab));const key=tab.dataset.media;views.forEach(view=>view.classList.toggle('active',view.dataset.view===key));}));}
function setupSceneTabs(){const tabs=document.querySelectorAll('.live-scene-tab'),panels=document.querySelectorAll('.scene-panel');tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.toggle('active',t===tab));const key=tab.dataset.scene;panels.forEach(panel=>panel.classList.toggle('active',panel.dataset.scenePanel===key));}));}

document.querySelectorAll('[data-start-flow]').forEach(b=>b.addEventListener('click',startFlow));
document.querySelectorAll('.step').forEach(b=>b.addEventListener('click',()=>{if(timer){clearInterval(timer);timer=null;}showStage(Number(b.dataset.stage));}));
installPriceUi();
renderProducts();
setupMediaTabs();
setupSceneTabs();
showStage(0);
loadOfficialPrices();

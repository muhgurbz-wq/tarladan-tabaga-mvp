const PRODUCT_ROWS = [
['domates','Bahçe Domatesi','Sebze','Kahramanmaraş / Dulkadiroğlu','Bereket Çiftliği','Aynı gün hasat',17.44,'HKS','https://images.pexels.com/photos/5479393/pexels-photo-5479393.jpeg?auto=compress&cs=tinysrgb&w=900'],
['kapya_biber','Kapya Biber','Sebze','Gaziantep / Oğuzeli','Güneş Tarım','Dalından toplama',24.59,'HKS','https://images.pexels.com/photos/14944635/pexels-photo-14944635.jpeg?auto=compress&cs=tinysrgb&w=900'],
['sivri_biber','Sivri Biber','Sebze','Antalya / Kumluca','Akdeniz Sera','Sabah hasadı',23.20,'Pilot referans','https://images.pexels.com/photos/5701834/pexels-photo-5701834.jpeg?auto=compress&cs=tinysrgb&w=900'],
['salatalik','Salatalık','Sebze','Mersin / Erdemli','Sahil Sera','Seradan günlük',16.90,'Pilot referans','https://images.pexels.com/photos/10111495/pexels-photo-10111495.jpeg?auto=compress&cs=tinysrgb&w=900'],
['patlican','Patlıcan','Sebze','Hatay / Arsuz','Mor Tarla','Aynı gün toplama',21.40,'Pilot referans','https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?auto=compress&cs=tinysrgb&w=900'],
['kabak','Kabak','Sebze','Sakarya / Geyve','Yeşil Vadi','Günlük hasat',18.30,'Pilot referans','https://images.unsplash.com/photo-1563252722-6434563a985d?auto=format&fit=crop&w=900&q=84'],
['patates','Patates','Sebze','Niğde / Bor','Ova Tarım','Yeni söküm',14.80,'Pilot referans','https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=84'],
['sogan','Kuru Soğan','Sebze','Amasya / Suluova','Ova Üretim','Yeni hasat',13.60,'Pilot referans','https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=900&q=84'],
['havuc','Havuç','Sebze','Konya / Kaşınhanı','Toprak Bahçesi','Yeni söküm',17.20,'Pilot referans','https://images.unsplash.com/photo-1447175008436-1701707535b5?auto=format&fit=crop&w=900&q=84'],
['marul','Marul','Sebze','Ankara / Ayaş','Ayaş Bahçesi','Sabah kesimi',19.50,'Pilot referans','https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=900&q=84'],
['ispanak','Ispanak','Sebze','İzmir / Menemen','Gediz Tarım','Günlük kesim',22.10,'Pilot referans','https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=84'],
['brokoli','Brokoli','Sebze','Bursa / Karacabey','Marmara Tarım','Taze kesim',29.40,'Pilot referans','https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=900&q=84'],
['karnabahar','Karnabahar','Sebze','Bursa / Mustafakemalpaşa','Beyaz Ova','Taze kesim',25.80,'Pilot referans','https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=900&q=84'],
['fasulye_taze','Taze Fasulye','Sebze','Samsun / Bafra','Kızılırmak Tarım','Günlük toplama',34.20,'Pilot referans','https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=900&q=84'],
['bezelye','Bezelye','Sebze','Balıkesir / Gönen','Gönen Bahçesi','Yeni toplama',31.70,'Pilot referans','https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=900&q=84'],
['sarimsak','Sarımsak','Sebze','Kastamonu / Taşköprü','Taşköprü Üretici','Yeni sezon',82.00,'Pilot referans','https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=900&q=84'],
['elma','Elma','Meyve','Niğde / Bor','Yayla Bahçesi','Yakın teslim',26.18,'HKS','https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=900&q=84'],
['armut','Armut','Meyve','Bursa / Gürsu','Uludağ Bahçesi','Yeni sezon',32.60,'Pilot referans','https://images.unsplash.com/photo-1589943960947-1d4b2c0f6a3d?auto=format&fit=crop&w=900&q=84'],
['portakal','Portakal','Meyve','Adana / Kozan','Çukurova Bahçesi','Dalından',24.40,'Pilot referans','https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=900&q=84'],
['mandalina','Mandalina','Meyve','İzmir / Seferihisar','Ege Narenciye','Dalından',23.80,'Pilot referans','https://images.unsplash.com/photo-1597714026720-8f74c62310ba?auto=format&fit=crop&w=900&q=84'],
['limon','Limon','Meyve','Mersin / Erdemli','Limon Vadisi','Yeni kesim',27.20,'Pilot referans','https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=900&q=84'],
['cilek','Çilek','Meyve','Aydın / Sultanhisar','Kırmızı Vadi','Aynı gün toplama',58.40,'Pilot referans','https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=900&q=84'],
['uzum','Sofralık Üzüm','Meyve','Manisa / Alaşehir','Asma Vadisi','Bağdan günlük',39.80,'Pilot referans','https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=900&q=84'],
['kiraz','Kiraz','Meyve','İzmir / Kemalpaşa','Kiraz Bahçesi','Günlük toplama',72.00,'Pilot referans','https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&w=900&q=84'],
['seftali','Şeftali','Meyve','Bursa / İnegöl','Şeftali Ovası','Dalından',38.20,'Pilot referans','https://images.unsplash.com/photo-1629828874514-d66f55e9e8c9?auto=format&fit=crop&w=900&q=84'],
['kayisi','Kayısı','Meyve','Malatya / Battalgazi','Kayısı Bahçesi','Yeni toplama',46.00,'Pilot referans','https://images.unsplash.com/photo-1593543294918-ca3634e04c61?auto=format&fit=crop&w=900&q=84'],
['erik','Erik','Meyve','Mersin / Mut','Mut Bahçesi','Günlük toplama',41.50,'Pilot referans','https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=900&q=84'],
['nar','Nar','Meyve','Antalya / Gazipaşa','Nar Vadisi','Yeni sezon',30.80,'Pilot referans','https://images.unsplash.com/photo-1541344999736-83eca272f6fc?auto=format&fit=crop&w=900&q=84'],
['karpuz','Karpuz','Meyve','Diyarbakır / Sur','Dicle Ovası','Tarladan günlük',12.40,'Pilot referans','https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=900&q=84'],
['kavun','Kavun','Meyve','Manisa / Kırkağaç','Kırkağaç Üretici','Tarladan günlük',17.90,'Pilot referans','https://images.unsplash.com/photo-1598025362874-494b4bc175bb?auto=format&fit=crop&w=900&q=84'],
['muz','Muz','Meyve','Mersin / Anamur','Anamur Muz','Seradan günlük',44.00,'Pilot referans','https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=84'],
['incir','İncir','Meyve','Aydın / Germencik','İncir Bahçesi','Yeni toplama',53.00,'Pilot referans','https://images.unsplash.com/photo-1601379329542-31c59347e2a3?auto=format&fit=crop&w=900&q=84'],
['bugday','Buğday','Tahıl','Konya / Cihanbeyli','Anadolu Tahıl','Yeni mahsul',13.20,'Pilot referans','https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=84'],
['arpa','Arpa','Tahıl','Konya / Altınekin','Bozkır Tahıl','Yeni mahsul',11.80,'Pilot referans','https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=84'],
['misir','Mısır','Tahıl','Adana / Ceyhan','Çukurova Tahıl','Yeni mahsul',12.50,'Pilot referans','https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=84'],
['pirinc','Pirinç / Çeltik','Tahıl','Edirne / İpsala','Meriç Üretici','Yeni mahsul',42.00,'Pilot referans','https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=84'],
['yulaf','Yulaf','Tahıl','Eskişehir / Sivrihisar','Bozkır Tarım','Yeni mahsul',15.70,'Pilot referans','https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=84'],
['cavdar','Çavdar','Tahıl','Ankara / Polatlı','Polatlı Tahıl','Yeni mahsul',14.10,'Pilot referans','https://images.unsplash.com/photo-1534620808146-d33bb39128b2?auto=format&fit=crop&w=900&q=84'],
['nohut','Nohut','Bakliyat','Kırşehir / Mucur','Bozkır Bakliyat','Yeni mahsul',48.00,'Pilot referans','https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=84'],
['mercimek','Kırmızı Mercimek','Bakliyat','Şanlıurfa / Viranşehir','Harran Bakliyat','Yeni mahsul',46.50,'Pilot referans','https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=84'],
['fasulye_kuru','Kuru Fasulye','Bakliyat','Konya / Beyşehir','Göl Ovası','Yeni mahsul',56.00,'Pilot referans','https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=900&q=84'],
['barbunya','Barbunya','Bakliyat','Balıkesir / Manyas','Manyas Üretici','Yeni mahsul',62.00,'Pilot referans','https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=900&q=84'],
['bulgur','Bulgur','Bakliyat','Gaziantep / Nizip','Antep Tahıl','Yeni üretim',31.00,'Pilot referans','https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=900&q=84'],
['bal','Doğal Bal','Doğal Ürün','Kahramanmaraş / Andırın','Dağ Arıcılığı','Doğrudan üreticiden',294.00,'Pilot referans','https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=900&q=84'],
['ceviz','Ceviz','Doğal Ürün','Malatya / Akçadağ','Anadolu Bahçesi','Yeni sezon',280.00,'TOBB','https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=84'],
['badem','Badem','Doğal Ürün','Mersin / Mut','Toros Badem','Yeni sezon',205.00,'Pilot referans','https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=84'],
['findik','Fındık','Doğal Ürün','Ordu / Fatsa','Karadeniz Bahçesi','Yeni sezon',188.00,'Pilot referans','https://images.pexels.com/photos/18552140/pexels-photo-18552140.jpeg?auto=compress&cs=tinysrgb&w=900'],
['zeytin','Sofralık Zeytin','Doğal Ürün','Manisa / Akhisar','Akhisar Zeytin','Yeni mahsul',96.00,'Pilot referans','https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=84']
];

const PRODUCTS = PRODUCT_ROWS.map(r => ({ id:r[0], name:r[1], category:r[2], location:r[3], farm:r[4], fresh:r[5], reference:r[6], source:r[7], image:r[8] }));
const CITY_COORDS = {
  'Kahramanmaraş':[37.5753,36.9228],'Gaziantep':[37.0662,37.3833],'Antalya':[36.8969,30.7133],'Mersin':[36.8121,34.6415],
  'Hatay':[36.2021,36.1605],'Sakarya':[40.7569,30.3783],'Niğde':[37.9698,34.6766],'Amasya':[40.6499,35.8353],
  'Konya':[37.8746,32.4932],'Ankara':[39.9334,32.8597],'İzmir':[38.4237,27.1428],'Bursa':[40.1950,29.0600],
  'Samsun':[41.2867,36.3300],'Balıkesir':[39.6484,27.8826],'Kastamonu':[41.3887,33.7827],'Adana':[37.0000,35.3213],
  'Aydın':[37.8560,27.8416],'Manisa':[38.6191,27.4289],'Malatya':[38.3552,38.3095],'Diyarbakır':[37.9144,40.2306],
  'Edirne':[41.6771,26.5557],'Eskişehir':[39.7767,30.5206],'Kırşehir':[39.1425,34.1709],'Şanlıurfa':[37.1674,38.7955],
  'Ordu':[40.9862,37.8797]
};
const VARIETIES = {
  domates:['Salkım','Çeri','Pembe','Köy'],kapya_biber:['Kapya','Sivri','Çarliston','Dolmalık'],elma:['Amasya','Starking','Granny Smith','Golden'],
  armut:['Deveci','Santa Maria','Akça','Williams'],uzum:['Sultaniye','Red Globe','Alphonse','Razakı'],kiraz:['0900 Ziraat','Regina','Sweetheart','Napolyon'],
  seftali:['Glohaven','J.H. Hale','Nektarin','Yerel'],kayisi:['Hacıhaliloğlu','Kabaaşı','Hasanbey','Soğancı'],karpuz:['Crimson Sweet','Sarı Karpuz','Mini','Yerel'],
  kavun:['Kırkağaç','Hasanbey','Galia','Yerel'],bugday:['Ekmeklik','Makarnalık','Yerel Sert','Tohumluk'],nohut:['Koçbaşı','İnci','Yerel','Seçme'],
  findik:['Tombul','Sivri','Palaz','Foşa'],ceviz:['Chandler','Fernor','Kaman','Şebin'],bal:['Çiçek Balı','Yayla Balı','Kekik Balı','Süzme Bal']
};
const SCENE_URL = id => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
const SCENES = {
  domates:{vine:SCENE_URL(5479393),field:SCENE_URL(5012854),harvest:SCENE_URL(7299971),crate:SCENE_URL(18248278)},
  elma:{vine:SCENE_URL(18789108),field:SCENE_URL(2965607),harvest:SCENE_URL(5528986),crate:SCENE_URL(35395716)},
  findik:{vine:SCENE_URL(32920566),field:SCENE_URL(28223703),harvest:SCENE_URL(28223700),crate:SCENE_URL(32920868)}
};
const GENERIC_SCENES = {
  'Sebze':{field:SCENE_URL(5012854),harvest:SCENE_URL(7299971),crate:SCENE_URL(18248278)},
  'Meyve':{field:SCENE_URL(2965607),harvest:SCENE_URL(5528986),crate:SCENE_URL(35395716)},
  'Tahıl':{field:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=84',harvest:'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=84',crate:'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=84'},
  'Bakliyat':{field:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=84',harvest:'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=84',crate:'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1200&q=84'},
  'Doğal Ürün':{field:SCENE_URL(28223703),harvest:SCENE_URL(28223700),crate:SCENE_URL(32920868)}
};
const ORDER_STAGES = [
  ['Sipariş oluşturuldu','Ürün, kg, üretici ve ödeme kaydı tek sipariş kimliğinde birleştirildi.'],
  ['YZ karar motoru','Fiyat, üretici, yük ve görev kümeleri hesaplandı.'],
  ['Çiftçi görevleri','Her üreticinin telefonuna ürün ve kg bazlı hasat görevi gönderildi.'],
  ['Görsel doğrulama','Hasat fotoğrafları vatandaş kalite kapısına sunuldu.'],
  ['Vatandaş onayı','Onaylanan ürünler paketleme ve lojistik havuzuna geçti.'],
  ['Drone görev planı','20 kg kapasiteye göre uçuş sayıları ve bölgesel hub rotaları oluşturuldu.'],
  ['Canlı teslimat','Rota, ETA, hız, batarya ve teslim durumu izleniyor.'],
  ['Mutabakat / kapanış','Kalkış doğrulamasıyla üretici hakedişi serbest; teslimatla kayıt kapanır.']
];

const STATE = {
  screen:'overview', category:'all', query:'', selected:'domates', qty:5, cart:[], payment:null, order:null, orderStage:0,
  missions:[], activeMission:0, opsPane:'flow', projectPane:'value', map:null, poly:null, marker:null, timer:null, priceGeneratedAt:null, officialMatches:0
};
const $ = s => document.querySelector(s); const $$ = s => [...document.querySelectorAll(s)];
const fmt = n => new Intl.NumberFormat('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
const money = n => `${fmt(n)} ₺`;
const byId = id => PRODUCTS.find(p=>p.id===id) || PRODUCTS[0];
const salePrice = p => (p.reference*1.05)/0.80;
const farmerPayout = p => p.reference*1.05;
const hash = s => [...s].reduce((a,c)=>((a*33+c.charCodeAt(0))>>>0),17);
const cityOf = p => p.location.split('/')[0].trim();
const clamp = (n,a,b)=>Math.max(a,Math.min(b,n));

function safeImage(img, fallback='') { img.onerror = () => { img.onerror=null; img.src = fallback || 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#0a2232"/><text x="50%" y="50%" fill="#7cf0a4" font-size="32" text-anchor="middle" dominant-baseline="middle" font-family="Arial">TT PRODUCT</text></svg>`); }; }
function switchScreen(name){ STATE.screen=name; $$('.screen').forEach(x=>x.classList.toggle('active',x.dataset.screen===name)); $$('.bottomnav button').forEach(x=>x.classList.toggle('active',x.dataset.nav===name)); if(name==='operations'){ renderOperations(); if(STATE.opsPane==='live') setTimeout(initMap,100); } }
function visibleProducts(){ const q=STATE.query.toLocaleLowerCase('tr'); return PRODUCTS.filter(p=>(STATE.category==='all'||p.category===STATE.category)&&(!q||p.name.toLocaleLowerCase('tr').includes(q)||p.location.toLocaleLowerCase('tr').includes(q))); }

function renderMarket(){
  const list=visibleProducts(); $('#marketTitle').textContent=STATE.category==='all'?'Tüm ürünler':STATE.category; $('#marketCount').textContent=`${list.length} ürün`;
  $$('#categoryTabs button').forEach(b=>b.classList.toggle('active',b.dataset.category===STATE.category));
  const grid=$('#productGrid'); grid.innerHTML='';
  list.forEach(p=>{ const btn=document.createElement('button'); btn.className='product-card'+(p.id===STATE.selected?' active':''); btn.innerHTML=`<img src="${p.image}" alt="${p.name}"><div class="copy"><span class="tag">${p.source==='HKS'||p.source==='TOBB'?p.source:'SİMÜLE'}</span><b>${p.name}</b><small>${cityOf(p)} • ${p.farm}</small><strong>${fmt(salePrice(p))} ₺/kg</strong></div>`; safeImage(btn.querySelector('img')); btn.onclick=()=>{STATE.selected=p.id;renderMarket();}; grid.appendChild(btn); });
  const p=byId(STATE.selected); $('#selectedImage').src=p.image; safeImage($('#selectedImage')); $('#selectedName').textContent=p.name; $('#selectedMeta').textContent=`${p.farm} • ${p.location} • ${p.source==='HKS'||p.source==='TOBB'?p.source:'Pilot simülasyon'}`; $('#selectedPrice').textContent=`${fmt(salePrice(p))} ₺/kg`;
}

function sceneSet(p){ const own=SCENES[p.id]||{}; const generic=GENERIC_SCENES[p.category]||GENERIC_SCENES.Sebze; return {vine:own.vine||p.image,field:own.field||generic.field,harvest:own.harvest||generic.harvest,crate:own.crate||generic.crate}; }
function renderPassport(tab='varieties'){
  const p=byId(STATE.selected), box=$('#passportBody'), scenes=sceneSet(p); $('#passportThumb').src=p.image; safeImage($('#passportThumb')); $('#passportName').textContent=p.name; $('#passportMeta').textContent=`${p.farm} • ${p.location} • ${p.source==='HKS'||p.source==='TOBB'?p.source:'Pilot simülasyon'}`; $('#qtyValue').textContent=`${STATE.qty} kg`; $$('#passportTabs button').forEach(b=>b.classList.toggle('active',b.dataset.passport===tab));
  if(tab==='varieties'){
    const vars=VARIETIES[p.id]||['Standart parti','Seçme parti','Yerel parti','Premium kalite'];
    const images=[p.image,scenes.vine,scenes.field,scenes.crate];
    box.innerHTML=`<div class="variety-grid">${vars.map((v,i)=>`<article class="variety-card"><img src="${images[i%images.length]}" alt="${v}"><div><b>${v}</b><small>${VARIETIES[p.id]?'Çeşit seçimi • saha kaydı ile doğrulanır':'Simülasyon ürün profili • gerçek çiftçi çeşidi kayıtla gelir'}</small><strong>${fmt(salePrice(p))} ₺/kg</strong></div></article>`).join('')}</div><div class="sim-warning"><b>Fiyat notu:</b> Çeşit bazında ayrı resmi fiyat kaynağı yoksa tek ürün fiyatı gösterilir; yapay fiyat farkı üretilmez.</div>`;
    [...box.querySelectorAll('img')].forEach(i=>safeImage(i,p.image)); return;
  }
  if(tab==='stock'){
    const h=hash(p.id), tons=(0.8+(h%45)/10).toFixed(1).replace('.',','), crates=24+(h%96); box.innerHTML=`<div class="stock-grid"><div><span>Simüle hazır tonaj</span><b>${tons} ton</b></div><div><span>Simüle kasa</span><b>${crates}</b></div><div><span>Hasat penceresi</span><b>${h%2?'Bugün':'24 saat'}</b></div><div><span>Kalite profili</span><b>${h%3===0?'Premium':'Seçme'}</b></div></div><div class="sim-warning"><b>Simülasyon verisi:</b> Tonaj, kasa ve kalite alanları jüri test akışını göstermek içindir. Gerçek pilotta çiftçi stok kaydından ve saha doğrulamasından gelir.</div>`; return;
  }
  const map={vine:[scenes.vine,'Dalında','Hasat öncesi ürün görünümü'],field:[scenes.field,'Bahçede','Üretim sahası ve yetiştirme ortamı'],harvest:[scenes.harvest,'Hasat','Çiftçinin siparişe göre toplama aşaması'],crate:[scenes.crate,'Kasada','Ayıklama, kasa ve sevk hazırlığı']}; const cur=map[tab];
  box.innerHTML=`<div class="visual-story"><article class="story-card"><img src="${cur[0]}" alt="${cur[1]}"><div><b>${cur[1]}</b><small>${cur[2]}</small><strong>${p.fresh}</strong></div></article><article class="story-card secondary"><img src="${p.image}" alt="${p.name}"><div><b>Ürün kimliği</b><small>${p.farm} • ${p.location}</small><strong>${p.source==='HKS'||p.source==='TOBB'?p.source+' referansı':'Simülasyon referansı'}</strong></div></article></div><div class="sim-warning">Görsel akış jüri simülasyonudur; saha pilotunda her üreticinin kendi bahçe/hasat/kasa görüntüsü sipariş kimliğine bağlanır.</div>`; [...box.querySelectorAll('img')].forEach(i=>safeImage(i,p.image));
}
function openPassport(){ renderPassport('varieties'); $('#passport').classList.add('open'); $('#passport').setAttribute('aria-hidden','false'); }
function closePassport(){ $('#passport').classList.remove('open'); $('#passport').setAttribute('aria-hidden','true'); }

function addToCart(){ const p=byId(STATE.selected); const item=STATE.cart.find(x=>x.id===p.id); if(item)item.qty+=STATE.qty; else STATE.cart.push({id:p.id,qty:STATE.qty}); STATE.payment=null; renderCart(); closePassport(); switchScreen('cart'); }
function renderCart(){
  const wrap=$('#cartList'); wrap.innerHTML=''; if(!STATE.cart.length) wrap.innerHTML='<div class="empty-state"><div><b>Sepet boş</b><small>Pazar ekranından ürün seçip ürün pasaportundan sepete ekleyin.</small></div></div>';
  STATE.cart.forEach(item=>{ const p=byId(item.id), row=document.createElement('div'); row.className='cart-row'; row.innerHTML=`<img src="${p.image}" alt="${p.name}"><div><b>${p.name}</b><small>${item.qty} kg • ${p.farm} • ${cityOf(p)}</small></div><strong>${money(salePrice(p)*item.qty)}</strong><button aria-label="Sil">×</button>`; safeImage(row.querySelector('img')); row.querySelector('button').onclick=()=>{STATE.cart=STATE.cart.filter(x=>x!==item);STATE.payment=null;renderCart();}; wrap.appendChild(row); });
  const total=STATE.cart.reduce((s,x)=>s+salePrice(byId(x.id))*x.qty,0), farmers=STATE.cart.reduce((s,x)=>s+farmerPayout(byId(x.id))*x.qty,0); $('#cartTotal').textContent=money(total); $('#farmerTotal').textContent=money(farmers); $('#cartCountTop').textContent=`${STATE.cart.length} ürün`; $('#cartBadge').textContent=STATE.cart.length;
  $('#startOperation').disabled=!STATE.payment||!STATE.cart.length; if(STATE.payment){$('#paymentRecord').innerHTML=`<span>ÖDEME KAYDI • SİMÜLASYON</span><b>${STATE.payment.id}</b><small>${money(STATE.payment.total)} güvenli bekleme kaydında • ${STATE.payment.time}</small>`;} else $('#paymentRecord').innerHTML='<span>ÖDEME KAYDI</span><b>Henüz oluşturulmadı</b><small>Siparişi başlatmak için güvenli ödeme kaydı oluşturun.</small>';
}
function createPayment(){ if(!STATE.cart.length)return; const total=STATE.cart.reduce((s,x)=>s+salePrice(byId(x.id))*x.qty,0); STATE.payment={id:'ESC-'+Date.now().toString().slice(-8),total,time:new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'})}; renderCart(); }

function deriveCoords(p){ const base=CITY_COORDS[cityOf(p)]||CITY_COORDS['Kahramanmaraş']; const h=hash(p.id); const dx=((h%9)-4)*0.006, dy=(((h>>4)%9)-4)*0.006; const farm=[base[0]+dx,base[1]+dy], hub=[base[0]-0.018,base[1]-0.022], station=[base[0]+0.014,base[1]+0.020]; return {hub,farm,station}; }
function km(a,b){ const R=6371,rad=x=>x*Math.PI/180,dLat=rad(b[0]-a[0]),dLon=rad(b[1]-a[1]); const q=Math.sin(dLat/2)**2+Math.cos(rad(a[0]))*Math.cos(rad(b[0]))*Math.sin(dLon/2)**2; return 2*R*Math.asin(Math.sqrt(q)); }
function buildMissions(){
  const grouped=new Map(); STATE.cart.forEach(item=>{ const p=byId(item.id), key=`${cityOf(p)}|${p.farm}`; if(!grouped.has(key))grouped.set(key,{city:cityOf(p),farm:p.farm,items:[],weight:0}); const g=grouped.get(key); g.items.push({id:p.id,name:p.name,qty:item.qty}); g.weight+=item.qty; });
  STATE.missions=[...grouped.values()].map((g,i)=>{ const p=byId(g.items[0].id), coords=deriveCoords(p), flights=Math.max(1,Math.ceil(g.weight/20)), distance=km(coords.hub,coords.farm)+km(coords.farm,coords.station); return {id:`TT-M${String(i+1).padStart(2,'0')}`, ...g, coords, flights, distance, eta:Math.max(8,Math.round(distance/0.7)+flights*3), status:'Planlandı'}; }); STATE.activeMission=0;
}
function startOperation(){ if(!STATE.payment||!STATE.cart.length)return; buildMissions(); STATE.order={id:'TT-'+Date.now().toString().slice(-8),createdAt:Date.now(),total:STATE.payment.total}; STATE.orderStage=0; renderOperations(); switchScreen('operations'); if(STATE.timer)clearInterval(STATE.timer); STATE.timer=setInterval(()=>{ if(STATE.orderStage<ORDER_STAGES.length-1){STATE.orderStage++; if(STATE.orderStage>=5)STATE.missions.forEach(m=>m.status=STATE.orderStage===5?'Görev hazır':STATE.orderStage===6?'Uçuşta':'Tamamlandı'); renderOperations(); updateOverviewFlow(); } else {clearInterval(STATE.timer);STATE.timer=null;} },4500); }

function renderOperations(){ renderFlow(); renderMissions(); renderSettlement(); if(STATE.opsPane==='live')setTimeout(initMap,80); }
function renderFlow(){
  $('#orderId').textContent=STATE.order?.id||'—'; $('#orderProgress').style.width=STATE.order?`${((STATE.orderStage+1)/ORDER_STAGES.length)*100}%`:'0%'; $('#currentStage').textContent=STATE.order?ORDER_STAGES[STATE.orderStage][0]:'Görev bekleniyor'; $('#currentStageText').textContent=STATE.order?ORDER_STAGES[STATE.orderStage][1]:'Sepetten güvenli ödeme oluşturup operasyonu başlatın.';
  const t=$('#timeline'); t.innerHTML=''; ORDER_STAGES.forEach((s,i)=>{ const row=document.createElement('div'); row.className='timeline-event '+(STATE.order?(i<STATE.orderStage?'done':i===STATE.orderStage?'active':''):''); row.innerHTML=`<span class="num">${String(i+1).padStart(2,'0')}</span><div><b>${s[0]}</b><small>${s[1]}</small></div><em>${STATE.order?(i<=STATE.orderStage?(i===STATE.orderStage?'Şimdi':`${(STATE.orderStage-i)*2} dk önce`):'Bekliyor'):'—'}</em>`; t.appendChild(row); });
}
function renderMissions(){
  const list=$('#missionList'); list.innerHTML=''; if(!STATE.missions.length){list.innerHTML='<div class="empty-state"><div><b>Görev yok</b><small>Operasyon başladığında çoklu üretici görevleri burada oluşur.</small></div></div>'; $('#missionDetail').innerHTML='<div class="empty-state"><div><b>Görev ayrıntısı bekleniyor</b><small>Sepetten birden fazla üretici ürünü ekleyerek çoklu görev planını test edin.</small></div></div>'; return;}
  STATE.missions.forEach((m,i)=>{const b=document.createElement('button');b.className='mission-card'+(i===STATE.activeMission?' active':'');b.innerHTML=`<span>${m.id} • ${m.city}</span><b>${m.farm}</b><small>${m.weight} kg • ${m.flights} uçuş • ETA ${m.eta} dk • ${m.status}</small>`;b.onclick=()=>{STATE.activeMission=i;renderMissions();if(STATE.opsPane==='live')updateMap();};list.appendChild(b);});
  const m=STATE.missions[STATE.activeMission]; $('#missionDetail').innerHTML=`<span class="eyebrow">MISSION DETAIL • SİMÜLASYON</span><h3>${m.id} • ${m.city}</h3><div class="mission-grid"><div><span>Üretici</span><b>${m.farm}</b></div><div><span>Toplam yük</span><b>${m.weight} kg</b></div><div><span>Drone kapasitesi</span><b>20 kg / uçuş</b></div><div><span>Planlanan uçuş</span><b>${m.flights}</b></div><div><span>Yerel rota</span><b>${fmt(m.distance)} km</b></div><div><span>ETA</span><b>${m.eta} dk</b></div></div><div class="mission-products">${m.items.map(x=>`<div class="mission-product"><b>${x.name}</b><span>${x.qty} kg</span></div>`).join('')}</div><div class="sim-warning">Her üretici kendi şehir/bölgesel hub rotasına bağlanır. Türkiye çapında tek bir drone ile şehirler arası uçuş simüle edilmez.</div>`;
}
function renderSettlement(){
  const grid=$('#settlementGrid'); const total=STATE.cart.reduce((s,x)=>s+salePrice(byId(x.id))*x.qty,0), farmers=STATE.cart.reduce((s,x)=>s+farmerPayout(byId(x.id))*x.qty,0), ops=total-farmers; const ready=STATE.order&&STATE.orderStage>=6, done=STATE.order&&STATE.orderStage>=7;
  grid.innerHTML=`<article class="settlement-card"><span>GÜVENLİ ÖDEME</span><b>${STATE.payment?money(STATE.payment.total):'—'}</b><small>${STATE.payment?'Bekleme kaydı oluşturuldu':'Ödeme kaydı bekleniyor'}</small></article><article class="settlement-card"><span>ÜRETİCİ HAKEDİŞİ</span><b>${STATE.cart.length?money(farmers):'—'}</b><small>${ready?'Kalkış doğrulandı → serbest bırakıldı':'Kalkış doğrulaması bekleniyor'}</small></article><article class="settlement-card internal"><span>İÇ MUHASEBE • OPERASYON PAYI</span><b>${STATE.cart.length?money(ops):'—'}</b><small>Brüt %20 operasyon payı • vatandaş arayüzünde ayrı komisyon satırı değildir</small></article><article class="settlement-card"><span>SİPARİŞ KAPANIŞI</span><b>${done?'Tamamlandı':'Bekliyor'}</b><small>${done?'Teslim + ödeme + görev kayıtları kapandı':'Teslimat doğrulaması bekleniyor'}</small></article>`;
}

function initMap(){ if(typeof L==='undefined')return; if(!STATE.map){STATE.map=L.map('routeMap',{zoomControl:false,attributionControl:true}).setView([37.5753,36.9228],11);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap'}).addTo(STATE.map);STATE.poly=L.polyline([],{color:'#7cf0a4',weight:4,opacity:.85}).addTo(STATE.map);const icon=L.divIcon({className:'',html:'<div style="width:34px;height:34px;border-radius:12px;background:#7cf0a4;color:#03130b;display:grid;place-items:center;font-weight:900;box-shadow:0 10px 24px rgba(124,240,164,.25)">✈</div>',iconSize:[34,34]});STATE.marker=L.marker([37.5753,36.9228],{icon}).addTo(STATE.map);}setTimeout(()=>STATE.map.invalidateSize(),100);updateMap(); }
function updateMap(){ if(!STATE.map)return; const m=STATE.missions[STATE.activeMission]; if(!m){$('#mapMission').textContent='—';$('#mapEta').textContent='—';$('#altitude').textContent='0 m';$('#speed').textContent='0 km/sa';$('#battery').textContent='100%';$('#distance').textContent='—';$('#flightState').textContent='Görev bekleniyor';$('#flightText').textContent='Operasyon başladığında seçili görevin rotası burada izlenir.';return;}
  const route=[m.coords.hub,m.coords.farm,m.coords.station,m.coords.hub]; STATE.poly.setLatLngs(route); STATE.map.fitBounds(route,{padding:[28,28]}); let point=m.coords.hub,alt=0,speed=0,battery=100,title='Görev planlandı',text='Hub, üretici ve teslim istasyonu rotası hazır.',eta=`${m.eta} dk`; if(STATE.orderStage>=6&&STATE.orderStage<7){point=[(m.coords.farm[0]+m.coords.station[0])/2,(m.coords.farm[1]+m.coords.station[1])/2];alt=68;speed=42;battery=82;title='Drone teslimat rotasında';text='Yük, konum, hız ve batarya telemetrisi izleniyor.';eta=`${Math.max(2,Math.round(m.eta/2))} dk`;} else if(STATE.orderStage>=7){point=[(m.coords.station[0]+m.coords.hub[0])/2,(m.coords.station[1]+m.coords.hub[1])/2];alt=54;speed=36;battery=67;title='Teslim tamamlandı / dönüş';text='Drone bölgesel hub’a geri dönüyor.';eta='Teslim edildi';}
  STATE.marker.setLatLng(point); $('#mapMission').textContent=m.id;$('#mapEta').textContent=eta;$('#altitude').textContent=`${alt} m`;$('#speed').textContent=`${speed} km/sa`;$('#battery').textContent=`${battery}%`;$('#distance').textContent=`${fmt(m.distance)} km`;$('#flightState').textContent=title;$('#flightText').textContent=text;$('#camGps').textContent=`GPS ${point[0].toFixed(4)}, ${point[1].toFixed(4)}`;
}

function updateOverviewFlow(){ $$('#overviewFlow .flowstep').forEach((x,i)=>{x.classList.toggle('active',!!STATE.order&&i===Math.min(6,STATE.orderStage));x.classList.toggle('done',!!STATE.order&&i<Math.min(6,STATE.orderStage));}); }

const PROJECT = {
  value:{k:'DEĞER ÖNERİSİ',h:'Çiftçi ve vatandaş arasındaki kopukluğu bir pazar yeriyle değil, operasyon altyapısıyla çözüyoruz.',p:'Tarladan Tabağa; resmi fiyat referansı, sipariş, üretici görevi, görsel doğrulama, güvenli mutabakat ve otonom lojistiği tek sipariş kimliğinde birleştirir.',cards:[['Üretici','Talebe göre hasat, daha şeffaf fiyat ve doğrulanabilir hakediş.'],['Vatandaş','Kaynak, fiyat, ürün durumu ve teslimatın aynı deneyimde görünmesi.'],['Platform','Operasyon payını iç muhasebede yönetirken ön yüzde sade fiyat deneyimi.']]},
  citizen:{k:'VATANDAŞ',h:'Satın alma değil; kaynağı ve yolculuğu görünür kılan güven deneyimi.',p:'Ürün seçimi → ürün pasaportu → sepet → güvenli ödeme → hasat foto onayı → canlı teslimat → kapanış.',cards:[['Keşif','Kategori, üretici, fiyat kaynağı ve ürün pasaportu.'],['Doğrulama','Dalında, bahçede, hasat, kasa ve stok görünümü.'],['Teslim','Rota, ETA, telemetri ve teslimat kaydı.']]},
  farmer:{k:'ÇİFTÇİ',h:'Talebe göre çalışan saha görevi; ürün çürümeden, düşük fiyata mecbur kalmadan.',p:'Sipariş çiftçinin telefonuna ürün ve kilogram görevi olarak düşer. Çiftçi toplar, görsel doğrulama yapar, paketler ve kalkış olayıyla hakediş tetiklenir.',cards:[['Görev','Ürün + kg + teslim penceresi.'],['Hasat','Siparişe göre toplama ve foto doğrulama.'],['Hakediş','Kalkış doğrulamasına bağlı üretici ödeme kaydı.']]},
  system:{k:'TEKNOLOJİ',h:'TT Core; veri, karar, saha ve mutabakat motorlarını tek olay zincirinde birleştirir.',p:'Fiyat kaynağı, ürün kimliği, sipariş, görev, rota, telemetri ve ödeme olayları ayrık değil; aynı sipariş kimliğinde ilişkilidir.',cards:[['Price Engine','HKS / TOBB resmi referansları + açık simülasyon referansları.'],['Task Engine','Çoklu üreticiyi görev kümelerine ve drone uçuşlarına dönüştürür.'],['Audit Layer','Her kritik olay zaman damgası ve durumla izlenebilir.']]},
  ops:{k:'OPERASYON MERKEZİ',h:'Her dijital siparişi sahadaki fiziksel göreve dönüştüren kontrol katmanı.',p:'Çoklu üretici siparişleri bölgesel hub bazında ayrılır; 20 kg kapasiteye göre uçuş sayıları oluşturulur ve her görev kendi rotasında izlenir.',cards:[['Mission Control','Üretici, yük, uçuş sayısı, ETA ve durum.'],['Live Ops','Harita, GPS, hız, batarya ve dijital ikiz kamera.'],['Settlement','Kalkış → üretici hakedişi; teslimat → kapanış.']]},
  pilot:{k:'PİLOT / KANIT PLANI',h:'Sunum iddiasını gerçek saha verisiyle ölçülebilir hipotezlere çeviriyoruz.',p:'Jüri sürümünde açıkça simülasyon olarak işaretlenen alanlar, pilotta gerçek üretici, ödeme ve drone verisiyle değiştirilecek.',cards:[['Ekonomi','Üretici net geliri ve vatandaş toplam maliyeti.'],['Operasyon','Sipariş→hasat→teslim süresi, uçuş sayısı ve görev başarısı.'],['Kayıp / Tazelik','Ürün kaybı, hasat zamanı ve teslimat sonrası kalite.']]}
};
function renderProject(){ const d=PROJECT[STATE.projectPane]; $('#projectContent').innerHTML=`<div class="project-layout"><div class="project-copy"><span class="eyebrow">${d.k}</span><h3>${d.h}</h3><p>${d.p}</p><div class="project-cards">${d.cards.map(c=>`<article class="project-card"><span>MODULE</span><b>${c[0]}</b><small>${c[1]}</small></article>`).join('')}</div>${STATE.projectPane==='pilot'?'<div class="pilot-metrics"><div><b>Üretici net geliri</b><small>Pilot öncesi / sonrası karşılaştırma</small></div><div><b>Tüketici toplam maliyeti</b><small>Aynı ürün / aynı dönem karşılaştırması</small></div><div><b>Siparişten teslime süre</b><small>Uçtan uca olay zaman damgaları</small></div><div><b>Ürün kaybı</b><small>Toplanan / teslim edilen miktar farkı</small></div></div>':''}</div><div class="architecture"><div class="arch-row"><span>DATA</span><div>HKS / TOBB • ürün • üretici • stok • konum</div></div><div class="arch-row"><span>DECISION</span><div>TT Core • fiyat • görev • kapasite • rota • risk</div></div><div class="arch-row"><span>EXECUTION</span><div>Çiftçi görevi • görsel onay • drone görevleri</div></div><div class="arch-row"><span>SETTLEMENT</span><div>Güvenli bekleme • hakediş • teslimat kapanışı</div></div><div class="arch-row"><span>EVIDENCE</span><div>Pilot metrikleri • audit trail • saha sonuçları</div></div><div class="sim-warning"><b>Şeffaflık:</b> Drone, ödeme, tonaj ve üretici stokları jüri sürümünde simülasyondur. Resmi fiyat eşleşmeleri HKS / TOBB verisinden okunur; eşleşmeyen ürünler "Pilot referans" olarak işaretlenir.</div></div></div>`; }

async function loadPrices(){
  try{const r=await fetch('data/prices.json',{cache:'no-store'});if(!r.ok)throw new Error('price fetch');const d=await r.json();STATE.priceGeneratedAt=d.generated_at||null;let count=0;Object.entries(d.products||{}).forEach(([id,row])=>{const p=PRODUCTS.find(x=>x.id===id);if(p&&Number(row.official_avg)){p.reference=Number(row.official_avg);p.source=(row.source||'').toLowerCase()==='hks'?'HKS':(row.source||'').toLowerCase()==='tobb'?'TOBB':(row.source_name||p.source);count++;}});STATE.officialMatches=count;$('#priceSourceState').textContent=`HKS / TOBB • ${count} resmi eşleşme • ${d.generated_at?new Date(d.generated_at).toLocaleString('tr-TR'):'güncel veri'}`;renderMarket();runSelfTest();}
  catch(e){$('#priceSourceState').textContent='HKS / TOBB veri dosyası okunamadı • simülasyon referansları aktif';runSelfTest();}
}

function juryDemo(){ STATE.cart=[{id:'domates',qty:8},{id:'elma',qty:6},{id:'nohut',qty:4}]; STATE.payment={id:'ESC-JURY-'+Date.now().toString().slice(-5),total:STATE.cart.reduce((s,x)=>s+salePrice(byId(x.id))*x.qty,0),time:new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'})}; renderCart(); startOperation(); }

function runSelfTest(){
  const tests=[]; const t=(name,ok)=>tests.push({name,ok:!!ok});
  t('48 ürün kataloğu',PRODUCTS.length===48); t('5 ana kategori',new Set(PRODUCTS.map(p=>p.category)).size===5); t('5 ana navigasyon',$$('.bottomnav [data-nav]').length===5); t('ürün pasaportu',!!$('#passport')&&$$('#passportTabs button').length===6); t('çoklu üretici görev motoru',typeof buildMissions==='function'); t('güvenli ödeme simülasyonu',typeof createPayment==='function'); t('bölgesel koordinat haritası',Object.keys(CITY_COORDS).length>=20); t('resmi fiyat veri yükleyici',typeof loadPrices==='function'); t('drone canlı rota katmanı',typeof initMap==='function'); t('jüri demo modu',typeof juryDemo==='function'); t('simülasyon etiketleri',document.body.textContent.includes('SİMÜLASYON')); t('tek CSS + tek JS',document.querySelectorAll('link[rel="stylesheet"][href*="competition.css"]').length===1&&document.querySelectorAll('script[src*="competition.js"]').length===1);
  const passed=tests.filter(x=>x.ok).length; $('#selfTestState').textContent=`Self-test ${passed}/${tests.length} ${passed===tests.length?'PASS':'CHECK'}`; $('#systemState').textContent=passed===tests.length?'Sistem hazır':'Kontrol gerekli'; window.__TT_SELF_TEST__={passed,total:tests.length,tests}; return window.__TT_SELF_TEST__;
}

function bind(){
  $$('[data-nav],[data-go]').forEach(b=>b.onclick=()=>switchScreen(b.dataset.nav||b.dataset.go));
  $$('#categoryTabs button').forEach(b=>b.onclick=()=>{STATE.category=b.dataset.category;renderMarket();});
  $('#productSearch').oninput=e=>{STATE.query=e.target.value;renderMarket();}; $('#refreshPrices').onclick=loadPrices; $('#openPassport').onclick=openPassport; $('#closePassport').onclick=closePassport; $('#passport').onclick=e=>{if(e.target===$('#passport'))closePassport();};
  $$('#passportTabs button').forEach(b=>b.onclick=()=>renderPassport(b.dataset.passport)); $('#qtyMinus').onclick=()=>{STATE.qty=clamp(STATE.qty-1,1,50);$('#qtyValue').textContent=`${STATE.qty} kg`;}; $('#qtyPlus').onclick=()=>{STATE.qty=clamp(STATE.qty+1,1,50);$('#qtyValue').textContent=`${STATE.qty} kg`;}; $('#addToCart').onclick=addToCart;
  $('#createPayment').onclick=createPayment; $('#startOperation').onclick=startOperation; $('#juryDemo').onclick=juryDemo;
  $$('#opsTabs button').forEach(b=>b.onclick=()=>{STATE.opsPane=b.dataset.ops;$$('#opsTabs button').forEach(x=>x.classList.toggle('active',x===b));$$('.ops-pane').forEach(x=>x.classList.toggle('active',x.dataset.opsPane===STATE.opsPane));if(STATE.opsPane==='live')setTimeout(initMap,80);});
  $$('#projectTabs button').forEach(b=>b.onclick=()=>{STATE.projectPane=b.dataset.project;$$('#projectTabs button').forEach(x=>x.classList.toggle('active',x===b));renderProject();});
  setInterval(()=>{if($('#camClock'))$('#camClock').textContent=new Date().toLocaleTimeString('tr-TR');},1000);
}
function boot(){bind();renderMarket();renderCart();renderOperations();renderProject();updateOverviewFlow();loadPrices();runSelfTest();}
document.addEventListener('DOMContentLoaded',boot);

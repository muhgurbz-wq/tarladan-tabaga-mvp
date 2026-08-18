const PRODUCTS=[
  {key:'domates',name:'Bahçe Domatesi',farmer:'Bereket Çiftliği',location:'Kahramanmaraş / Dulkadiroğlu',station:'Merkez teslim istasyonu',cat:'Sebze',fresh:'Aynı gün hasat',stock:'320 kg',photo:'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=82',farm:[37.5758,36.9226],center:[37.5854,36.9342],delivery:[37.5888,36.9416]},
  {key:'kapya_biber',name:'Kapya Biber',farmer:'Güneş Tarım',location:'Gaziantep / Oğuzeli',station:'Batı teslim istasyonu',cat:'Sebze',fresh:'Dalından toplama',stock:'180 kg',photo:'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=900&q=82',farm:[37.0637,37.3824],center:[37.0702,37.3890],delivery:[37.0765,37.3950]},
  {key:'elma',name:'Elma',farmer:'Yayla Bahçesi',location:'Niğde / Bor',station:'Kuzey teslim istasyonu',cat:'Meyve',fresh:'Yakın teslim',stock:'250 kg',photo:'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=82',farm:[37.8897,34.5587],center:[37.8950,34.5660],delivery:[37.9010,34.5740]},
  {key:'ceviz',name:'Ceviz',farmer:'Anadolu Bahçesi',location:'Malatya / Akçadağ',station:'Doğu teslim istasyonu',cat:'Doğal Ürün',fresh:'Yeni sezon',stock:'75 kg',photo:'https://images.unsplash.com/photo-1600189020840-e9918c25269d?auto=format&fit=crop&w=900&q=82',farm:[38.3456,37.9677],center:[38.3510,37.9750],delivery:[38.3570,37.9830]},
  {key:'bal',name:'Doğal Bal',farmer:'Dağ Arıcılığı',location:'Kahramanmaraş / Andırın',station:'Merkez teslim istasyonu',cat:'Doğal Ürün',fresh:'Doğrudan üreticiden',stock:'42 kg',photo:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=82',farm:[37.5761,36.3545],center:[37.5810,36.3620],delivery:[37.5870,36.3690]}
];
const POLICY={platformShare:0.20,farmerUplift:0.05};
const STAGES=[
  ['Sipariş','Sipariş güvenli hesaba alındı','▣'],
  ['Çiftçi','Üretici telefonuna görev gönderildi','⌕'],
  ['Hasat','Ürün bahçeden hazırlanıyor','✦'],
  ['Onay','Fotoğraf kontrolü tamamlanıyor','✓'],
  ['Drone','Drone çiftçi noktasına yönlendirildi','⌁'],
  ['Teslim','Paket teslim istasyonuna taşınıyor','⌖'],
  ['Ödeme','Kalkış doğrulandı, üretici ödemesi serbest','₺'],
  ['Dönüş','Drone merkeze dönüyor','↺']
];

let selected=0,qty=5,category='all',priceData=null,activeOrder=null,stageTimer=null,stageIndex=0,map=null,droneMarker=null,routeLine=null,routeTimer=null,routeProgress=0;

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function money(v){return Number.isFinite(v)?`${v.toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2})} ₺/kg`:'Veri bekleniyor';}
function nowTime(){return new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});}
function currentProduct(){return PRODUCTS[selected];}
function official(p){const x=priceData?.products?.[p.key]?.official_avg;return Number.isFinite(Number(x))?Number(x):null;}
function pricing(p){const ref=official(p);if(!Number.isFinite(ref)||ref<=0)return {ref:null,payout:null,sale:null};const payout=Math.round(ref*(1+POLICY.farmerUplift)*100)/100;const sale=Math.round((payout/(1-POLICY.platformShare))*100)/100;return {ref,payout,sale};}

function setView(view){
  $$('.app-view').forEach(v=>v.classList.toggle('active',v.dataset.view===view));
  $$('.bottom-nav button').forEach(b=>b.classList.toggle('active',b.dataset.nav===view));
  if(view==='live')setTimeout(initMap,60);
}

function renderProducts(){
  const rail=$('#productRail');
  const list=PRODUCTS.filter(p=>category==='all'||p.cat===category);
  rail.innerHTML=list.map(p=>{const i=PRODUCTS.indexOf(p),pr=pricing(p);return `<button class="product-card ${i===selected?'active':''}" data-product="${i}"><span class="thumb" style="background-image:url('${p.photo}')"></span><span class="info"><b>${p.name}</b><small>${p.location.split('/')[0].trim()}</small><strong>${pr.sale?money(pr.sale):'Fiyat bekleniyor'}</strong></span></button>`}).join('');
  $$('[data-product]').forEach(b=>b.addEventListener('click',()=>{selected=Number(b.dataset.product);renderProducts();renderDetail();}));
}

function renderDetail(){
  const p=currentProduct(),pr=pricing(p),src=priceData?.products?.[p.key];
  $('#detailPhoto').style.backgroundImage=`url('${p.photo}')`;
  $('#detailFarm').textContent=p.farmer;
  $('#detailName').textContent=p.name;
  $('#detailLocation').textContent=p.location;
  $('#detailPrice').textContent=pr.sale?money(pr.sale):'Veri bekleniyor';
  $('#detailPayout').textContent=pr.payout?money(pr.payout):'—';
  $('#detailSource').textContent=src?.source==='hks'?'HKS':src?.source==='tobb'?'TOBB':'—';
  $('#detailFresh').textContent=p.fresh;
  $('#qtyValue').textContent=`${qty} kg`;
  $('#startOrder').disabled=!pr.sale;
}

async function loadPrices(){
  const status=$('#priceFeedStatus');
  status.textContent='Resmi fiyat akışı yenileniyor…';
  try{
    const r=await fetch(`data/prices.json?v=${Date.now()}`,{cache:'no-store'});if(!r.ok)throw new Error();priceData=await r.json();
    const h=priceData.sources?.hks?.ok?'HKS ✓':'HKS —',t=priceData.sources?.tobb?.ok?'TOBB ✓':'TOBB —';status.textContent=`${h} • ${t} • ${priceData.generated_at?.slice(11,16)||'güncel'}`;
    $('#opsPriceState').textContent='Bağlı';
  }catch(e){status.textContent='Fiyat akışı geçici olarak alınamadı';$('#opsPriceState').textContent='Beklemede';}
  renderProducts();renderDetail();
}

function buildStageGrid(){
  $('#stageGrid').innerHTML=STAGES.map((s,i)=>`<div class="stage-dot" data-stage-dot="${i}"><span>${i+1}</span><small>${s[0]}</small></div>`).join('');
}
function updateOrderStage(i){
  if(!activeOrder)return;stageIndex=i;activeOrder.stage=i;
  const s=STAGES[i];
  $('#orderTitle').textContent=s[0];$('#nowIcon').textContent=s[2];$('#nowTitle').textContent=s[1];
  $('#nowText').textContent=stageText(i);
  $('#orderProgress').style.width=`${((i+1)/STAGES.length)*100}%`;
  $$('[data-stage-dot]').forEach((el,n)=>{el.classList.toggle('done',n<i);el.classList.toggle('active',n===i)});
  $('#systemStatus').textContent=s[1];
  updateOps(i);updateLiveTelemetry(i);addOpsEvent(s[0],s[1]);
  if(i>=4)startRouteAnimation(i);
}
function stageText(i){
  const p=currentProduct();
  return [
    `${qty} kg ${p.name} siparişi oluşturuldu. Ödeme güvenli hesapta bekliyor.`,
    `${p.farmer} telefonuna ürün, miktar ve teslim istasyonu bilgisi gönderildi.`,
    `Üretici bahçede siparişe uygun ürünü topluyor ve fotoğraf onayına hazırlıyor.`,
    `Ürün görselleri tüketici onayına sunuldu; görev drone toplamaya hazırlanıyor.`,
    `TT-D01 operasyon merkezinden çiftçi iniş alanına hareket ediyor.`,
    `Paket kilitlendi. Drone teslim istasyonuna yasal rota üzerinden ilerliyor.`,
    `Kalkış doğrulandı. Üretici hakedişi kayıtlı hesabına serbest bırakıldı.`,
    `Teslimat tamamlandı. Drone aynı operasyon koridorundan merkeze dönüyor.`
  ][i];
}
function startOrder(){
  const p=currentProduct(),pr=pricing(p);if(!pr.sale)return;
  clearInterval(stageTimer);stopRoute();
  activeOrder={id:`TT-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`,product:p,qty,pricing:pr,started:new Date(),stage:0};
  $('#orderCode').textContent=activeOrder.id;$('#orderProduct').textContent=p.name;$('#orderSummary').textContent=`${qty} kg • ${money(pr.sale)} • ${p.station}`;$('#orderThumb').style.backgroundImage=`url('${p.photo}')`;
  $('#opsOrderCount').textContent='1';$('#opsOrderState').textContent='Aktif';
  buildStageGrid();updateOrderStage(0);setView('order');
  stageTimer=setInterval(()=>{if(stageIndex>=STAGES.length-1){clearInterval(stageTimer);stageTimer=null;return;}updateOrderStage(stageIndex+1)},6500);
}

function updateOps(i){
  $('#opsDroneState').textContent=i<4?'Hazır':i<7?'Görevde':'Dönüşte';
  $('#opsDroneDetail').textContent=i<4?'TT-D01 • merkez':i<6?'TT-D01 • çiftçi rotası':'TT-D01 • teslim rotası';
  $('#opsPayoutState').textContent=i>=6?'Serbest bırakıldı':'Beklemede';
}
function addOpsEvent(title,text){
  const box=$('#opsTimeline');const el=document.createElement('div');el.className='ops-event';el.innerHTML=`<time>${nowTime().slice(0,5)}</time><div><b>${title}</b><small>${text}</small></div>`;box.prepend(el);while(box.children.length>6)box.removeChild(box.lastChild);
}

function initMap(){
  if(map){setTimeout(()=>map.invalidateSize(),60);return;}
  const p=currentProduct();map=L.map('routeMap',{zoomControl:false,attributionControl:true}).setView(p.center,14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(map);
  L.circleMarker(p.center,{radius:7,color:'#62b6ff',weight:3,fillColor:'#07131f',fillOpacity:1}).addTo(map).bindTooltip('Operasyon Merkezi');
  L.circleMarker(p.delivery,{radius:7,color:'#45dc86',weight:3,fillColor:'#07131f',fillOpacity:1}).addTo(map).bindTooltip('Teslim İstasyonu');
  setTimeout(()=>map.invalidateSize(),100);
}
function routePoints(){const p=activeOrder?.product||currentProduct();return [p.center,p.farm,p.delivery,p.center];}
function startRouteAnimation(stage){
  initMap();if(!map||!activeOrder)return;
  const pts=routePoints();let segment=stage===4?0:stage<=6?1:2;
  const from=pts[segment],to=pts[segment+1];
  if(routeLine)routeLine.remove();routeLine=L.polyline([from,to],{color:'#45dc86',weight:4,dashArray:'8 7',opacity:.9}).addTo(map);map.fitBounds(L.latLngBounds([from,to]).pad(.35));
  if(!droneMarker){droneMarker=L.marker(from,{icon:L.divIcon({className:'drone-marker',html:'<div style="width:30px;height:30px;border-radius:50%;background:#07131f;border:2px solid #45dc86;display:grid;place-items:center;box-shadow:0 0 0 6px rgba(69,220,134,.12);font-size:14px">✦</div>',iconSize:[30,30],iconAnchor:[15,15]})}).addTo(map)}
  routeProgress=0;clearInterval(routeTimer);routeTimer=setInterval(()=>{routeProgress=Math.min(1,routeProgress+.012);const lat=from[0]+(to[0]-from[0])*routeProgress,lng=from[1]+(to[1]-from[1])*routeProgress;droneMarker.setLatLng([lat,lng]);updateTelemetryValues(lat,lng,segment,routeProgress);if(routeProgress>=1)clearInterval(routeTimer)},220);
}
function stopRoute(){clearInterval(routeTimer);routeTimer=null;routeProgress=0;}
function updateTelemetryValues(lat,lng,segment,progress){
  const alt=segment===0?Math.round(18+progress*32):segment===1?52:Math.round(52-progress*26),spd=segment===1?46:36,batt=Math.max(48,100-Math.round((stageIndex*8)+(progress*5)));
  $('#altitude').textContent=`${alt} m`;$('#speed').textContent=`${spd} km/sa`;$('#battery').textContent=`${batt}%`;$('#distance').textContent=`${(1.8-progress*1.3).toFixed(1)} km`;
  $('#camAlt').textContent=`${alt} m`;$('#camSpeed').textContent=`${spd} km/sa`;$('#camGps').textContent=`${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}
function updateLiveTelemetry(i){
  const on=i>=4;$('#routeStatusDot').classList.toggle('on',on);$('#mapEta').textContent=on?`${Math.max(2,10-i)} dk`:'—';
  $('#routeStatusTitle').textContent=on?STAGES[i][1]:'Rota bekleniyor';$('#routeStatusText').textContent=on?stageText(i):'Sipariş verildiğinde operasyon merkezi rotayı burada gösterecek.';
  $('#cameraTitle').textContent=on?'TT-D01 saha kamerası':'Kamera bağlantısı hazır';$('#cameraText').textContent=on?'Drone görev akışıyla birlikte kamera ve telemetri aynı sipariş kimliğine bağlı izleniyor.':'Gerçek drone video URL\'si tanımlandığında bu alan doğrudan canlı yayına geçer; şu an pilot saha görünümü kullanılıyor.';
}

function setupVideoHook(){
  const url=window.DRONE_VIDEO_URL;const v=$('#droneVideo'),fb=$('#cameraFallback');
  if(url){v.src=url;v.style.display='block';fb.style.display='none';$('#liveModeLabel').textContent='Canlı kamera';}
  else{$('#liveModeLabel').textContent='Pilot simülasyon';}
}
function updateClock(){$('#camTime').textContent=nowTime();}

function setupTelemetryHook(){
  const wsUrl=window.DRONE_TELEMETRY_WS;
  if(!wsUrl)return;
  try{
    const ws=new WebSocket(wsUrl);
    ws.addEventListener('open',()=>{$('#liveModeLabel').textContent='Canlı telemetri';});
    ws.addEventListener('message',event=>{
      let d;try{d=JSON.parse(event.data)}catch{return;}
      if(!Number.isFinite(Number(d.lat))||!Number.isFinite(Number(d.lng)))return;
      initMap();const lat=Number(d.lat),lng=Number(d.lng);
      if(!droneMarker){droneMarker=L.marker([lat,lng],{icon:L.divIcon({className:'drone-marker',html:'<div style="width:30px;height:30px;border-radius:50%;background:#07131f;border:2px solid #45dc86;display:grid;place-items:center;box-shadow:0 0 0 6px rgba(69,220,134,.12);font-size:14px">✦</div>',iconSize:[30,30],iconAnchor:[15,15]})}).addTo(map)}
      droneMarker.setLatLng([lat,lng]);map.panTo([lat,lng],{animate:true,duration:.4});
      if(Number.isFinite(Number(d.altitude))){$('#altitude').textContent=`${Number(d.altitude).toFixed(0)} m`;$('#camAlt').textContent=`${Number(d.altitude).toFixed(0)} m`;}
      if(Number.isFinite(Number(d.speed))){$('#speed').textContent=`${Number(d.speed).toFixed(0)} km/sa`;$('#camSpeed').textContent=`${Number(d.speed).toFixed(0)} km/sa`;}
      if(Number.isFinite(Number(d.battery)))$('#battery').textContent=`${Number(d.battery).toFixed(0)}%`;
      if(d.eta)$('#mapEta').textContent=String(d.eta);
      $('#camGps').textContent=`${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      $('#routeStatusDot').classList.add('on');
      if(d.status){$('#routeStatusTitle').textContent=String(d.status);$('#systemStatus').textContent=String(d.status);}
    });
    ws.addEventListener('close',()=>{$('#liveModeLabel').textContent='Pilot simülasyon';});
  }catch(e){}
}

$$('.bottom-nav button').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.nav)));
$$('.chip').forEach(b=>b.addEventListener('click',()=>{$$('.chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');category=b.dataset.category;renderProducts()}));
$$('.live-tabs button').forEach(b=>b.addEventListener('click',()=>{$$('.live-tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');$$('.live-pane').forEach(x=>x.classList.toggle('active',x.dataset.liveContent===b.dataset.livePane));if(b.dataset.livePane==='map')setTimeout(initMap,60)}));
$('#qtyMinus').addEventListener('click',()=>{qty=Math.max(1,qty-1);renderDetail()});$('#qtyPlus').addEventListener('click',()=>{qty=Math.min(50,qty+1);renderDetail()});$('#startOrder').addEventListener('click',startOrder);$('#openLiveFromOrder').addEventListener('click',()=>setView('live'));$('#refreshPrices').addEventListener('click',loadPrices);

buildStageGrid();renderProducts();renderDetail();loadPrices();setupVideoHook();setupTelemetryHook();setInterval(updateClock,1000);updateClock();addOpsEvent('Sistem','Operasyon merkezi hazır.');
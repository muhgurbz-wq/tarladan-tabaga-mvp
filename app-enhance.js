(()=>{
const ROLE_DETAIL={
'Ürünleri keşfet':{tag:'VATANDAŞ / DISCOVERY',title:'Kaynak, fiyat ve üretici tek seçimde görünür.',text:'Vatandaş ürün adı dışında fiyat kaynağını, üretici noktasını ve siparişe uygun miktarı aynı seçim bağlamında görür.',a:['Girdi','Kategori + resmi fiyat akışı'],b:['Karar','Ürün + kg + üretici'],c:['Çıktı','Sepete doğrulanmış ürün']},
'Sepete ekle':{tag:'VATANDAŞ / CART',title:'Sepet sadece ürün tutmaz; sipariş bağlamını korur.',text:'Ürün, kg, üretici ve YZ satış fiyatı tek kayıt altında tutulur. Fiyat değişirse ödeme öncesi yeniden doğrulama yapılabilir.',a:['Girdi','Ürün + kg'],b:['Karar','Sepet toplamı'],c:['Çıktı','Ödeme için hazır kayıt']},
'Güvenli ödeme':{tag:'VATANDAŞ / PAYMENT',title:'Tahsilat ile üretici hakedişi birbirinden ayrılır.',text:'MVP aşamasında bu bir güvenli ödeme kaydıdır. Gerçek ödeme kuruluşu bağlandığında tahsilat bekletme ve hakediş serbest bırakma katmanına dönüşür.',a:['Girdi','Sepet + tutar'],b:['Kontrol','Sipariş kimliği'],c:['Çıktı','Bekleyen ödeme kaydı']},
'Foto onay':{tag:'VATANDAŞ / QUALITY',title:'Ürün sahadan çıkmadan vatandaş görsel doğrulama alır.',text:'Çiftçi topladığı ürünü fotoğraflar. Vatandaş onayı siparişin paketleme ve drone yükleme aşamasına geçiş kapısıdır.',a:['Girdi','Hasat fotoğrafları'],b:['Karar','Onay / düzeltme'],c:['Çıktı','Paketleme izni']},
'Canlı takip':{tag:'VATANDAŞ / LIVE',title:'Teslimat tek durum satırı değil, canlı operasyon görünümüdür.',text:'Rota, ETA, hız, irtifa, batarya ve video kaynağı aynı sipariş kimliğinde takip edilir.',a:['Girdi','Telemetri + rota'],b:['Kontrol','ETA / konum'],c:['Çıktı','Canlı teslim görünürlüğü']},
'Teslim al':{tag:'VATANDAŞ / DELIVERY',title:'Teslim doğrulaması siparişi ve operasyon kaydını kapatır.',text:'Belirlenen teslim noktasında teslim kaydı oluşur; drone dönüş görevine, sipariş ise kapanış durumuna geçer.',a:['Girdi','Teslim noktası'],b:['Karar','Teslim doğrulaması'],c:['Çıktı','Sipariş kapanışı']},
'Sipariş bildirimi':{tag:'ÇİFTÇİ / TASK',title:'Sipariş doğrudan sahadaki üretim görevine çevrilir.',text:'Çiftçi ürün, kg, zaman ve teslimat bilgisini tek görev kartı olarak alır; fiyat teklifi vermek zorunda değildir.',a:['Girdi','Sipariş kimliği'],b:['Karar','Hasat görevi'],c:['Çıktı','Çiftçi telefon bildirimi']},
'Hasat':{tag:'ÇİFTÇİ / HARVEST',title:'Talebe göre hasat, elde kalma riskini düşürmeyi hedefler.',text:'Çiftçi sadece sipariş edilen miktarı toplar. Böylece ürün hareketi sipariş verisiyle eşleşir.',a:['Girdi','Ürün + kg'],b:['Karar','Toplama miktarı'],c:['Çıktı','Hazır ürün']},
'Görsel doğrulama':{tag:'ÇİFTÇİ / VERIFY',title:'Sahadaki ürün ile dijital sipariş arasında kanıt oluşturur.',text:'Hasat edilen ürünlerin görselleri sipariş kimliğine bağlanır ve vatandaş onayına gönderilir.',a:['Girdi','Fotoğraf'],b:['Kontrol','Sipariş eşleşmesi'],c:['Çıktı','Vatandaş onayı']},
'Paketleme':{tag:'ÇİFTÇİ / PACK',title:'Onaylı ürün, tanımlı yük görevine dönüştürülür.',text:'Paket ağırlığı ve görev kimliği drone operasyon kaydıyla eşleştirilir.',a:['Girdi','Onaylı ürün'],b:['Kontrol','Ağırlık / paket'],c:['Çıktı','Drone yükü']},
'Drone kalkışı':{tag:'ÇİFTÇİ / RELEASE',title:'Kalkış doğrulaması lojistik ve ödeme arasında bağ kurar.',text:'Paketin sahadan çıktığı doğrulandığında üretici hakedişinin serbest bırakılması için operasyon sinyali üretilir.',a:['Girdi','Kalkış telemetrisi'],b:['Karar','Görev başladı'],c:['Çıktı','Hakediş tetikleyici']},
'Hakediş':{tag:'ÇİFTÇİ / SETTLEMENT',title:'Üretici ödemesi operasyon olayına bağlıdır.',text:'Gerçek ödeme altyapısı bağlandığında üreticiye ayrılan tutar, doğrulanmış kalkış olayı sonrası kayıtlı hesaba aktarılacaktır.',a:['Girdi','Doğrulanmış kalkış'],b:['Kontrol','Üretici hesabı'],c:['Çıktı','Ödeme serbest bırakma']},
'YZ Fiyat Motoru':{tag:'TT CORE / PRICE',title:'Fiyat tek bir liste değil, karar servisidir.',text:'Resmi HKS / TOBB referansı fiyat kararına girdi olur; üretici koruması ve platform ekonomisi aynı hesap içinde değerlendirilir.',a:['Data in','HKS / TOBB'],b:['Decision','YZ fiyat politikası'],c:['Data out','Satış + üretici payı']},
'Sipariş Motoru':{tag:'TT CORE / ORDER',title:'Tüm süreç tek sipariş kimliğinde birleşir.',text:'Ürün, kg, üretici, ödeme kaydı, rota ve teslimat olayları aynı kayıt zincirinde tutulur.',a:['Data in','Sepet + ödeme'],b:['Decision','Sipariş kimliği'],c:['Data out','Görev zinciri']},
'Çiftçi Görev Motoru':{tag:'TT CORE / FARM',title:'Dijital siparişi sahada uygulanabilir mikro görevlere böler.',text:'Bildirim, hasat, fotoğraf, paketleme ve teslim hazırlığı üretici ekranına sıralı görevler olarak aktarılır.',a:['Data in','Sipariş'],b:['Decision','Görev sırası'],c:['Data out','Çiftçi iş akışı']},
'Drone Görev Motoru':{tag:'TT CORE / FLIGHT',title:'Yük, rota ve drone durumunu tek görev planında toplar.',text:'İniş noktası, kalkış, rota, ETA, telemetri ve dönüş görevi aynı uçuş kaydına bağlanır.',a:['Data in','Paket + konum'],b:['Decision','Rota / görev'],c:['Data out','Uçuş planı']},
'Ödeme Mutabakatı':{tag:'TT CORE / PAYMENT',title:'Para hareketi sahadaki doğrulanmış olaylardan beslenir.',text:'Tahsilat, üretici hakedişi ve sipariş kapanışı birbirinden ayrılmış durumlar olarak yönetilir.',a:['Data in','Ödeme kaydı'],b:['Decision','Kalkış / teslim'],c:['Data out','Mutabakat durumu']}
};

const ICONS={
'Ürünleri keşfet':'▦','Sepete ekle':'▤','Güvenli ödeme':'◉','Foto onay':'◫','Canlı takip':'⌖','Teslim al':'✓',
'Sipariş bildirimi':'↯','Hasat':'◇','Görsel doğrulama':'◫','Paketleme':'▣','Drone kalkışı':'↗','Hakediş':'₺',
'YZ Fiyat Motoru':'ƒ','Sipariş Motoru':'#','Çiftçi Görev Motoru':'◇','Drone Görev Motoru':'⌖','Ödeme Mutabakatı':'◎'
};

function addMissionRail(){
  const hero=document.querySelector('.market-hero');
  if(!hero||document.querySelector('.mission-rail'))return;
  const rail=document.createElement('div');
  rail.className='mission-rail';
  rail.innerHTML=[['01','PRICE DATA'],['02','TT CORE'],['03','FARM TASK'],['04','FLIGHT OPS'],['05','SETTLEMENT']]
    .map((x,i)=>`<div class="mission-node ${i<2?'on':''}"><span>${x[0]}</span><b>${x[1]}</b><i></i></div>`).join('');
  hero.insertAdjacentElement('afterend',rail);
}

function addHeroIntel(){
  const hero=document.querySelector('.market-hero-copy');
  if(!hero||hero.querySelector('.market-intel'))return;
  const box=document.createElement('div');
  box.className='market-intel';
  box.innerHTML='<div><span>PRICE FEED</span><b>HKS / TOBB</b></div><div><span>ORCHESTRATOR</span><b>TT CORE</b></div><div><span>FLIGHT LAYER</span><b>Mission ready</b></div><div><span>PAYMENT RAIL</span><b>Controlled</b></div>';
  hero.appendChild(box);
}

function addProjectVisual(){
  const pane=document.querySelector('[data-project-content="intro"]');
  if(!pane||pane.querySelector('.project-visual'))return;
  const hero=pane.querySelector('.project-hero');
  if(!hero)return;
  const visual=document.createElement('div');
  visual.className='project-visual';
  visual.innerHTML=`
    <div class="network-board" aria-label="TT operasyon ağı">
      <span class="pv-line l1"></span><span class="pv-line l2"></span><span class="pv-line l3"></span><span class="pv-line l4"></span>
      <span class="pv-node n1">₺</span><span class="pv-node n2">◇</span><span class="pv-node n3">⌖</span><span class="pv-node n4">✓</span>
      <strong class="pv-core">TT<br>CORE</strong>
    </div>
    <div class="visual-metrics">
      <div style="--metric:86%"><span>PRICE DATA</span><b>HKS / TOBB</b><i></i></div>
      <div style="--metric:74%"><span>FARM TASK</span><b>Order driven</b><i></i></div>
      <div style="--metric:82%"><span>FLIGHT OPS</span><b>Telemetry ready</b><i></i></div>
      <div style="--metric:68%"><span>SETTLEMENT</span><b>Controlled rail</b><i></i></div>
    </div>`;
  hero.insertAdjacentElement('afterend',visual);
}

function decorateRoleCards(){
  document.querySelectorAll('.role-flow article,.module-grid article').forEach(card=>{
    const title=card.querySelector('b')?.textContent.trim()||'';
    card.dataset.vicon=ICONS[title]||'•';
  });
}

function updateProductIntel(){
  const body=document.querySelector('.detail-body');
  if(!body||typeof window.getActive!=='function')return;
  let box=body.querySelector('.product-intelligence');
  if(!box){box=document.createElement('div');box.className='product-intelligence';const order=body.querySelector('.order-bar');body.insertBefore(box,order)}
  const p=window.getActive();
  box.innerHTML=`<div><span>PRODUCT ID</span><b>${String(p.id).toUpperCase()}</b></div><div><span>PRODUCER NODE</span><b>${p.farm}</b></div><div><span>PRICE SOURCE</span><b>${p.source}</b></div><div><span>DECISION</span><b>YZ fiyat hazır</b></div>`;
}

function inspectorFor(card){
  const title=card.querySelector('b')?.textContent.trim();
  if(!title)return;
  const d=ROLE_DETAIL[title]||{tag:'TT / MODULE',title,text:card.querySelector('small')?.textContent.trim()||'Bu modül TT operasyon çekirdeğinin bir parçasıdır.',a:['Girdi','Sipariş verisi'],b:['Karar','TT Core'],c:['Çıktı','Operasyon olayı']};
  const pane=card.closest('.project-pane');
  if(!pane)return;
  pane.querySelectorAll('.role-flow article,.module-grid article').forEach(x=>x.classList.toggle('selected',x===card));
  let box=pane.querySelector('.role-inspector');
  if(!box){box=document.createElement('div');box.className='role-inspector';pane.appendChild(box)}
  box.innerHTML=`<div class="role-inspector-head"><div><span>${d.tag}</span><h3>${d.title}</h3><p>${d.text}</p></div><strong>DETAY AÇIK</strong></div><div class="role-inspector-grid"><div><b>${d.a[0]}</b><small>${d.a[1]}</small></div><div><b>${d.b[0]}</b><small>${d.b[1]}</small></div><div><b>${d.c[0]}</b><small>${d.c[1]}</small></div></div>`;
}

function bindInspectors(){
  document.querySelectorAll('.role-flow article,.module-grid article').forEach(card=>{
    card.tabIndex=0;card.setAttribute('role','button');
    card.addEventListener('click',()=>inspectorFor(card));
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();inspectorFor(card)}});
  });
}

function addArchitecture(){
  const pane=document.querySelector('[data-project-content="system"]');
  if(!pane||pane.querySelector('.architecture-map'))return;
  const map=document.createElement('div');
  map.className='architecture-map';
  map.innerHTML='<div class="architecture-col"><div><span>DATA SOURCE</span><b>HKS / TOBB</b></div><div><span>DEMAND</span><b>Vatandaş siparişi</b></div><div><span>FIELD</span><b>Üretici durumu</b></div></div><div class="architecture-core"><div>TT<br>ORCHESTRATION<br>CORE</div></div><div class="architecture-col"><div><span>OUTPUT</span><b>YZ fiyat kararı</b></div><div><span>EXECUTION</span><b>Drone görevi</b></div><div><span>SETTLEMENT</span><b>Ödeme olayı</b></div></div>';
  const hero=pane.querySelector('.role-hero');
  hero?.insertAdjacentElement('afterend',map);
}

function fixLiveMap(){
  const live=document.querySelector('[data-nav="live"]');
  if(live)live.addEventListener('click',()=>setTimeout(()=>{
    try{
      if(typeof window.initMap==='function')window.initMap();
      if(window.STATE?.map){window.STATE.map.invalidateSize(true);if(typeof window.updateMap==='function')window.updateMap();if(typeof window.updateTelemetry==='function')window.updateTelemetry();}
    }catch(e){}
  },220));
  document.querySelectorAll('[data-live-pane="map"]').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>{
    try{window.STATE?.map?.invalidateSize(true);if(typeof window.updateMap==='function')window.updateMap()}catch(e){}
  },160)));
}

function observeProducts(){
  const picker=document.querySelector('#productPicker');
  if(!picker)return;
  picker.addEventListener('click',()=>setTimeout(updateProductIntel,0));
  document.querySelector('#categoryTabs')?.addEventListener('click',()=>setTimeout(updateProductIntel,0));
  document.querySelector('#refreshPrices')?.addEventListener('click',()=>setTimeout(updateProductIntel,300));
}

function improveLabels(){
  const projectTitle=document.querySelector('[data-view="project"] .view-head h1');
  if(projectTitle)projectTitle.textContent='TT Orchestration Core';
  const p=document.querySelector('[data-project-content="intro"] .project-hero p');
  if(p)p.textContent='Fiyat verisi, vatandaş talebi, üretici görevi, güvenli mutabakat ve otonom hava lojistiği tek operasyon çekirdeğinde birleşir.';
}

function bootEnhance(){
  addMissionRail();addHeroIntel();addProjectVisual();decorateRoleCards();bindInspectors();addArchitecture();updateProductIntel();fixLiveMap();observeProducts();improveLabels();
  setTimeout(()=>{try{document.querySelector('[data-project-content="citizen"] .role-flow article')?.click()}catch(e){}},0);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootEnhance);else bootEnhance();
})();

(()=>{
  /* This layer synchronises the working UI with the approved visual mockup without removing the existing order/payment logic. */
  const PHOTO={
    domates:'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=82',
    kapya_biber:'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=700&q=82',
    sivri_biber:'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=700&q=82',
    salatalik:'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=700&q=82',
    patlican:'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=700&q=82',
    patates:'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=82',
    sogan:'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=700&q=82',
    havuc:'https://images.unsplash.com/photo-1447175008436-1701707535b5?auto=format&fit=crop&w=700&q=82',
    marul:'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=700&q=82',
    ispanak:'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=82',
    brokoli:'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=700&q=82',
    elma:'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=82',
    armut:'https://images.unsplash.com/photo-1589943960947-1d4b2c0f6a3d?auto=format&fit=crop&w=700&q=82',
    portakal:'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=700&q=82',
    mandalina:'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?auto=format&fit=crop&w=700&q=82',
    limon:'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=700&q=82',
    cilek:'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=700&q=82',
    uzum:'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=700&q=82',
    kiraz:'https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&w=700&q=82',
    seftali:'https://images.unsplash.com/photo-1629828874514-d66f55e9e8c9?auto=format&fit=crop&w=700&q=82',
    kayisi:'https://images.unsplash.com/photo-1593543294918-ca3634e04c61?auto=format&fit=crop&w=700&q=82',
    karpuz:'https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=700&q=82',
    kavun:'https://images.unsplash.com/photo-1598025362874-494b4bc175bb?auto=format&fit=crop&w=700&q=82',
    muz:'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=700&q=82',
    incir:'https://images.unsplash.com/photo-1601379329542-31c59347e2a3?auto=format&fit=crop&w=700&q=82',
    bugday:'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=700&q=82',
    arpa:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=82',
    misir:'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=700&q=82',
    pirinc:'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=82',
    nohut:'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=82',
    mercimek:'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=700&q=82',
    fasulye_kuru:'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=700&q=82',
    bal:'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=700&q=82',
    ceviz:'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=82',
    badem:'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=700&q=82',
    findik:'https://images.unsplash.com/photo-1599599810694-b5ac4dd63c86?auto=format&fit=crop&w=700&q=82',
    zeytin:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=82'
  };
  const FALLBACK={
    'Sebze':'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=82',
    'Meyve':'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=82',
    'Tahıl':'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=82',
    'Bakliyat':'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=82',
    'Doğal Ürün':'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=700&q=82'
  };
  const FARM='https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=84';
  const CRATE='https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=84';

  const SPECIAL_VARIANTS={
    elma:[['Amasya','Kırmızı / aromatik',0],['Starking','Sert / tatlı',2.1],['Granny Smith','Yeşil / ekşi',-2.4],['Golden','Sarı / tatlı',0.85]],
    domates:[['Salkım','Standart sofralık',0],['Çeri','Küçük kalibre',6.8],['Pembe','İri / aromatik',4.4],['Köy','Yerel çeşit',2.2]],
    kapya_biber:[['Kapya','Etli / kırmızı',0],['Sivri','İnce / aromatik',-1.3],['Çarliston','Açık yeşil',1.1],['Dolmalık','Kalın etli',2.0]],
    uzum:[['Sultaniye','Çekirdeksiz',0],['Red Globe','İri kırmızı',4.1],['Alphonse','Siyah',3.5],['Razakı','Açık renk',2.4]],
    kiraz:[['0900 Ziraat','İri kalibre',0],['Regina','Koyu renk',5.2],['Sweetheart','Tatlı',3.8],['Napolyon','Sert',2.9]],
    seftali:[['Glohaven','Sarı etli',0],['J.H. Hale','İri',3.1],['Nektarin','Tüysüz',4.4],['Yerel','Aromatik',1.7]],
    bugday:[['Ekmeklik','Protein odaklı',0],['Makarnalık','Durum',1.2],['Yerel sert','Yüksek hektolitre',.8],['Tohumluk','Seçme parti',2.5]],
    nohut:[['Koçbaşı','İri taneli',0],['İnci','Orta taneli',-1.1],['Yerel','Kuru tarım',.9],['Seçme','Kalibreli',2.2]],
    bal:[['Çiçek Balı','Polifloral',0],['Yayla Balı','Yüksek rakım',18],['Kekik Balı','Yoğun aroma',24],['Süzme Bal','Filtreli',12]],
    ceviz:[['Chandler','İnce kabuk',0],['Fernor','Soğuğa dayanıklı',8],['Kaman','Yerel',4],['Şebin','İç randıman',6]]
  };

  function pphoto(p){return PHOTO[p.id]||FALLBACK[p.category]||FARM}
  function byId(id){return PRODUCTS.find(p=>p.id===id)||PRODUCTS[0]}
  function priceText(n){return `${fmt(n)} ₺/kg`}
  function pilotNumber(p,min,max){let h=0;for(const ch of p.id)h=(h*31+ch.charCodeAt(0))>>>0;return min+(h%1000)/999*(max-min)}

  function decorateCards(){
    document.querySelectorAll('#productPicker .pick-card').forEach(card=>{
      const title=card.querySelector('b')?.textContent.trim();
      const p=PRODUCTS.find(x=>x.name===title); if(!p)return;
      const img=card.querySelector('.pick-img'); if(img){img.src=pphoto(p);img.alt=p.name;img.onerror=()=>{img.src=FALLBACK[p.category]||FARM}}
      if(!card.querySelector('.ms-badge')){const badge=document.createElement('span');badge.className='ms-badge';badge.textContent=p.category==='Doğal Ürün'?'Doğal':p.category;card.appendChild(badge)}
      if(!card.querySelector('.ms-plus')){const plus=document.createElement('span');plus.className='ms-plus';plus.textContent='+';card.appendChild(plus)}
      if(!card.dataset.msBound){card.dataset.msBound='1';card.addEventListener('click',()=>setTimeout(()=>openSheet(byId(STATE.active)),0))}
    })
  }

  function ensureDock(){
    let dock=document.querySelector('.ms-selection-dock');
    if(!dock){
      dock=document.createElement('div');dock.className='ms-selection-dock';
      const detail=document.querySelector('[data-view="market"] .product-detail');
      detail?.insertAdjacentElement('beforebegin',dock);
    }
    const p=byId(STATE.active);
    dock.innerHTML=`<img src="${pphoto(p)}" alt="${p.name}"><div class="ms-selection-copy"><span>SEÇİLİ ÜRÜN</span><b>${p.name}</b><small>${p.location} • ${p.farm}</small></div><button type="button">Detayı aç</button>`;
    dock.querySelector('button').onclick=()=>openSheet(p);
    dock.querySelector('img').onerror=e=>{e.currentTarget.src=FALLBACK[p.category]||FARM};
  }

  function ensureSheet(){
    let sheet=document.querySelector('.ms-product-sheet'); if(sheet)return sheet;
    sheet=document.createElement('section');sheet.className='ms-product-sheet';sheet.setAttribute('aria-live','polite');
    sheet.innerHTML=`<div class="ms-sheet-handle"></div><div class="ms-sheet-head"><img alt=""><div><span>ÜRÜN PASAPORTU</span><h3>Ürün</h3><small>Kaynak / üretici</small></div><button class="ms-sheet-close" aria-label="Kapat">×</button></div><div class="ms-sheet-tabs"><button class="ms-sheet-tab active" data-ms-tab="variety">Çeşitler</button><button class="ms-sheet-tab" data-ms-tab="farm">Bahçe</button><button class="ms-sheet-tab" data-ms-tab="crate">Kasa</button><button class="ms-sheet-tab" data-ms-tab="tonnage">Tonaj</button></div><div class="ms-sheet-body"></div><div class="ms-sheet-footer"><div class="ms-sheet-qty"><button data-ms-minus>−</button><b data-ms-qty>5 kg</b><button data-ms-plus>+</button></div><button class="ms-sheet-add">Sepete ekle</button></div>`;
    document.querySelector('.view-stack').appendChild(sheet);
    sheet.querySelector('.ms-sheet-close').onclick=()=>sheet.classList.remove('open');
    sheet.querySelectorAll('.ms-sheet-tab').forEach(b=>b.onclick=()=>{sheet.querySelectorAll('.ms-sheet-tab').forEach(x=>x.classList.toggle('active',x===b));renderSheetBody(sheet,b.dataset.msTab)});
    sheet.querySelector('[data-ms-minus]').onclick=()=>{STATE.qty=Math.max(1,STATE.qty-1);sheet.querySelector('[data-ms-qty]').textContent=`${STATE.qty} kg`;document.querySelector('#qtyValue')&&(document.querySelector('#qtyValue').textContent=`${STATE.qty} kg`)};
    sheet.querySelector('[data-ms-plus]').onclick=()=>{STATE.qty=Math.min(50,STATE.qty+1);sheet.querySelector('[data-ms-qty]').textContent=`${STATE.qty} kg`;document.querySelector('#qtyValue')&&(document.querySelector('#qtyValue').textContent=`${STATE.qty} kg`)};
    sheet.querySelector('.ms-sheet-add').onclick=()=>{document.querySelector('#addCart')?.click();sheet.classList.remove('open')};
    return sheet;
  }

  function variantsFor(p){
    const base=SPECIAL_VARIANTS[p.id]||[['Standart','Günlük sipariş',0],['Seçme','Kalibreli',sale(p)*.04],['Premium','Üst kalite',sale(p)*.08],['Yerel','Bölgesel çeşit',-sale(p)*.03]];
    return base.map((v,i)=>({name:v[0],note:v[1],price:Math.max(0,sale(p)+(Number(v[2])||0)),img:i===0?pphoto(p):`${pphoto(p)}&sat=${92+i*3}`}));
  }

  function renderSheetBody(sheet,tab){
    const p=byId(sheet.dataset.pid||STATE.active);const body=sheet.querySelector('.ms-sheet-body');
    if(tab==='variety'){
      body.innerHTML=`<div class="ms-variety-grid">${variantsFor(p).map(v=>`<article class="ms-variety-card"><img src="${v.img}" alt="${v.name}" onerror="this.src='${FALLBACK[p.category]||FARM}'"><div><b>${v.name}</b><small>${v.note}</small><strong>${priceText(v.price)}</strong></div></article>`).join('')}</div>`;
      return;
    }
    if(tab==='farm'){
      body.innerHTML=`<div class="ms-gallery-grid"><img src="${FARM}" alt="Bahçe görünümü"><div class="ms-gallery-side"><img src="${pphoto(p)}" alt="${p.name}"><img src="${CRATE}" alt="Hasat alanı"></div></div><div class="ms-gallery-copy"><b>${p.farm} • ${p.location}</b><small>Bahçe / tarla görüntüsü üretici kaydıyla eşleşir. Gerçek saha medya akışı bağlandığında bu galeri üreticinin güncel görüntüleriyle beslenir.</small></div>`;return;
    }
    if(tab==='crate'){
      const crates=Math.round(pilotNumber(p,18,96));
      body.innerHTML=`<div class="ms-gallery-grid"><img src="${CRATE}" alt="Kasada ürün"><div class="ms-gallery-side"><img src="${pphoto(p)}" alt="${p.name}"><img src="${FARM}" alt="Üretim sahası"></div></div><div class="ms-gallery-copy"><b>Kasa görünümü • ${crates} kasa pilot kapasite</b><small>Kasadaki ürün, paketleme ve sevke hazır parti görünümü aynı ürün pasaportuna bağlanır. Gerçek üretici stok entegrasyonunda kasa sayısı canlı güncellenir.</small></div>`;return;
    }
    const ton=pilotNumber(p,1.2,6.8),reserved=pilotNumber(p,.15,.95),avail=Math.max(.2,ton-reserved),pct=Math.min(96,Math.round(avail/ton*100));
    body.innerHTML=`<div class="ms-tonnage-grid"><div><span>Pilot hazır tonaj</span><b>${ton.toFixed(1).replace('.',',')} ton</b></div><div><span>Rezerve</span><b>${reserved.toFixed(1).replace('.',',')} ton</b></div><div><span>Siparişe açık</span><b>${avail.toFixed(1).replace('.',',')} ton</b></div><div><span>Hasat penceresi</span><b>${p.fresh}</b></div></div><div class="ms-gallery-copy"><b>Üretici stok katmanı</b><small>Bu tonaj değerleri MVP gösterimidir; gerçek üretici stok/ERP bağlantısı geldiğinde otomatik olarak canlı tonajla değişecektir.</small><div class="ms-stock-bar"><i style="width:${pct}%"></i></div></div>`;
  }

  function openSheet(p){
    const sheet=ensureSheet();sheet.dataset.pid=p.id;sheet.classList.add('open');
    const img=sheet.querySelector('.ms-sheet-head img');img.src=pphoto(p);img.alt=p.name;img.onerror=()=>{img.src=FALLBACK[p.category]||FARM};
    sheet.querySelector('.ms-sheet-head h3').textContent=p.name;
    sheet.querySelector('.ms-sheet-head small').textContent=`${p.farm} • ${p.location} • ${p.source}`;
    sheet.querySelector('[data-ms-qty]').textContent=`${STATE.qty} kg`;
    sheet.querySelectorAll('.ms-sheet-tab').forEach((b,i)=>b.classList.toggle('active',i===0));
    renderSheetBody(sheet,'variety');
  }

  function sync(){decorateCards();ensureDock();}

  if(typeof renderMarket==='function'){
    const baseRenderMarket=renderMarket;
    renderMarket=function(){baseRenderMarket();sync()};
  }

  const boot=()=>{
    sync();ensureSheet();
    const picker=document.querySelector('#productPicker');
    if(picker)new MutationObserver(()=>sync()).observe(picker,{childList:true,subtree:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

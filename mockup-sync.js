(()=>{
  const BUILD='20260818T1224';
  const px=(id,w=1000)=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&tt=${BUILD}`;

  const PHOTO={
    domates:px(5479393),
    kapya_biber:px(14944635),
    sivri_biber:px(5701834),
    salatalik:px(10111495),
    patlican:px(321551),
    elma:'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=900&q=84&tt='+BUILD,
    armut:'https://images.unsplash.com/photo-1589943960947-1d4b2c0f6a3d?auto=format&fit=crop&w=900&q=84&tt='+BUILD,
    portakal:'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=900&q=84&tt='+BUILD,
    mandalina:'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?auto=format&fit=crop&w=900&q=84&tt='+BUILD,
    limon:'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=900&q=84&tt='+BUILD,
    cilek:'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=900&q=84&tt='+BUILD,
    uzum:'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=900&q=84&tt='+BUILD,
    kiraz:'https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&w=900&q=84&tt='+BUILD,
    bugday:'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=84&tt='+BUILD,
    misir:'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=84&tt='+BUILD,
    nohut:'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=84&tt='+BUILD,
    bal:'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=900&q=84&tt='+BUILD,
    ceviz:'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=84&tt='+BUILD,
    badem:'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=84&tt='+BUILD,
    findik:px(18552140),
    zeytin:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=84&tt='+BUILD
  };

  const SCENES={
    domates:{
      vine:{img:px(5479393),title:'Dalında',note:'Olgunlaşma ve kalite kontrolü'},
      field:{img:px(5012854),title:'Bahçede',note:'Üretim sahası ve sıra görünümü'},
      crate:{img:px(18248278),title:'Kasada',note:'Toplanmış ürün ve sevk hazırlığı'},
      harvest:{img:px(7299971),title:'Hasat',note:'Kadın üretici hasat sırasında'}
    },
    elma:{
      vine:{img:px(18789108),title:'Dalında',note:'Ağaç üzerindeki olgun ürün'},
      field:{img:px(2965607),title:'Bahçede',note:'Elma bahçesi ve üretim alanı'},
      crate:{img:px(35395716),title:'Kasada',note:'Hasat sonrası kasa görünümü'},
      harvest:{img:px(5528986),title:'Hasat',note:'Kadın üreticiler toplama sırasında'}
    },
    findik:{
      vine:{img:px(32920566),title:'Dalında',note:'Fındık hasadı ve elle toplama'},
      field:{img:px(28223703),title:'Bahçede',note:'Fındık bahçesinde üretim sahası'},
      crate:{img:px(32920868),title:'Kasada',note:'Toplanmış fındık ve hasat sepeti'},
      harvest:{img:px(28223700),title:'Hasat',note:'Kadın üretici toplama sırasında'}
    },
    ceviz:{
      vine:{img:PHOTO.ceviz,title:'Dalında',note:'Ceviz ürün görünümü'},
      field:{img:px(29128546),title:'Bahçede',note:'Ceviz bahçesinde toplama'},
      crate:{img:PHOTO.ceviz,title:'Kasada',note:'Hasat sonrası seçilmiş ürün'},
      harvest:{img:px(29128546),title:'Hasat',note:'Üretici hasat sırasında'}
    }
  };

  const GENERIC={
    'Sebze':{field:px(5012854),crate:px(18248278),harvest:px(7299971)},
    'Meyve':{field:px(2965607),crate:px(35395716),harvest:px(5528986)},
    'Tahıl':{field:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=84&tt='+BUILD,crate:'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=84&tt='+BUILD,harvest:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=84&tt='+BUILD},
    'Bakliyat':{field:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=84&tt='+BUILD,crate:'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1200&q=84&tt='+BUILD,harvest:'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=84&tt='+BUILD},
    'Doğal Ürün':{field:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=84&tt='+BUILD,crate:px(32920868),harvest:px(28223700)}
  };

  const SPECIAL_VARIANTS={
    elma:[['Amasya','Aromatik / kırmızı',0],['Starking','Sert / tatlı',2.1],['Granny Smith','Yeşil / ekşi',-2.4],['Golden','Sarı / tatlı',0.85]],
    domates:[['Salkım','Standart sofralık',0],['Çeri','Küçük kalibre',6.8],['Pembe','İri / aromatik',4.4],['Köy','Yerel çeşit',2.2]],
    kapya_biber:[['Kapya','Etli / kırmızı',0],['Sivri','İnce / aromatik',-1.3],['Çarliston','Açık yeşil',1.1],['Dolmalık','Kalın etli',2.0]],
    findik:[['Tombul','Giresun kalite',0],['Sivri','Uzun form',4.2],['Palaz','İri dane',6.4],['Foşa','Yerel çeşit',3.1]],
    ceviz:[['Chandler','İnce kabuk',0],['Fernor','Soğuğa dayanıklı',8],['Kaman','Yerel',4],['Şebin','İç randıman',6]]
  };

  const fallbackVisual=(p)=>typeof visualFor==='function'?visualFor(p,720,480):'';
  const pphoto=(p)=>PHOTO[p.id]||fallbackVisual(p);
  const byId=(id)=>PRODUCTS.find(p=>p.id===id)||PRODUCTS[0];
  const money=(n)=>`${fmt(n)} ₺/kg`;
  const hash=(s)=>[...s].reduce((a,c)=>((a*31+c.charCodeAt(0))>>>0),7);
  const stockInfo=(p)=>{
    const h=hash(p.id);
    const tons=(0.8+(h%45)/10).toFixed(1).replace('.',',');
    const crates=24+(h%96);
    return {tons,crates,window:(h%2?'Bugün':'Bugün + yarın'),caliber:p.category==='Meyve'?'70–80 mm':'Sınıf A'};
  };
  const scenesFor=(p)=>{
    if(SCENES[p.id]) return SCENES[p.id];
    const g=GENERIC[p.category]||GENERIC.Sebze;
    return {
      vine:{img:pphoto(p),title:'Dalında',note:`${p.name} ürün görünümü`},
      field:{img:g.field,title:'Bahçede',note:`${p.farm} üretim sahası`},
      crate:{img:g.crate,title:'Kasada',note:'Toplama sonrası sevk hazırlığı'},
      harvest:{img:g.harvest,title:'Hasat',note:'Üretici hasat operasyonu'}
    };
  };

  function decorateCards(){
    document.querySelectorAll('#productPicker .pick-card').forEach(card=>{
      const title=card.querySelector('b')?.textContent.trim();
      const p=PRODUCTS.find(x=>x.name===title); if(!p)return;
      const img=card.querySelector('.pick-img');
      if(img){img.src=pphoto(p);img.alt=p.name;img.onerror=()=>{img.src=fallbackVisual(p)}}
      card.querySelector('.ms-badge')?.remove();
      if(!card.querySelector('.ms-plus')){const plus=document.createElement('span');plus.className='ms-plus';plus.textContent='+';card.appendChild(plus)}
      if(!card.dataset.msBound){card.dataset.msBound='1';card.addEventListener('click',()=>setTimeout(()=>openSheet(byId(STATE.active)),0))}
    });
  }

  function ensureDock(){
    let dock=document.querySelector('.ms-selection-dock');
    if(!dock){dock=document.createElement('div');dock.className='ms-selection-dock';document.querySelector('[data-view="market"] .product-detail')?.insertAdjacentElement('beforebegin',dock)}
    const p=byId(STATE.active);
    dock.innerHTML=`<img src="${pphoto(p)}" alt="${p.name}"><div class="ms-selection-copy"><span>SEÇİLİ ÜRÜN</span><b>${p.name}</b><small>${p.location} • ${p.farm}</small></div><button type="button">Detayı aç</button>`;
    dock.querySelector('button').onclick=()=>openSheet(p);
    dock.querySelector('img').onerror=e=>{e.currentTarget.src=fallbackVisual(p)};
  }

  function ensureSheet(){
    let sheet=document.querySelector('.ms-product-sheet'); if(sheet)return sheet;
    sheet=document.createElement('section');sheet.className='ms-product-sheet';sheet.setAttribute('aria-live','polite');
    sheet.innerHTML=`<div class="ms-sheet-handle"></div>
      <div class="ms-sheet-head"><img alt=""><div><span>ÜRÜN PASAPORTU</span><h3>Ürün</h3><small>Kaynak / üretici</small></div><button class="ms-sheet-close" aria-label="Kapat">×</button></div>
      <div class="ms-variety-strip"></div>
      <div class="ms-sheet-tabs">
        <button class="ms-sheet-tab active" data-ms-tab="vine">Dalında</button>
        <button class="ms-sheet-tab" data-ms-tab="field">Bahçede</button>
        <button class="ms-sheet-tab" data-ms-tab="crate">Kasada</button>
        <button class="ms-sheet-tab" data-ms-tab="harvest">Hasat</button>
      </div>
      <div class="ms-sheet-body"></div>
      <div class="ms-sheet-footer"><div class="ms-sheet-qty"><button data-ms-minus>−</button><b data-ms-qty>5 kg</b><button data-ms-plus>+</button></div><button class="ms-sheet-add">Sepete ekle</button></div>`;
    document.querySelector('.view-stack').appendChild(sheet);
    sheet.querySelector('.ms-sheet-close').onclick=()=>sheet.classList.remove('open');
    sheet.querySelectorAll('.ms-sheet-tab').forEach(b=>b.onclick=()=>{
      sheet.querySelectorAll('.ms-sheet-tab').forEach(x=>x.classList.toggle('active',x===b));
      renderScene(sheet,b.dataset.msTab);
    });
    sheet.querySelector('[data-ms-minus]').onclick=()=>{STATE.qty=Math.max(1,STATE.qty-1);syncQty(sheet)};
    sheet.querySelector('[data-ms-plus]').onclick=()=>{STATE.qty=Math.min(50,STATE.qty+1);syncQty(sheet)};
    sheet.querySelector('.ms-sheet-add').onclick=()=>{document.querySelector('#addCart')?.click();sheet.classList.remove('open')};
    return sheet;
  }

  function syncQty(sheet){
    sheet.querySelector('[data-ms-qty]').textContent=`${STATE.qty} kg`;
    const q=document.querySelector('#qtyValue'); if(q)q.textContent=`${STATE.qty} kg`;
  }

  function variantsFor(p){
    const base=SPECIAL_VARIANTS[p.id]||[['Standart','Günlük sipariş',0],['Seçme','Kalibreli',sale(p)*.04],['Premium','Üst kalite',sale(p)*.08],['Yerel','Bölgesel çeşit',-sale(p)*.03]];
    return base.map(v=>({name:v[0],note:v[1],price:Math.max(0,sale(p)+(Number(v[2])||0))}));
  }

  function renderVariantStrip(sheet,p){
    const wrap=sheet.querySelector('.ms-variety-strip');
    const vars=variantsFor(p);
    wrap.innerHTML=vars.map((v,i)=>`<button class="ms-var-chip ${i===0?'active':''}" type="button"><b>${v.name}</b><small>${money(v.price)}</small></button>`).join('');
    wrap.querySelectorAll('.ms-var-chip').forEach(btn=>btn.onclick=()=>wrap.querySelectorAll('.ms-var-chip').forEach(x=>x.classList.toggle('active',x===btn)));
  }

  function renderScene(sheet,key){
    const p=byId(sheet.dataset.pid||STATE.active);
    const scene=scenesFor(p)[key]||scenesFor(p).vine;
    const stats=stockInfo(p);
    const body=sheet.querySelector('.ms-sheet-body');
    body.innerHTML=`<article class="ms-stage-card">
      <img src="${scene.img}" alt="${p.name} ${scene.title}" onerror="this.src='${pphoto(p)}'">
      <div class="ms-stage-caption"><span>${scene.title.toUpperCase()}</span><b>${scene.note}</b><small>${p.farm} • ${p.location}</small></div>
    </article>
    <div class="ms-stage-facts">
      <div><span>Hazır tonaj</span><b>${stats.tons} ton</b></div>
      <div><span>Kasa</span><b>${stats.crates} adet</b></div>
      <div><span>Hasat penceresi</span><b>${stats.window}</b></div>
      <div><span>Kalite</span><b>${stats.caliber}</b></div>
    </div>`;
  }

  function openSheet(p){
    const sheet=ensureSheet();
    sheet.dataset.pid=p.id;
    const head=sheet.querySelector('.ms-sheet-head');
    const img=head.querySelector('img');img.src=pphoto(p);img.alt=p.name;img.onerror=()=>{img.src=fallbackVisual(p)};
    head.querySelector('h3').textContent=p.name;
    head.querySelector('small').textContent=`${p.farm} • ${p.location} • ${p.source}`;
    renderVariantStrip(sheet,p);
    sheet.querySelectorAll('.ms-sheet-tab').forEach((b,i)=>b.classList.toggle('active',i===0));
    syncQty(sheet);
    renderScene(sheet,'vine');
    sheet.classList.add('open');
  }

  function injectStyles(){
    if(document.querySelector('#tt-stage-v3'))return;
    const st=document.createElement('style');st.id='tt-stage-v3';st.textContent=`
      .ms-variety-strip{display:flex;gap:6px;overflow:auto;padding:0 12px 9px;scrollbar-width:none}.ms-variety-strip::-webkit-scrollbar{display:none}
      .ms-var-chip{flex:0 0 auto;min-width:88px;padding:7px 9px;border:1px solid rgba(255,255,255,.08);border-radius:11px;background:#071725;color:#d6e6ef;text-align:left}.ms-var-chip.active{border-color:rgba(110,242,164,.38);background:rgba(110,242,164,.08)}.ms-var-chip b{display:block;font-size:7px}.ms-var-chip small{display:block;margin-top:3px;font-size:6px;color:#7de5a4}
      .ms-stage-card{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.08);border-radius:16px;background:#061520}.ms-stage-card>img{display:block;width:100%;height:210px;object-fit:cover;background:#071725}.ms-stage-caption{position:absolute;left:0;right:0;bottom:0;padding:28px 12px 11px;background:linear-gradient(180deg,transparent,rgba(3,13,21,.94))}.ms-stage-caption span{display:block;color:#7de5a4;font-size:6px;letter-spacing:.12em}.ms-stage-caption b{display:block;margin-top:4px;font-size:10px}.ms-stage-caption small{display:block;margin-top:3px;color:#93a7b4;font-size:6px}
      .ms-stage-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:8px}.ms-stage-facts div{padding:9px;border:1px solid rgba(255,255,255,.06);border-radius:11px;background:#061520}.ms-stage-facts span{display:block;color:#6f899a;font-size:5px;text-transform:uppercase;letter-spacing:.07em}.ms-stage-facts b{display:block;margin-top:5px;font-size:8px;color:#edf8ff}
      .pick-card .ms-badge{display:none!important}.pick-card .pick-img{filter:none!important}.ms-product-sheet{max-height:88%!important}
      @media(max-width:520px){.ms-stage-card>img{height:188px}.ms-stage-facts{grid-template-columns:repeat(2,minmax(0,1fr))}.ms-var-chip{min-width:82px}}
    `;document.head.appendChild(st);
  }

  function syncMarket(){decorateCards();ensureDock()}
  function hookRender(){
    if(typeof renderMarket!=='function')return;
    const original=renderMarket;
    window.renderMarket=function(){const out=original.apply(this,arguments);requestAnimationFrame(syncMarket);return out};
  }
  function hookNav(){
    document.querySelectorAll('.bottom-nav button').forEach(btn=>btn.addEventListener('click',()=>document.querySelector('.ms-product-sheet')?.classList.remove('open')));
  }
  function boot(){
    if(typeof PRODUCTS==='undefined'||typeof STATE==='undefined')return setTimeout(boot,80);
    injectStyles();hookRender();hookNav();syncMarket();
    const observer=new MutationObserver(()=>{if(document.querySelector('[data-view="market"]')?.classList.contains('active'))requestAnimationFrame(syncMarket)});
    observer.observe(document.querySelector('.view-stack'),{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,60));else setTimeout(boot,60);
})();

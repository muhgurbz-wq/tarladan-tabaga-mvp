const products=[
 {name:'Domates',cat:'Sebze',emoji:'🍅',place:'Kahramanmaraş',producer:'Bereket Çiftliği',price:'24 ₺/kg',stock:'320 kg stok'},
 {name:'Kapya Biber',cat:'Sebze',emoji:'🌶️',place:'Gaziantep',producer:'Güneş Tarım',price:'31 ₺/kg',stock:'180 kg stok'},
 {name:'Elma',cat:'Meyve',emoji:'🍎',place:'Niğde',producer:'Yayla Bahçesi',price:'27 ₺/kg',stock:'250 kg stok'},
 {name:'Üzüm',cat:'Meyve',emoji:'🍇',place:'Manisa',producer:'Bağ Evi',price:'36 ₺/kg',stock:'140 kg stok'},
 {name:'Doğal Bal',cat:'Doğal Ürün',emoji:'🍯',place:'Kahramanmaraş',producer:'Dağ Arıcılığı',price:'290 ₺/kg',stock:'42 kg stok'},
 {name:'Ceviz',cat:'Doğal Ürün',emoji:'🌰',place:'Malatya',producer:'Anadolu Bahçesi',price:'175 ₺/kg',stock:'75 kg stok'}
];
const grid=document.querySelector('#productGrid');
function render(cat='Tümü'){
 const list=cat==='Tümü'?products:products.filter(p=>p.cat===cat);
 grid.innerHTML=list.map(p=>`<article class="product"><span class="emoji">${p.emoji}</span><span class="tag">${p.cat}</span><h3>${p.name}</h3><p>${p.producer}<br>${p.place}</p><div class="product-foot"><div><strong>${p.price}</strong><br><span>${p.stock}</span></div><button class="btn btn-small" onclick="alert('${p.name} için demo talep oluşturuldu.')">Talep oluştur</button></div></article>`).join('');
}
render();
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');render(btn.dataset.filter)}));
const modal=document.querySelector('#demoModal');
document.querySelectorAll('[data-open-panel]').forEach(b=>b.addEventListener('click',()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false')}));
document.querySelector('[data-close-panel]').addEventListener('click',()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')});
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
document.querySelector('#traceButton').addEventListener('click',()=>{const code=document.querySelector('#traceInput').value.trim().toUpperCase();const box=document.querySelector('#traceResult');if(code==='TT-2026-001'){box.innerHTML='<span class="tag">TT-2026-001</span><h3>Domates • 1. kalite</h3><ul><li><b>Üretici:</b> Bereket Çiftliği</li><li><b>Hasat:</b> 17 Ağustos 2026</li><li><b>Konum:</b> Kahramanmaraş</li><li><b>Durum:</b> Sevkiyata hazır</li></ul>'}else{box.innerHTML='<span class="tag">Sonuç</span><h3>Lot bulunamadı</h3><p class="muted">Demo için <b>TT-2026-001</b> kodunu kullanın.</p>'}});
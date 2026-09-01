const KEY='sosyalpaket-native-v3';
const PLATFORMS=['Instagram','Facebook','TikTok','LinkedIn','X'];
const VIEW_TITLES={home:'Ana Sayfa',create:'İçerik Oluştur',calendar:'Takvim',library:'İçerikler',profile:'Profil'};
let state=loadState();
let activeView='home';
let selectedPlatforms=[];
let currentMedia=null;
let calendarFilter='Tümü';
let libraryFilter='Tümü';

function freshState(){return{profile:{brand:'',sector:'',audience:'',goal:'Etkileşim',platforms:['Instagram','Facebook']},posts:[],metrics:{impressions:0,interactions:0,clicks:0,followers:0},updated:null}}
function loadState(){try{return JSON.parse(localStorage.getItem(KEY))||freshState()}catch{return freshState()}}
function saveState(){state.updated=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(state))}
function $(id){return document.getElementById(id)}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('on');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('on'),1800)}
function slug(s){return String(s||'').toLocaleLowerCase('tr-TR').replace(/[^a-z0-9çğıöşü]+/g,'').slice(0,24)}
function todayISO(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10)}
function tomorrowISO(){const d=new Date();d.setDate(d.getDate()+1);d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10)}
function formatDate(iso){return new Date(iso+'T00:00:00').toLocaleDateString('tr-TR',{day:'2-digit',month:'short'})}
function shortDay(iso){return new Date(iso+'T00:00:00').toLocaleDateString('tr-TR',{weekday:'short'})}
function greet(){const h=new Date().getHours();return h<12?'Günaydın':h<18?'İyi günler':'İyi akşamlar'}
function statusClass(s){return s==='Hazır'?'ready':s==='Planlandı'?'planned':''}

function boot(){
  $('obPlatforms').innerHTML=PLATFORMS.map(p=>`<button type="button" class="chip ${state.profile.platforms.includes(p)?'on':''}" data-p="${p}" onclick="toggleOnboardPlatform(this)">${p}</button>`).join('');
  setTimeout(()=>{
    $('splash').classList.add('hidden');
    if(state.profile.brand){openApp()}else{$('onboarding').classList.remove('hidden')}
  },650);
}
function toggleOnboardPlatform(btn){btn.classList.toggle('on')}
function finishOnboarding(){
  const brand=$('obBrand').value.trim(),sector=$('obSector').value.trim(),audience=$('obAudience').value.trim(),goal=$('obGoal').value;
  const platforms=[...document.querySelectorAll('#obPlatforms .chip.on')].map(x=>x.dataset.p);
  if(!brand||!sector||!audience||!platforms.length){toast('Marka, sektör, hedef müşteri ve en az bir kanal gerekli');return}
  state.profile={brand,sector,audience,goal,platforms};saveState();$('onboarding').classList.add('hidden');openApp();
}
function openApp(){
  $('appShell').classList.remove('hidden');
  $('brandLabel').textContent=state.profile.brand||'SosyalPaket';
  $('avatarInitial').textContent=(state.profile.brand||'S').trim().charAt(0).toLocaleUpperCase('tr-TR');
  showView('home');
}
function showView(id){
  activeView=id;
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('on',v.id===id));
  document.querySelectorAll('#tabbar button').forEach(b=>b.classList.toggle('on',b.dataset.view===id));
  $('screenTitle').textContent=VIEW_TITLES[id]||'SosyalPaket';
  ({home:renderHome,create:renderCreate,calendar:renderCalendar,library:renderLibrary,profile:renderProfile}[id]||(()=>{}))();
  scrollTo(0,0);
}

function renderHome(){
  const posts=state.posts,n=posts.length,drafts=posts.filter(p=>p.status==='Taslak').length,ready=posts.filter(p=>p.status==='Hazır').length,planned=posts.filter(p=>p.status==='Planlandı').length;
  const pct=n?Math.round((ready+planned)/n*100):0;
  const upcoming=posts.filter(p=>p.date>=todayISO()).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)).slice(0,5);
  $('home').innerHTML=`
    <div class="heroCard">
      <small>${greet()}, ${esc(state.profile.brand)}</small>
      <h1>Bugün ne paylaşacağını birlikte hazırlayalım.</h1>
      <p>Galeriden görsel veya video seç, metni hazırla, takvime koy ve telefondan paylaş.</p>
      <div class="heroActions"><button class="primaryBtn" onclick="showView('create')">＋ Yeni içerik</button><button class="ghostBtn" onclick="generate30DayPlan()">30 günlük plan</button></div>
    </div>
    <div class="metricGrid">
      <div class="metric"><small>Toplam</small><b>${n}</b></div><div class="metric"><small>Taslak</small><b>${drafts}</b></div><div class="metric"><small>Hazır</small><b>${ready}</b></div><div class="metric"><small>Planlandı</small><b>${planned}</b></div>
    </div>
    <div class="sectionHead"><h2>Hızlı işlemler</h2></div>
    <div class="quickGrid">
      <button class="quick" onclick="showView('create')"><div class="quickIcon">✦</div><b>İçerik oluştur</b><span>Medya seç, metin üret, platform önizlemesi gör.</span></button>
      <button class="quick" onclick="showView('calendar')"><div class="quickIcon">▦</div><b>Takvimi aç</b><span>Planlanan içeriklerini gün ve saat bazında yönet.</span></button>
      <button class="quick" onclick="showView('library')"><div class="quickIcon">▤</div><b>İçerik kütüphanesi</b><span>Taslak, hazır ve yayınlanmış içeriklerini düzenle.</span></button>
      <button class="quick" onclick="shareQuickIdea()"><div class="quickIcon">↗</div><b>Hızlı paylaş</b><span>Markana özel kısa bir paylaşım metni oluştur ve gönder.</span></button>
    </div>
    <div class="sectionHead"><h2>Plan ilerlemesi</h2><button onclick="showView('calendar')">Takvimi gör</button></div>
    <div class="card"><div class="progress"><i style="width:${pct}%"></i></div><p class="muted" style="margin:10px 0 0">${n?`${ready+planned} / ${n} içerik hazır veya planlandı.`:'Henüz içerik yok. İlk içeriğini oluşturarak başla.'}</p></div>
    <div class="sectionHead"><h2>Sıradaki içerikler</h2><button onclick="showView('create')">Yeni ekle</button></div>
    <div class="upcoming">${upcoming.length?upcoming.map(postRow).join(''):`<div class="emptyState"><div class="ico">🗓️</div><h3>Takvim boş</h3><p>Bugünden sonrası için planlanmış içerik yok.</p><button class="primaryBtn" onclick="showView('create')">İçerik oluştur</button></div>`}</div>
    <div class="sectionHead"><h2>Performans özeti</h2><button onclick="showView('profile')">Güncelle</button></div>
    <div class="metricGrid">
      <div class="metric"><small>Gösterim</small><b>${Number(state.metrics.impressions).toLocaleString('tr-TR')}</b></div>
      <div class="metric"><small>Etkileşim</small><b>${Number(state.metrics.interactions).toLocaleString('tr-TR')}</b></div>
      <div class="metric"><small>Tıklama</small><b>${Number(state.metrics.clicks).toLocaleString('tr-TR')}</b></div>
      <div class="metric"><small>Takipçi</small><b>${Number(state.metrics.followers).toLocaleString('tr-TR')}</b></div>
    </div>`;
}
function postRow(p){return `<button class="postRow" onclick="editPost('${p.id}')"><div class="dateBox"><div><b>${new Date(p.date+'T00:00:00').getDate()}</b><small>${shortDay(p.date)}</small></div></div><div><h3>${esc(p.title||p.topic||'İçerik')}</h3><p>${esc(p.platforms.join(', '))} · ${esc(p.type)} · ${esc(p.time)}</p></div><span class="status ${statusClass(p.status)}">${esc(p.status)}</span></button>`}

function renderCreate(){
  selectedPlatforms=state.profile.platforms.slice(0,2);
  currentMedia=null;
  $('create').innerHTML=`
    <div class="pageTitle"><div class="eyebrow">Yeni içerik</div><h1>Hazırla ve önizle</h1><p class="muted">Galeriden medya seçebilir, metni düzenleyebilir ve içeriği takvime kaydedebilirsin.</p></div>
    <div class="composer">
      <div class="composerPanel">
        <div class="field full"><span class="fieldTitle">1. Medya</span><div id="mediaPicker" class="mediaPicker" onclick="$('mediaInput').click()"><div class="mediaPlaceholder"><div class="big">▧</div><b>Galeriden fotoğraf veya video seç</b><span>Telefonundaki dosyalar uygulama seçicisinden açılır.</span></div></div></div>
        <div class="field full" style="margin-top:14px"><span class="fieldTitle">2. Platform</span><div id="createPlatforms" class="platformChips">${PLATFORMS.map(p=>`<button type="button" class="platformChip ${selectedPlatforms.includes(p)?'on':''}" data-p="${p}" onclick="toggleCreatePlatform(this)">${p}</button>`).join('')}</div></div>
        <div class="formGrid" style="margin-top:14px">
          <label class="field"><span>Format</span><select id="createType"><option>Görsel post</option><option>Reel</option><option>Story</option><option>Carousel</option><option>Kısa video</option></select></label>
          <label class="field"><span>Konu / ürün</span><input id="createTopic" placeholder="Örn. Yeni kahve menüsü"></label>
          <label class="field full"><span>Başlık</span><input id="createTitle" placeholder="Dikkat çeken kısa başlık"></label>
          <label class="field full"><span>Paylaşım metni</span><textarea id="createCaption" placeholder="Metni kendin yaz veya aşağıdaki yardımcıları kullan."></textarea></label>
          <div class="full helperBar"><button onclick="suggestCaption()">✦ Metin öner</button><button onclick="suggestCTA()">CTA öner</button><button onclick="suggestTags()"># Hashtag öner</button></div>
          <label class="field full"><span>Hashtag</span><input id="createTags" placeholder="#marka #sektör"></label>
          <label class="field"><span>Tarih</span><input id="createDate" type="date" value="${todayISO()}"></label>
          <label class="field"><span>Saat</span><input id="createTime" type="time" value="18:30"></label>
          <div class="full heroActions"><button class="secondaryBtn" onclick="saveComposer('Taslak')">Taslak kaydet</button><button class="primaryBtn" onclick="saveComposer('Planlandı')">Takvime ekle</button><button class="ghostBtn" onclick="shareComposer()">Telefonda paylaş</button></div>
        </div>
      </div>
      <aside class="previewPanel"><div class="fieldTitle">Canlı önizleme</div><div class="previewPhone"><div class="previewTop"><div class="previewAvatar"></div><b id="previewBrand">${esc(state.profile.brand)}</b></div><div id="previewMedia" class="previewMedia">Medya önizlemesi</div><div id="previewCaption" class="previewCaption">Metin burada görünecek.</div></div></aside>
    </div>`;
  $('createCaption').addEventListener('input',updatePreview);
  $('createTitle').addEventListener('input',updatePreview);
  $('createTopic').addEventListener('input',updatePreview);
  updatePreview();
}
function toggleCreatePlatform(btn){btn.classList.toggle('on');selectedPlatforms=[...document.querySelectorAll('#createPlatforms .platformChip.on')].map(x=>x.dataset.p);updatePreview()}
function handleMediaFile(file){
  if(!file)return;
  const kind=file.type.startsWith('video/')?'video':'image';
  const url=URL.createObjectURL(file);
  currentMedia={kind,src:url,name:file.name,persisted:false};
  renderMediaPreview();
  if(kind==='image'&&file.size<=2_000_000){const reader=new FileReader();reader.onload=()=>{currentMedia.src=reader.result;currentMedia.persisted=true;renderMediaPreview()};reader.readAsDataURL(file)}
}
function renderMediaPreview(){const box=$('mediaPicker'),p=$('previewMedia');if(!box||!p||!currentMedia)return;box.classList.add('hasMedia');const media=currentMedia.kind==='video'?`<video src="${currentMedia.src}" controls playsinline></video>`:`<img src="${currentMedia.src}" alt="Seçilen görsel">`;box.innerHTML=media;p.innerHTML=media}
function updatePreview(){const title=$('createTitle')?.value.trim(),caption=$('createCaption')?.value.trim(),tags=$('createTags')?.value.trim();const out=[title,caption,tags].filter(Boolean).join('\n\n')||'Metin burada görünecek.';if($('previewCaption'))$('previewCaption').textContent=out}
function suggestCaption(){const topic=$('createTopic').value.trim()||state.profile.sector;const p=state.profile;const ideas=[`${topic} için küçük bir değişiklik, günün havasını tamamen değiştirebilir. ${p.brand} olarak ${p.audience} için işi sadeleştiriyoruz.`,`Bugün ${topic} konuşalım. ${p.audience} için en önemli nokta: doğru seçim, net bilgi ve kolay deneyim.`,`Birçok kişi ${topic} konusunda aynı soruyu soruyor. Cevap aslında basit: ihtiyacı doğru belirle, gereksiz ayrıntıyı çıkar, sonucu ölç.`];$('createCaption').value=ideas[state.posts.length%ideas.length];if(!$('createTitle').value)$('createTitle').value=`${topic}: kısa ve net`;suggestTags(false);updatePreview()}
function suggestCTA(){const m={Satış:'Detay ve fiyat için mesaj gönder.',Etkileşim:'Senin deneyimin ne? Yorumda yaz.', 'Marka bilinirliği':'Kaydet ve ihtiyacı olan biriyle paylaş.','Mağaza ziyareti':'Uygunsan bugün uğra ve yerinde incele.','Takipçi büyümesi':'Benzer içerikler için hesabı takip et.'};const c=m[state.profile.goal]||'Detay için mesaj gönder.';$('createCaption').value=($('createCaption').value.trim()+`\n\n${c}`).trim();updatePreview()}
function suggestTags(showToast=true){$('createTags').value=[`#${slug(state.profile.brand)}`,`#${slug(state.profile.sector)}`,'#sosyalmedya','#işletme'].join(' ');updatePreview();if(showToast)toast('Hashtag hazır')}
function saveComposer(status){
  const title=$('createTitle').value.trim(),caption=$('createCaption').value.trim(),topic=$('createTopic').value.trim(),tags=$('createTags').value.trim(),date=$('createDate').value,time=$('createTime').value,type=$('createType').value;
  if(!title&&!caption){toast('Başlık veya paylaşım metni gerekli');return}if(!selectedPlatforms.length){toast('En az bir platform seç');return}
  const post={id:'p'+Date.now(),title:title||topic||'Yeni içerik',topic,caption,tags,date:date||todayISO(),time:time||'18:30',type,platforms:selectedPlatforms.slice(),status,media:currentMedia&&currentMedia.persisted?{kind:currentMedia.kind,src:currentMedia.src,name:currentMedia.name}:currentMedia?{kind:currentMedia.kind,src:'',name:currentMedia.name}:null,createdAt:new Date().toISOString()};
  state.posts.unshift(post);saveState();toast(status==='Planlandı'?'Takvime eklendi':'Taslak kaydedildi');showView(status==='Planlandı'?'calendar':'library');
}
function composerText(){return [$('createTitle')?.value,$('createCaption')?.value,$('createTags')?.value].filter(Boolean).join('\n\n')}
function shareComposer(){const text=composerText();if(!text.trim()){toast('Önce paylaşım metni oluştur');return}shareText('SosyalPaket içeriği',text)}
function shareQuickIdea(){const p=state.profile;const text=`${p.brand}: ${p.audience} için bugün tek bir faydalı fikir paylaş.\n\n#${slug(p.brand)} #${slug(p.sector)}`;shareText('SosyalPaket hızlı fikir',text)}
function shareText(title,text){try{if(window.NativeApp&&typeof NativeApp.shareText==='function'){NativeApp.shareText(title,text);return}}catch{}if(navigator.share){navigator.share({title,text}).catch(()=>{})}else if(navigator.clipboard){navigator.clipboard.writeText(text).then(()=>toast('Metin kopyalandı'))}else toast('Paylaşım bu cihazda desteklenmiyor')}

function generate30DayPlan(){
  const themes=['Marka hikâyesi','Müşteri problemi','Hızlı ipucu','Ürün faydası','Sık sorulan soru','Sosyal kanıt','Kulis / süreç','Karşılaştırma','Mini rehber','Hata / doğru','Müşteri yorumu','Ekip tanıtımı','Ürün detayı','Mit / gerçek','Anket','Öncesi / sonrası','Liste içerik','Soru-cevap','Kampanya','Günlük kullanım','Trend yorumu','Topluluk sorusu','Değer önerisi','Nasıl yapılır','İtiraz cevabı','Vaka örneği','Hatırlatma','Seçim rehberi','Haftanın özeti','Ay sonu CTA'];
  const types=['Görsel post','Reel','Story','Carousel','Kısa video'],times=['10:00','12:30','15:00','18:30','20:30'],base=new Date();base.setHours(0,0,0,0);
  const generated=themes.map((theme,i)=>{const d=new Date(base);d.setDate(d.getDate()+i);d.setMinutes(d.getMinutes()-d.getTimezoneOffset());const platform=state.profile.platforms[i%state.profile.platforms.length];return{id:'plan'+Date.now()+i,title:theme,topic:theme,caption:`${theme}: ${state.profile.audience} için kısa, net ve faydalı bir paylaşım hazırla. ${state.profile.brand} dilini koru.`,tags:`#${slug(state.profile.brand)} #${slug(state.profile.sector)}`,date:d.toISOString().slice(0,10),time:times[i%times.length],type:types[i%types.length],platforms:[platform],status:'Taslak',media:null,createdAt:new Date().toISOString()}});
  state.posts=[...generated,...state.posts];saveState();toast('30 günlük plan oluşturuldu');showView('calendar');
}

function renderCalendar(){
  const all=state.posts.slice().sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
  const platforms=['Tümü',...new Set(all.flatMap(p=>p.platforms))];
  const posts=calendarFilter==='Tümü'?all:all.filter(p=>p.platforms.includes(calendarFilter));
  const groups={};posts.forEach(p=>(groups[p.date]||(groups[p.date]=[])).push(p));
  $('calendar').innerHTML=`<div class="pageTitle"><div class="eyebrow">Yayın takvimi</div><h1>İçerik planın</h1><p class="muted">İçerikleri gün, saat ve platform bazında takip et.</p></div><div class="calendarToolbar">${platforms.map(p=>`<button class="${p===calendarFilter?'on':''}" onclick="setCalendarFilter('${p}')">${p}</button>`).join('')}</div><div class="calendarList">${Object.keys(groups).length?Object.entries(groups).map(([date,list])=>`<div class="dayGroup"><div class="dayHead"><b>${formatDate(date)} · ${shortDay(date)}</b><span>${list.length} içerik</span></div><div>${list.map(p=>postRow(p)).join('')}</div></div>`).join(''):`<div class="emptyState"><div class="ico">▦</div><h3>Planlanmış içerik yok</h3><p>Yeni içerik oluştur veya 30 günlük plan hazırla.</p><button class="primaryBtn" onclick="showView('create')">İçerik oluştur</button></div>`}</div>`;
}
function setCalendarFilter(v){calendarFilter=v;renderCalendar()}

function renderLibrary(){
  const posts=state.posts.filter(p=>libraryFilter==='Tümü'||p.status===libraryFilter);
  $('library').innerHTML=`<div class="pageTitle"><div class="eyebrow">Kütüphane</div><h1>Tüm içeriklerin</h1><p class="muted">Taslakları düzenle, hazır olanları paylaş veya takvime al.</p></div><div class="libraryTools"><input id="librarySearch" class="searchInput" placeholder="İçerik ara..." oninput="filterLibrarySearch()"><button class="filterBtn" onclick="cycleLibraryFilter()">${libraryFilter}</button></div><div id="libraryGrid" class="libraryGrid">${libraryCards(posts)}</div>`;
}
function libraryCards(posts){return posts.length?posts.map(p=>`<button class="contentCard" data-search="${esc((p.title+' '+p.caption+' '+p.topic).toLocaleLowerCase('tr-TR'))}" onclick="editPost('${p.id}')"><div class="contentThumb">${p.media?.src&&p.media.kind==='image'?`<img src="${p.media.src}" alt="">`:'✦'}</div><div class="contentBody"><small>${esc(p.platforms.join(' · '))}</small><h3>${esc(p.title)}</h3><p>${esc((p.caption||'').slice(0,110))}</p><span class="status ${statusClass(p.status)}" style="display:inline-block;margin-top:10px">${esc(p.status)}</span></div></button>`).join(''):`<div class="emptyState"><div class="ico">▤</div><h3>İçerik yok</h3><p>Filtreye uyan içerik bulunamadı.</p><button class="primaryBtn" onclick="showView('create')">Yeni içerik</button></div>`}
function filterLibrarySearch(){const q=$('librarySearch').value.toLocaleLowerCase('tr-TR');document.querySelectorAll('#libraryGrid .contentCard').forEach(c=>c.style.display=c.dataset.search.includes(q)?'block':'none')}
function cycleLibraryFilter(){const a=['Tümü','Taslak','Hazır','Planlandı','Yayınlandı'];libraryFilter=a[(a.indexOf(libraryFilter)+1)%a.length];renderLibrary()}

function editPost(id){
  const p=state.posts.find(x=>x.id===id);if(!p)return;
  $('postModalBody').innerHTML=`<div class="formGrid"><label class="field full"><span>Başlık</span><input id="epTitle" value="${esc(p.title)}"></label><label class="field full"><span>Metin</span><textarea id="epCaption">${esc(p.caption)}</textarea></label><label class="field full"><span>Hashtag</span><input id="epTags" value="${esc(p.tags)}"></label><label class="field"><span>Tarih</span><input id="epDate" type="date" value="${p.date}"></label><label class="field"><span>Saat</span><input id="epTime" type="time" value="${p.time}"></label><label class="field"><span>Durum</span><select id="epStatus">${['Taslak','Hazır','Planlandı','Yayınlandı'].map(s=>`<option ${s===p.status?'selected':''}>${s}</option>`).join('')}</select></label><label class="field"><span>Format</span><select id="epType">${['Görsel post','Reel','Story','Carousel','Kısa video'].map(s=>`<option ${s===p.type?'selected':''}>${s}</option>`).join('')}</select></label><div class="full heroActions"><button class="primaryBtn" onclick="savePostEdit('${p.id}')">Kaydet</button><button class="ghostBtn" onclick="sharePost('${p.id}')">Paylaş</button><button class="dangerBtn" onclick="deletePost('${p.id}')">Sil</button></div></div>`;
  $('postModal').classList.add('on');$('postModal').setAttribute('aria-hidden','false');
}
function closePostModal(){$('postModal').classList.remove('on');$('postModal').setAttribute('aria-hidden','true')}
function savePostEdit(id){const p=state.posts.find(x=>x.id===id);if(!p)return;Object.assign(p,{title:$('epTitle').value.trim(),caption:$('epCaption').value.trim(),tags:$('epTags').value.trim(),date:$('epDate').value,time:$('epTime').value,status:$('epStatus').value,type:$('epType').value});saveState();closePostModal();toast('İçerik kaydedildi');showView(activeView)}
function sharePost(id){const p=state.posts.find(x=>x.id===id);if(!p)return;shareText(p.title,[p.title,p.caption,p.tags].filter(Boolean).join('\n\n'))}
function deletePost(id){if(!confirm('Bu içerik silinsin mi?'))return;state.posts=state.posts.filter(x=>x.id!==id);saveState();closePostModal();toast('İçerik silindi');showView(activeView)}

function renderProfile(){
  const m=state.metrics,er=m.impressions?((m.interactions/m.impressions)*100).toFixed(1):'0.0',ctr=m.impressions?((m.clicks/m.impressions)*100).toFixed(1):'0.0';
  $('profile').innerHTML=`<div class="pageTitle"><div class="eyebrow">Hesabım</div><h1>Marka ve uygulama ayarları</h1></div><div class="profileHero"><div class="profileAvatar">${esc(state.profile.brand.charAt(0).toLocaleUpperCase('tr-TR'))}</div><div><h2>${esc(state.profile.brand)}</h2><p class="muted" style="margin:0">${esc(state.profile.sector)} · ${esc(state.profile.goal)}</p></div></div><div class="sectionHead"><h2>Marka bilgileri</h2></div><div class="card"><div class="formGrid"><label class="field"><span>Marka</span><input id="pfBrand" value="${esc(state.profile.brand)}"></label><label class="field"><span>Sektör</span><input id="pfSector" value="${esc(state.profile.sector)}"></label><label class="field full"><span>Hedef müşteri</span><input id="pfAudience" value="${esc(state.profile.audience)}"></label><label class="field"><span>Hedef</span><select id="pfGoal">${['Etkileşim','Satış','Marka bilinirliği','Mağaza ziyareti','Takipçi büyümesi'].map(s=>`<option ${s===state.profile.goal?'selected':''}>${s}</option>`).join('')}</select></label><div class="full"><button class="primaryBtn" onclick="saveProfile()">Bilgileri kaydet</button></div></div></div><div class="sectionHead"><h2>Performans</h2></div><div class="metricGrid"><div class="metric"><small>Etkileşim oranı</small><b>${er}%</b></div><div class="metric"><small>CTR</small><b>${ctr}%</b></div><div class="metric"><small>Gösterim</small><b>${Number(m.impressions).toLocaleString('tr-TR')}</b></div><div class="metric"><small>Takipçi</small><b>${Number(m.followers).toLocaleString('tr-TR')}</b></div></div><div class="card" style="margin-top:10px"><div class="formGrid"><label class="field"><span>Gösterim</span><input id="pmI" type="number" min="0" value="${m.impressions}"></label><label class="field"><span>Etkileşim</span><input id="pmE" type="number" min="0" value="${m.interactions}"></label><label class="field"><span>Tıklama</span><input id="pmC" type="number" min="0" value="${m.clicks}"></label><label class="field"><span>Takipçi</span><input id="pmF" type="number" min="0" value="${m.followers}"></label><div class="full"><button class="secondaryBtn" onclick="saveMetrics()">Metrikleri güncelle</button></div></div></div><div class="sectionHead"><h2>Veri ve güvenlik</h2></div><div class="settingsList"><div class="settingRow"><div><b>Yerel çalışma alanı</b><span>İçerikler bu cihazda saklanır.</span></div><button onclick="exportBackup()">Yedekle</button></div><div class="settingRow"><div><b>Tüm verileri sıfırla</b><span>Marka ve içerikler bu cihazdan silinir.</span></div><button onclick="resetAll()">Sıfırla</button></div></div>`;
}
function saveProfile(){state.profile.brand=$('pfBrand').value.trim()||state.profile.brand;state.profile.sector=$('pfSector').value.trim()||state.profile.sector;state.profile.audience=$('pfAudience').value.trim()||state.profile.audience;state.profile.goal=$('pfGoal').value;saveState();$('brandLabel').textContent=state.profile.brand;$('avatarInitial').textContent=state.profile.brand.charAt(0).toLocaleUpperCase('tr-TR');toast('Profil güncellendi');renderProfile()}
function saveMetrics(){state.metrics={impressions:+$('pmI').value||0,interactions:+$('pmE').value||0,clicks:+$('pmC').value||0,followers:+$('pmF').value||0};saveState();toast('Metrikler kaydedildi');renderProfile()}
function exportBackup(){download(JSON.stringify(state,null,2),'SosyalPaket-yedek.json','application/json;charset=utf-8')}
function download(content,name,type){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);toast('Dosya kaydedildi')}
function resetAll(){if(!confirm('SosyalPaket içindeki tüm marka ve içerik verileri silinsin mi?'))return;localStorage.removeItem(KEY);state=freshState();$('appShell').classList.add('hidden');$('onboarding').classList.remove('hidden');$('obBrand').value='';$('obSector').value='';$('obAudience').value='';toast('Uygulama sıfırlandı')}

$('mediaInput').addEventListener('change',e=>{handleMediaFile(e.target.files?.[0]);e.target.value=''});
$('postModal').addEventListener('click',e=>{if(e.target===$('postModal'))closePostModal()});
if('serviceWorker' in navigator && location.protocol!=='file:')navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).catch(()=>{});
boot();
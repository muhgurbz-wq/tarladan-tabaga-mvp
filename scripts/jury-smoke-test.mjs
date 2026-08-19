import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('competition.css','utf8');
const js=fs.readFileSync('competition.js','utf8');
const errors=[]; const ok=(cond,msg)=>{if(!cond)errors.push(msg)};
ok(html.includes('competition.css?v=20260819-final'),'final competition.css referansı yok');
ok(html.includes('competition.js?v=20260819-final'),'final competition.js referansı yok');
ok(!/styles-v2|enhance\.css|mockup-sync|app-enhance|app\.js/.test(html),'legacy dosya referansı kaldı');
ok((html.match(/data-nav=/g)||[]).length===5,'ana navigasyon 5 değil');
ok((html.match(/data-passport=/g)||[]).length===6,'ürün pasaportu 6 sekme değil');
ok(html.includes('SİMÜLASYON'),'simülasyon etiketi yok');
ok(css.includes('@media(max-width:500px)'),'mobil breakpoint eksik');
ok(!/font-size:[5-7]px/.test(css),'5-7px okunmaz metin bulundu');
const rowsMatch=js.match(/const PRODUCT_ROWS = (\[[\s\S]*?\n\]);\n\nconst PRODUCTS/);
const coordsMatch=js.match(/const CITY_COORDS = (\{[\s\S]*?\n\});\nconst VARIETIES/);
ok(!!rowsMatch,'PRODUCT_ROWS parse edilemedi'); ok(!!coordsMatch,'CITY_COORDS parse edilemedi');
if(rowsMatch&&coordsMatch){
  const rows=vm.runInNewContext(rowsMatch[1]); const coords=vm.runInNewContext('('+coordsMatch[1]+')');
  ok(rows.length===48,`ürün sayısı ${rows.length}, 48 bekleniyor`);
  ok(new Set(rows.map(r=>r[0])).size===rows.length,'ürün id tekrar ediyor');
  ok(new Set(rows.map(r=>r[8])).size===rows.length,'ana ürün görsel URL tekrar ediyor');
  ok(new Set(rows.map(r=>r[2])).size===5,'kategori sayısı 5 değil');
  const missing=[...new Set(rows.map(r=>r[3].split('/')[0].trim()))].filter(c=>!coords[c]);
  ok(missing.length===0,'koordinatı olmayan şehirler: '+missing.join(', '));
}
for(const token of ['buildMissions','createPayment','juryDemo','runSelfTest','renderPassport','initMap','renderSettlement'])ok(js.includes(`function ${token}`),`${token} fonksiyonu eksik`);
if(errors.length){console.error('JURY_SMOKE_FAIL');errors.forEach(e=>console.error('- '+e));process.exit(1)}
console.log('JURY_SMOKE_PASS');
console.log('checks=core-ui,48-products,5-nav,passport,simulation-labels,multi-producer,regional-route,payment,settlement,mobile');

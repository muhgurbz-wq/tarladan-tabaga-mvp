import fs from 'node:fs';
import vm from 'node:vm';

const js=fs.readFileSync('competition.js','utf8');
const html=fs.readFileSync('index.html','utf8');
const rowsMatch=js.match(/const PRODUCT_ROWS = (\[[\s\S]*?\n\]);\n\nconst PRODUCTS/);
if(!rowsMatch){console.error('NETWORK_ASSET_FAIL: PRODUCT_ROWS parse edilemedi');process.exit(1)}
const rows=vm.runInNewContext(rowsMatch[1]);
const urls=new Set(rows.map(r=>r[8]));
for(const id of [...js.matchAll(/SCENE_URL\((\d+)\)/g)].map(m=>m[1])) urls.add(`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`);
for(const m of js.matchAll(/'(https:\/\/images\.unsplash\.com\/[^']+)'/g)) urls.add(m[1]);
for(const m of html.matchAll(/(?:src|href)="(https:\/\/[^\"]+)"/g)){
  if(/unpkg\.com|fonts\.googleapis\.com/.test(m[1])) urls.add(m[1]);
}

const list=[...urls];
const failed=[];
async function probe(url){
  for(let attempt=0;attempt<2;attempt++){
    const ac=new AbortController();
    const timer=setTimeout(()=>ac.abort(),12000);
    try{
      const r=await fetch(url,{method:'GET',redirect:'follow',signal:ac.signal,headers:{'User-Agent':'TT-Jury-Asset-Test/1.0','Accept':'image/*,text/css,*/*'}});
      clearTimeout(timer);
      try{await r.body?.cancel()}catch{}
      if(r.ok) return {url,status:r.status};
      if((r.status===429||r.status>=500)&&attempt===0){await new Promise(x=>setTimeout(x,1000));continue}
      return {url,status:r.status,error:`HTTP ${r.status}`};
    }catch(e){
      clearTimeout(timer);
      if(attempt===0){await new Promise(x=>setTimeout(x,700));continue}
      return {url,status:0,error:e.name||e.message};
    }
  }
}

for(let i=0;i<list.length;i+=6){
  const batch=list.slice(i,i+6);
  const results=await Promise.all(batch.map(probe));
  failed.push(...results.filter(x=>x.error));
}
if(failed.length){
  console.error(`NETWORK_ASSET_FAIL ${failed.length}/${list.length}`);
  for(const f of failed) console.error(`- ${f.status||'ERR'} ${f.url}`);
  process.exit(1);
}
console.log(`NETWORK_ASSET_PASS ${list.length}/${list.length}`);
console.log('checks=product-images,passport-scenes,leaflet-cdn,font-css');

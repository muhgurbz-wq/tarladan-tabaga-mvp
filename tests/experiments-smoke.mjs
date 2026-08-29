import fs from 'node:fs';
import vm from 'node:vm';

const html=fs.readFileSync('experiments/index.html','utf8');
const manifest=JSON.parse(fs.readFileSync('experiments/manifest.webmanifest','utf8'));
const sw=fs.readFileSync('experiments/sw.js','utf8');
const checks=[];
const check=(name,ok)=>{checks.push([name,!!ok]);if(!ok)process.exitCode=1};

check('HTML has 20-product DATA object', (html.match(/cat:'/g)||[]).length>=20);
check('Working product workspace exists', html.includes('generateOutput()') && html.includes("id=out"));
check('Detail accordions exist', html.includes('class=accordion') && html.includes('class=accHead'));
check('Output can be copied', html.includes('navigator.clipboard.writeText'));
check('Output can be downloaded repeatedly', html.includes('new Blob') && html.includes('URL.createObjectURL'));
check('Native share fallback exists', html.includes('navigator.share'));
check('Install prompt is handled', html.includes('beforeinstallprompt') && html.includes('deferredPrompt.prompt()'));
check('Service worker is registered', html.includes("navigator.serviceWorker.register('sw.js')"));
check('Android install guidance exists', html.includes('Android'));
check('iPhone/iPad install guidance exists', html.includes('iPhone') && html.includes('Ana Ekrana Ekle'));
check('Desktop install guidance exists', html.includes('Bilgisayar') && html.includes('Chrome/Edge'));
check('Lead form is product-specific', html.includes('Yeni erken erişim talebi') && html.includes("name='Ürün'"));
check('Manifest standalone', manifest.display==='standalone');
check('Manifest has explicit id', typeof manifest.id==='string' && manifest.id.length>0);
check('Manifest start_url stays inside experiments', String(manifest.start_url).includes('index.html'));
check('Manifest scope is explicit', manifest.scope==='./');
check('Service worker forces upgrade', sw.includes('skipWaiting') && sw.includes('clients.claim'));
check('Old caches are removed', sw.includes('caches.delete'));
check('Navigation is network-first', sw.includes("req.mode==='navigate'") && sw.indexOf('fetch(req)')<sw.indexOf("caches.match('./index.html')"));

const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
check('Inline JavaScript parses', scripts.length>0 && scripts.every(s=>{try{new vm.Script(s);return true}catch(e){console.error(e);return false}}));

for(const [name,ok] of checks) console.log(`${ok?'PASS':'FAIL'}  ${name}`);
if(process.exitCode) throw new Error('Smoke test failed');
console.log(`PASS  ${checks.length}/${checks.length} checks`);

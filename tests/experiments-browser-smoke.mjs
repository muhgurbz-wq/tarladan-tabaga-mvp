import { chromium } from 'playwright';
import fs from 'node:fs';

const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1280,height:900},acceptDownloads:true});
const page=await context.newPage();
const base='http://127.0.0.1:4173/experiments/';
const log=n=>console.log('PASS  '+n);

await page.goto(base,{waitUntil:'networkidle'});
if(await page.locator('.card').count()!==20) throw new Error('20 ürün kartı bulunamadı');
log('20 ürün kartı masaüstünde açıldı');

await page.locator('.card').first().click();
await page.locator('#f1').fill('ABC Ltd.');
await page.locator('#f2').fill('Web danışmanlığı');
await page.locator('#f3').fill('25.000 TL');
await page.getByRole('button',{name:'Profesyonel çıktıyı oluştur'}).click();
const out=await page.locator('#out').innerText();
if(!out.includes('ABC Ltd.')||!out.includes('25.000 TL')) throw new Error('Çalışma alanı çıktı üretmedi');
log('Ürün çalışma alanı gerçek veriyle çıktı üretti');

await page.getByRole('button',{name:'Detaylar'}).click();
await page.locator('.accHead').first().click();
if(!(await page.locator('.accordion').first().evaluate(el=>el.classList.contains('open')))) throw new Error('Detay akordiyonu açılmadı');
log('Derin detay başlıkları açılıp kapatılabiliyor');

await page.getByRole('button',{name:'Çalışma Alanı'}).click();
const downloadPromise=page.waitForEvent('download');
await page.getByRole('button',{name:'Dosya indir'}).click();
const download=await downloadPromise;
const path=await download.path();
if(!path||fs.statSync(path).size<20) throw new Error('İndirilen çıktı boş');
log('Dosya indirme boş olmayan gerçek dosya üretti');

const downloadPromise2=page.waitForEvent('download');
await page.getByRole('button',{name:'Dosya indir'}).click();
const download2=await downloadPromise2;
const path2=await download2.path();
if(!path2||fs.statSync(path2).size<20) throw new Error('İkinci indirme başarısız');
log('Aynı ürün tekrar tekrar indirilebiliyor');

await page.getByRole('button',{name:'Kurulum'}).click();
for(const t of ['Android','iPhone / iPad','Windows / macOS']) if(!(await page.locator('.choice').filter({hasText:t}).count())) throw new Error(t+' kurulum bilgisi eksik');
log('Telefon ve bilgisayar kurulum ekranları mevcut');

await page.goto(base,{waitUntil:'networkidle'});
await page.evaluate(()=>navigator.serviceWorker.ready);
await page.waitForTimeout(500);
await context.setOffline(true);
await page.reload({waitUntil:'domcontentloaded'});
if(await page.locator('.card').count()!==20) throw new Error('Offline/kurulu uygulama içeriği boş açıldı');
log('Service worker sonrası çevrimdışı açılışta içerik boş kalmıyor');
await context.setOffline(false);

const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
const m=await mobile.newPage();
await m.goto(base,{waitUntil:'networkidle'});
if(await m.locator('.card').count()!==20) throw new Error('Mobil görünümde ürünler yüklenmedi');
await m.locator('.card').first().click();
if(!(await m.locator('#f1').isVisible())) throw new Error('Mobil ürün çalışma alanı görünmüyor');
log('Mobil görünümde ürün ve çalışma alanı açılıyor');

await mobile.close();
await context.close();
await browser.close();
console.log('PASS  browser smoke suite tamamlandı');

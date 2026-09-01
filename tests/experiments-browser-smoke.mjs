import { chromium } from 'playwright';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1280,height:900},acceptDownloads:true});
const page=await context.newPage();
const base='http://127.0.0.1:4173/experiments/';
const store=base+'store/';
const app=base+'apps/sosyalpaket/';
const log=n=>console.log('PASS  '+n);
fs.writeFileSync('/tmp/sosyalpaket-test.svg','<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="#eef4ff"/><text x="60" y="210" font-size="42">Test medya</text></svg>');

await page.goto(store,{waitUntil:'networkidle'});
await page.getByRole('button',{name:'Android',exact:true}).click();
if(!(await page.getByText('Android hazır',{exact:true}).isVisible()))throw new Error('Android paket durumu hazır değil');
const dl=page.waitForEvent('download');await page.getByRole('link',{name:'Android uygulamasını indir',exact:true}).click();const apk=await dl;const apkPath=await apk.path();if(!apkPath||fs.statSync(apkPath).size<10000)throw new Error('Platform APK indirmesi boş');log('Android paketi platform üzerinden gerçek APK olarak indiriliyor');

await page.goto(app,{waitUntil:'networkidle'});
await page.locator('#onboarding').waitFor({state:'visible',timeout:3000});
if(await page.getByText('Çözüm Merkezi',{exact:true}).count())throw new Error('Standalone uygulama içinde Çözüm Merkezi kalmış');
await page.locator('#obBrand').fill('Maraş Kahve');await page.locator('#obSector').fill('Kafe');await page.locator('#obAudience').fill('20-40 yaş kahve severler');
await page.getByRole('button',{name:'Çalışma alanını oluştur',exact:true}).click();
await page.locator('#appShell').waitFor({state:'visible'});if(!(await page.getByText('Bugün ne paylaşacağını birlikte hazırlayalım.').isVisible()))throw new Error('Gerçek ana sayfa açılmadı');log('İlk kurulumdan sonra uygulama kendi ana sayfasını açıyor');

await page.locator('#tabbar [data-view="create"]').click();
await page.locator('#mediaInput').setInputFiles('/tmp/sosyalpaket-test.svg');await page.locator('#previewMedia img').waitFor({state:'visible'});
await page.locator('#createTopic').fill('Yeni filtre kahve');await page.getByRole('button',{name:'✦ Metin öner',exact:true}).click();
if(!(await page.locator('#createCaption').inputValue()).trim())throw new Error('Metin önerisi üretilmedi');
await page.locator('#createDate').fill(new Date(Date.now()+86400000).toISOString().slice(0,10));await page.locator('#createTime').fill('19:15');
await page.getByRole('button',{name:'Takvime ekle',exact:true}).click();
if(!(await page.locator('#calendar .postRow').first().isVisible()))throw new Error('İçerik takvime eklenmedi');log('Galeriden medya seçme, içerik üretme ve takvime kaydetme çalışıyor');

await page.locator('#calendar .postRow').first().click();await page.locator('#postModal').waitFor({state:'visible'});await page.locator('#epStatus').selectOption({label:'Hazır'});await page.getByRole('button',{name:'Kaydet',exact:true}).click();
await page.locator('#tabbar [data-view="library"]').click();if(await page.locator('#library .contentCard').count()<1)throw new Error('İçerik kütüphanesine kayıt düşmedi');log('İçerik düzenleme ve kütüphane akışı çalışıyor');

await page.locator('#tabbar [data-view="profile"]').click();await page.locator('#pmI').fill('1000');await page.locator('#pmE').fill('100');await page.locator('#pmC').fill('50');await page.locator('#pmF').fill('500');await page.getByRole('button',{name:'Metrikleri güncelle',exact:true}).click();const profileText=await page.locator('#profile').innerText();if(!profileText.includes('10.0%')||!profileText.includes('5.0%'))throw new Error('Performans oranları hesaplanmadı');log('Profil ve performans takibi çalışıyor');

await page.reload({waitUntil:'networkidle'});await page.locator('#appShell').waitFor({state:'visible',timeout:3000});if(await page.locator('#onboarding').isVisible())throw new Error('Kayıtlı kullanıcı tekrar onboarding ekranına düştü');await page.locator('#tabbar [data-view="library"]').click();const persistedTitle=page.locator('#library .contentCard h3').filter({hasText:'Yeni filtre kahve: kısa ve net'}).first();if(!(await persistedTitle.isVisible()))throw new Error('Yerel çalışma verisi yeniden açılışta korunmadı');log('Uygulama yeniden açıldığında kullanıcı verisi korunuyor');

await page.locator('#tabbar [data-view="home"]').click();await page.getByRole('button',{name:'30 günlük plan',exact:true}).click();if(await page.locator('#calendar .postRow').count()<31)throw new Error('30 günlük plan eklenmedi');log('30 günlük plan gerçek içerik kayıtları olarak oluşturuluyor');

const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,acceptDownloads:true,userAgent:'Mozilla/5.0 (Linux; Android 12; Mobile) AppleWebKit/537.36 Chrome/140 Mobile Safari/537.36'});const m=await mobile.newPage();await m.goto(app,{waitUntil:'networkidle'});await m.locator('#onboarding').waitFor({state:'visible',timeout:3000});await m.locator('#obBrand').fill('Mobil Marka');await m.locator('#obSector').fill('Perakende');await m.locator('#obAudience').fill('Mobil müşteriler');await m.getByRole('button',{name:'Çalışma alanını oluştur',exact:true}).click();if(!(await m.locator('.tabbar').isVisible()))throw new Error('Mobil alt navigasyon görünmüyor');await m.locator('#tabbar [data-view="create"]').click();if(!(await m.locator('#mediaPicker').isVisible()))throw new Error('Mobil içerik oluşturma ekranı açılmıyor');await m.locator('#mediaInput').setInputFiles('/tmp/sosyalpaket-test.svg');if(!(await m.locator('#previewMedia img').isVisible()))throw new Error('Mobil galeri medyası önizlenmiyor');log('Android mobil akışta onboarding, ana navigasyon ve galeri seçimi çalışıyor');
await mobile.close();await context.close();await browser.close();console.log('PASS  standalone product browser suite tamamlandı');

const stages=[
  {
    hero:'Sipariş oluşturuldu',state:'ÜRETİCİ ONAYI BEKLENİYOR',code:'TT-DEMO-001',icon:'📱',step:'ADIM 01',status:'SİPARİŞ OLUŞTU',
    title:'Vatandaş mobil uygulamadan sipariş verir.',
    text:'Seçilen ürün, miktar ve teslimat noktası tek talep kaydında üretici eşleştirmesine hazır hale gelir.',
    data:[['Talep','Yerel ürün siparişi'],['Kaynak','Kahramanmaraş üreticisi'],['Durum','Üretici onayı bekleniyor'],['İzleme','Tek sipariş kimliği']]
  },
  {
    hero:'Üretici siparişi onayladı',state:'STOK + HAZIRLIK TEYİT',code:'TT-DEMO-001',icon:'🌱',step:'ADIM 02',status:'ÜRETİCİ ONAYI',
    title:'Üretici stok ve hazırlık durumunu teyit eder.',
    text:'Sipariş gerçek üretim kaynağıyla bağlanır; hazırlık bilgisi operasyon katmanına aktarılır.',
    data:[['Üretici','Yerel üretici hesabı'],['Kontrol','Stok + hazırlık'],['Durum','Sipariş kabul edildi'],['Sonraki adım','Görev ve rota planı']]
  },
  {
    hero:'YZ görev ve rota planlıyor',state:'PLAN OLUŞTURULDU',code:'TT-DEMO-001',icon:'✦',step:'ADIM 03',status:'YZ KARAR KATMANI',
    title:'YZ motoru siparişi fiziksel operasyona dönüştürür.',
    text:'Toplama noktası, teslimat hedefi ve uygun operasyon sırası tek görev planında birleştirilir.',
    data:[['Girdi','Sipariş + üretici + konum'],['Karar','Görev sırası'],['Optimizasyon','Toplama / teslimat rotası'],['Çıktı','Operasyon görevi']]
  },
  {
    hero:'Ürün sahada hareket ediyor',state:'CANLI TAKİP',code:'TT-DEMO-001',icon:'🚚',step:'ADIM 04',status:'LOJİSTİK OPERASYONU',
    title:'Toplama ve teslimat görevi canlı duruma geçer.',
    text:'Operasyon uygun araçla yürütülür; saha koşullarının uygun olduğu pilot senaryolarda drone görevi de planın bir parçası olabilir.',
    data:[['Görev','Toplama + teslimat'],['Operasyon','Araç / uygun sahada drone'],['Takip','Canlı durum'],['Hedef','Teslimat noktası']]
  },
  {
    hero:'Teslimat tamamlandı',state:'AKIŞ KAPANDI',code:'TT-DEMO-001',icon:'🏠',step:'ADIM 05',status:'TESLİM + ÖDEME',
    title:'Ürün sofraya ulaşır, teslimat doğrulanır.',
    text:'Teslim doğrulamasıyla sipariş zinciri kapanır; ödeme ve izlenebilirlik kaydı aynı sipariş kimliği altında tamamlanır.',
    data:[['Teslimat','Doğrulandı'],['İzlenebilirlik','Sipariş zinciri kapandı'],['Ödeme','Güvenli kapanış'],['Sonuç','Tarladan sofraya tek kayıt']]
  }
];

let flowTimer=null;

const heroStatus=document.querySelector('#heroStatus');
const consoleTitle=document.querySelector('#consoleTitle');
const consoleText=document.querySelector('#consoleText');
const consoleCode=document.querySelector('#consoleCode');
const consoleState=document.querySelector('#consoleState');
const detailStep=document.querySelector('#detailStep');
const detailStatus=document.querySelector('#detailStatus');
const detailIcon=document.querySelector('#detailIcon');
const detailTitle=document.querySelector('#detailTitle');
const detailText=document.querySelector('#detailText');
const detailData=document.querySelector('#detailData');

function showStage(index){
  const s=stages[index];
  heroStatus.textContent=s.hero;
  consoleTitle.textContent=s.title;
  consoleText.textContent=s.text;
  consoleCode.textContent=s.code;
  consoleState.textContent=s.state;
  detailStep.textContent=s.step;
  detailStatus.textContent=s.status;
  detailIcon.textContent=s.icon;
  detailTitle.textContent=s.title;
  detailText.textContent=s.text;
  detailData.innerHTML=s.data.map(([k,v])=>`<div><span>${k}</span><b>${v}</b></div>`).join('');

  document.querySelectorAll('.flow-step').forEach((el,i)=>el.classList.toggle('active',i===index));
  document.querySelectorAll('[data-stage-node]').forEach((el,i)=>{
    el.classList.toggle('active',i===index);
    el.classList.toggle('done',i<index);
  });
  document.querySelectorAll('.journey-line').forEach((el,i)=>el.classList.toggle('done',i<index));
}

function startFlow(){
  if(flowTimer) clearInterval(flowTimer);
  let index=0;
  showStage(index);
  flowTimer=setInterval(()=>{
    index+=1;
    if(index>=stages.length){
      clearInterval(flowTimer);
      flowTimer=null;
      return;
    }
    showStage(index);
  },1500);
  document.querySelector('#akis').scrollIntoView({behavior:'smooth',block:'start'});
}

document.querySelectorAll('[data-start-flow]').forEach(btn=>btn.addEventListener('click',startFlow));
document.querySelectorAll('.flow-step').forEach(btn=>btn.addEventListener('click',()=>{
  if(flowTimer){clearInterval(flowTimer);flowTimer=null;}
  showStage(Number(btn.dataset.stage));
}));

showStage(0);

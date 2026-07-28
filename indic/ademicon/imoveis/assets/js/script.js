
'use strict';

const WHATSAPP = Object.freeze({
  jane:'5511959103665',
  christopher:'559591408900'
});

const CONSULTANTS = Object.freeze({
  jane:{name:'Jane Lima',greeting:'Jane',prefix:'JAN'},
  christopher:{name:'Christopher Galvão',greeting:'Christopher',prefix:'CHR'}
});

const screens=[...document.querySelectorAll('.screen')];
const toast=document.getElementById('toast');
const state={current:0,objective:'',consultant:'',credit:'',timeframe:'',code:''};
let locked=false;
let toastTimer=0;
let resizeTimer=0;

function fitAllStages(){
  const vw=document.documentElement.clientWidth;
  const vh=document.documentElement.clientHeight;

  document.querySelectorAll('.art-stage').forEach(stage=>{
    const aw=Number(stage.dataset.artWidth);
    const ah=Number(stage.dataset.artHeight);
    if(!aw || !ah) return;

    const scale=Math.min(vw/aw,vh/ah);
    const width=Math.floor(aw*scale);
    const height=Math.floor(ah*scale);

    stage.style.width=`${width}px`;
    stage.style.height=`${height}px`;
  });
}

function showToast(message){
  clearTimeout(toastTimer);
  toast.textContent=message;
  toast.classList.add('show');
  toastTimer=setTimeout(()=>toast.classList.remove('show'),2800);
}

function goTo(index){
  const next=Math.max(0,Math.min(index,screens.length-1));
  state.current=next;
  screens.forEach((screen,i)=>{
    const active=i===next;
    screen.classList.toggle('is-active',active);
    screen.setAttribute('aria-hidden',String(!active));
  });
  requestAnimationFrame(fitAllStages);
}

function selectAndAdvance(button,selector,setValue,next){
  if(locked)return;
  locked=true;
  document.querySelectorAll(selector).forEach(el=>el.classList.remove('is-selected'));
  button.classList.add('is-selected');
  setValue();
  if(navigator.vibrate)navigator.vibrate(20);
  setTimeout(()=>{
    goTo(next);
    locked=false;
  },520);
}


function updateSummary(){
  const consultant=CONSULTANTS[state.consultant];
  const consultantEl=document.getElementById('summary-consultant');
  const objectiveEl=document.getElementById('summary-objective');
  const creditEl=document.getElementById('summary-credit');
  const timeframeEl=document.getElementById('summary-timeframe');
  const codeEl=document.getElementById('summary-code');

  if(consultantEl)consultantEl.textContent=consultant?.name||'—';
  if(objectiveEl)objectiveEl.textContent=state.objective||'—';
  if(creditEl)creditEl.textContent=state.credit||'—';
  if(timeframeEl)timeframeEl.textContent=state.timeframe||'—';
  if(codeEl)codeEl.textContent=state.code||'Será gerado ao continuar';
}

function generateCode(){
  const c=CONSULTANTS[state.consultant];
  const key=`uw_ads_${c.prefix}_counter`;
  const n=Number(localStorage.getItem(key)||'0')+1;
  localStorage.setItem(key,String(n));
  return `UW-ADS-${c.prefix}-${String(n).padStart(4,'0')}`;
}

function buildMessage(){
  const c=CONSULTANTS[state.consultant];
  return `Olá, ${c.greeting}!

Encontrei sua consultoria através de uma campanha da UrbanWatch.app.

Origem: UrbanWatch Ads | David Elias

Código do pré-atendimento:
${state.code}

Objetivo: ${state.objective}
Carta de crédito desejada: ${state.credit}
Prazo pretendido: ${state.timeframe}

Tenho interesse em conhecer as opções de consórcio para imóvel e gostaria de uma orientação personalizada.

Podemos conversar?`;
}

function send(){
  const c=CONSULTANTS[state.consultant];
  if(!state.objective||!c||!state.credit||!state.timeframe){
    showToast('Volte e conclua todas as escolhas.');
    return;
  }
  const number=WHATSAPP[state.consultant];
  if(!/^55\d{10,11}$/.test(number||'')){
    showToast('Configure o WhatsApp deste especialista no script.js.');
    return;
  }
  state.code=generateCode();
  updateSummary();
  const url=`https://wa.me/${number}?text=${encodeURIComponent(buildMessage())}`;
  const popup=window.open(url,'_blank','noopener,noreferrer');
  goTo(6);
  if(!popup)setTimeout(()=>location.href=url,250);
}

document.addEventListener('click',event=>{
  const el=event.target.closest('button');
  if(!el)return;

  if(el.matches('[data-action="next"]'))return goTo(1);
  if(el.matches('[data-action="back"]'))return goTo(state.current-1);
  if(el.matches('[data-action="send"]'))return send();

  if(el.matches('[data-action="restart"]')){
    Object.assign(state,{current:0,objective:'',consultant:'',credit:'',timeframe:'',code:''});
    document.querySelectorAll('.hotspot').forEach(x=>x.classList.remove('is-selected'));
    updateSummary();
    return goTo(0);
  }

  if(el.dataset.objective){
    return selectAndAdvance(el,'[data-objective]',()=>{state.objective=el.dataset.objective;updateSummary();},2);
  }
  if(el.dataset.consultant){
    return selectAndAdvance(el,'[data-consultant]',()=>{state.consultant=el.dataset.consultant;updateSummary();},3);
  }
  if(el.dataset.credit){
    return selectAndAdvance(el,'[data-credit]',()=>{state.credit=el.dataset.credit;updateSummary();},4);
  }
  if(el.dataset.timeframe){
    return selectAndAdvance(el,'[data-timeframe]',()=>{state.timeframe=el.dataset.timeframe;updateSummary();},5);
  }
});

window.addEventListener('resize',()=>{
  clearTimeout(resizeTimer);
  resizeTimer=setTimeout(fitAllStages,100);
});
window.addEventListener('orientationchange',()=>setTimeout(fitAllStages,180));
window.addEventListener('load',fitAllStages);

fitAllStages();
updateSummary();
goTo(0);

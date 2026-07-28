
'use strict';

const WHATSAPP = Object.freeze({
  jane: '55SEUNUMEROJANE',
  christopher: '5585984048975'
});

const CONSULTANTS = Object.freeze({
  jane: { name:'Jane Lima', greeting:'Jane', prefix:'JAN' },
  christopher: { name:'Christopher Galvão', greeting:'Christopher', prefix:'CHR' }
});

const screens = [...document.querySelectorAll('.screen')];
const toast = document.getElementById('toast');
const loading = document.getElementById('loading');

const state = {
  current:0,
  objective:'',
  consultant:'',
  credit:'',
  timeframe:'',
  code:''
};

let locked = false;
let toastTimer = 0;

function showToast(message){
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(()=>toast.classList.remove('show'),2800);
}

function goTo(index){
  const next = Math.max(0,Math.min(index,screens.length-1));
  state.current = next;
  screens.forEach((screen,i)=>{
    const active = i===next;
    screen.classList.toggle('is-active',active);
    screen.setAttribute('aria-hidden',String(!active));
  });
}

function clearSelection(group){
  document.querySelectorAll(group).forEach(el=>{
    el.classList.remove('is-selected');
    el.setAttribute('aria-pressed','false');
  });
}

function selectAndAdvance(button, group, callback, nextScreen){
  if(locked) return;
  locked = true;
  clearSelection(group);
  button.classList.add('is-selected');
  button.setAttribute('aria-pressed','true');
  callback();
  if('vibrate' in navigator) navigator.vibrate(24);
  setTimeout(()=>{
    goTo(nextScreen);
    locked = false;
  },520);
}

function generateCode(){
  const c = CONSULTANTS[state.consultant];
  if(!c) return '';
  const key = `uw_ads_${c.prefix}_counter`;
  const n = Number(localStorage.getItem(key)||'0')+1;
  localStorage.setItem(key,String(n));
  return `UW-ADS-${c.prefix}-${String(n).padStart(4,'0')}`;
}

function updateSummary(){
  const c = CONSULTANTS[state.consultant];
  document.getElementById('summary-consultant').textContent = c?.name || '—';
  document.getElementById('summary-objective').textContent = state.objective || '—';
  document.getElementById('summary-credit').textContent = state.credit || '—';
  document.getElementById('summary-timeframe').textContent = state.timeframe || '—';
  document.getElementById('summary-code').textContent = state.code || 'Será gerado ao continuar';
}

function buildMessage(){
  const c = CONSULTANTS[state.consultant];
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

function validNumber(number){
  return /^55\d{10,11}$/.test(number || '');
}

function send(){
  const c = CONSULTANTS[state.consultant];
  if(!state.objective || !c || !state.credit || !state.timeframe){
    showToast('Volte e conclua todas as escolhas.');
    return;
  }
  const number = WHATSAPP[state.consultant];
  if(!validNumber(number)){
    showToast('Configure o WhatsApp deste especialista no script.js.');
    return;
  }
  state.code = generateCode();
  updateSummary();
  const url = `https://wa.me/${number}?text=${encodeURIComponent(buildMessage())}`;
  loading.classList.add('is-visible');
  loading.setAttribute('aria-hidden','false');

  setTimeout(()=>{
    loading.classList.remove('is-visible');
    loading.setAttribute('aria-hidden','true');
    const popup = window.open(url,'_blank','noopener,noreferrer');
    goTo(6);
    if(!popup) location.href = url;
  },420);
}

document.addEventListener('click',event=>{
  const target = event.target;

  if(target.closest('[data-action="next"]')) return goTo(1);
  if(target.closest('[data-action="back"]')) return goTo(state.current-1);
  if(target.closest('[data-action="restart"]')){
    Object.assign(state,{current:0,objective:'',consultant:'',credit:'',timeframe:'',code:''});
    document.querySelectorAll('.hotspot').forEach(el=>el.classList.remove('is-selected'));
    updateSummary();
    return goTo(0);
  }
  if(target.closest('[data-action="send"]')) return send();

  const objective = target.closest('[data-objective]');
  if(objective){
    return selectAndAdvance(
      objective,'[data-objective]',
      ()=>{state.objective=objective.dataset.objective;updateSummary();},
      2
    );
  }

  const consultant = target.closest('[data-consultant]');
  if(consultant){
    return selectAndAdvance(
      consultant,'[data-consultant]',
      ()=>{state.consultant=consultant.dataset.consultant;updateSummary();},
      3
    );
  }

  const credit = target.closest('[data-credit]');
  if(credit){
    return selectAndAdvance(
      credit,'[data-credit]',
      ()=>{state.credit=credit.dataset.credit;updateSummary();},
      4
    );
  }

  const timeframe = target.closest('[data-timeframe]');
  if(timeframe){
    return selectAndAdvance(
      timeframe,'[data-timeframe]',
      ()=>{state.timeframe=timeframe.dataset.timeframe;updateSummary();},
      5
    );
  }
});

document.addEventListener('keydown',event=>{
  if(event.key==='Escape' && state.current>0) goTo(state.current-1);
});

updateSummary();
goTo(0);

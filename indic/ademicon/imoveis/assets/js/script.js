'use strict';

/*
  CONFIGURAÇÃO DOS ESPECIALISTAS
  Use somente dígitos: 55 + DDD + número.
*/
const WHATSAPP = Object.freeze({
  jane: '55SEUNUMEROJANE',
  christopher: '5585984048975'
});

const CONSULTANTS = Object.freeze({
  jane: { name: 'Jane Lima', greeting: 'Jane', prefix: 'JAN' },
  christopher: { name: 'Christopher Galvão', greeting: 'Christopher', prefix: 'CHR' }
});

const state = {
  screen: 0,
  objective: '',
  consultant: '',
  credit: '',
  timeframe: '',
  code: ''
};

const screens = [...document.querySelectorAll('.screen')];
const stages = [...document.querySelectorAll('.art-stage')];
const toast = document.getElementById('toast');
let toastTimer;

function sizeStages(){
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  stages.forEach(stage => {
    const [rw, rh] = stage.dataset.ratio.split('/').map(Number);
    const ratio = rw / rh;
    let width = viewportWidth;
    let height = width / ratio;

    if(height > viewportHeight){
      height = viewportHeight;
      width = height * ratio;
    }

    stage.style.width = `${Math.round(width)}px`;
    stage.style.height = `${Math.round(height)}px`;
  });
}

function showToast(message){
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3300);
}

function goTo(index){
  const target = Math.max(0, Math.min(index, screens.length - 1));
  state.screen = target;

  screens.forEach((screen, i) => {
    const active = i === target;
    screen.classList.toggle('is-active', active);
    screen.setAttribute('aria-hidden', String(!active));
  });

  if(target === 5) updateSummary();
}

function generateCode(){
  const consultant = CONSULTANTS[state.consultant];
  if(!consultant) return '';

  const storageKey = `urbanwatch_ads_${consultant.prefix.toLowerCase()}_counter`;
  let next = 1;

  try{
    next = Number.parseInt(localStorage.getItem(storageKey) || '0', 10) + 1;
    localStorage.setItem(storageKey, String(next));
  }catch{
    next = Math.floor(Date.now() / 1000) % 10000;
  }

  return `UW-ADS-${consultant.prefix}-${String(next).padStart(4, '0')}`;
}

function specialistNumberIsConfigured(){
  return /^55\d{10,11}$/.test(WHATSAPP[state.consultant] || '');
}

function updateSummary(){
  const consultant = CONSULTANTS[state.consultant];
  document.getElementById('summary-consultant').textContent = consultant?.name || 'Não selecionado';
  document.getElementById('summary-objective').textContent = state.objective || 'Não selecionado';
  document.getElementById('summary-credit').textContent = state.credit || 'Não selecionada';
  document.getElementById('summary-timeframe').textContent = state.timeframe || 'Não selecionado';
  document.getElementById('summary-code').textContent = state.code || 'Será gerado ao continuar';
}

function buildMessage(){
  const consultant = CONSULTANTS[state.consultant];

  return `Olá, ${consultant.greeting}!

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

function sendToWhatsApp(){
  if(!state.objective || !state.consultant || !state.credit || !state.timeframe){
    showToast('Volte e conclua todas as escolhas.');
    return;
  }

  if(!specialistNumberIsConfigured()){
    showToast('Configure o WhatsApp deste especialista em assets/js/script.js.');
    return;
  }

  state.code = generateCode();
  updateSummary();

  const number = WHATSAPP[state.consultant];
  const url = `https://wa.me/${number}?text=${encodeURIComponent(buildMessage())}`;

  /* A abertura acontece diretamente a partir do clique, reduzindo bloqueios. */
  const whatsappWindow = window.open(url, '_blank', 'noopener,noreferrer');
  goTo(6);

  if(!whatsappWindow){
    /* Alternativa para navegadores que bloqueiam nova aba. */
    setTimeout(() => window.location.assign(url), 250);
  }
}

function resetFlow(){
  Object.assign(state, {
    screen: 0,
    objective: '',
    consultant: '',
    credit: '',
    timeframe: '',
    code: ''
  });
  goTo(0);
}

function preloadRemainingImages(){
  const sources = [
    'assets/img/sessao-02-objetivo.png',
    'assets/img/sessao-03-especialistas.png',
    'assets/img/sessao-04-carta.png',
    'assets/img/sessao-05-prazo.png',
    'assets/img/sessao-06-resumo.png',
    'assets/img/sessao-07-sucesso.png'
  ];

  const run = () => sources.forEach(src => {
    const image = new Image();
    image.decoding = 'async';
    image.src = src;
  });

  if('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 1800 });
  else setTimeout(run, 350);
}

document.addEventListener('click', event => {
  const action = event.target.closest('[data-action]')?.dataset.action;

  if(action === 'next') return goTo(state.screen + 1);
  if(action === 'back') return goTo(state.screen - 1);
  if(action === 'send') return sendToWhatsApp();
  if(action === 'restart') return resetFlow();

  const objective = event.target.closest('[data-objective]');
  if(objective){
    state.objective = objective.dataset.objective;
    return goTo(2);
  }

  const consultant = event.target.closest('[data-consultant]');
  if(consultant){
    state.consultant = consultant.dataset.consultant;
    return goTo(3);
  }

  const credit = event.target.closest('[data-credit]');
  if(credit){
    state.credit = credit.dataset.credit;
    return goTo(4);
  }

  const timeframe = event.target.closest('[data-timeframe]');
  if(timeframe){
    state.timeframe = timeframe.dataset.timeframe;
    return goTo(5);
  }
});

document.addEventListener('keydown', event => {
  if(event.key === 'Escape' && state.screen > 0) goTo(state.screen - 1);
  if(event.key === 'ArrowLeft' && state.screen > 0) goTo(state.screen - 1);
});

window.addEventListener('resize', sizeStages, { passive: true });
window.addEventListener('orientationchange', () => setTimeout(sizeStages, 120), { passive: true });

sizeStages();
preloadRemainingImages();
goTo(0);

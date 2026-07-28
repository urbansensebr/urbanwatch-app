'use strict';

/*
  PREENCHA SOMENTE COM DÍGITOS:
  55 + DDD + número.
  Exemplo fictício: 5585999999999
*/
const WHATSAPP = Object.freeze({
  jane: '5511959103665',
  christopher: '559591408900'
});

const CONSULTANTS = Object.freeze({
  jane: { name: 'Jane Lima', greeting: 'Jane', code: 'UW-ADS-JAN-0001' },
  christopher: { name: 'Christopher Galvão', greeting: 'Christopher', code: 'UW-ADS-CHR-0001' }
});

const state = { objective: '', consultant: '', credit: '', timeframe: '' };
const toast = document.getElementById('toast');
const finalButton = document.getElementById('final-whatsapp');
let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4200);
}
function isConfigured(number) { return /^55\d{10,11}$/.test(number); }
function scrollToSection(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function setPressed(groupSelector, selectedButton) {
  document.querySelectorAll(groupSelector).forEach((button) => {
    button.setAttribute('aria-pressed', String(button === selectedButton));
  });
}
function updateSummary() {
  const consultant = CONSULTANTS[state.consultant];
  document.getElementById('summary-consultant').textContent = consultant?.name || 'Não selecionado';
  document.getElementById('summary-objective').textContent = state.objective || 'Não selecionado';
  document.getElementById('summary-credit').textContent = state.credit || 'Não selecionada';
  document.getElementById('summary-timeframe').textContent = state.timeframe || 'Não selecionado';

  finalButton.disabled = !(state.objective && state.consultant && state.credit && state.timeframe);
  if (consultant) {
    document.getElementById('final-label').textContent = `Conversar com ${consultant.greeting} pelo WhatsApp`;
  }
}
function buildMessage() {
  const consultant = CONSULTANTS[state.consultant];
  return `Olá, ${consultant.greeting}!

Encontrei sua consultoria através de uma campanha da UrbanWatch.

Origem: UrbanWatch Ads | David Elias

Código de atendimento:
${consultant.code}

Tenho interesse em conhecer as opções de consórcio para imóvel e gostaria de uma orientação personalizada.

Objetivo: ${state.objective}
Carta de crédito desejada: ${state.credit}
Prazo pretendido: ${state.timeframe}

Podemos conversar?`;
}
function openWhatsApp() {
  if (!(state.objective && state.consultant && state.credit && state.timeframe)) {
    showToast('Conclua todas as etapas antes de abrir o WhatsApp.');
    return;
  }
  const number = WHATSAPP[state.consultant];
  if (!isConfigured(number)) {
    showToast('Insira no arquivo assets/js/script.js o número real deste especialista.');
    return;
  }
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(buildMessage())}`, '_blank', 'noopener,noreferrer');
}

document.addEventListener('click', (event) => {
  const scrollButton = event.target.closest('[data-scroll]');
  if (scrollButton) return scrollToSection(scrollButton.dataset.scroll);

  const objectiveButton = event.target.closest('[data-objective]');
  if (objectiveButton) {
    state.objective = objectiveButton.dataset.objective;
    document.querySelectorAll('[data-objective]').forEach((button) => button.classList.toggle('selected', button === objectiveButton));
    updateSummary();
    showToast(`Objetivo selecionado: ${state.objective}`);
    return setTimeout(() => scrollToSection('#especialistas'), 280);
  }

  const consultantButton = event.target.closest('[data-consultant]');
  if (consultantButton) {
    state.consultant = consultantButton.dataset.consultant;
    document.querySelectorAll('[data-consultant]').forEach((button) => button.classList.toggle('selected', button === consultantButton));
    updateSummary();
    showToast(`${CONSULTANTS[state.consultant].name} foi selecionado(a).`);
    return setTimeout(() => scrollToSection('#carta'), 280);
  }

  const creditButton = event.target.closest('[data-credit]');
  if (creditButton) {
    state.credit = creditButton.dataset.credit;
    setPressed('[data-credit]', creditButton);
    updateSummary();
    return setTimeout(() => scrollToSection('#prazo'), 280);
  }

  const timeframeButton = event.target.closest('[data-timeframe]');
  if (timeframeButton) {
    state.timeframe = timeframeButton.dataset.timeframe;
    setPressed('[data-timeframe]', timeframeButton);
    updateSummary();
    return setTimeout(() => scrollToSection('#confirmacao'), 280);
  }

  if (event.target.closest('#final-whatsapp')) openWhatsApp();
});
updateSummary();

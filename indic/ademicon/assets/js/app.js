(() => {
  'use strict';

  const storageKey = 'uw-central-language';
  let language = localStorage.getItem(storageKey) || window.UW_CONFIG.defaultLanguage;

  function setLanguage(nextLanguage) {
    if (!window.UW_CONFIG.translations[nextLanguage]) return;
    language = nextLanguage;
    localStorage.setItem(storageKey, language);
    document.documentElement.lang = language;

    document.querySelectorAll('[data-lang]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === language));
    });

    const dictionary = window.UW_CONFIG.translations[language];
    document.querySelectorAll('[data-i18n-label]').forEach((element) => {
      const value = dictionary[element.dataset.i18nLabel];
      if (value) element.setAttribute('aria-label', value);
    });
  }

  function initLanguageSwitcher() {
    document.querySelectorAll('[data-lang]').forEach((button) => {
      button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });
    setLanguage(language);
  }

  function init() {
    initLanguageSwitcher();
    window.UWNavigation.init(() => language);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

window.UWNavigation = (() => {
  'use strict';

  let locked = false;
  let toastTimer = 0;

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), window.UW_CONFIG.toastDuration);
  }

  function unlock() {
    locked = false;
    window.UWHotspots.clearSelection();
  }

  function init(getLanguage) {
    window.UWHotspots.getAll().forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        if (locked) return;

        locked = true;
        window.UWHotspots.select(link);

        const route = link.dataset.route;
        const language = getLanguage();
        const dictionary = window.UW_CONFIG.translations[language] || window.UW_CONFIG.translations['pt-BR'];
        const routeName = dictionary.names[route] || route;
        showToast(dictionary.opening.replace('{name}', routeName));

        const target = window.UW_CONFIG.routes[route] || link.getAttribute('href');
        window.setTimeout(() => window.location.assign(target), window.UW_CONFIG.selectionDelay);
      });
    });

    window.addEventListener('pageshow', unlock);
  }

  return Object.freeze({ init, unlock });
})();

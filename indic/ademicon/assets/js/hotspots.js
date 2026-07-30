window.UWHotspots = (() => {
  'use strict';

  function getAll() {
    return [...document.querySelectorAll('[data-route]')];
  }

  function clearSelection() {
    getAll().forEach((item) => item.classList.remove('is-selected'));
  }

  function select(item) {
    clearSelection();
    item.classList.add('is-selected');
  }

  return Object.freeze({ getAll, clearSelection, select });
})();

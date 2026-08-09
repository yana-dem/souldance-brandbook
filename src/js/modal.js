/* Soul Dance — modal.js — Выбор мессенджера */
(function () {
  'use strict';

  var modal = null;
  var lastFocused = null;

  function openModal() {
    modal = document.getElementById('messenger-modal');
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.removeAttribute('aria-hidden');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    var closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal) modal = document.getElementById('messenger-modal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener('DOMContentLoaded', function () {
    modal = document.getElementById('messenger-modal');

    /* Кнопка закрыть */
    var closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    /* Клик по оверлею */
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
    }

    /* Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    /* Все триггеры модального окна */
    bindModalTriggers();
  });

  function bindModalTriggers() {
    document.querySelectorAll('[data-modal="messenger"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });
  }

  /* Публичное API — для courses.js и других модулей */
  window.SoulDanceModal = {
    open: openModal,
    close: closeModal,
    bindTriggers: bindModalTriggers
  };

})();

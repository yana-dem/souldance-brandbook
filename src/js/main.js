/* Soul Dance — main.js */
(function () {
  'use strict';

  var CONSENT_KEY = 'sd-cookie-consent';

  /* ── Аналитика ──────────────────────────────────────────── */

  function loadAnalytics() {
    /* TODO: вставить коды счётчиков после получения от Яны */
  }

  /* ── Cookie-баннер ──────────────────────────────────────── */

  function initCookieBanner() {
    var consent = localStorage.getItem(CONSENT_KEY);
    if (consent) {
      if (consent === 'all') loadAnalytics();
      return;
    }

    var banner = document.getElementById('cookie-banner');
    if (!banner) return;
    banner.removeAttribute('hidden');

    var btnAll = document.getElementById('cookie-accept-all');
    var btnMin = document.getElementById('cookie-accept-minimal');

    if (btnAll) {
      btnAll.addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, 'all');
        banner.setAttribute('hidden', '');
        loadAnalytics();
      });
    }

    if (btnMin) {
      btnMin.addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, 'minimal');
        banner.setAttribute('hidden', '');
      });
    }
  }

  function initCookieSettings() {
    var btn = document.getElementById('cookie-settings-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      localStorage.removeItem(CONSENT_KEY);
      var banner = document.getElementById('cookie-banner');
      if (banner) banner.removeAttribute('hidden');
    });
  }

  /* ── Хедер при скролле ──────────────────────────────────── */

  function initHeaderScroll() {
    var header = document.getElementById('site-header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 24) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Мобильное меню ─────────────────────────────────────── */

  function initMobileMenu() {
    var burgerBtn = document.getElementById('burger-btn');
    var nav = document.getElementById('main-nav');
    var overlay = document.getElementById('mobile-overlay');
    if (!burgerBtn || !nav) return;

    function openMenu() {
      nav.classList.add('is-open');
      if (overlay) overlay.classList.add('is-active');
      burgerBtn.setAttribute('aria-expanded', 'true');
      burgerBtn.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      nav.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-active');
      burgerBtn.setAttribute('aria-expanded', 'false');
      burgerBtn.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    burgerBtn.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) closeMenu();
      else openMenu();
    });

    if (overlay) overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ── Дропдауны ──────────────────────────────────────────── */

  function initDropdowns() {
    var items = document.querySelectorAll('.nav-item.has-dropdown');

    items.forEach(function (item) {
      var btn = item.querySelector('.nav-link');
      if (!btn) return;

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = item.classList.contains('is-open');
        items.forEach(function (i) {
          i.classList.remove('is-open');
          var b = i.querySelector('.nav-link');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', function () {
      items.forEach(function (i) {
        i.classList.remove('is-open');
        var b = i.querySelector('.nav-link');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Активная ссылка навигации ──────────────────────────── */

  function initActiveNav() {
    var path = location.pathname.split('/').pop() || 'index.html';
    var hash = location.hash;

    document.querySelectorAll('.nav-link[href], .dropdown-link').forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('?')[0];
      var linkFile = href.split('#')[0];
      var linkHash = href.split('#')[1] ? '#' + href.split('#')[1] : '';

      if (linkFile === path || (path === '' && linkFile === 'index.html')) {
        if (!linkHash || linkHash === hash) {
          link.classList.add('is-active');
          var parent = link.closest('.nav-item');
          if (parent) {
            var parentBtn = parent.querySelector(':scope > .nav-link');
            if (parentBtn) parentBtn.classList.add('is-active');
          }
        }
      }
    });
  }

  /* ── Scroll-анимации ────────────────────────────────────── */

  function initScrollAnimations() {
    var els = document.querySelectorAll('[data-animate]');
    if (!els.length) return;

    if (!window.IntersectionObserver) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ── Init ───────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {
    initCookieBanner();
    initCookieSettings();
    initHeaderScroll();
    initMobileMenu();
    initDropdowns();
    initActiveNav();
    initScrollAnimations();
  });

})();

/* Soul Dance — courses.js — Карточки спецкурсов */
(function () {
  'use strict';

  function renderCourses(courses, container) {
    if (!container) return;
    container.innerHTML = '';

    var active = courses.filter(function (c) { return c.active; });

    if (!active.length) {
      container.innerHTML = '<p class="text-muted">Сейчас нет активных занятий. Напиши нам - расскажем, что готовится~</p>';
      return;
    }

    active.forEach(function (course) {
      var card = document.createElement('article');
      card.className = 'card course-card';
      card.setAttribute('data-animate', '');

      card.innerHTML = [
        '<div class="course-card__header">',
          '<span class="tag tag-accent">' + escHtml(course.group) + '</span>',
        '</div>',
        '<div class="course-card__body">',
          '<h3 class="course-card__title">' + escHtml(course.group) + '</h3>',
          '<p class="course-card__choreographer">Хореограф - ' + escHtml(course.choreographer) + '</p>',
          '<ul class="course-card__details">',
            '<li>Занятие ' + course.duration + ' минут</li>',
            '<li>До ' + course.maxParticipants + ' участников</li>',
            course.videoIncluded ? '<li>Съёмка кавера включена</li>' : '',
          '</ul>',
        '</div>',
        '<div class="course-card__footer">',
          '<button class="btn-primary" data-modal="messenger">Найти свою группу</button>',
        '</div>'
      ].join('');

      container.appendChild(card);
    });

    /* Подключить триггеры после рендера */
    if (window.SoulDanceModal) {
      window.SoulDanceModal.bindTriggers();
    }

    /* Подключить анимации */
    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      container.querySelectorAll('[data-animate]').forEach(function (el) {
        observer.observe(el);
      });
    } else {
      container.querySelectorAll('[data-animate]').forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function loadCourses() {
    var container = document.getElementById('courses-grid');
    if (!container) return;

    container.innerHTML = '<p class="text-muted">Загружаем список занятий...</p>';

    fetch('src/js/courses-data.json')
      .then(function (res) {
        if (!res.ok) throw new Error('fetch failed');
        return res.json();
      })
      .then(function (data) {
        renderCourses(data.courses || [], container);
      })
      .catch(function () {
        container.innerHTML = '<p class="text-muted">Не удалось загрузить список. Напиши нам - всё расскажем~</p>';
      });
  }

  document.addEventListener('DOMContentLoaded', loadCourses);

})();

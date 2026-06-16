# Технические требования — Soul Dance

## Хостинг и домен

- Хостинг: **GitHub Pages**
- Домен: **souldance.ru** (подключается после готовности сайта)
- Разработка: статический HTML/CSS/JS, без серверной части

---

## Страницы сайта

1. Главная (`index.html`)
2. О нас (`about.html`)
3. К-поп интенсивы (`intensives.html`)
4. Спецкурсы (`courses.html`)
5. Цены (`pricing.html`)
6. Аренда зала (`rental.html`)
7. Контакты (`contacts.html`)

---

## Студия

**Адрес:** Москва, Шоссе Энтузиастов 54, ТЦ «Мир Уюта», 2 этаж
**Открытие:** 24 октября 2019 года (изначально Jay Dance)
**Юридическое лицо:** ИП Попов Данила Андреевич
**ИНН:** 743017545404
**ОГРНИП:** 324745600121280

Реквизиты на сайте должны совпадать с получателем платежей.

---

## Команда

**Основатели:** Яна и Данила Андреевич Попов
**Данила** — ведущий хореограф, со-основатель

**Хореографы (8 человек):**
Данила, Асмира, Даша, Влада, Киор, Альмина, Арина, Ульяна

Биографии хореографов — уточнить у Яны перед публикацией страницы «О нас».

---

## Бронирование — два разных сценария

### Интенсивы и персональные тренировки
- Длительность: **1 час**
- Бронирование: виджет **YClients** (встраивается на страницу)
- Кнопка ведёт к виджету, не к Telegram

### Спецкурсы
- Длительность: **2 часа**
- Бронирование: **через менеджера** — Telegram или MAX
- Кнопка открывает модальное окно с выбором мессенджера
- Модальное окно: две кнопки — «Написать в Telegram» и «Написать в MAX»

---

## Текущие спецкурсы

| Группа | Хореограф | Кол-во участников |
|---|---|---|
| KATSEYE | Влада | по составу группы |
| ONEUS | Асмира | по составу группы |
| STRAY KIDS | Даша | 8 |
| LE SSERAFIM | Влада | по составу группы |
| ENHYPEN | Асмира | по составу группы |

**Правило:** размер группы = состав реального к-поп коллектива.
BTS = 7, Stray Kids = 8, и т.д. Уточнять при добавлении новых курсов.

**Главная фишка:** профессиональная видеосъёмка кавера включена бесплатно в каждый спецкурс.

---

## Социальные сети и ссылки

- Telegram
- MAX
- ВКонтакте
- YouTube
- TikTok

Актуальные ссылки — уточнить у Яны и прописать в компоненте footer.

### YouTube-видео для embed
- `hlOBar1wRWU`
- `JycA765D6k4`

---

## Карты

Яндекс.Карты embed — на странице контактов.
Актуальный код embed — уточнить у Яны.

---

## Юридические документы

Четыре PDF-файла (ссылаются на souldance.ru):
1. Политика конфиденциальности
2. Публичная оферта
3. Политика cookies
4. Пользовательское соглашение

Размещаются в папке `assets/legal/`.
Ссылки на них — в футере и в формах.

---

## Формы — обязательные требования (152-ФЗ)

Каждая форма на сайте содержит **три чекбокса**:

```html
<!-- Чекбокс 1 — обязательный для отправки формы -->
<label class="checkbox-wrapper">
  <input type="checkbox" name="consent-personal" required>
  <span>Я согласен(а) на <a href="/assets/legal/privacy.pdf">обработку персональных данных</a></span>
</label>

<!-- Чекбокс 2 — обязательный для отправки формы -->
<label class="checkbox-wrapper">
  <input type="checkbox" name="consent-offer" required>
  <span>Я принимаю условия <a href="/assets/legal/offer.pdf">публичной оферты</a></span>
</label>

<!-- Чекбокс 3 — необязательный, для рассылки -->
<label class="checkbox-wrapper">
  <input type="checkbox" name="consent-marketing">
  <span>Я согласен(а) получать информационные рассылки</span>
</label>
```

**Все три чекбокса по умолчанию НЕ отмечены.**
Первые два — обязательны для отправки (required).
Третий — необязателен (рекламная рассылка отдельно от обработки данных).

---

## Cookie-баннер

```javascript
// Аналитика загружается ТОЛЬКО после явного согласия
// При загрузке страницы — баннер, две кнопки:
// «Принять все» → загружаем аналитику, сохраняем consent в localStorage
// «Только необходимые» → аналитика не загружается

// Структура:
if (localStorage.getItem('cookie-consent') === 'all') {
  loadAnalytics(); // подключаем счётчики
}
```

---

## Структура файлов проекта

```
souldance/
├── CLAUDE.md                    ← читается Claude Code автоматически
├── index.html
├── about.html
├── intensives.html
├── courses.html
├── pricing.html
├── rental.html
├── contacts.html
├── src/
│   ├── css/
│   │   ├── variables.css        ← CSS-переменные из design-system.md
│   │   ├── base.css             ← reset, типографика, базовые стили
│   │   ├── components.css       ← кнопки, карточки, формы, теги
│   │   └── layout.css           ← сетка, контейнеры, секции
│   ├── js/
│   │   ├── main.js              ← инициализация, cookie-баннер
│   │   ├── booking-modal.js     ← модальное окно выбора мессенджера
│   │   └── courses-data.json    ← данные курсов (Яна редактирует сама)
│   └── components/
│       ├── header.html
│       ├── footer.html
│       └── cookie-banner.html
├── assets/
│   ├── mascot/                  ← PNG огонька (6 состояний)
│   ├── logo/                    ← логотипы (4 версии)
│   ├── legal/                   ← 4 PDF-документа
│   └── images/                  ← фото студии, хореографов
└── docs/                        ← эта документация
    ├── design-system.md
    ├── content-rules.md
    ├── tech-spec.md
    └── design-principles.md
```

---

## courses-data.json — Яна редактирует сама

```json
{
  "courses": [
    {
      "id": "katseye",
      "group": "KATSEYE",
      "choreographer": "Влада",
      "duration": 120,
      "maxParticipants": 6,
      "videoIncluded": true,
      "active": true
    },
    {
      "id": "oneus",
      "group": "ONEUS",
      "choreographer": "Асмира",
      "duration": 120,
      "maxParticipants": 6,
      "videoIncluded": true,
      "active": true
    },
    {
      "id": "stray-kids",
      "group": "STRAY KIDS",
      "choreographer": "Даша",
      "duration": 120,
      "maxParticipants": 8,
      "videoIncluded": true,
      "active": true
    },
    {
      "id": "le-sserafim",
      "group": "LE SSERAFIM",
      "choreographer": "Влада",
      "duration": 120,
      "maxParticipants": 6,
      "videoIncluded": true,
      "active": true
    },
    {
      "id": "enhypen",
      "group": "ENHYPEN",
      "choreographer": "Асмира",
      "duration": 120,
      "maxParticipants": 7,
      "videoIncluded": true,
      "active": true
    }
  ]
}
```

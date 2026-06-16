# Дизайн-система Soul Dance

## Цвета — полная система

```css
:root {
  /* Фоны */
  --color-bg:           #0d0d0d;  /* фон страницы */
  --color-surface-1:    #161616;  /* карточки, врезки */
  --color-surface-2:    #1f1f1f;  /* теги, плашки, бейджи */

  /* Текст */
  --color-text:         #f0ecea;  /* основной — тёплый почти-белый */
  --color-muted:        #9e8f8f;  /* подписи, мета, плейсхолдеры */

  /* Акцент — ТОЛЬКО ОДИН */
  --color-accent:       #febad0;
  --color-accent-hover: #e8a0b8;  /* темнее на 12% для hover */
  --color-accent-soft:  #2a1a1f;  /* очень тёмный розовый для фона плашек */

  /* Структура */
  --color-border:       #2e2020;  /* разделители, тёплые */

  /* Семантика — приглушённые, без неона */
  --color-success:      #4caf7d;
  --color-error:        #c0544a;
}
```

### Контраст (проверено)
- `--color-text` на `--color-bg` → ~15.3:1 ✓
- `--color-accent` на `--color-bg` → ~5.8:1 ✓
- `--color-muted` на `--color-bg` → ~4.6:1 ✓ (минимум для мелкого текста)

---

## Шрифты

```html
<!-- Подключение в <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Russo+One&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --font-display: 'Russo One', sans-serif;   /* заголовки, кнопки, теги */
  --font-body:    'Montserrat', sans-serif;  /* текст, интерфейс, подписи */
}
```

### Почему Russo One

Russo One создавался с кириллицей как основой — не как добавленной поддержкой.
Все русские буквы (Д, Ж, Ф, Щ, Ю и др.) выглядят уверенно и держат форму.
Даёт тот же эффект широкого жирного заголовка что и Unbounded, но на русском
работает в разы лучше. Google Fonts, бесплатен для коммерческого использования.

Unbounded — не использовать: кириллица там не родная, русские буквы выглядят
скованно рядом с латиницей.

### Шкала размеров — десктоп

```css
/* Заголовки (Russo One) */
/* Russo One — один вес (400), но визуально очень жирный */
h1 { font-family: var(--font-display); font-size: 56px; line-height: 1.05; letter-spacing: 0.02em; text-transform: uppercase; }
h2 { font-family: var(--font-display); font-size: 40px; line-height: 1.10; letter-spacing: 0.02em; text-transform: uppercase; }
h3 { font-family: var(--font-display); font-size: 28px; line-height: 1.15; letter-spacing: 0.01em; text-transform: uppercase; }

/* Текст (Montserrat) */
.body-text  { font-size: 17px; line-height: 1.6;  letter-spacing: -0.01em; font-weight: 400; }
.body-small { font-size: 14px; line-height: 1.5;  letter-spacing: 0em;     font-weight: 500; }
.label      { font-size: 11px; line-height: 1.4;  letter-spacing: 0.16em;  font-weight: 600; text-transform: uppercase; }
```

### Шкала размеров — мобильная (≤768px)

```css
@media (max-width: 768px) {
  h1 { font-size: 34px; }
  h2 { font-size: 30px; }
  h3 { font-size: 22px; }
  .body-text { font-size: 16px; }
}
```

---

## Отступы — только из шкалы

```
4px / 8px / 12px / 16px / 24px / 32px / 48px / 64px / 96px / 128px
```

Любое другое значение — запрещено. Если хочется 20px — берём 16px или 24px.

### Применение
- Внутри карточки: padding 24px или 32px
- Между секциями страницы: 96px или 128px (десктоп), 48px или 64px (мобайл)
- Между элементами внутри секции: 24px или 32px
- Боковые поля мобайл: 16px или 20px → используем 16px

---

## Скругления

```css
--radius-sm:   8px;   /* поля ввода, маленькие теги */
--radius-md:   12px;  /* кнопки, карточки курсов */
--radius-lg:   16px;  /* крупные карточки, модальные окна */
--radius-xl:   24px;  /* hero-блоки, крупные баннеры */
```

Не смешивать разные радиусы без системы — все карточки в одном блоке используют одинаковый радиус.

---

## Компоненты

### Кнопка — основная (accent)

```css
.btn-primary {
  background: var(--color-accent);
  color: #0d0d0d;                     /* тёмный текст на розовом */
  font-family: var(--font-display);
  font-size: 15px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 16px 32px;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: background 150ms ease, transform 100ms ease;
  min-height: 48px;                   /* минимум для мобайл */
}

.btn-primary:hover  { background: var(--color-accent-hover); }
.btn-primary:active { transform: scale(0.98); }
.btn-primary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
```

### Кнопка — вторичная (ghost)

```css
.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  font-family: var(--font-display);
  font-size: 15px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 16px 32px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color 150ms ease, color 150ms ease;
  min-height: 48px;
}

.btn-secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

### Карточка

```css
.card {
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px;
  transition: border-color 200ms ease;
}

.card:hover { border-color: var(--color-accent-soft); }
```

### Тег / бейдж

```css
.tag {
  background: var(--color-surface-2);
  color: var(--color-muted);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: var(--radius-sm);
}

.tag-accent {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}
```

### Поле ввода

```css
.input {
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 16px;
  padding: 12px 16px;
  width: 100%;
  transition: border-color 150ms ease;
}

.input::placeholder { color: var(--color-muted); }
.input:focus {
  outline: none;
  border-color: var(--color-accent);
}
.input.error { border-color: var(--color-error); }
```

### Чекбокс (152-ФЗ)

```css
/* Все три чекбокса в формах — по умолчанию НЕ отмечены */
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

.checkbox-wrapper input[type="checkbox"] {
  width: 20px;
  height: 20px;
  min-width: 20px;
  accent-color: var(--color-accent);
  cursor: pointer;
  margin-top: 2px;
}

.checkbox-wrapper label {
  font-size: 13px;
  color: var(--color-muted);
  line-height: 1.5;
  cursor: pointer;
}

.checkbox-wrapper a {
  color: var(--color-accent);
  text-decoration: underline;
}
```

---

## Сетка и ширина контента

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.container-narrow {
  max-width: 720px;  /* для статей и длинного текста */
}

@media (max-width: 768px) {
  .container { padding: 0 16px; }
}
```

---

## Маскот — огонёк

Файлы в `assets/mascot/`:
- `dobryy.png` — основное состояние, дружелюбный
- `smuschaetsya.png` — смущается, застенчивый
- `so-zvezdochkoy.png` — восторженный со звездой (для CTA)
- `napugannyy.png` — испуганный, сиреневый (для предупреждений)
- `plachet.png` — грустный (очень редко)
- `zloy.png` — злой (только юмористический контент)

```css
/* Все PNG имеют чёрный фон в исходнике — используем screen */
.mascot {
  mix-blend-mode: screen;
}

/* Hero-секция: маскот доминирует и выходит за нижнюю границу */
.hero-mascot {
  mix-blend-mode: screen;
  overflow: visible;  /* выходит за hero boundary */
}
```

❌ Белый прямоугольник вокруг PNG — недопустимо.
❌ Масштаб меньше 80px по высоте — теряется мимика.
❌ На светлом фоне без адаптации — не использовать.

---

## Логотип

Файлы в `assets/logo/`:
- `logo-white.png` — на тёмном фоне `#0d0d0d` (основной)
- `logo-black.png` — на светлом фоне
- `logo-no-bg-black.png` — без фона, только символы
- `logo-avatar.jpg` — для аватарок в соцсетях

Правила:
- ❌ Не перекрашивать
- ❌ Не растягивать непропорционально
- ❌ Не перерисовывать
- ✓ Охранное поле — минимум высота буквы «S» со всех сторон
- ✓ На тёмном фоне → белая версия, на светлом → чёрная

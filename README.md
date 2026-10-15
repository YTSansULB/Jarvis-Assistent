Support: https://t.me/Achancewithoutachance78/1905
# Jarvis Assistant

> A browser-powered desktop assistant inspired by Iron Man's J.A.R.V.I.S.


---

## About

Jarvis is a lightweight desktop assistant built with **Electron**. It runs in its own window (not a browser tab), accepts text commands, and can interact with your system — currently limited to launching browsers and opening websites.

This project is in **early stages of development**. Expect bugs, missing features, and rough edges.

---

## Features

- 🖥️ **Native desktop app** — runs as a standalone window, no browser required
- 🌐 **Opens YouTube** on command
- 🔍 **Auto-detects installed browsers** — Chrome, Opera, Edge, Firefox, Yandex, Brave
- 💾 **Remembers your preferred browser** — no need to choose every time
- 🎨 **Minimalist Iron Man–style UI**

---

## ⚠️ Current Limitations

- **Russian language only** — UI and commands are currently in Russian. English localization is planned.
- **Browsers are launched via the default system handler** — Jarvis opens URLs through the OS, which means the browser choice may not always be respected exactly. A more precise launch method is planned.
- **Windows only** — tested on Windows 10/11. macOS/Linux builds are not available yet.
- **Text input only** — no voice recognition yet.
- **Limited command set** — only a few commands work right now.

---

## Installation

### Option 1 — Download the installer (recommended)

1. Go to the [**Releases**](../../releases) page
2. Download the latest `Jarvis Setup x.x.x.exe`
3. Run it
4. If Windows SmartScreen appears → click **"More info"** → **"Run anyway"**
   *(This is normal for unsigned apps. Code signing certificate is planned.)*
5. Follow the installer → Jarvis will be added to your Start Menu and Desktop

### Option 2 — Build from source

Requirements: **Node.js 18+** installed.

```bash
git clone https://github.com/YTSansULB/Jarvis-Assistant.git
cd Jarvis-Assistant
npm install
npm start
```

To build the installer:

```bash
npm run build
```

The output `.exe` will be in the `dist/` folder.

---

## Usage

After launching Jarvis, type a command in the input field at the bottom and press **Enter**.

### Available commands (Russian)

| Command | What it does |
|---|---|
| `открой ютуб` | Opens YouTube in your chosen browser |
| `привет` | Jarvis greets you |
| `помощь` | Shows the list of commands |
| `сбрось браузер` | Forgets the saved browser preference |

### Example flow

```
You:    открой ютуб
Jarvis: Какой браузер использовать? Найдены:
          1. Google Chrome
          2. Opera
          3. Microsoft Edge
        Напишите название (например: opera).
You:    opera запомни
Jarvis: Понял, использую Opera.
        Запомнил: Opera — браузер по умолчанию.
        [YouTube opens in Opera]
```

Next time you just type `открой ютуб` — Jarvis will use Opera automatically.

---

## Project Structure

```
Jarvis-Assistant/
├── index.html          # UI + assistant logic
├── main.js             # Electron entry point
├── package.json        # Project config + build settings
└── README.md
```

---

## Tech Stack

- [Electron](https://www.electronjs.org/) — desktop shell
- Vanilla JavaScript — no frameworks
- HTML/CSS — custom Iron Man–style UI

---

## Roadmap

- [ ] English localization
- [ ] Voice input (Web Speech API)
- [ ] Voice output (TTS)
- [ ] More commands (search, timers, notes, system control)
- [ ] Direct browser launch (bypass default handler)
- [ ] macOS / Linux builds
- [ ] Code signing certificate
- [ ] Auto-updates

---

## Contributing

This is a personal project in early development. Issues and suggestions are welcome, but pull requests may not be reviewed quickly.

---

## License

No license specified yet. All rights reserved by the author.

---

## Author

**YTSansULB** — [github.com/YTSansULB](https://github.com/YTSansULB)

---

*"Sometimes you gotta run before you can walk."* — Tony Stark

---
---

Support: https://t.me/Achancewithoutachance78/1905
# Jarvis Assistant (Русская версия)

> Десктопный ассистент, вдохновлённый Джарвисом из «Железного человека».


---

## О проекте

Jarvis — лёгкий десктопный ассистент, собранный на **Electron**. Работает в собственном окне (не во вкладке браузера), принимает текстовые команды и умеет взаимодействовать с системой — пока что в пределах запуска браузеров и открытия сайтов.

Проект находится на **ранней стадии разработки**. Будут баги, недоработки и шероховатости.

---

## Возможности

- 🖥️ **Нативное десктопное приложение** — работает в отдельном окне, браузер не нужен
- 🌐 **Открывает YouTube** по команде
- 🔍 **Автоматически ищет установленные браузеры** — Chrome, Opera, Edge, Firefox, Yandex, Brave
- 💾 **Запоминает выбранный браузер** — не нужно выбирать каждый раз
- 🎨 **Минималистичный интерфейс в стиле Железного человека**

---

## ⚠️ Текущие ограничения

- **Только русский язык** — интерфейс и команды пока на русском. Английская локализация в планах.
- **Браузеры запускаются через системный обработчик по умолчанию** — Jarvis открывает ссылки через ОС, из-за чего выбор браузера может соблюдаться не всегда точно. Планируется более точный способ запуска.
- **Только Windows** — протестировано на Windows 10/11. Сборок для macOS/Linux пока нет.
- **Только текстовый ввод** — распознавания голоса пока нет.
- **Ограниченный набор команд** — сейчас работает лишь несколько команд.

---

## Установка

### Вариант 1 — Скачать установщик (рекомендуется)

1. Перейди на страницу [**Releases**](../../releases)
2. Скачай последний `Jarvis Setup x.x.x.exe`
3. Запусти его
4. Если появится SmartScreen → нажми **«Подробнее»** → **«Всё равно запустить»**
   *(Это нормально для неподписанных приложений. Сертификат подписи в планах.)*
5. Следуй инструкциям установщика → Jarvis появится в меню Пуск и на рабочем столе

### Вариант 2 — Собрать из исходников

Требуется установленный **Node.js 18+**.

```bash
git clone https://github.com/YTSansULB/Jarvis-Assistant.git
cd Jarvis-Assistant
npm install
npm start
```

Чтобы собрать установщик:

```bash
npm run build
```

Готовый `.exe` появится в папке `dist/`.

---

## Использование

После запуска Jarvis напиши команду в поле ввода снизу и нажми **Enter**.

### Доступные команды

| Команда | Что делает |
|---|---|
| `открой ютуб` | Открывает YouTube в выбранном браузере |
| `привет` | Jarvis здоровается |
| `помощь` | Показывает список команд |
| `сбрось браузер` | Забывает сохранённый браузер |

### Пример работы

```
Вы:     открой ютуб
Jarvis: Какой браузер использовать? Найдены:
          1. Google Chrome
          2. Opera
          3. Microsoft Edge
        Напишите название (например: opera).
Вы:     opera запомни
Jarvis: Понял, использую Opera.
        Запомнил: Opera — браузер по умолчанию.
        [YouTube открывается в Opera]
```

В следующий раз достаточно написать `открой ютуб` — Jarvis сам использует Opera.

---

## Структура проекта

```
Jarvis-Assistant/
├── index.html          # Интерфейс + логика ассистента
├── main.js             # Точка входа Electron
├── package.json        # Конфигурация проекта и сборки
└── README.md
```

---

## Технологии

- [Electron](https://www.electronjs.org/) — десктопная оболочка
- Чистый JavaScript — без фреймворков
- HTML/CSS — кастомный интерфейс в стиле Железного человека

---

## Планы

- [ ] Английская локализация
- [ ] Голосовой ввод (Web Speech API)
- [ ] Голосовой вывод (TTS)
- [ ] Больше команд (поиск, таймеры, заметки, управление системой)
- [ ] Прямой запуск браузеров (минуя обработчик по умолчанию)
- [ ] Сборки для macOS / Linux
- [ ] Сертификат подписи кода
- [ ] Авто-обновления

---

## Участие в разработке

Это личный проект на ранней стадии. Замечания и предложения приветствуются, но pull request'ы могут рассматриваться не быстро.

---

## Лицензия

Лицензия пока не указана. Все права принадлежат автору.

---

## Автор

**YTSansULB** — [github.com/YTSansULB](https://github.com/YTSansULB)

---

*«Иногда нужно бежать, прежде чем научишься ходить».* — Тони Старк

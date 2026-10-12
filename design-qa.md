# Design QA — Речкуновская зона отдыха

Дата: 2026-10-11. **final result: passed**

## Эталон и состояние

Source of truth: `C:/Users/ser/Desktop/Речкуновка/Речкуновская_для_Петра_v9.pdf`.
Все 16 страниц проанализированы и просмотрены до начала разработки. Геометрия, текст, изображения, цвета, толщины линий и метрики шрифтов: `../reference/analysis.json`, `all-text.txt`, `fonts.json`, `design-map.md`.

Production URL: http://127.0.0.1:4174/
Состояние для desktop comparison: исходные тексты, пустая форма, закрытые диалоги, без hover/focus. Все секции сняты отдельно по якорям.

Контрольный viewport: 1600 × 900 CSS px. PDF: 1600 × 900 pt, растеризован MuPDF с масштабом 1 в PNG 1600 × 900. Browser captures: JPEG 1600 × 900, DPR ≈ 1. Нормализация плотности и изменение размеров для численного diff не требовались. Компактные обзорные доски уменьшены только для просмотра; вычисления проведены на исходных снимках.

## Evidence

- Эталоны: `../reference/page-01.png` … `page-16.png`.
- Финальная production-версия: `../qa/desktop-01.jpg` … `desktop-16.jpg`.
- Совмещённые source/implementation/overlay/diff: `../qa/desktop-compare-01.jpg` … `desktop-compare-16.jpg`.
- Отдельные 50% overlay: `../qa/desktop-overlay-01.jpg` … `desktop-overlay-16.jpg`.
- Усиленные difference ×5: `../qa/desktop-diff-01.png` … `desktop-diff-16.png`.
- Финальное повторное сравнение всех 16 страниц: `../qa/final-review-1.jpg` … `final-review-4.jpg`.
- Focused comparison типографики и полей формы: `../qa/focused-type-form.jpg`.
- Все 16 секций на 390 × 844: `../qa/mobile-01.jpg` … `mobile-16.jpg`.
- Все 16 секций на 320 × 568: `../qa/small-mobile-01.jpg` … `small-mobile-16.jpg`.
- Все 16 секций на 834 × 1194 и 1024 × 768: `../qa/tablet-01.jpg` … `tablet-16.jpg`, `tablet-landscape-01.jpg` … `tablet-landscape-16.jpg`.
- Responsive-геометрия: `../qa/responsive-final.json`; исходные full-page снимки и DOM-координаты также сохранены.

## Findings и история исправлений

1. **[P1, исправлено] Базовые линии webfont.** Первоначально текст находился ниже PDF: большой заголовок примерно на 18 px. Причина — использование браузером Windows-метрик вместо метрик PDF. Для Nimbus Sans установлены ascent 72.9%, descent 27.1%, gap 0; для P052 — 72.6%/27.4%/0. Повторное combined comparison всех 16 страниц и focused comparison подтвердили совпадение переносов и базовых линий. Для первого экрана MAE уменьшилась с 10.771 до примерно 4.39.
2. **[P1, исправлено] Mobile-фотографии и иконки.** Общее правило SVG перекрывало cover-размер фотографии; flex-правило растягивало div иконки. Уточнена специфичность photo-background и исключены SourceArt из flex-текстового контейнера. Из отдельных иконок удалён фон страницы и растровые слои, исходные векторные пути сохранены. Все 16 мобильных и планшетных секций повторно просмотрены.
3. **[P2, исправлено] Тесные промежуточные сетки.** Длинное значение «80–100 тыс.», названия кластеров, слово «Многофункциональное» и подписи числовых карточек выходили за доступную ширину. Исправлены fluid font-size, точки перестройки колонок и раскладка двух колонок для узкого телефона. Итоговый DOM-аудит 29 размеров не обнаружил overflow; scrollWidth равен viewport width.
4. **[P2, исправлено] Crop яхты на телефоне.** Первый crop оставлял только часть паруса. Пересчитана горизонтальная позиция на ширинах ≤650 px и усилен overlay для читаемости текста. Повторные снимки 320/390 px показывают парус и корпус; исходное изображение сохранено.
5. **Оптимизация после визуального совпадения.** SVG разбиты на динамические модули и загружаются заранее при приближении к viewport. Первый экран доступен сразу. Основной JS снизился с ≈816 KB до 289.72 KB (82.50 KB gzip); предупреждение о размере исчезло. Production-сборка повторно снята и сравнена на всех 16 страницах.

Нет открытых P0/P1/P2 визуальных дефектов в проверенной конфигурации.

**[P3, ожидаемое различие] Растеризация и кодек.** Screenshot API сохраняет JPEG с chroma subsampling 4:2:0, эталон — PNG. Остаются различия сглаживания текста и пересэмплирования исходных фотографий между MuPDF и Chromium. Контрольное JPEG-кодирование эталона с таблицами квантования screenshot само даёт MAE 2.62 на стр. 1 и 4.70 на стр. 5. Это часть измеренного расхождения, а не геометрический сдвиг. Битового совпадения PNG и JPEG не заявляется. Все фотографии, crop desktop, пути, маски и исходные шрифты сохранены.

## Пять поверхностей fidelity

- **Fonts/typography — PASS.** Встроенные полные OpenType CFF Nimbus Sans Regular/Bold и P052 Roman, без subset и variable axes. В видимом макете Regular/Roman. Размеры, цвета, буквенные интервалы и baseline взяты из PDF; ручная строковая композиция сохранена. На mobile — отдельная fluid-система. Загрузка обеих используемых гарнитур подтверждена document.fonts.
- **Spacing/layout — PASS.** Desktop 16:9, исходный контейнер x=70…1530, реальные координаты всех spans, линий и графики. Форма повторяет размеры и положение PDF. Tablet/mobile используют самостоятельные Grid/Flex-композиции.
- **Colors/tokens — PASS.** Технически извлечённые #f3f0e6, #20362f, #657165, #fffef5, #909c6d, #cfd2c3 и исходные прозрачности/маски. Нет подмены фоновых фотографий CSS-градиентами.
- **Images/graphics — PASS.** Все исходные фотографии, карта, контуры участков, логотип, иконки и 12 миниатюр извлечены из PDF. Декоративные SVG-пути оригинальные. Генерация и интернет-замены не применялись.
- **Copy/content — PASS.** Текст, числа, кадастровые номера, единицы, сноски и пунктуация перенесены из PDF. Desktop-текст остаётся выделяемым HTML.

## Аудит данных и графики

Проверены все 16 страниц. Обычных line/bar/pie/donut/area-графиков, осей, легенд, progress bars и таблиц в источнике нет. Визуализации: карта со всеми подписями и маркерами на стр. 2; два точных контура на стр. 4; числовые блоки на стр. 1/2/4/6/10/12/14; последовательность 01…04 на стр. 8; 12 миниатюр на стр. 6. Они перенесены без случайных значений и упрощённой замены. «Charts — PASS» в таблице означает завершённую проверку наличия и соответствия визуализаций, включая отсутствие диаграмм там, где их нет в PDF.

## Self-review всех секций

| № | Секция | Typography | Layout | Images | Graphics | Charts | Colors | Spacing | Desktop | Tablet | Mobile |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | Главный экран | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 02 | Локация | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 03 | Природа места | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 04 | Участки | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 05 | Санаторий | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 06 | Масштаб концепции | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 07 | Корпоративный кампус | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 08 | Сценарии кампуса | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 09 | Жилая застройка | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 10 | Продуктовая идея | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 11 | Потенциал | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 12 | Условия реализации | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 13 | Регион и спрос | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 14 | Новосибирск | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 15 | Следующий шаг | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 16 | Вопросы и контакт | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |

## Responsive QA

Все перечисленные пользовательские размеры проверены, включая 1920×1080, 1440×900, 1280×800, 1024×768, 834×1194, 768×1024, 430×932, 390×844, 375×812, 360×800 и 320×568. Дополнительно проверены 1728/1366/820/414 px и промежуточные ширины вокруг точек перестройки. Полный список фактических viewport — ниже; дробное округление браузера учитывается в JSON.

1920×1080, 1728×972, 1600×900, 1440×900, 1366×768, 1280×800, 1120×800, 1119×800, 1024×768, 962×900, 960×900, 900×900, 834×1194, 820×1180, 768×1024, 740×900, 742×900, 651×900, 650×900, 600×900, 500×900, 430×932, 414×896, 390×844, 375×812, 371×800, 370×800, 360×800, 320×568.

Во всех финальных случаях: 16 секций, один h1, горизонтальный scrollWidth равен viewport, переполнения заголовков/основного текста/числовых подписей нет. Визуально просмотрены все секции на 320, 390, 834 и 1024 px, отдельно мобильный crop яхты после исправления. Оригинальные строки мелких сносок сохранены; основной mobile-текст имеет минимум 17 px.

## Взаимодействия и Code QA

- Desktop-якоря, переходы к участкам, материалам и Новосибирску работают.
- Мобильное меню открывается, показывает исходные разделы, закрывается после выбора.
- Миниатюра концепции открывает оригинальную графику в диалоге.
- Видео-превью и кнопка агентства открывают честное описание состояния исходных материалов.
- Required-поля и короткий телефон не приводят к открытию готового запроса; корректные тестовые данные открывают подготовленное письмо на desktop/mobile. Production-форма также проверена.
- Escape, закрытие кнопкой и обработка backdrop реализованы; Escape и кнопка проверены в браузере.
- Адрес email и телефон соответствуют PDF. Mailto открывается только по самостоятельному действию посетителя. Отправки писем во время QA не было.
- Console error/warn в финальной production-проверке: пустой список. Все динамические SVG достигли ready при естественной прокрутке; отсутствующих шрифтов и assets не обнаружено.
- `npm run build`: PASS, без предупреждений.
- `npm run test:sites`: PASS, 4/4.
- React review: компоненты выделены, hooks очищают listeners/observer, SVG id уникальны, expensive markup memoized, динамические импорты дедуплицированы, одна responsive-композиция в DOM, нативные form/dialog/link/button и видимый keyboard focus.

## Ограничения источника и охвата проверки

Видео URL ожидается в самом PDF. URL агентства и полный документ на 154 страницы отсутствуют. Эти материалы не выдуманы. Форма работает через почтовое приложение; сервер автоматического приёма заявок не предоставлен и не подключён. Публикация на внешний домен не выполнялась.

Проверка выполнена во встроенном Chromium. Другие браузерные движки и физические устройства отдельно не тестировались. Сравнение относится к указанным viewport и состояниям, а не к заявлению о нулевой разнице каждого пикселя при любом renderer.

## Численное сравнение

MAE = средняя абсолютная RGB-разница, шкала 0…255; это не процент совпадения дизайна. Все измерения выполнены без resize, 1600 × 900.

| Страница | MAE |
|---|---:|
| 01 | 4.3882 |
| 02 | 1.8335 |
| 03 | 6.9125 |
| 04 | 1.9984 |
| 05 | 8.4176 |
| 06 | 2.3992 |
| 07 | 6.4539 |
| 08 | 2.5630 |
| 09 | 4.9894 |
| 10 | 2.4381 |
| 11 | 5.0646 |
| 12 | 2.5872 |
| 13 | 7.1940 |
| 14 | 2.5240 |
| 15 | 2.6339 |
| 16 | 3.1032 |

## Implementation checklist

Карточка видеооблёта (11.10.2026): подпись «Превью · ссылка на ролик ожидается» удалена из карточки desktop/mobile. Оригинальные четыре SVG-пути Play вынесены в `play-control.svg`; значок увеличивается до scale(1.14) при hover и keyboard focus за .2s, карточка целиком не увеличивается. В браузере подтверждены hover=true, focus=false, transform matrix(1.14), отсутствие подписи на desktop и mobile 390 px, overflow=0. Enter открывает существующий диалог. Ошибки/предупреждения консоли: 0; build PASS. Снимки: `../qa/video-play-interaction.jpg`, `../qa/video-play-mobile.jpg`. Исходный URL видео по-прежнему не предоставлен; поведение диалога сохранено.

Боковой оверлей фотографий (11.10.2026): добавлен плавный градиент #20362f слева направо, opacity .44 → .28 → .08 → 0, по пользовательскому примеру секции природы. Текст и карточки находятся выше оверлея, pointer-events:none. На первом экране используется светлый зелёный оттенок для тёмного текста. На mobile градиент охватывает большую долю ширины. В браузере подтверждены 8/8 оверлеев на mobile, desktop-слои z-index 0/1/2, overflow=0, console errors/warnings=0; build PASS. Снимки: `../qa/photo-green-overlay-desktop.jpg`, `../qa/photo-green-overlay-mobile.jpg`.

Отступы фотографических секций (11.10.2026): desktop-фон отделён от исходных векторных элементов и заполняет всю увеличенную секцию через SVG slice. Верхний отступ контента около 150 px (первый экран 162.6 px, «Потенциал» 154.65 px — исходные отступы уже больше 150); остальные шесть 149.99 px. Нижний отступ всех восьми — 150 px. Mobile: все восемь секций имеют padding-block 100 px, внутренний прежний верхний padding убран. Tablet — fluid 100–150 px. Превью видео на первом экране сохранено. Проверены 320, 390, 834, 1120, 1600, 1920 px: overflow=0, все 16 секций присутствуют, console errors/warnings=0. Build PASS, тесты упаковки 4/4 PASS. Снимки: `../qa/photo-spacing-desktop.jpg`, `../qa/photo-spacing-mobile.jpg`. Повторное извлечение исходных assets автоматически запускает `scripts/prepare_photo_layers.py`.

Глобальное удаление презентационных футеров (11.10.2026): нумерация страниц удалена из всех 16 desktop/mobile секций, включая футер агентства. Нижние SVG-разделители `M70 60H1530` и `M70 89H1530` скрыты; border-top всех адаптивных поясняющих футеров = 0. Поясняющие подписи и внутренние разделители контента сохранены. В браузере: счётчики отсутствуют в 16/16 секциях на desktop и mobile, overflow=0, console errors/warnings=0. Build PASS. Снимок: `../qa/all-footer-cleanup.jpg`.

Увеличение отступов светлых информационных секций (11.10.2026): все восемь секций получили суммарное пространство до контента и после него около 150 px на desktop, с учётом исходных внутренних отступов PDF. Измерено на 1600 px: верх 149.99 px, низ 150 px (контактный экран — 143.46 px до последнего текста). Mobile: padding-top/bottom 100 px; в контактной секции нижний отступ перенесён внутрь завершающего футера. Tablet — fluid 100–150 px. Проверены 320, 390, 834, 1280, 1600, 1920 px, все 16 секций присутствуют, overflow=0, console errors/warnings=0, build PASS. Снимки: `../qa/section-spacing-desktop.jpg`, `../qa/section-spacing-mobile.jpg`.

Обновление карточки санатория (11.10.2026): «Гостиничный комплекс» и исходная иконка объединены в flex-строку align-items:center, gap=12 px при ширине 1600 px. Нижняя подпись и иконка имеют общий левый край X=1134, карточка сохраняет исходные границы 1110/710/420/88. Разница центров заголовка и иконки в DOM <0.001 px. Общий компонент используется на mobile; при 320 px карточка шириной 276 px помещается без overflow. Build PASS; console errors/warnings: 0. Снимок: `../qa/hotel-caption-desktop.jpg`.

Обновление наведения и типографики меню (11.10.2026): прямоугольная hover-подложка удалена, при наведении подчёркивается только текст. Навигация и переключатель мобильного меню получили letter-spacing .06em. В браузере подтверждены :hover=true, прозрачный фон ссылки, подчёркивание и tracking 0.752 px при viewport 1671 px. На 1120, 1280, 1920 px надпись CTA помещается в свою ссылку, расстояние до стрелки остаётся 32 px; на mobile 390 px tracking 0.96 px, overflow=0. Build: PASS, console errors/warnings: 0. Снимок: `../qa/header-hover-refined.jpg`.

Обновление фотосекций по запросу пользователя (11.10.2026): на страницах 1, 3, 5, 7, 9, 11, 13, 15 скрыты нижняя линия `M70 60H1530` и счётчик страницы. Подписи визуальной концепции и фактической фотографии сохранены. На desktop проверены тексты всех восьми секций и скрытие загруженных SVG-линий; на mobile во всех восьми футерах осталась одна подпись, border-top = 0 px. Числа площадей и внутренние разделители сохранены. Build: PASS; console errors/warnings: 0; mobile overflow: 0. Снимки: `../qa/photo-footer-desktop.jpg`, `../qa/photo-footer-mobile.jpg`.

- [x] Полный анализ до разработки, 16/16.
- [x] Извлечение исходных fonts/assets/colors/geometry.
- [x] 16 native-text desktop-секций.
- [x] 16 самостоятельных tablet/mobile-композиций.
- [x] Screenshot/overlay/diff и повторное сравнение всех desktop-экранов.
- [x] Устранение найденных P1/P2 и повторная responsive-проверка.
- [x] Production build, browser QA и упаковочные тесты.
- [x] Документированы реальные ограничения материалов и формы.

**final result: passed**

## Обновление шапки по запросу пользователя — 11.10.2026

Шапка вынесена из первого экрана в общий fixed-header. Прозрачное начальное состояние сохраняет исходные координаты меню и логотипа; после 8 px прокрутки появляется белая подложка, текст и оригинальная стрелка используют #20362f. Это согласованное пользователем изменение поведения относительно статичного PDF.

Проверено в production-preview на ширинах 320, 390, 834, 1280, 1600 и 1920 px. Шапка остаётся на Y=0, горизонтального overflow нет. Desktop-переход к участкам оставляет секцию на Y=95.2 при высоте шапки 95 px; mobile — на Y=83.875 при высоте 84 px. Мобильное меню открывается поверх страницы, закрывается после выбора пункта и по Escape; на 320 × 568 все пять ссылок доступны и имеют высоту 56 px. Возврат к началу восстанавливает прозрачную подложку.

Снимки: `../qa/header-top.jpg`, `header-scrolled.jpg`, `header-mobile-top.jpg`, `header-mobile-scrolled.jpg`, `header-mobile-menu.jpg`, `header-mobile-small.jpg`. Метрики: `../qa/header-qa.json`. Ошибки и предупреждения консоли: 0. Production build: PASS. Упаковочные тесты: 4/4 PASS.

Извлечение assets обновлено: исходные SVG-пути стрелки автоматически переносятся в `header-arrow.svg`, чтобы повторная генерация не дублировала стрелку в первом экране.

### Компактная шапка — последующее уточнение пользователя

Дополнительное уточнение CTA: надпись «ЗАПРОСИТЬ МАТЕРИАЛЫ» сдвинута вправо к исходной стрелке. Между правым краем текста и началом стрелки — 32 CSS px (измерено 31.996 px при viewport 1671 px); высота шапки остаётся 60 px. Production build: PASS; overflow: 0. Снимок: `../qa/header-cta-spacing.jpg`.

Высота уменьшена до 60 px на всех устройствах. Название использует оригинальный Nimbus Sans Bold 700. Логотип, ссылки и стрелка центрированы по вертикали; мобильное меню и отступ первого экрана пересчитаны. Эта версия заменяет предыдущие значения высоты 95/84 px.

Проверено: 320, 390, 834, 1280, 1600, 1920 px. Высота в браузере — 60 px, логотип целиком внутри шапки, горизонтального overflow нет. Якорь участков: desktop Y=60 px, mobile Y=60.275 px. Мобильное меню закрывается при выборе ссылки. Ошибки/предупреждения консоли: 0. Production build: PASS. Снимки: `../qa/header-compact-desktop.jpg`, `../qa/header-compact-mobile.jpg`; метрики: `../qa/header-compact-qa.json`.

Phone mask QA (2026-10-11): shared +7 (___) ___-__-__ field verified in production preview at 1671 x 956 and 390 x 844. Sequential input, Backspace across punctuation, paste with Russian 8 prefix, partial-number rejection and validity reset on completion passed. Console errors/warnings: none. Two normalization/formatting unit tests passed; production build passed. Screenshots: qa/phone-mask-desktop.jpg and qa/phone-mask-mobile.jpg.

Section navigation QA (2026-10-11): all 16 direct hashes checked at desktop 1600x1000, tablet 834x1194 and mobile 390x844; section offset within 0.4 px of 60 px (home at 0). Menu anchors, plot CTA, dialog CTA, upward/downward long transitions, active group underline, Back/Forward and mobile menu closure passed. Native wheel interrupts animation and remains unlocked. Reduced-motion instant jump, monotonic easing, header offset and interruption cleanup verified by unit test. No broken hash anchors or console warnings/errors. Production build and three focused tests passed. Evidence: qa/navigation-direct-links.json and qa/smooth-section-navigation.jpg.

Agency footer QA (2026-10-11): full-width desktop footer is 160 px tall and ends at document bottom without cream padding. Verified at 1671, 834, 390 and 320 px: no horizontal overflow; bottom-edge difference below 0.4 px from browser rounding. Native desktop footer replaces the cropped PDF footer; preserved agency text, original logo and working agency dialog button. Balanced mobile padding. Console clean; production build passed. Screenshot: qa/expanded-footer-desktop.jpg.

FAQ accordion QA (2026-10-11): all four original answers open and close via headings on desktop 1671 and mobile 390; exclusive disclosure verified. Enter and Space keyboard toggles passed. Tablet 834 and mobile 320 checked without horizontal overflow. Answers preserved verbatim by joining PDF spans. Original static FAQ lines/text removed from desktop rendering; native summary focus indicators remain. Console clean and production build passed. Screenshots: qa/faq-accordion-desktop.jpg and qa/faq-accordion-mobile.jpg.

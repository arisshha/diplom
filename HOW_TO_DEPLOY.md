# 🚀 Как выложить проект на GitHub и GitHub Pages

## ✅ Текущий статус

- ✅ Репозиторий подключен: `https://github.com/arisshha/diplom-netology.git`
- ✅ Проект опубликован на GitHub Pages: `https://arisshha.github.io/diplom-netology/`
- ⚠️ Нужно загрузить последние изменения на GitHub

---

## 📤 Шаг 1: Загрузить код на GitHub

### Если нужно загрузить изменения:

1. **Добавьте изменения:**
   ```bash
   cd /Users/arisha/Desktop/diplom
   git add .
   ```

2. **Сохраните изменения:**
   ```bash
   git commit -m "Описание изменений"
   ```

3. **Загрузите на GitHub (используйте токен):**
   ```bash
   git push https://arisshha:ВАШ_ТОКЕН@github.com/arisshha/diplom-netology.git main
   ```
   
   Или настройте URL с токеном один раз:
   ```bash
   git remote set-url origin https://arisshha:ВАШ_ТОКЕН@github.com/arisshha/diplom-netology.git
   git push
   ```
   
   После push верните обычный URL:
   ```bash
   git remote set-url origin https://github.com/arisshha/diplom-netology.git
   ```

---

## 🌐 Шаг 2: Опубликовать на GitHub Pages

### Если нужно обновить сайт:

1. **Соберите проект:**
   ```bash
   cd /Users/arisha/Desktop/diplom
   npm run build
   ```

2. **Опубликуйте на GitHub Pages:**
   
   **Способ 1 (с токеном в URL):**
   ```bash
   git remote set-url origin https://arisshha:ВАШ_ТОКЕН@github.com/arisshha/diplom-netology.git
   npm run deploy
   git remote set-url origin https://github.com/arisshha/diplom-netology.git
   ```
   
   **Способ 2 (с переменной окружения):**
   ```bash
   GITHUB_TOKEN=ВАШ_ТОКЕН npm run deploy
   ```

3. **Подождите 2-5 минут** - сайт обновится

4. **Проверьте сайт:**
   ```
   https://arisshha.github.io/diplom-netology/
   ```

---

## 🔑 Где взять токен?

1. Зайдите на https://github.com/settings/tokens
2. Нажмите "Generate new token" → "Generate new token (classic)"
3. Название: "diplom-netology"
4. Срок: выберите нужный (например, 90 дней)
5. Права: отметьте `repo` (все галочки)
6. Нажмите "Generate token"
7. **Скопируйте токен** (показывается только один раз!)

---

## 📝 Быстрая команда для обновления всего

```bash
cd /Users/arisha/Desktop/diplom

# 1. Загрузить код на GitHub
git add .
git commit -m "Обновление проекта"
git push https://arisshha:ВАШ_ТОКЕН@github.com/arisshha/diplom-netology.git main

# 2. Опубликовать на GitHub Pages
npm run build
git remote set-url origin https://arisshha:ВАШ_ТОКЕН@github.com/arisshha/diplom-netology.git
npm run deploy
git remote set-url origin https://github.com/arisshha/diplom-netology.git
```

---

## ✅ Проверка

- **Код на GitHub:** https://github.com/arisshha/diplom-netology
- **Сайт на GitHub Pages:** https://arisshha.github.io/diplom-netology/

---

## 💡 Полезные команды

- `git status` - проверить статус изменений
- `git log --oneline -5` - посмотреть последние коммиты
- `git remote -v` - проверить подключение к репозиторию


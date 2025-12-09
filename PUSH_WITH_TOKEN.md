# Как использовать токен для push

## Способ 1: Вставить токен в URL (самый простой)

Выполните эту команду в терминале (замените `ВАШ_ТОКЕН` на скопированный токен):

```bash
git push https://arisshha:ВАШ_ТОКЕН@github.com/arisshha/diplom-netology.git main
```

**Пример:** Если ваш токен `ghp_1234567890abcdef`, то команда будет:
```bash
git push https://arisshha:ghp_1234567890abcdef@github.com/arisshha/diplom-netology.git main
```

---

## Способ 2: Использовать токен при запросе пароля

1. Выполните:
```bash
git push -u origin main
```

2. Когда попросит:
   - **Username**: `arisshha`
   - **Password**: вставьте ваш токен (не пароль от GitHub!)

---

## Способ 3: Сохранить токен в URL (для постоянного использования)

Выполните (замените `ВАШ_ТОКЕН`):
```bash
git remote set-url origin https://arisshha:ВАШ_ТОКЕН@github.com/arisshha/diplom-netology.git
```

Затем просто:
```bash
git push -u origin main
```

⚠️ **Внимание:** Токен будет виден в истории команд. После успешного push лучше удалить его из URL:
```bash
git remote set-url origin https://github.com/arisshha/diplom-netology.git
```


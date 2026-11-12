#!/bin/bash
# Скрипт для публикации на Netlify
# Использование: bash deploy.sh

echo "🚀 Публикация на Netlify..."
echo ""

# Проверяем наличие Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Скачайте с https://nodejs.org/"
    exit 1
fi

# Собираем проект
echo "📦 Собираем проект..."
npm install
npm run build

# Устанавливаем Netlify CLI если нужно
if ! command -v netlify &> /dev/null; then
    echo "📥 Устанавливаем Netlify CLI..."
    npm install -g netlify-cli
fi

# Деплой
echo "🌐 Публикуем..."
echo ""
echo "⚠️  При первом запуске откроется браузер для авторизации."
echo "   После авторизации сайт будет опубликован автоматически!"
echo ""
netlify deploy --prod --dir=dist

echo ""
echo "✅ Готово! Скопируйте ссылку из вывода выше."

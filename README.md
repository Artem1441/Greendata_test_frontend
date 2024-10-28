# Описание проекта

Всё описание проекта взято с тз. Весь функционал выполнен. <br/>

# Демо
https://artem1441.github.io/greendata_test_frontend/ <br/>

# Технологии
React на webpack'е <br/>
TypeScript <br/>
SCSS + module CSS <br/>
Redux - Redux Toolkit <br/>
JEST тесты <br/>
Axios <br/>
MockApi (для имитации сервера) <br/>

# Установка
git clone https://github.com/Artem1441/greendata_test_frontend <br/>
cd greendata_test_frontend <br/>
npm install <br/>

*не менять package.json - css-loader^6.11.0 обязательно <br/>

# Запуск
npm start <br/>

# Другие скрипты
npm run build - сброка приложения <br/>
npm run test/test:watch - запуск тестов <br/>

# Структура проекта <br/>
/public - всё, что нужно будет для сборки <br/>
/src - рабочая папка проекта <br/>
___/api - запросы на сервер <br/>
___/assets - все файлы визуала (шрифты, картинки, стили и т.п) <br/>
___/components - переисп. компоненты для конкретных модулей (с бизнес логикой)<br/>
___/constants - постоянные переменные/данные <br/>
___/hooks - хуки <br/>
___/modules - модули проекта (согласно концепции модульной архитектуры) <br/>
___/pages - страницы проекта (сделаны в стиле next.js - _app.tsx - точка входа) <br/>
___/shared - переисп. компоненты для всего приложения (без бизнес логики) <br/>
___/store - реализация стейт-менеджера <br/>
___/types - интерфейсы и типы <br/>
___/utils - вспомогательные ф-ии <br/>

# Переменные окружения
Не используются в этом проекте, доступ к БД открыт для запуска приложения на github pages






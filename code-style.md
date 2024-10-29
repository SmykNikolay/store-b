# Руководство по стилю кода

## Паттерны проектирования

В нашем коде на **Node.js**, **Express** и **SQLite** мы применяем паттерны проектирования из книги "Банда четырёх" (GOF) для создания переиспользуемого и поддерживаемого кода.

### Порождающие паттерны

- **Singleton (Одиночка)**: Для создания единственного подключения к базе данных SQLite.
- **Factory Method (Фабричный метод)**: Для создания экземпляров моделей или контроллеров без жесткой привязки к конкретным классам.
- **Builder (Строитель)**: Для пошагового создания сложных объектов, таких как сложные SQL-запросы.

### Структурные паттерны

- **Adapter (Адаптер)**: Для интеграции сторонних библиотек или API в наше приложение.
- **Decorator (Декоратор)**: Для добавления новой функциональности к существующим объектам, например, middleware в Express.
- **Facade (Фасад)**: Для предоставления упрощенного интерфейса к сложным системам, таким как работа с базой данных.

### Поведенческие паттерны

- **Observer (Наблюдатель)**: Для реализации событийной модели, особенно при работе с WebSocket или асинхронными операциями.
- **Strategy (Стратегия)**: Для выбора алгоритмов обработки запросов или бизнес-логики на основе определенных условий.
- **Chain of Responsibility (Цепочка обязанностей)**: Для последовательной обработки запросов через несколько middleware в Express.

## Принципы SOLID

Код должен соответствовать принципам **SOLID**:

- **S**ingle Responsibility Principle (Принцип единственной ответственности): Каждый модуль или класс должен иметь одну обязанность.
- **O**pen/Closed Principle (Принцип открытости/закрытости): Классы должны быть открыты для расширения, но закрыты для изменения.
- **L**iskov Substitution Principle (Принцип подстановки Барбары Лисков): Объекты должны быть заменяемы экземплярами их подтипов без нарушения корректности программы.
- **I**nterface Segregation Principle (Принцип разделения интерфейса): Много специализированных интерфейсов лучше, чем один общий интерфейс.
- **D**ependency Inversion Principle (Принцип инверсии зависимостей): Модули верхнего уровня не должны зависеть от модулей нижнего уровня; оба должны зависеть от абстракций.

## Использование MVC

Мы придерживаемся архитектурного шаблона **Model-View-Controller (MVC)**:

- **Model (Модель)**: Управляет данными и бизнес-логикой, взаимодействуя с базой данных SQLite.
- **View (Представление)**: Отвечает за отображение данных пользователю, реализуется с помощью шаблонизаторов или фронтенд-фреймворков.
- **Controller (Контроллер)**: Обрабатывает входящие запросы, взаимодействует с моделями и выбирает соответствующие представления для отображения.

Использование MVC помогает разделить ответственность между компонентами приложения, облегчая поддержку и масштабирование кода.

## Обработка ошибок

Все запросы должны быть защищены от потенциальных ошибок:

    •	Используйте try/catch блоки для обработки ошибок в асинхронных функциях.
    •	Всегда возвращайте корректные HTTP коды статуса: 200 для успешных запросов, 400 для ошибок клиента, 500 для ошибок сервера.
    •	Логируйте все ошибки для последующего анализа с помощью таких инструментов, как winston или morgan.

## Тестирование

Код должен быть покрыт тестами для обеспечения надежности:

    •	Пишите юнит-тесты для моделей и сервисов.
    •	Используйте интеграционные тесты для тестирования взаимодействия с базой данных и маршрутов Express.
    •	Применяйте mocking для изоляции зависимостей в тестах с помощью таких библиотек, как Jest или Sinon.

## Инструкции для разработчиков

- Используйте паттерны проектирования **GOF**, применимые к **Node.js**, **Express** и **SQLite**.
- Следуйте принципам **SOLID** для обеспечения качественной архитектуры.
- Структурируйте код согласно архитектуре **MVC**.
- Постоянно ищите возможности для улучшения и оптимизации кода.
- Предоставляйте четкие и краткие объяснения в комментариях.
- В **TypeScript** всегда используйте подчеркивание для имен приватных полей (например, `_privateField`).
- Код на **TypeScript** всегда полностью типизировать, включая возвращаемые значения функций и аргументы.
// Скрипт для сворачивания бокового меню
    const collapseButton = document.getElementById('collapseButton');
    const sidebar = document.getElementById('sidebar');

    collapseButton.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Скрипт для открытия модального окна при нажатии на кнопку "Написать"
    const writeBtn = document.getElementById('writeBtn');
    writeBtn.addEventListener('click', () => {
        const writeModal = new bootstrap.Modal(document.getElementById('writeModal'));
        writeModal.show();
    });

    
// Открытие/закрытие панели настроек
const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");

settingsBtn.addEventListener("click", () => {
    settingsPanel.classList.toggle("d-none");
});
document.getElementById('closeSettings').addEventListener('click', () => {
    document.getElementById('settingsPanel').classList.add('d-none');
});
document.getElementById('defaultInterface').addEventListener('click', () => {
    // Добавить класс для выделения выбранной кнопки
    document.getElementById('defaultInterface').classList.add('selected');
    document.getElementById('compactInterface').classList.remove('selected');
    document.getElementById('regularInterface').classList.remove('selected');
    
    // Логика для применения интерфейса "По умолчанию"
    console.log('Тип интерфейса: По умолчанию');
});

document.getElementById('compactInterface').addEventListener('click', () => {
    // Добавить класс для выделения выбранной кнопки
    document.getElementById('compactInterface').classList.add('selected');
    document.getElementById('defaultInterface').classList.remove('selected');
    document.getElementById('regularInterface').classList.remove('selected');
    
    // Логика для применения интерфейса "Компактный"
    console.log('Тип интерфейса: Компактный');
});

document.getElementById('regularInterface').addEventListener('click', () => {
    // Добавить класс для выделения выбранной кнопки
    document.getElementById('regularInterface').classList.add('selected');
    document.getElementById('defaultInterface').classList.remove('selected');
    document.getElementById('compactInterface').classList.remove('selected');
    
    // Логика для применения интерфейса "Обычный"
    console.log('Тип интерфейса: Обычный');
});
    document.getElementById("profileButton").addEventListener("click", function () {
        document.getElementById("profilePanel").classList.remove("d-none");
    });

    document.addEventListener('DOMContentLoaded', function () {
        const profilePanel = document.getElementById('profilePanel');
        const closeProfileBtn = document.getElementById('closeProfile');
        const profileButton = document.getElementById('profileButton');
    
        // Открытие окна профиля
        profileButton.addEventListener('click', function (event) {
            event.stopPropagation(); // Останавливаем всплытие события, чтобы другие обработчики не блокировали клик
            profilePanel.classList.remove('d-none'); // Убираем класс, чтобы открыть окно
        });
    
        // Закрытие окна профиля
        closeProfileBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            profilePanel.classList.add('d-none'); // Добавляем класс, чтобы скрыть окно
        });
    
        // Закрытие окна при клике вне окна профиля
        document.body.addEventListener('click', function (event) {
            if (!profilePanel.contains(event.target) && event.target !== profileButton && event.target !== closeProfileBtn) {
                profilePanel.classList.add('d-none'); // Закрыть окно, если клик был вне его
            }
        });
    });
    document.getElementById('faqBtn').addEventListener('click', () => {
        window.location.href = 'faq.html';
    });

    
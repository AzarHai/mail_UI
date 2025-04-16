const sendBtn = document.getElementById('sendBtn');
const sentModal = new bootstrap.Modal(document.getElementById('sentModal'));

// При нажатии на кнопку "Отправить"
sendBtn.addEventListener('click', () => {
    // Показываем модальное окно с надписью "Отправлено"
    sentModal.show();

    // Закрытие модального окна через 2 секунды (для демонстрации)
    setTimeout(() => {
        sentModal.hide();
    }, 2000); // Окно закроется через 2 секунды
});
    const emojiBtn = document.getElementById('emojiBtn');
const emojiPicker = document.getElementById('emojiPicker');
const messageInput = document.getElementById('message');
const deleteDraftBtn = document.getElementById('deleteDraftBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

// Показываем/скрываем меню с эмодзи
emojiBtn.addEventListener('click', () => {
    emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
});

// Вставляем выбранный смайлик в поле сообщения
document.querySelectorAll('.emoji-btn').forEach((emojiBtn) => {
    emojiBtn.addEventListener('click', (e) => {
        const emoji = e.target.textContent;
        messageInput.value += emoji; // Добавляем смайлик в текстовое поле
        emojiPicker.style.display = 'none'; // Закрываем меню
    });
});

// Закрытие окна при нажатии на корзину (удалить черновик)
deleteDraftBtn.addEventListener('click', () => {
    closeModalBtn.click(); // Закрыть модальное окно
});
   const attachBtn = document.querySelector('.attach-btn');
const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileNameDisplay');

attachBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        fileNameDisplay.textContent = `Файл прикреплён: ${fileName}`;
    } else {
        fileNameDisplay.textContent = '';
    }
});

// Добавление фото
const photoBtn = document.querySelector('.add-photo-btn');
const photoInput = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');

photoBtn.addEventListener('click', () => {
    photoInput.click();
});

photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photoPreview.src = e.target.result;
            photoPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        photoPreview.src = '';
        photoPreview.style.display = 'none';
    }
});
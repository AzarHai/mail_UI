document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar'); 
    const tabs = sidebar.querySelectorAll('.nav-link'); 

    // Обновить список писем при загрузке
    updateMailList('inboxTab'); 

    sidebar.addEventListener('click', function(event) {
        let target = event.target;
        if (target.closest('.nav-link')) {
            target = target.closest('.nav-link'); 
            tabs.forEach(tab => tab.classList.remove('active'));
            target.classList.add('active');
            const folderId = target.id;
            updateMailList(folderId);
            document.getElementById('readMail').style.display = 'none'; // скрываем письмо при переключении вкладки
            document.getElementById('mailList').style.display = 'block'; // показываем список
        }
    });

    function updateMailList(folderId) {
        const mailList = document.getElementById('mailList');
        const folderTitle = document.getElementById('folderTitle');
        switch (folderId) {
            case 'inboxTab':
                folderTitle.textContent = 'Входящие';
                mailList.innerHTML = `
                    <a href="#" class="list-group-item list-group-item-action d-flex align-items-center" data-mail-id="1">
                        <input type="checkbox" class="form-check-input me-3">
                        <label>Входящее письмо 1</label>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action d-flex align-items-center" data-mail-id="2">
                        <input type="checkbox" class="form-check-input me-3">
                        <label>Входящее письмо 2</label>
                    </a>`;
                break;
            case 'sentTab':
                folderTitle.textContent = 'Отправленные';
                mailList.innerHTML = `
                    <a href="#" class="list-group-item list-group-item-action d-flex align-items-center" data-mail-id="3">
                        <input type="checkbox" class="form-check-input me-3">
                        <label>Отправленное письмо 1</label>
                    </a>`;
                break;
            case 'draftsTab':
                folderTitle.textContent = 'Черновики';
                mailList.innerHTML = `
                    <a href="#" class="list-group-item list-group-item-action d-flex align-items-center" data-mail-id="4">
                        <input type="checkbox" class="form-check-input me-3">
                        <label>Черновик 1</label>
                    </a>`;
                break;
            case 'spamTab':
                folderTitle.textContent = 'Спам';
                mailList.innerHTML = `
                    <a href="#" class="list-group-item list-group-item-action d-flex align-items-center" data-mail-id="5">
                        <input type="checkbox" class="form-check-input me-3">
                        <label>Спам письмо 1</label>
                    </a>`;
                break;
            case 'trashTab':
                folderTitle.textContent = 'Удаленные';
                mailList.innerHTML = `
                    <a href="#" class="list-group-item list-group-item-action d-flex align-items-center" data-mail-id="6">
                        <input type="checkbox" class="form-check-input me-3">
                        <label>Удаленное письмо 1</label>
                    </a>`;
                break;
        }
    }

    document.getElementById('mailList').addEventListener('click', function(event) {
        const mailItem = event.target.closest('.list-group-item');
        if (mailItem) {
            const mailId = mailItem.getAttribute('data-mail-id');
            openMail(mailId);
        }
    });

    function openMail(mailId) {
        const mails = {
            1: { subject: 'Входящее письмо 1', sender: 'sender1@example.com', content: 'Это содержимое входящего письма 1.' },
            2: { subject: 'Входящее письмо 2', sender: 'sender2@example.com', content: 'Это содержимое входящего письма 2.' },
            3: { subject: 'Отправленное письмо 1', sender: 'sender3@example.com', content: 'Это содержимое отправленного письма 1.' },
            4: { subject: 'Черновик 1', sender: 'sender4@example.com', content: 'Это содержимое черновика 1.' },
            5: { subject: 'Спам письмо 1', sender: 'sender5@example.com', content: 'Это содержимое письма из спама.' },
            6: { subject: 'Удаленное письмо 1', sender: 'sender6@example.com', content: 'Это содержимое удаленного письма 1.' }
        };

        const mail = mails[mailId];
        document.getElementById('mailBody').innerHTML = `
            <div class="mb-3">
                <h5 class="mb-0">${mail.subject}</h5>
            </div>
            <div class="mb-3">
                <h6><strong>От:</strong> <span id="sender">${mail.sender}</span></h6>
            </div>
            <div>
                <p id="mailContent">${mail.content}</p>
            </div>
            <div class="d-flex justify-content-start mt-3">
                <button class="btn btn-outline-primary me-2" id="replyBtn">Ответить</button>
                <button class="btn btn-outline-primary" id="forwardBtn">Переслать</button>
            </div>
        `;

        document.getElementById('readMail').style.display = 'block';
        document.getElementById('mailList').style.display = 'none';
    }

    document.getElementById('topBackBtn').addEventListener('click', function() {
        document.getElementById('readMail').style.display = 'none';
        document.getElementById('mailList').style.display = 'block';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('input[type="search"]'); // Поисковая строка
    const mailList = document.getElementById('mailList');
    
    // Пример писем
    const mails = [
        { id: 1, subject: 'Входящее письмо 1', sender: 'sender1@example.com', content: 'Это содержимое входящего письма 1.' },
        { id: 2, subject: 'Входящее письмо 2', sender: 'sender2@example.com', content: 'Это содержимое входящего письма 2.' },
        { id: 3, subject: 'Отправленное письмо 1', sender: 'sender3@example.com', content: 'Это содержимое отправленного письма 1.' },
        { id: 4, subject: 'Черновик 1', sender: 'sender4@example.com', content: 'Это содержимое черновика 1.' },
        { id: 5, subject: 'Спам письмо 1', sender: 'sender5@example.com', content: 'Это содержимое письма из спама.' },
        { id: 6, subject: 'Удаленное письмо 1', sender: 'sender6@example.com', content: 'Это содержимое удаленного письма 1.' }
    ];

    // Функция для обновления списка писем в зависимости от поиска
    function updateMailList(searchQuery) {
        mailList.innerHTML = ''; // Очищаем текущий список писем

        // Фильтрация писем по запросу
        const filteredMails = mails.filter(mail => 
            mail.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
            mail.sender.toLowerCase().includes(searchQuery.toLowerCase()) || 
            mail.content.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Заполнение списка отфильтрованными письмами
        filteredMails.forEach(mail => {
            const mailItem = document.createElement('a');
            mailItem.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'align-items-center');
            mailItem.setAttribute('data-mail-id', mail.id);
            mailItem.innerHTML = `
                <input type="checkbox" class="form-check-input me-3">
                <label>${mail.subject}</label>
            `;
            mailList.appendChild(mailItem);
        });
        // Обновление заголовка в зависимости от результатов поиска
    if (filteredMails.length > 0) {
        folderTitle.style.display = 'none'; // Убираем заголовок, если результаты есть
    } else {
        folderTitle.textContent = 'Ничего не найдено'; // Меняем текст на "Ничего не найдено"
        folderTitle.style.display = 'block'; // Показываем заголовок
    }
    }
    
    // Обработчик события нажатия клавиши Enter в строке поиска
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const searchQuery = searchInput.value.trim(); // Очищаем пробелы
        if (searchQuery === '') {
            event.preventDefault(); // Если строка поиска пустая, не выполняем поиск
        } else {
            updateMailList(searchQuery); // Если строка поиска не пуста, обновляем список
        }
    }
});

    // Обработчик клика по письму
    mailList.addEventListener('click', function(event) {
        const mailItem = event.target.closest('.list-group-item');
        if (mailItem) {
            const mailId = mailItem.getAttribute('data-mail-id');
            openMail(mailId);
        }
    });

    // Функция для открытия письма
    function openMail(mailId) {
        const mail = mails.find(m => m.id == mailId);
        if (mail) {
            document.getElementById('mailBody').innerHTML = `
                <div class="mb-3">
                    <h5 class="mb-0">${mail.subject}</h5>
                </div>
                <div class="mb-3">
                    <h6><strong>От:</strong> <span id="sender">${mail.sender}</span></h6>
                </div>
                <div>
                    <p id="mailContent">${mail.content}</p>
                </div>
                <div class="d-flex justify-content-start mt-3">
                    <button class="btn btn-outline-primary me-2" id="replyBtn">Ответить</button>
                    <button class="btn btn-outline-primary" id="forwardBtn">Переслать</button>
                </div>
            `;
            document.getElementById('readMail').style.display = 'block';
            document.getElementById('mailList').style.display = 'none';
        }
    }

    document.getElementById('topBackBtn').addEventListener('click', function() {
        document.getElementById('readMail').style.display = 'none';
        document.getElementById('mailList').style.display = 'block';
    });
});
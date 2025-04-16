<?php
// Подключение к базе данных
$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "register_bd"; 

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Предположим, что у вас есть переменная с именем пользователя из Cookie или сессии
if (isset($_COOKIE['user'])) {
    $name = $_COOKIE['user']; // Получаем имя пользователя из Cookie
}

// Обработка отправки поста
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"]; // Получаем значение заголовка из POST-запроса
    $content = nl2br($_POST["content"]); // Получаем значение содержания из POST-запроса

    // Проверяем, загружено ли изображение
    if (isset($_FILES['image'])) {
        $file_name = $_FILES['image']['name'];
        $file_tmp = $_FILES['image']['tmp_name'];
        $file_destination = 'uploads/' . $file_name; // Путь для сохранения файла (uploads/ - это папка, куда файл будет сохранен)

        // Перемещаем файл из временной директории в желаемую директорию (uploads/)
        move_uploaded_file($file_tmp, $file_destination);

        // Вставляем данные в таблицу posts с указанием имени пользователя, заголовка, содержания и пути к изображению
        $sql = "INSERT INTO posts (name, title, content, img) VALUES ('$name', '$title', '$content', '$file_destination')";

        if ($conn->query($sql) === TRUE) {
            // Успешно добавлено в базу данных
            echo "Пост успешно сохранен!";
        } else {
            // Ошибка при добавлении
            echo "Ошибка: " . $sql . "<br>" . $conn->error;
        }
    } else {
        // Обработка случая, если изображение не было загружено
        echo "Изображение не загружено.";
    }
}

$conn->close();
?>

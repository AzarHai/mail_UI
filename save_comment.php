<?php
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

// Обработка отправки комментария
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $comment = $_POST["comment"]; // Получаем значение комментария из POST-запроса

    // Вставка комментария в базу данных с указанием имени пользователя и текста комментария
    $sql = "INSERT INTO comments (name, comment) VALUES ('$name', '$comment')";

    if ($conn->query($sql) === TRUE) {
        // Успешно добавлено в базу данных
        echo "Комментарий успешно сохранен!";
    } else {
        // Ошибка при добавлении
        echo "Ошибка: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();

?>

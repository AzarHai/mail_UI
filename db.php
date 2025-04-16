<?php
$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "register_bd"; 

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Получение постов из базы данных с информацией об авторе и изображении
$sql = "SELECT posts.id, posts.title, posts.content, posts.img, COALESCE(users.name, posts.name) AS user_name 
        FROM posts
        LEFT JOIN users ON posts.user_id = users.id
        ORDER BY posts.id DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Создание и сохранение страниц для каждого поста
    while($row = $result->fetch_assoc()) {
        echo "<div class=\"post row\">";
        echo "<div class=\"img col-12 col-md-4\">";
        echo "<a href='generated_pages/post_{$row["id"]}.php'>";
        echo "<img class=\"MMImage-Origin\" src=\"https://illustrators.ru/uploads/illustration/image/1447833/main_IMG_20201007_235834_044.jpg\" style=\"width: 100%;\">";
        echo "</a>";
        echo "</div>";
        echo "<div class=\"post_text col-12 col-md-8\">";
        echo "<h3><a href='generated_pages/post_{$row["id"]}.php'>{$row["title"]}</a></h3>";
        echo "<i class=\"far fa-calendar\">{$row["date"]}</i>";
        echo "<p class=\"preview-text\">{$row["content"]}</p>";
        echo "</div>";
        echo "</div>";
    }
    
} else {
    echo "Нет постов для создания страниц";
}

$conn->close();
?>

<?php
$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "register_bd"; 

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

$sql = "SELECT comments.comment, COALESCE(users.name, comments.name) AS user_name 
        FROM comments 
        LEFT JOIN users ON comments.user_id = users.id 
        ORDER BY comments.id DESC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Вывод комментариев с именем пользователя, если оно есть
        echo "<div >"; 
        if ($row["user_name"]) {
            echo "<p><strong>" . $row["user_name"] . ":</strong> " . $row["comment"] . "</p>";
        } else {
            // Если имя пользователя отсутствует, можете вывести "Анонимный пользователь" или что-то подобное
            echo "<p><strong>Анонимный пользователь:</strong> " . $row["comment"] . "</p>";
        }
        echo "</div>"; 
    }
} else {
    echo "Пока комментариев нет.";
}

$conn->close();
?>

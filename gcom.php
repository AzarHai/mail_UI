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
        $html_content = "<!DOCTYPE html>
                        <html lang='en'>
                        <head>
                            <meta charset='UTF-8' />
                            <meta http-equiv='X-UA-Compatible' content='IE=edge' />
                            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                            <title>{$row["title"]}</title>
                            <style>
                            /* Вставьте ваш CSS стилизацию здесь */
                            body {
                                margin: 0;
                                padding: 0;
                            }

                            article {
                                padding: 50px;
                                padding-left: 190px;
                                padding-right: 190px;
                            }

                            header, footer {
                                padding: 0;
                                margin: 0;
                            }

                            article img {
                                max-width: 100%;
                            }

                            article p {
                                font-size: 20px;
                            }

                            article h1 {
                                font-size: 24px;
                            }
                        </style>
                        <link
                        href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css'
                        rel='stylesheet'
                        integrity='sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD'
                        crossorigin='anonymous'
                        />
                        <link rel='stylesheet' href='../style.css' />
                    </head>
                    <body>";

                    $html_content .= "<header>
                    <nav class=\"navbar navbar-expand-lg bg-body-tertiary\">
                      <div class=\"container-xxl\">
                        <a class=\"navbar-brand\" href=\"../index.php\">GordonRamsayLoves</a>
                        <button
                          class=\"navbar-toggler\"
                          type=\"button\"
                          data-bs-toggle=\"collapse\"
                          data-bs-target=\"#navbarSupportedContent\"
                          aria-controls=\"navbarSupportedContent\"
                          aria-expanded=\"false\"
                          aria-label=\"Toggle navigation\"
                        >
                          <span class=\"navbar-toggler-icon\"></span>
                        </button>
                        <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">
                          <ul class=\"navbar-nav me-auto mb-2 mb-lg-0\">
                            <li class=\"nav-item show\">
                              <a class=\"nav-link\" href=\"../recipe.php\">Рецепты</a>
                            </li>
                            <li class=\"nav-item\">
                              <a class=\"nav-link\" href=\"../yourrecipe.php\">Ваши посты о еде</a>
                            </li>
                            <li class=\"nav-item\">
                              <a class=\"nav-link\" href=\"../lol.php\">Наш ресторан</a>
                            </li>
                          </ul>";
// Проверка наличия Cookie
if(!isset($_COOKIE['user'])) {
  // Если Cookie отсутствует, показываем кнопку Войти
  $html_content .= "<form class=\"d-flex\">
                        <button class=\"btn btn-primary me-2\" type=\"button\" data-bs-toggle=\"modal\" data-bs-target=\"#loginModal\">Войти</button>
                      </form>";
} else {
  // Если Cookie присутствует, показываем кнопку Выйти и выводим изображение в виде уменьшенного круга с контуром и выпадающим списком
  $html_content .= "<div class=\"dropdown\" style=\"position: relative;\">
                      <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\" style=\"position: absolute; top: 100%;\">
                        <li><a class=\"dropdown-item\" href=\"/exit.php\">Выйти</a></li>
                      </ul>
                    </div>
                    <div class=\"dropdown\" onmouseover=\"showDropdown()\" onmouseout=\"hideDropdown()\" style=\"margin-top: 10px;\">
                      <img src=\"https://cdn-icons-png.flaticon.com/512/6391/6391572.png\" alt=\"Изображение\" style=\"border-radius: 5%; width: 60px; height: 60px; border: 2px solid black; object-fit: cover; object-position: center;\">
                    </div>";
}
$html_content .= "     </div>
                  </div>
                </nav>
              </header>";

        $html_content .= "<article>
                            <h1><b>{$row["title"]}</b></h1>";
        
        if ($row["img"]) {
            $html_content .= "<img src='../{$row["img"]}' alt='Изображение поста'>";

        }
        
        $html_content .= "<p>{$row["content"]}</p>
                            <p>Автор: {$row["user_name"]}</p>
                          </article>";
        
        $html_content .= "<footer>
                           
                          </footer>";

        $html_content .= "</body>
                        </html>";

        // Создание уникального имени файла для сохранения страницы
        $file_name = "post_" . $row["id"] . ".php";
        $file_path = "generated_pages/" . $file_name;

        // Сохранение HTML-кода страницы в файл
        file_put_contents($file_path, $html_content);
        echo "<a href='$file_path'>Пост:{$row["title"]}</a><br>";
       
    }
    
} else {
    echo "Нет постов для создания страниц";
}

$conn->close();
?>

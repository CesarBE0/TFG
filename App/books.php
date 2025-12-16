<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Credenciales
$servidor = "mysql";
$usuario_bd = "alumno";
$password_bd = "alumno";
$nombre_bd = "lectio_db";

$conn = new mysqli($servidor, $usuario_bd, $password_bd, $nombre_bd);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// 1. Obtener un libro por ID
if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $stmt = $conn->prepare("SELECT * FROM books WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        // Devolvemos el dato tal cual está en la BD (assets/img/...)
        echo json_encode($row);
    } else {
        echo json_encode(["error" => "Libro no encontrado"]);
    }
    $stmt->close();
}
// 2. Obtener todos los libros
else {
    $sql = "SELECT * FROM books";
    $result = $conn->query($sql);

    $books = [];
    while($row = $result->fetch_assoc()) {
        $books[] = $row;
    }
    echo json_encode($books);
}

$conn->close();
?>
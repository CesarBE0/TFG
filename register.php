<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Recibir JSON
$input = json_decode(file_get_contents("php://input"), true);

$name = $input["name"];
$email = $input["email"];
$password = $input["password"];

// Cifrar contraseña con algoritmo seguro
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Conectar BD
$conn = new mysqli("localhost", "root", "", "tu_base");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión"]);
    exit();
}

// Insertar usuario
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "El correo ya está registrado"]);
}

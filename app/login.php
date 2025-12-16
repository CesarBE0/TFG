<?php
// --- LÓGICA DEL BACKEND (PHP) ---
// Se ejecuta solo si la petición es POST (enviada desde JavaScript)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Definimos que la respuesta será un JSON
    header('Content-Type: application/json');

    // 1. Conexión a la Base de Datos
    $servidor = "db"; // Nombre del servicio en Docker o "localhost"
    $usuario_bd = "root";
    $password_bd = "test";
    $nombre_bd = "db_lectio";

    $conn = new mysqli($servidor, $usuario_bd, $password_bd, $nombre_bd);

    // Verificar conexión
    if ($conn->connect_error) {
        echo json_encode(["success" => false, "message" => "Conexión fallida: " . $conn->connect_error]);
        exit;
    }

    // Obtener la acción a realizar (login o registro)
    $accion = $_POST['accion'] ?? '';

    // 2. Procesar Registro
    if ($accion === 'registro') {
        $usuario = $_POST['usuario'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Encriptar la contraseña por seguridad
        $passHash = password_hash($password, PASSWORD_BCRYPT);

        // Verificar si el correo ya existe en la base de datos
        $check = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
        $check->bind_param("s", $email);
        $check->execute();
        $check->store_result();

        if ($check->num_rows > 0) {
            echo json_encode(["success" => false, "message" => "El correo electrónico ya está registrado"]);
        } else {
            // Insertar el nuevo usuario
            $stmt = $conn->prepare("INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $usuario, $email, $passHash);

            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Usuario registrado correctamente"]);
            } else {
                echo json_encode(["success" => false, "message" => "Error al guardar en la base de datos"]);
            }
            $stmt->close();
        }
        $check->close();

        // 3. Procesar Inicio de Sesión
    } elseif ($accion === 'login') {
        $usuario = $_POST['usuario'];
        $password = $_POST['password'];

        // Buscar al usuario por su nombre de usuario
        $stmt = $conn->prepare("SELECT id, password FROM usuarios WHERE username = ?");
        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($id, $hash);
            $stmt->fetch();

            // Verificar si la contraseña coincide con la encriptada
            if (password_verify($password, $hash)) {
                session_start();
                $_SESSION['user_id'] = $id;
                $_SESSION['username'] = $usuario;
                echo json_encode(["success" => true, "message" => "Inicio de sesión correcto"]);
            } else {
                echo json_encode(["success" => false, "message" => "La contraseña es incorrecta"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
        }
        $stmt->close();

    } else {
        echo json_encode(["success" => false, "message" => "Acción no válida"]);
    }

    $conn->close();
    exit; // Detiene la ejecución aquí para que no se muestre el HTML
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión y Registro - Lectio</title>
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
<div class="container">
    <div class="curved-shape"></div>
    <div class="curved-shape2"></div>

    <div class="form-box Login">
        <h2 class="animation" style="--D:0; --S:21">Iniciar Sesión</h2>
        <form id="formLogin">
            <div class="input-box animation" style="--D:0; --S:22">
                <input type="text" id="loginUser" required />
                <label>Usuario</label>
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="input-box animation" style="--D:0; --S:23">
                <input type="password" id="loginPass" required />
                <label>Contraseña</label>
                <i class="fa-solid fa-eye" id="toggleLogin"></i>
            </div>
            <div class="input-box animation" style="--D:0; --S:24">
                <button type="button" class="btn" onclick="iniciarSesion()">Entrar</button>
            </div>
            <div class="input-box animation" style="--D:0; --S:25">
                <p>¿No tienes cuenta? <a href="#" class="SignUpLink">Regístrate</a></p>
            </div>
        </form>
    </div>

    <div class="info-content Login">
        <h2 class="animation" style="--D:0; --S:20">¡BIENVENIDO!</h2>
        <p class="animation" style="--D:0; --S:21">Inicia sesión para acceder a tu biblioteca personal.</p>
    </div>

    <div class="form-box Signup">
        <h2 class="animation" style="--li:17; --S:0">Registro</h2>
        <form id="formRegister">
            <div class="input-box animation" style="--li:18; --S:1">
                <input type="text" id="regUser" required />
                <label>Usuario</label>
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="input-box animation" style="--li:19; --S:1">
                <input type="email" id="regEmail" required />
                <label>Correo</label>
                <i class="fa-solid fa-envelope"></i>
            </div>
            <div class="input-box animation" style="--li:20; --S:2">
                <input type="password" id="regPass" required />
                <label>Contraseña</label>
                <i class="fa-solid fa-eye" id="toggleReg"></i>
            </div>
            <div class="input-box animation" style="--li:21; --S:3">
                <button type="button" class="btn" onclick="registrarUsuario()">Registrarse</button>
            </div>
            <div class="regi-link animation" style="--li:22; --S:4">
                <p>¿Ya tienes cuenta? <a href="#" class="SignInLink">Inicia Sesión</a></p>
            </div>
        </form>
    </div>

    <div class="info-content Signup">
        <h2 class="animation" style="--li:17; --S:0">¡Únete a nosotros!</h2>
        <p class="animation" style="--li:18; --S:1">Crea tu cuenta y descubre un mundo de libros.</p>
    </div>
</div>

<script src="js/login.js"></script>
</body>
</html>
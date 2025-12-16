<?php
// --- LÓGICA DEL BACKEND (PHP) ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');

    // Credenciales (ajustadas a tu docker-compose)
    $servidor = "mysql";
    $usuario_bd = "alumno";
    $password_bd = "alumno";
    $nombre_bd = "lectio_db";

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    try {
        $conn = new mysqli($servidor, $usuario_bd, $password_bd, $nombre_bd);
        $conn->set_charset("utf8mb4");
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Error de conexión: " . $e->getMessage()]);
        exit;
    }

    $accion = $_POST['accion'] ?? '';

    // 2. Procesar Registro
    if ($accion === 'registro') {
        $usuario = $_POST['usuario'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        $passHash = password_hash($password, PASSWORD_BCRYPT);

        $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $check->bind_param("s", $email);
        $check->execute();
        $check->store_result();

        if ($check->num_rows > 0) {
            echo json_encode(["success" => false, "message" => "El correo ya está registrado"]);
        } else {
            $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $usuario, $email, $passHash);

            if ($stmt->execute()) {
                session_start();
                $_SESSION['user_id'] = $stmt->insert_id;
                $_SESSION['username'] = $usuario;
                echo json_encode(["success" => true, "message" => "Registro correcto"]);
            } else {
                echo json_encode(["success" => false, "message" => "Error al guardar usuario"]);
            }
            $stmt->close();
        }
        $check->close();

        // 3. Procesar Login
    } elseif ($accion === 'login') {
        $usuario = $_POST['usuario'];
        $password = $_POST['password'];

        $stmt = $conn->prepare("SELECT id, password FROM users WHERE name = ?");
        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($id, $hash);
            $stmt->fetch();

            if (password_verify($password, $hash)) {
                session_start();
                $_SESSION['user_id'] = $id;
                $_SESSION['username'] = $usuario;
                echo json_encode(["success" => true, "message" => "Login correcto"]);
            } else {
                echo json_encode(["success" => false, "message" => "Contraseña incorrecta"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
        }
        $stmt->close();

    } else {
        echo json_encode(["success" => false, "message" => "Acción inválida"]);
    }
    $conn->close();
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lectio - Acceso</title>
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
                <button type="submit" class="btn">Entrar</button>
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
                <button type="submit" class="btn">Registrarse</button>
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
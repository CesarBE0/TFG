<?php
/* -------------------------------------------------------------------------- */
/* LÓGICA PHP (BACKEND)                                                       */
/* -------------------------------------------------------------------------- */

// 1. Intentamos leer los datos que llegan (Input Stream)
$json_data = file_get_contents("php://input");
$input = json_decode($json_data, true);

// 2. Si recibimos un array y tiene la clave 'action', procesamos como API
if (is_array($input) && isset($input['action'])) {
    
    header('Content-Type: application/json');

    // --- Configuración de Base de Datos ---
    $host = 'mysql';
    $db   = 'lectio_db';
    $user = 'alumno';
    $pass = 'alumno';

    // Usamos @ para suprimir errores visuales de PHP y manejarlos nosotros
    $conn = @new mysqli($host, $user, $pass, $db);

    if ($conn->connect_error) {
        echo json_encode(["status" => "error", "message" => "Error DB: " . $conn->connect_error]);
        exit;
    }

    $action = $input['action'];

    // --- REGISTRO ---
    if ($action === 'register') {
        $name = $conn->real_escape_string($input['name']);
        $email = $conn->real_escape_string($input['email']);
        $password = password_hash($input['password'], PASSWORD_DEFAULT);

        // Validar si existe
        $check = $conn->query("SELECT id FROM users WHERE email = '$email'");
        if ($check && $check->num_rows > 0) {
            echo json_encode(["status" => "error", "message" => "El email ya existe"]);
        } else {
            $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(["status" => "success", "message" => "¡Usuario registrado correctamente!"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Error al registrar"]);
            }
        }
    } 
    // --- LOGIN ---
    elseif ($action === 'login') {
        $email = $conn->real_escape_string($input['email']);
        $password = $input['password'];

        $sql = "SELECT id, name, password FROM users WHERE email = '$email'";
        $result = $conn->query($sql);

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (password_verify($password, $row['password'])) {
                // Login correcto
                echo json_encode(["status" => "success", "message" => "Bienvenido " . $row['name']]);
            } else {
                echo json_encode(["status" => "error", "message" => "Contraseña incorrecta"]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Usuario no encontrado"]);
        }
    }

    $conn->close();
    exit; // ¡IMPORTANTE! Detenemos la ejecución aquí para que no se cargue el HTML
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lectio - Login</title>

    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css">
</head>
<body>
    <div class="container">
        <div class="box">
            <div class="form sign_in">
                <h3>Sign In</h3>
                <span>or use your account</span>

                <form id="form_login">
                    <div class="type">
                        <input type="email" placeholder="Email" id="login_email" required>
                    </div>
                    <div class="type">
                        <input type="password" placeholder="Password" id="login_password" required>
                    </div>
                    <div class="forgot"><span>Forgot your password?</span></div>
                    <button class="btn bkg">Sign In</button>
                </form>
            </div>

            <div class="form sign_up">
                <h3>Sign Up</h3>
                <span>or use your email for register</span>

                <form id="form_register">
                    <div class="type">
                        <input type="text" placeholder="Name" id="register_name" required>
                    </div>
                    <div class="type">
                        <input type="email" placeholder="Email" id="register_email" required>
                    </div>
                    <div class="type">
                        <input type="password" placeholder="Password" id="register_password" required>
                    </div>
                    <button class="btn bkg">Sign Up</button>
                </form>
            </div>
        </div>

        <div class="overlay">
            <div class="page page_signIn">
                <h3>Welcome Back!</h3>
                <p>To keep with us please login with your personal info</p>
                <button class="btn btnSign-in">Sign Up <i class="bi bi-arrow-right"></i></button>
            </div>
            <div class="page page_signUp">
                <h3>Hello Friend!</h3>
                <p>Enter your personal details and start journey with us</p>
                <button class="btn btnSign-up"><i class="bi bi-arrow-left"></i> Sign In</button>
            </div>
        </div>
    </div>

    <script>
        const container = document.querySelector('.container');
        const btnSignIn = document.querySelector('.btnSign-in');
        const btnSignUp = document.querySelector('.btnSign-up');

        // Animación de cambio entre Login y Registro
        btnSignIn.addEventListener('click', () => {
            container.classList.add('active');
        });

        btnSignUp.addEventListener('click', () => {
            container.classList.remove('active');
        });

        // Función para enviar datos a PHP
        async function sendData(data) {
            try {
                // Enviamos los datos al mismo archivo (login.php)
                const response = await fetch('login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                return await response.json();
            } catch (error) {
                console.error('Error:', error);
                return { status: 'error', message: 'Error de comunicación' };
            }
        }

        // 1. Manejar Registro
        document.getElementById('form_register').addEventListener('submit', async (e) => {
            e.preventDefault();
            const result = await sendData({
                action: 'register',
                name: document.getElementById('register_name').value,
                email: document.getElementById('register_email').value,
                password: document.getElementById('register_password').value
            });

            alert(result.message);
            if(result.status === 'success') {
                container.classList.remove('active'); // Volver al login
                document.getElementById('form_register').reset();
            }
        });

        // 2. Manejar Login
        document.getElementById('form_login').addEventListener('submit', async (e) => {
            e.preventDefault();
            const result = await sendData({
                action: 'login',
                email: document.getElementById('login_email').value,
                password: document.getElementById('login_password').value
            });

            if(result.status === 'success') {
                alert(result.message);
                window.location.href = 'index.html'; // Redirigir
            } else {
                alert(result.message);
            }
        });
    </script>
</body>
</html>
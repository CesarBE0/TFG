const container = document.querySelector('.container');
const btnSignIn = document.querySelector('.btnSign-in');
const btnSignUp = document.querySelector('.btnSign-up');

// Cambiar entre login y register
btnSignIn.addEventListener('click', () => {
    container.classList.add('active');
});

btnSignUp.addEventListener('click', () => {
    container.classList.remove('active');
});

// ------------------------------
// REGISTRO
// ------------------------------
const formSignUp = document.querySelector('#form_signup');

formSignUp.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.querySelector('#name_signup').value.trim();
    const email = document.querySelector('#email_signup').value.trim();
    const password = document.querySelector('#password_signup').value.trim();

    if (!name || !email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        const response = await fetch("http://localhost/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (data.success) {
            alert("Usuario registrado correctamente");
            container.classList.remove("active"); // Ir a Sign In
        } else {
            alert("Error al registrar: " + data.message);
        }
    } catch (error) {
        alert("Error en el servidor: " + error);
    }
});

// ------------------------------
// LOGIN
// ------------------------------
const formSignIn = document.querySelector('#form_signin');

formSignIn.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email_login').value.trim();
    const password = document.querySelector('#password_login').value.trim();

    if (!email || !password) {
        alert("Introduce tu email y contraseña.");
        return;
    }

    try {
        const response = await fetch("http://localhost/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            alert("Inicio de sesión correcto");
            window.location.href = "home.html"; // o la página que quieras
        } else {
            alert("Login incorrecto: " + data.message);
        }
    } catch (error) {
        alert("Error en el servidor: " + error);
    }
});

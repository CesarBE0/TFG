/* --- ANIMACIÓN SLIDER --- */
const container = document.querySelector('.container');
const LoginLink = document.querySelector('.SignInLink');
const RegisterLink = document.querySelector('.SignUpLink');

if(RegisterLink) {
    RegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('active');
    });
}

if(LoginLink) {
    LoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('active');
    });
}

/* --- MOSTRAR/OCULTAR CONTRASEÑA --- */
function setupPasswordToggle(toggleId, inputId) {
    const toggleIcon = document.getElementById(toggleId);
    const passwordInput = document.getElementById(inputId);
    if (toggleIcon && passwordInput) {
        toggleIcon.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            toggleIcon.classList.toggle('fa-eye');
            toggleIcon.classList.toggle('fa-eye-slash');
        });
    }
}
setupPasswordToggle('toggleLogin', 'loginPass');
setupPasswordToggle('toggleReg', 'regPass');


/* --- LÓGICA DE ENVÍO (Interceptamos el formulario aquí) --- */

// Listener para el formulario de Login
const formLogin = document.getElementById('formLogin');
if(formLogin){
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault(); // EVITA QUE LA PÁGINA SE RECARGUE
        iniciarSesion();
    });
}

// Listener para el formulario de Registro
const formRegister = document.getElementById('formRegister');
if(formRegister){
    formRegister.addEventListener('submit', function(e) {
        e.preventDefault(); // EVITA QUE LA PÁGINA SE RECARGUE
        registrarUsuario();
    });
}


/* --- FUNCIONES DE CONEXIÓN --- */

async function iniciarSesion() {
    const usuario = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;

    const datos = new FormData();
    datos.append('accion', 'login');
    datos.append('usuario', usuario);
    datos.append('password', pass);

    try {
        const respuesta = await fetch('login.php', { method: 'POST', body: datos });

        // Verificamos si la respuesta es JSON válido
        if (!respuesta.ok) throw new Error("Error en la respuesta del servidor");

        const resultado = await respuesta.json();

        if (resultado.success) {
            // REDIRECCIÓN ABSOLUTA
            window.location.href = '/html/index.html';
        } else {
            alert("Error: " + resultado.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Ocurrió un error. Revisa la consola (F12) para más detalles.");
    }
}

async function registrarUsuario() {
    const usuario = document.getElementById('regUser').value;
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPass').value;

    const datos = new FormData();
    datos.append('accion', 'registro');
    datos.append('usuario', usuario);
    datos.append('email', email);
    datos.append('password', pass);

    try {
        const respuesta = await fetch('login.php', { method: 'POST', body: datos });

        if (!respuesta.ok) throw new Error("Error en la respuesta del servidor");

        const resultado = await respuesta.json();

        if (resultado.success) {
            // REDIRECCIÓN ABSOLUTA (Sin alertas intermedias)
            window.location.href = '/html/index.html';
        } else {
            alert("Error: " + resultado.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Ocurrió un error al registrarse.");
    }
}
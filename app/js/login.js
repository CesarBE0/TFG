/* --- ANIMACIÓN SLIDER --- */
const container = document.querySelector('.container');
const LoginLink = document.querySelector('.SignInLink');
const RegisterLink = document.querySelector('.SignUpLink');

RegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.add('active');
});

LoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.remove('active');
});

/* --- LÓGICA DE MOSTRAR/OCULTAR CONTRASEÑA --- */
function setupPasswordToggle(toggleId, inputId) {
    const toggleIcon = document.getElementById(toggleId);
    const passwordInput = document.getElementById(inputId);

    if (toggleIcon && passwordInput) {
        toggleIcon.addEventListener('click', () => {
            // Verificar tipo actual
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Cambiar icono (ojo abierto / ojo cerrado)
            toggleIcon.classList.toggle('fa-eye');
            toggleIcon.classList.toggle('fa-eye-slash');
        });
    }
}

// Inicializar los toggles para Login y Registro
setupPasswordToggle('toggleLogin', 'loginPass');
setupPasswordToggle('toggleReg', 'regPass');


/* --- LÓGICA DE DATOS (FETCH A LOGIN.PHP) --- */

async function iniciarSesion() {
    const usuario = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;

    if(!usuario || !pass) return alert("Completa todos los campos");

    const datos = new FormData();
    datos.append('accion', 'login');
    datos.append('usuario', usuario);
    datos.append('password', pass);

    try {
        const respuesta = await fetch('login.php', {
            method: 'POST',
            body: datos
        });
        const resultado = await respuesta.json();

        if(resultado.success) {
            window.location.href = 'index.html';
        } else {
            alert("Error: " + resultado.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function registrarUsuario() {
    const usuario = document.getElementById('regUser').value;
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPass').value;

    if(!usuario || !email || !pass) return alert("Completa todos los campos");

    const datos = new FormData();
    datos.append('accion', 'registro');
    datos.append('usuario', usuario);
    datos.append('email', email);
    datos.append('password', pass);

    try {
        const respuesta = await fetch('login.php', {
            method: 'POST',
            body: datos
        });
        const resultado = await respuesta.json();

        if(resultado.success) {
            alert("¡Registro exitoso! Inicia sesión.");
            container.classList.remove('active');
        } else {
            alert("Error: " + resultado.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
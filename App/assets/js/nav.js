document.addEventListener("DOMContentLoaded", () => {
    // 1. Resaltar página activa
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        const hrefPage = link.getAttribute("href");
        if (hrefPage === currentPage || (hrefPage === "index.html" && currentPage === "")) {
            link.classList.add("active-page");
        } else {
            link.classList.remove("active-page");
        }
    });

    // 2. Verificar Sesión e Inyectar Icono
    verificarSesion();
});

async function verificarSesion() {
    try {
        // Petición al backend para ver si hay usuario logueado
        const response = await fetch('/login.php?accion=check_session');
        const data = await response.json();

        // Seleccionamos el contenedor colapsable del navbar (id="nav")
        const navbarCollapse = document.getElementById('nav');

        if (data.logged_in) {
            // === USUARIO LOGUEADO: CREAMOS EL CÍRCULO ===

            const profileContainer = document.createElement('div');
            profileContainer.className = 'user-profile-container';

            // HTML: Botón circular + Menú desplegable
            profileContainer.innerHTML = `
                <button class="btn-user-profile" id="userBtn" aria-label="Menú de usuario">
                    <i class="fa-solid fa-user"></i>
                </button>
                <div class="user-dropdown-menu" id="userDropdown">
                    <div class="px-4 py-2 text-muted small border-bottom">
                        Conectado como <br><strong>${data.username}</strong>
                    </div>
                    <a href="#" class="user-dropdown-item">
                        <i class="fa-solid fa-gear"></i> Configuración
                    </a>
                    <div class="user-dropdown-divider"></div>
                    <a href="#" class="user-dropdown-item text-danger" id="btnLogout">
                        <i class="fa-solid fa-right-from-bracket"></i> Cerrar sesión
                    </a>
                </div>
            `;

            // Inyectamos FontAwesome si no existe (para los iconos)
            if (!document.querySelector('link[href*="font-awesome"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
                document.head.appendChild(link);
            }

            // AÑADIMOS AL FINAL DEL NAVBAR (A la derecha del todo)
            navbarCollapse.appendChild(profileContainer);

            // === EVENTOS (CLIC) ===

            const userBtn = document.getElementById('userBtn');
            const dropdown = document.getElementById('userDropdown');
            const btnLogout = document.getElementById('btnLogout');

            // 1. Abrir/Cerrar menú al pulsar el círculo
            userBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita que el clic llegue al document
                dropdown.classList.toggle('show');
            });

            // 2. Cerrar si hacemos clic fuera
            document.addEventListener('click', (e) => {
                if (!profileContainer.contains(e.target)) {
                    dropdown.classList.remove('show');
                }
            });

            // 3. Botón Cerrar Sesión
            btnLogout.addEventListener('click', async (e) => {
                e.preventDefault();
                await cerrarSesion();
            });

        } else {
            // === USUARIO NO LOGUEADO ===
            // Solo mostramos botón "Entrar" si NO estamos ya en login.php
            if (!window.location.pathname.includes('login.php')) {
                const loginBtn = document.createElement('a');
                loginBtn.href = '/login.php'; // Ruta corregida
                loginBtn.className = 'btn btn-primary ms-3 rounded-pill px-4';
                loginBtn.innerHTML = '<i class="fa-solid fa-user"></i> Iniciar Sesión';
                navbarCollapse.appendChild(loginBtn);
            }
        }

    } catch (error) {
        console.error("Error verificando sesión:", error);
    }
}

async function cerrarSesion() {
    try {
        const response = await fetch('/login.php?accion=logout');
        const data = await response.json();

        if (data.success) {
            window.location.href = '/login.php'; // Redirige al login tras cerrar
        }
    } catch (error) {
        console.error("Error al cerrar sesión", error);
    }
}
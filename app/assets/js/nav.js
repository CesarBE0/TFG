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
    // Evitar duplicados si ya se ha ejecutado
    if (document.querySelector('.user-profile-container')) return;

    try {
        const response = await fetch('/login.php?accion=check_session');
        const data = await response.json();

        // Elementos clave del Navbar
        const navbarCollapse = document.getElementById('nav');
        const navbarToggler = document.querySelector('.navbar-toggler');

        if (data.logged_in) {
            // === USUARIO LOGUEADO ===
            const profileContainer = document.createElement('div');

            // CLASES CLAVE:
            // 'order-lg-last': En PC se va al final del todo.
            // 'ms-2': Margen a la izquierda para separarse de la hamburguesa en móvil.
            profileContainer.className = 'user-profile-container order-lg-last ms-2';

            profileContainer.innerHTML = `
                <button class="btn-user-profile" id="userBtn" aria-label="Cuenta">
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

            // Cargar FontAwesome si no existe
            if (!document.querySelector('link[href*="font-awesome"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
                document.head.appendChild(link);
            }

            // === LÓGICA DE POSICIONAMIENTO ===
            if (navbarToggler) {
                // 1. Empujamos la hamburguesa a la derecha (junto al logo a la izquierda, crea el espacio en medio)
                navbarToggler.classList.add('ms-auto');

                // 2. Insertamos el perfil DESPUÉS de la hamburguesa
                // (nextSibling inserta después del nodo actual)
                navbarToggler.parentNode.insertBefore(profileContainer, navbarToggler.nextSibling);
            } else {
                // Fallback para PC si no hay botón móvil
                navbarCollapse.parentNode.appendChild(profileContainer);
            }

            // === EVENTOS ===
            const userBtn = document.getElementById('userBtn');
            const dropdown = document.getElementById('userDropdown');
            const btnLogout = document.getElementById('btnLogout');

            userBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            });

            document.addEventListener('click', (e) => {
                if (!profileContainer.contains(e.target)) {
                    dropdown.classList.remove('show');
                }
            });

            btnLogout.addEventListener('click', async (e) => {
                e.preventDefault();
                await cerrarSesion();
            });

        } else {
            // === NO LOGUEADO (Botón Entrar) ===
            if (!window.location.pathname.includes('login.php')) {
                if (!document.querySelector('.btn-login-nav')) {
                    const loginBtn = document.createElement('a');
                    loginBtn.href = '/login.php';
                    // 'ms-auto' en el botón login para que también se pegue a la derecha si no hay perfil
                    loginBtn.className = 'btn btn-primary btn-sm rounded-pill px-3 btn-login-nav order-lg-last ms-auto';
                    loginBtn.innerHTML = '<i class="fa-solid fa-user"></i> Entrar';

                    if (navbarToggler) {
                        // En móvil: Logo ... Login Hamburguesa
                        navbarToggler.classList.remove('ms-auto'); // Login ocupa ese espacio
                        navbarToggler.parentNode.insertBefore(loginBtn, navbarToggler);
                        loginBtn.classList.add('me-2'); // Separación
                    } else {
                        navbarCollapse.parentNode.appendChild(loginBtn);
                    }
                }
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
            window.location.href = '/login.php';
        }
    } catch (error) {
        console.error("Error al cerrar sesión", error);
    }
}
// Variable global para almacenar los libros
let allBooks = [];

// === 1. Cargar libros desde la Base de Datos ===
async function loadBooks() {
    try {
        const response = await fetch('books.php'); // Petición al backend
        if (!response.ok) throw new Error('Error al conectar con el servidor');

        allBooks = await response.json(); // Guardamos los datos en la variable global

        // Una vez cargados, inicializamos la interfaz
        renderBooks(allBooks);
        populateTypeFilter();
        mostrarDescuentos();

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("books-list").innerHTML =
            `<div class="alert alert-danger text-center">Error al cargar el catálogo. Inténtalo más tarde.</div>`;
    }
}

// === 2. Renderizar libros en el HTML ===
function renderBooks(list) {
    const container = document.getElementById("books-list");
    if (!container) return;
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = `<div class="text-center w-100 text-muted">No se encontraron libros.</div>`;
        return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "books-grid";

    list.forEach(b => {
        // Convertimos precios a número por seguridad
        const precio = parseFloat(b.price).toFixed(2);

        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
      <a href="detalle.html?id=${b.id}" class="book-link">
        <div class="card shadow-sm h-100">
          <div class="book-img-container">
             <img src="${b.image}" alt="${b.title}" class="book-img">
          </div>
          <div class="card-body">
            <h5 class="card-title text-truncate" title="${b.title}">${b.title}</h5>
            <p class="card-author text-muted small">${b.author}</p>
            <div class="d-flex justify-content-between align-items-center mt-2">
                <span class="badge bg-light text-dark border">${b.type}</span>
                <span class="fw-bold text-primary">${precio} €</span>
            </div>
          </div>
        </div>
      </a>`;
        wrapper.appendChild(card);
    });

    container.appendChild(wrapper);
}

// === 3. Filtros ===
function populateTypeFilter() {
    const dataList = document.getElementById("types-list");
    if (!dataList) return;

    // Extraer tipos únicos
    const types = [...new Set(allBooks.map(b => b.type))];

    dataList.innerHTML = "";
    types.forEach(type => {
        const option = document.createElement("option");
        option.value = type;
        dataList.appendChild(option);
    });
}

function filterBooks() {
    const q = document.getElementById("search-q").value.toLowerCase().trim();
    const typeInput = document.getElementById("filter-type");
    const typeValue = typeInput.value.toLowerCase().trim();
    const author = document.getElementById("filter-author").value.toLowerCase().trim();
    const minPages = parseInt(document.getElementById("filter-min-pages").value);
    const maxPages = parseInt(document.getElementById("filter-max-pages").value);

    const filtered = allBooks.filter(b => {
        const matchesTitle = b.title.toLowerCase().includes(q);
        const matchesType = typeValue === "" || (b.type && b.type.toLowerCase().includes(typeValue));
        const matchesAuthor = b.author.toLowerCase().includes(author);
        const matchesMinPages = isNaN(minPages) || b.pages >= minPages;
        const matchesMaxPages = isNaN(maxPages) || b.pages <= maxPages;

        return matchesTitle && matchesType && matchesAuthor && matchesMinPages && matchesMaxPages;
    });

    renderBooks(filtered);
}

// === 4. Ofertas (Aleatorias) ===
function mostrarDescuentos() {
    const ofertasContainer = document.getElementById("ofertas");
    if (!ofertasContainer || allBooks.length === 0) return;

    // Selecciona 4 libros al azar
    const librosCopia = [...allBooks]; // Copia para no alterar el original
    const librosAleatorios = librosCopia.sort(() => Math.random() - 0.5).slice(0, 4);
    const descuentos = [];

    const html = librosAleatorios.map(book => {
        const descuento = Math.floor(Math.random() * 30) + 10; // 10–40%
        const precio = parseFloat(book.price);
        const precioFinal = (precio * (1 - descuento / 100)).toFixed(2);

        descuentos.push({ id: book.id, descuento });

        return `
        <div class="col-md-3 mb-4">
          <a href="detalle.html?id=${book.id}" class="text-decoration-none text-dark">
            <div class="card h-100 position-relative">
              <span class="badge bg-danger position-absolute top-0 end-0 m-2 shadow">-${descuento}%</span>
              <div class="book-img-container" style="height: 200px;">
                 <img src="${book.image}" class="book-img" alt="${book.title}">
              </div>
              <div class="card-body text-center">
                <h6 class="card-title text-truncate">${book.title}</h6>
                <p class="mb-0 fw-bold">
                  <span class="text-muted text-decoration-line-through small">${precio.toFixed(2)}€</span>
                  <span class="text-danger ms-1">${precioFinal}€</span>
                </p>
              </div>
            </div>
          </a>
        </div>
      `;
    }).join("");

    ofertasContainer.innerHTML = html;
    localStorage.setItem("ofertasLibros", JSON.stringify(descuentos));
}

// === Inicialización ===
document.addEventListener("DOMContentLoaded", () => {
    loadBooks(); // Llamada inicial al backend

    const form = document.getElementById("catalog-form");
    if (form) {
        form.addEventListener("input", filterBooks);
        form.addEventListener("reset", () => setTimeout(() => renderBooks(allBooks), 0));
    }
});
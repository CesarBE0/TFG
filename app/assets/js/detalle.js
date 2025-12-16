async function renderBookDetail() {
    const container = document.getElementById("book-detail");
    if (!container) return;

    // Obtener ID de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        container.innerHTML = `<div class="alert alert-warning text-center my-5">No se ha especificado ningún libro.</div>`;
        return;
    }

    try {
        // === PETICIÓN AL BACKEND CON EL ID ===
        const response = await fetch(`books.php?id=${id}`);
        const data = await response.json();

        // Si hay error en la respuesta del PHP (ej: "Libro no encontrado")
        if (data.error) {
            container.innerHTML = `<div class="alert alert-danger text-center my-5">Libro no encontrado. <a href="catalogo.html" class="btn btn-outline-secondary ml-2">Volver</a></div>`;
            return;
        }

        const book = data; // El backend nos devuelve el objeto del libro directamente
        const precio = parseFloat(book.price);

        // Revisamos si el libro está en ofertas (localStorage)
        const ofertas = JSON.parse(localStorage.getItem("ofertasLibros")) || [];
        const ofertaLibro = ofertas.find(o => o.id == book.id); // Usamos == por si tipos string/int
        let precioFinal = precio;

        let htmlPrecio = `${precio.toFixed(2)} €`;

        if (ofertaLibro) {
            precioFinal = (precio * (1 - ofertaLibro.descuento / 100));
            htmlPrecio = `<span class="text-muted text-decoration-line-through me-2">${precio.toFixed(2)} €</span> 
                    <span class="text-success fw-bold">${precioFinal.toFixed(2)} €</span> 
                    <span class="badge bg-danger ms-2">-${ofertaLibro.descuento}%</span>`;
        }

        // Renderizamos el HTML
        container.innerHTML = `
      <div class="book-detail">
        <div class="book-image">
          <img src="${book.image}" alt="${book.title}" class="shadow rounded">
        </div>
        <div class="book-info">
          <h1>${book.title}</h1>
          <p class="book-meta text-muted">${book.author} · ID: ${book.id} · ${book.pages} páginas</p>
          <span class="book-type">${book.type}</span>
          
          <div class="book-price my-3">
            ${htmlPrecio}
          </div>

          <button class="btn btn-add mb-3 w-100 py-3">Añadir a la cesta</button>
          
          <div class="d-grid gap-2 d-md-block format-options">
            <button class="btn btn-outline-secondary btn-sm">Tapa dura ${precioFinal.toFixed(2)} €</button>
            <button class="btn btn-outline-secondary btn-sm">eBook ${(precioFinal * 0.75).toFixed(2)} €</button>
            <button class="btn btn-outline-secondary btn-sm">Audiolibro ${(precioFinal * 0.9).toFixed(2)} €</button>
          </div>
          
          <h5 class="mt-4">Resumen</h5>
          <p class="book-summary text-secondary">${book.summary}</p>
        </div>
      </div>
    `;

    } catch (error) {
        console.error("Error cargando libro:", error);
        container.innerHTML = `<div class="alert alert-danger text-center">Error de conexión al cargar el libro.</div>`;
    }
}

// Inicialización
document.addEventListener("DOMContentLoaded", renderBookDetail);
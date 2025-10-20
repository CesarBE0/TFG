// === Datos de los libros ===
const sampleBooks = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    type: "Novela",
    pages: 417,
    image: "img/libro1.png",
    summary: "Una historia épica de la familia Buendía en el mítico pueblo de Macondo, que explora el amor, la soledad y el paso del tiempo."
  },
  {
    id: 2,
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    type: "Novela",
    pages: 863,
    image: "img/libro1.png",
    summary: "La célebre historia del hidalgo que pierde el juicio y decide convertirse en caballero andante para devolver la justicia al mundo."
  },
  {
    id: 3,
    title: "La sombra del viento",
    author: "Carlos Ruiz Zafón",
    type: "Misterio",
    pages: 487,
    image: "img/libro1.png",
    summary: "Un joven descubre un libro olvidado que lo llevará a desentrañar los secretos más oscuros del Cementerio de los Libros Olvidados."
  },
  {
    id: 4,
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    type: "Infantil",
    pages: 96,
    image: "img/libro1.png",
    summary: "Un piloto conoce a un pequeño príncipe venido de otro planeta, que le enseña el valor del amor, la amistad y la mirada de un niño."
  }
];

// === Mostrar todos los libros en el catálogo ===
function renderBooksV2(list) {
  const container = document.getElementById("books-list");
  if (!container) return; // si no está en catalogo.html, no hace nada

  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "books-grid";

  list.forEach(b => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <a href="detalle.html?id=${b.id}" class="book-link">
        <div class="card shadow-sm">
          <img src="${b.image}" alt="${b.title}" class="book-img">
          <div class="card-body">
            <h5 class="card-title">${b.title}</h5>
            <p class="card-author">${b.author}</p>
            <p class="card-meta">${b.type} · ${b.pages} páginas</p>
          </div>
        </div>
      </a>
    `;

    wrapper.appendChild(card);
  });

  container.appendChild(wrapper);
}

// === Mostrar detalle del libro según el ID ===
function renderBookDetail() {
  const container = document.getElementById("book-detail");
  if (!container) return; // si no está en detalle.html, no hace nada

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const book = sampleBooks.find(b => b.id === id);

  if (!book) {
    container.innerHTML = `
      <div class="alert alert-danger text-center">
        Libro no encontrado. <a href="catalogo.html" class="alert-link">Volver al catálogo</a>.
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="card p-4">
      <div class="row g-4 align-items-center">
        <div class="col-md-4 text-center">
          <img src="${book.image}" alt="${book.title}" class="img-fluid rounded shadow-sm">
        </div>
        <div class="col-md-8">
          <h2>${book.title}</h2>
          <p><strong>Autor:</strong> ${book.author}</p>
          <p><strong>Tipo:</strong> ${book.type}</p>
          <p><strong>Páginas:</strong> ${book.pages}</p>
          <p class="mt-3">${book.summary}</p>
          <a href="catalogo.html" class="btn btn-primary mt-3">Volver al catálogo</a>
        </div>
      </div>
    </div>
  `;
}

// === Inicialización ===
document.addEventListener("DOMContentLoaded", () => {
  renderBooksV2(sampleBooks);
  renderBookDetail();
});

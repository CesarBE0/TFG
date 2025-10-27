// Lista libros
const sampleBooks = [
  { id: 1, title: "Don Quijote de la Mancha", author: "Miguel de Cervantes", type: "Novela", pages: 863, image: "img/libro1.png", summary: "Clásico de la literatura española sobre un caballero andante." },
  { id: 2, title: "Cien años de soledad", author: "Gabriel García Márquez", type: "Novela", pages: 417, image: "img/libro1.png", summary: "Historia épica de la familia Buendía en Macondo." },
  { id: 3, title: "1984", author: "George Orwell", type: "Distopía", pages: 328, image: "img/libro1.png", summary: "Novela sobre un régimen totalitario y vigilancia masiva." },
  { id: 4, title: "Orgullo y prejuicio", author: "Jane Austen", type: "Romántica", pages: 279, image: "img/libro1.png", summary: "Historia de amor y costumbres en Inglaterra del siglo XIX." },
  { id: 5, title: "Crimen y castigo", author: "Fiódor Dostoyevski", type: "Novela", pages: 671, image: "img/libro1.png", summary: "Un joven comete un crimen y enfrenta consecuencias morales y psicológicas." },
  { id: 6, title: "Ulises", author: "James Joyce", type: "Novela", pages: 730, image: "img/libro1.png", summary: "Retrata la vida de un día de Leopold Bloom en Dublín." },
  { id: 7, title: "Matar a un ruiseñor", author: "Harper Lee", type: "Novela", pages: 281, image: "img/libro1.png", summary: "Reflexión sobre racismo e injusticia en el sur de Estados Unidos." },
  { id: 8, title: "En busca del tiempo perdido", author: "Marcel Proust", type: "Novela", pages: 4215, image: "img/libro1.png", summary: "Exploración de la memoria y la experiencia humana." },
  { id: 9, title: "La Odisea", author: "Homero", type: "Épica", pages: 541, image: "img/libro1.png", summary: "Viaje de Odiseo de regreso a Ítaca tras la guerra de Troya." },
  { id: 10, title: "La Ilíada", author: "Homero", type: "Épica", pages: 704, image: "img/libro1.png", summary: "Relata los acontecimientos de la guerra de Troya y el héroe Aquiles." },
  { id: 11, title: "La divina comedia", author: "Dante Alighieri", type: "Poesía", pages: 798, image: "img/libro1.png", summary: "Viaje alegórico por el Infierno, Purgatorio y Paraíso." },
  { id: 12, title: "Don Juan Tenorio", author: "Tirso de Molina", type: "Teatro", pages: 120, image: "img/libro1.png", summary: "Historia del seductor Don Juan y sus aventuras." },
  { id: 13, title: "Cándido", author: "Voltaire", type: "Novela", pages: 138, image: "img/libro1.png", summary: "Sátira filosófica sobre la optimismo y los desastres de la vida." },
  { id: 14, title: "El gran Gatsby", author: "F. Scott Fitzgerald", type: "Novela", pages: 180, image: "img/libro1.png", summary: "Crítica al sueño americano y la decadencia social." },
  { id: 15, title: "Madame Bovary", author: "Gustave Flaubert", type: "Novela", pages: 329, image: "img/libro1.png", summary: "La historia de Emma Bovary y su búsqueda de amor y lujo." },
  { id: 16, title: "Los hermanos Karamazov", author: "Fiódor Dostoyevski", type: "Novela", pages: 824, image: "img/libro1.png", summary: "Conflictos familiares, éticos y religiosos en Rusia." },
  { id: 17, title: "La metamorfosis", author: "Franz Kafka", type: "Novela", pages: 201, image: "img/libro1.png", summary: "La transformación de Gregorio Samsa en un insecto gigante." },
  { id: 18, title: "El retrato de Dorian Gray", author: "Oscar Wilde", type: "Novela", pages: 254, image: "img/libro1.png", summary: "Hombre que conserva la juventud mientras su retrato envejece." },
  { id: 19, title: "La guerra y la paz", author: "León Tolstói", type: "Novela", pages: 1225, image: "img/libro1.png", summary: "Historia de Rusia durante las guerras napoleónicas." },
  { id: 20, title: "El extranjero", author: "Albert Camus", type: "Novela", pages: 123, image: "img/libro1.png", summary: "Un hombre indiferente ante la vida y la muerte." },
  { id: 21, title: "Anna Karénina", author: "Lev Tolstói", type: "Novela", pages: 864, image: "img/libro1.png", summary: "Trágica historia de amor y sociedad en Rusia." },
  { id: 22, title: "Crónica de una muerte anunciada", author: "Gabriel García Márquez", type: "Novela", pages: 122, image: "img/libro1.png", summary: "Relato sobre un asesinato anunciado en un pueblo latinoamericano." },
  { id: 23, title: "La sombra del viento", author: "Carlos Ruiz Zafón", type: "Misterio", pages: 487, image: "img/libro1.png", summary: "Un joven descubre secretos en el Cementerio de los Libros Olvidados." },
  { id: 24, title: "El nombre de la rosa", author: "Umberto Eco", type: "Misterio", pages: 512, image: "img/libro1.png", summary: "Monje investiga misteriosos asesinatos en una abadía medieval." },
  { id: 25, title: "El túnel", author: "Ernesto Sabato", type: "Novela", pages: 190, image: "img/libro1.png", summary: "Historia de obsesión y asesinato narrada por el protagonista." },
  { id: 26, title: "Pedro Páramo", author: "Juan Rulfo", type: "Novela", pages: 160, image: "img/libro1.png", summary: "Un hombre llega a Comala en busca de su padre y encuentra fantasmas." },
  { id: 27, title: "Fahrenheit 451", author: "Ray Bradbury", type: "Distopía", pages: 194, image: "img/libro1.png", summary: "Sociedad donde los libros están prohibidos y quemados." },
  { id: 28, title: "El señor de los anillos", author: "J.R.R. Tolkien", type: "Fantasía", pages: 1216, image: "img/libro1.png", summary: "Aventura épica en la Tierra Media para destruir un anillo maligno." },
  { id: 29, title: "La casa de los espíritus", author: "Isabel Allende", type: "Novela", pages: 448, image: "img/libro1.png", summary: "Saga familiar con elementos fantásticos y políticos en Chile." },
  { id: 30, title: "El perfume", author: "Patrick Süskind", type: "Novela", pages: 255, image: "img/libro1.png", summary: "Historia de un hombre obsesionado con crear la fragancia perfecta." },
  { id: 31, title: "La tregua", author: "Mario Benedetti", type: "Novela", pages: 208, image: "img/libro1.png", summary: "Un hombre encuentra amor y rutina en su vida diaria en Montevideo." },
  { id: 32, title: "Los miserables", author: "Victor Hugo", type: "Novela", pages: 1463, image: "img/libro1.png", summary: "Historia de redención y justicia en la Francia del siglo XIX." },
  { id: 33, title: "La peste", author: "Albert Camus", type: "Novela", pages: 308, image: "img/libro1.png", summary: "Ciudad francesa enfrenta una epidemia que revela lo humano." },
  { id: 34, title: "El amor en los tiempos del cólera", author: "Gabriel García Márquez", type: "Novela", pages: 348, image: "img/libro1.png", summary: "Historia de un amor que perdura durante décadas." },
  { id: 35, title: "El alquimista", author: "Paulo Coelho", type: "Novela", pages: 208, image: "img/libro1.png", summary: "Joven pastor busca un tesoro y descubre la vida y el destino." },
  { id: 36, title: "La insoportable levedad del ser", author: "Milan Kundera", type: "Novela", pages: 414, image: "img/libro1.png", summary: "Reflexión sobre amor, libertad y existencia durante la invasión de Checoslovaquia." },
  { id: 37, title: "Meditaciones", author: "Marco Aurelio", type: "Filosofía", pages: 254, image: "img/libro1.png", summary: "Reflexiones del emperador romano sobre la vida y la virtud." },
  { id: 38, title: "El príncipe", author: "Nicolás Maquiavelo", type: "Filosofía", pages: 112, image: "img/libro1.png", summary: "Manual sobre política, poder y estrategia de gobierno." },
  { id: 39, title: "La república", author: "Platón", type: "Filosofía", pages: 416, image: "img/libro1.png", summary: "Diálogo sobre justicia, política y sociedad ideal." },
  { id: 40, title: "El contrato social", author: "Jean-Jacques Rousseau", type: "Filosofía", pages: 200, image: "img/libro1.png", summary: "Reflexión sobre la libertad, la igualdad y la organización política." },
  { id: 41, title: "Hamlet", author: "William Shakespeare", type: "Teatro", pages: 200, image: "img/libro1.png", summary: "Tragedia sobre la venganza del príncipe Hamlet." },
  { id: 42, title: "Macbeth", author: "William Shakespeare", type: "Teatro", pages: 180, image: "img/libro1.png", summary: "Historia de ambición y traición en Escocia." },
  { id: 43, title: "La casa de Bernarda Alba", author: "Federico García Lorca", type: "Teatro", pages: 120, image: "img/libro1.png", summary: "Drama familiar sobre represión y conflictos de poder." },
  { id: 44, title: "Othello", author: "William Shakespeare", type: "Teatro", pages: 190, image: "img/libro1.png", summary: "Tragedia sobre celos y manipulación." },
  { id: 45, title: "Alicia en el país de las maravillas", author: "Lewis Carroll", type: "Infantil", pages: 150, image: "img/libro1.png", summary: "Aventuras fantásticas de Alicia en un mundo surrealista." },
  { id: 46, title: "En el camino", author: "Jack Kerouac", type: "Novela", pages: 320, image: "img/libro1.png", summary: "Historias de viajes y búsqueda de libertad en EEUU." },
  { id: 47, title: "Viaje al centro de la Tierra", author: "Julio Verne", type: "Fantasía", pages: 200, image: "img/libro1.png", summary: "Aventura científica en el interior del planeta." },
  { id: 48, title: "La vuelta al mundo en 80 días", author: "Julio Verne", type: "Aventura", pages: 240, image: "img/libro1.png", summary: "Un viajero intenta dar la vuelta al mundo en 80 días." },
  { id: 49, title: "El código Da Vinci", author: "Dan Brown", type: "Misterio", pages: 454, image: "img/libro1.png", summary: "Novela de misterio y conspiraciones históricas." },
  { id: 50, title: "Los juegos del hambre", author: "Suzanne Collins", type: "Distopía", pages: 384, image: "img/libro1.png", summary: "Sociedad distópica donde jóvenes luchan por sobrevivir en un reality mortal." }
];

// === Renderizar todos los libros en el catálogo ===
function renderBooksV2(list) {
  const container = document.getElementById("books-list");
  if (!container) return;
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
      </a>`;
    wrapper.appendChild(card);
  });

  container.appendChild(wrapper);
}

// === Render detalle del libro ===
function renderBookDetail() {
  const container = document.getElementById("book-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const book = sampleBooks.find(b => b.id === id);

  if (!book) {
    container.innerHTML = `<div class="alert alert-danger text-center my-5">
      Libro no encontrado. <button class="btn btn-outline-secondary"><a href="catalogo.html">Volver al catálogo</a></button>
    </div>`;
    return;
  }

  container.innerHTML = `
  <div class="book-detail">
    <div class="book-image">
      <img src="${book.image}" alt="${book.title}">
    </div>
    <div class="book-info">
      <h1>${book.title}</h1>
      <p class="book-meta">${book.author} · ISBN: ${book.id} · Nº páginas: ${book.pages}</p>
      <span class="book-type">${book.type}</span>
      <div class="book-price">24,60 €</div>
      <button class="btn btn-add">Añadir a la cesta</button>
      <div class="format-options">
        <button class="btn btn-outline-secondary">Tapa dura 24,60 €</button>
        <button class="btn btn-outline-secondary">eBook 12,34 €</button>
        <button class="btn btn-outline-secondary">Audiolibro 22,79 €</button>
      </div>
      <p class="book-summary">${book.summary}</p>
    </div>
  </div>`;
}


// === Poblamos datalist de tipos ===
function populateTypeFilter() {
  const dataList = document.getElementById("types-list");
  if (!dataList) return;
  const types = [...new Set(sampleBooks.map(b => b.type))];
  dataList.innerHTML = "";
  types.forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    dataList.appendChild(option);
  });
}

// === Filtrar libros según inputs ===
function filterBooks() {
  const q = document.getElementById("search-q").value.toLowerCase().trim();
  const typeInput = document.getElementById("filter-type");
  const typeValue = typeInput.value.toLowerCase().trim();
  const author = document.getElementById("filter-author").value.toLowerCase().trim();
  const minPages = parseInt(document.getElementById("filter-min-pages").value);
  const maxPages = parseInt(document.getElementById("filter-max-pages").value);

  // Actualizar datalist dinámicamente
  const dataList = document.getElementById("types-list");
  dataList.innerHTML = "";
  const matchingTypes = [...new Set(sampleBooks
    .map(b => b.type)
    .filter(t => t.toLowerCase().includes(typeValue)))];
  matchingTypes.forEach(t => {
    const option = document.createElement("option");
    option.value = t;
    dataList.appendChild(option);
  });

  // Filtrar libros
  const filtered = sampleBooks.filter(b => {
    const matchesTitle = b.title.toLowerCase().includes(q);
    const matchesType = typeValue === "" || b.type.toLowerCase().includes(typeValue);
    const matchesAuthor = b.author.toLowerCase().includes(author);
    const matchesMinPages = isNaN(minPages) || b.pages >= minPages;
    const matchesMaxPages = isNaN(maxPages) || b.pages <= maxPages;

    return matchesTitle && matchesType && matchesAuthor && matchesMinPages && matchesMaxPages;
  });

  renderBooksV2(filtered);
}

// === Inicialización ===
document.addEventListener("DOMContentLoaded", () => {
  renderBooksV2(sampleBooks);
  renderBookDetail();
  populateTypeFilter();

  const form = document.getElementById("catalog-form");
  if (form) {
    // Filtrar cada vez que el usuario escribe
    form.addEventListener("input", filterBooks);

    // Restablecer muestra todos los libros
    form.addEventListener("reset", () => setTimeout(() => renderBooksV2(sampleBooks), 0));
  }
});

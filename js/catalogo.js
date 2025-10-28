// Lista libros
const sampleBooks = [
  { id: 1, title: "Don Quijote de la Mancha", author: "Miguel de Cervantes", type: "Novela", pages: 863, price: 27.99, image: "img/libro1.png", summary: "Clásico de la literatura española sobre un caballero andante." },
  { id: 2, title: "Cien años de soledad", author: "Gabriel García Márquez", type: "Novela", pages: 417, price: 22.50, image: "img/libro1.png", summary: "Historia épica de la familia Buendía en Macondo." },
  { id: 3, title: "1984", author: "George Orwell", type: "Distopía", pages: 328, price: 18.90, image: "img/libro1.png", summary: "Novela sobre un régimen totalitario y vigilancia masiva." },
  { id: 4, title: "Orgullo y prejuicio", author: "Jane Austen", type: "Romántica", pages: 279, price: 17.50, image: "img/libro1.png", summary: "Historia de amor y costumbres en Inglaterra del siglo XIX." },
  { id: 5, title: "Crimen y castigo", author: "Fiódor Dostoyevski", type: "Novela", pages: 671, price: 24.99, image: "img/libro1.png", summary: "Un joven comete un crimen y enfrenta consecuencias morales y psicológicas." },
  { id: 6, title: "Ulises", author: "James Joyce", type: "Novela", pages: 730, price: 29.95, image: "img/libro1.png", summary: "Retrata la vida de un día de Leopold Bloom en Dublín." },
  { id: 7, title: "Matar a un ruiseñor", author: "Harper Lee", type: "Novela", pages: 281, price: 16.99, image: "img/libro1.png", summary: "Reflexión sobre racismo e injusticia en el sur de Estados Unidos." },
  { id: 8, title: "En busca del tiempo perdido", author: "Marcel Proust", type: "Novela", pages: 4215, price: 39.99, image: "img/libro1.png", summary: "Exploración de la memoria y la experiencia humana." },
  { id: 9, title: "La Odisea", author: "Homero", type: "Épica", pages: 541, price: 20.50, image: "img/libro1.png", summary: "Viaje de Odiseo de regreso a Ítaca tras la guerra de Troya." },
  { id: 10, title: "La Ilíada", author: "Homero", type: "Épica", pages: 704, price: 21.99, image: "img/libro1.png", summary: "Relata los acontecimientos de la guerra de Troya y el héroe Aquiles." },
  { id: 11, title: "La divina comedia", author: "Dante Alighieri", type: "Poesía", pages: 798, price: 28.99, image: "img/libro1.png", summary: "Viaje alegórico por el Infierno, Purgatorio y Paraíso." },
  { id: 12, title: "Don Juan Tenorio", author: "Tirso de Molina", type: "Teatro", pages: 120, price: 11.99, image: "img/libro1.png", summary: "Historia del seductor Don Juan y sus aventuras." },
  { id: 13, title: "Cándido", author: "Voltaire", type: "Novela", pages: 138, price: 12.50, image: "img/libro1.png", summary: "Sátira filosófica sobre el optimismo y los desastres de la vida." },
  { id: 14, title: "El gran Gatsby", author: "F. Scott Fitzgerald", type: "Novela", pages: 180, price: 15.99, image: "img/libro1.png", summary: "Crítica al sueño americano y la decadencia social." },
  { id: 15, title: "Madame Bovary", author: "Gustave Flaubert", type: "Novela", pages: 329, price: 19.50, image: "img/libro1.png", summary: "La historia de Emma Bovary y su búsqueda de amor y lujo." },
  { id: 16, title: "Los hermanos Karamazov", author: "Fiódor Dostoyevski", type: "Novela", pages: 824, price: 27.99, image: "img/libro1.png", summary: "Conflictos familiares, éticos y religiosos en Rusia." },
  { id: 17, title: "La metamorfosis", author: "Franz Kafka", type: "Novela", pages: 201, price: 14.99, image: "img/libro1.png", summary: "La transformación de Gregorio Samsa en un insecto gigante." },
  { id: 18, title: "El retrato de Dorian Gray", author: "Oscar Wilde", type: "Novela", pages: 254, price: 16.99, image: "img/libro1.png", summary: "Hombre que conserva la juventud mientras su retrato envejece." },
  { id: 19, title: "La guerra y la paz", author: "León Tolstói", type: "Novela", pages: 1225, price: 32.99, image: "img/libro1.png", summary: "Historia de Rusia durante las guerras napoleónicas." },
  { id: 20, title: "El extranjero", author: "Albert Camus", type: "Novela", pages: 123, price: 12.99, image: "img/libro1.png", summary: "Un hombre indiferente ante la vida y la muerte." },
  { id: 21, title: "Anna Karénina", author: "Lev Tolstói", type: "Novela", pages: 864, price: 26.99, image: "img/libro1.png", summary: "Trágica historia de amor y sociedad en Rusia." },
  { id: 22, title: "Crónica de una muerte anunciada", author: "Gabriel García Márquez", type: "Novela", pages: 122, price: 13.99, image: "img/libro1.png", summary: "Relato sobre un asesinato anunciado en un pueblo latinoamericano." },
  { id: 23, title: "La sombra del viento", author: "Carlos Ruiz Zafón", type: "Misterio", pages: 487, price: 22.99, image: "img/libro1.png", summary: "Un joven descubre secretos en el Cementerio de los Libros Olvidados." },
  { id: 24, title: "El nombre de la rosa", author: "Umberto Eco", type: "Misterio", pages: 512, price: 23.50, image: "img/libro1.png", summary: "Monje investiga misteriosos asesinatos en una abadía medieval." },
  { id: 25, title: "El túnel", author: "Ernesto Sabato", type: "Novela", pages: 190, price: 14.50, image: "img/libro1.png", summary: "Historia de obsesión y asesinato narrada por el protagonista." },
  { id: 26, title: "Pedro Páramo", author: "Juan Rulfo", type: "Novela", pages: 160, price: 13.99, image: "img/libro1.png", summary: "Un hombre llega a Comala en busca de su padre y encuentra fantasmas." },
  { id: 27, title: "Fahrenheit 451", author: "Ray Bradbury", type: "Distopía", pages: 194, price: 16.50, image: "img/libro1.png", summary: "Sociedad donde los libros están prohibidos y quemados." },
  { id: 28, title: "El señor de los anillos", author: "J.R.R. Tolkien", type: "Fantasía", pages: 1216, price: 34.99, image: "img/libro1.png", summary: "Aventura épica en la Tierra Media para destruir un anillo maligno." },
  { id: 29, title: "La casa de los espíritus", author: "Isabel Allende", type: "Novela", pages: 448, price: 21.99, image: "img/libro1.png", summary: "Saga familiar con elementos fantásticos y políticos en Chile." },
  { id: 30, title: "El perfume", author: "Patrick Süskind", type: "Novela", pages: 255, price: 18.50, image: "img/libro1.png", summary: "Historia de un hombre obsesionado con crear la fragancia perfecta." },
  { id: 31, title: "La tregua", author: "Mario Benedetti", type: "Novela", pages: 208, price: 14.99, image: "img/libro1.png", summary: "Un hombre encuentra amor y rutina en su vida diaria en Montevideo." },
  { id: 32, title: "Los miserables", author: "Victor Hugo", type: "Novela", pages: 1463, price: 36.50, image: "img/libro1.png", summary: "Historia de redención y justicia en la Francia del siglo XIX." },
  { id: 33, title: "La peste", author: "Albert Camus", type: "Novela", pages: 308, price: 19.99, image: "img/libro1.png", summary: "Ciudad francesa enfrenta una epidemia que revela lo humano." },
  { id: 34, title: "El amor en los tiempos del cólera", author: "Gabriel García Márquez", type: "Novela", pages: 348, price: 20.50, image: "img/libro1.png", summary: "Historia de un amor que perdura durante décadas." },
  { id: 35, title: "El alquimista", author: "Paulo Coelho", type: "Novela", pages: 208, price: 15.99, image: "img/libro1.png", summary: "Joven pastor busca un tesoro y descubre la vida y el destino." },
  { id: 36, title: "La insoportable levedad del ser", author: "Milan Kundera", type: "Novela", pages: 414, price: 21.50, image: "img/libro1.png", summary: "Reflexión sobre amor, libertad y existencia durante la invasión de Checoslovaquia." },
  { id: 37, title: "Meditaciones", author: "Marco Aurelio", type: "Filosofía", pages: 254, price: 17.99, image: "img/libro1.png", summary: "Reflexiones del emperador romano sobre la vida y la virtud." },
  { id: 38, title: "El príncipe", author: "Nicolás Maquiavelo", type: "Filosofía", pages: 112, price: 13.50, image: "img/libro1.png", summary: "Manual sobre política, poder y estrategia de gobierno." },
  { id: 39, title: "La república", author: "Platón", type: "Filosofía", pages: 416, price: 20.99, image: "img/libro1.png", summary: "Diálogo sobre justicia, política y sociedad ideal." },
  { id: 40, title: "El contrato social", author: "Jean-Jacques Rousseau", type: "Filosofía", pages: 200, price: 15.50, image: "img/libro1.png", summary: "Reflexión sobre la libertad, la igualdad y la organización política." },
  { id: 41, title: "Hamlet", author: "William Shakespeare", type: "Teatro", pages: 200, price: 14.99, image: "img/libro1.png", summary: "Tragedia sobre la venganza del príncipe Hamlet." },
  { id: 42, title: "Macbeth", author: "William Shakespeare", type: "Teatro", pages: 180, price: 13.99, image: "img/libro1.png", summary: "Historia de ambición y traición en Escocia." },
  { id: 43, title: "La casa de Bernarda Alba", author: "Federico García Lorca", type: "Teatro", pages: 120, price: 11.99, image: "img/libro1.png", summary: "Drama familiar sobre represión y conflictos de poder." },
  { id: 44, title: "Othello", author: "William Shakespeare", type: "Teatro", pages: 190, price: 13.99, image: "img/libro1.png", summary: "Tragedia sobre celos y manipulación." },
  { id: 45, title: "Alicia en el país de las maravillas", author: "Lewis Carroll", type: "Infantil", pages: 150, price: 12.50, image: "img/libro1.png", summary: "Aventuras fantásticas de Alicia en un mundo surrealista." },
  { id: 46, title: "En el camino", author: "Jack Kerouac", type: "Novela", pages: 320, price: 19.99, image: "img/libro1.png", summary: "Historias de viajes y búsqueda de libertad en EEUU." },
  { id: 47, title: "Viaje al centro de la Tierra", author: "Julio Verne", type: "Fantasía", pages: 200, price: 16.99, image: "img/libro1.png", summary: "Aventura científica en el interior del planeta." },
  { id: 48, title: "La vuelta al mundo en 80 días", author: "Julio Verne", type: "Aventura", pages: 240, price: 17.99, image: "img/libro1.png", summary: "Un viajero intenta dar la vuelta al mundo en 80 días." },
  { id: 49, title: "El código Da Vinci", author: "Dan Brown", type: "Misterio", pages: 454, price: 23.50, image: "img/libro1.png", summary: "Novela de misterio y conspiraciones históricas." },
  { id: 50, title: "Los juegos del hambre", author: "Suzanne Collins", type: "Distopía", pages: 384, price: 21.99, image: "img/libro1.png", summary: "Sociedad distópica donde jóvenes luchan por sobrevivir en un reality mortal." }
];


// === Renderizar todos los libros en el catálogo ===
function renderBooks(list) {
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

  const filtered = sampleBooks.filter(b => {
    const matchesTitle = b.title.toLowerCase().includes(q);
    const matchesType = typeValue === "" || b.type.toLowerCase().includes(typeValue);
    const matchesAuthor = b.author.toLowerCase().includes(author);
    const matchesMinPages = isNaN(minPages) || b.pages >= minPages;
    const matchesMaxPages = isNaN(maxPages) || b.pages <= maxPages;

    return matchesTitle && matchesType && matchesAuthor && matchesMinPages && matchesMaxPages;
  });

  renderBooks(filtered);
}

// === Mostrar ofertas aleatorias ===
function mostrarDescuentos() {
  const ofertasContainer = document.getElementById("ofertas");
  if (!ofertasContainer) return;

  // Selecciona 4 libros al azar
  const librosAleatorios = sampleBooks
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  // Creamos un array para guardar descuentos
  const descuentos = [];

  const html = librosAleatorios
    .map(book => {
      const descuento = Math.floor(Math.random() * 30) + 10; // 10–40%
      const precioFinal = (book.price * (1 - descuento / 100)).toFixed(2);

      // Guardamos el descuento del libro
      descuentos.push({ id: book.id, descuento });

      return `
        <div class="col-md-3 mb-4">
          <a href="detalle.html?id=${book.id}" class="text-decoration-none text-dark">
            <div class="card book-card shadow-sm h-100 position-relative overflow-hidden">
              <span class="badge bg-danger position-absolute top-0 end-0 m-2 p-2 shadow">-${descuento}%</span>
              <img src="${book.image}" class="card-img-top" alt="${book.title}">
              <div class="card-body text-center">
                <h5 class="card-title">${book.title}</h5>
                <p class="text-muted mb-2">${book.author}</p>
                <p class="mb-0 fw-bold text-danger">
                  <span class="text-muted text-decoration-line-through">${book.price.toFixed(2)}€</span>
                  <span style='color:black'>🡪</span> <span class="text-fail">${precioFinal}€</span>
                </p>
              </div>
            </div>
          </a>
        </div>
      `;
    })
    .join("");

  ofertasContainer.innerHTML = html;

  // Guardamos los descuentos en LocalStorage
  localStorage.setItem("ofertasLibros", JSON.stringify(descuentos));
}


// === Inicialización catálogo ===
document.addEventListener("DOMContentLoaded", () => {
  renderBooks(sampleBooks);
  populateTypeFilter();
  mostrarDescuentos();

  const form = document.getElementById("catalog-form");
  if (form) {
    form.addEventListener("input", filterBooks);
    form.addEventListener("reset", () => setTimeout(() => renderBooks(sampleBooks), 0));
  }
});



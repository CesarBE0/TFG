
const books = [
  {id:1,title:"Cien años de soledad", author:"Gabriel García Márquez", type:"Novela", pages:417},
  {id:2,title:"Don Quijote de la Mancha", author:"Miguel de Cervantes", type:"Novela", pages:863},
  {id:3,title:"La sombra del viento", author:"Carlos Ruiz Zafón", type:"Misterio", pages:487},
  {id:4,title:"El principito", author:"Antoine de Saint-Exupéry", type:"Infantil", pages:96},
  {id:5,title:"1984", author:"George Orwell", type:"Ciencia ficción", pages:328},
  {id:6,title:"Breve historia del tiempo", author:"Stephen Hawking", type:"Divulgación", pages:212},
  {id:7,title:"La casa de los espíritus", author:"Isabel Allende", type:"Novela", pages:433},
  {id:8,title:"El alquimista", author:"Paulo Coelho", type:"Aventura", pages:208},
  {id:9,title:"Fundamentos de programación", author:"Ada Lovelace", type:"Referencia", pages:540},
  {id:10,title:"Cuentos para dormir", author:"Varios", type:"Infantil", pages:64}
];

function renderBooks(list){
  const container = document.getElementById('books-list');
  container.innerHTML = '';
  if(list.length===0){ container.innerHTML = '<p class="small">No se encontraron libros que coincidan.</p>'; return; }
  list.forEach(b=>{
    const div = document.createElement('div');
    div.className = 'book-item mb-3';
    div.innerHTML = `<strong>${b.title}</strong> <span class="small">— ${b.author}</span><br><span class="small text-muted">${b.type} · ${b.pages} páginas</span>`;
    container.appendChild(div);
  });
}

function applyFilters(){
  const q = document.getElementById('search-q').value.trim().toLowerCase();
  const type = document.getElementById('filter-type').value;
  const author = document.getElementById('filter-author').value.trim().toLowerCase();
  const minPages = parseInt(document.getElementById('filter-min-pages').value) || 0;
  const maxPages = parseInt(document.getElementById('filter-max-pages').value) || Infinity;
  const filtered = books.filter(b=>{
    if(type && b.type!==type) return false;
    if(author && !b.author.toLowerCase().includes(author)) return false;
    if(b.pages < minPages || b.pages > maxPages) return false;
    if(q && !(b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))) return false;
    return true;
  });
  renderBooks(filtered);
}

function populateTypeOptions(){
  const types = Array.from(new Set(books.map(b=>b.type)));
  const sel = document.getElementById('filter-type');
  types.forEach(t=>{
    const opt = document.createElement('option');
    opt.value = t; opt.textContent = t; sel.appendChild(opt);
  });
}

function init(){
  populateTypeOptions();
  renderBooks(books);
  document.getElementById('catalog-form').addEventListener('input', applyFilters);
  document.getElementById('catalog-form').addEventListener('submit', e=>{ e.preventDefault(); applyFilters(); });
}

document.addEventListener('DOMContentLoaded', init);

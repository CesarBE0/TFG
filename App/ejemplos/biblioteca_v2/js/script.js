
// v2: Render same sample books, but forms are prepared for server-side handling (generic endpoints)
const sampleBooks = [
  {id:1,title:"Cien años de soledad", author:"Gabriel García Márquez", type:"Novela", pages:417},
  {id:2,title:"Don Quijote de la Mancha", author:"Miguel de Cervantes", type:"Novela", pages:863},
  {id:3,title:"La sombra del viento", author:"Carlos Ruiz Zafón", type:"Misterio", pages:487},
  {id:4,title:"El principito", author:"Antoine de Saint-Exupéry", type:"Infantil", pages:96}
];

function renderBooksV2(list){
  const container = document.getElementById('books-list');
  container.innerHTML='';
  list.forEach(b=>{
    const div = document.createElement('div');
    div.className='book-item mb-3';
    div.innerHTML = `<strong>${b.title}</strong> <span class="small">— ${b.author}</span><br><span class="small text-muted">${b.type} · ${b.pages} páginas</span>`;
    container.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderBooksV2(sampleBooks);
  // Placeholder: handle add-book form via AJAX if desired (currently posts to /api/add-book)
  const addForm = document.getElementById('add-book-form');
  if(addForm){
    addForm.addEventListener('submit', e=>{
      e.preventDefault();
      // Collect form data (example)
      const data = new FormData(addForm);
      console.log('Formulario preparado para enviar a backend (cambia action en el form para usar tu endpoint).', Object.fromEntries(data.entries()));
      alert('Formulario recopilado (ver consola). Integra tu backend para guardar en la DB.');
    });
  }
});

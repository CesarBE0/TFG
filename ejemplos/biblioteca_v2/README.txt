
Versión preparada para backend (genérica)
- Formularios en contacto.html y opiniones.html hacen POST a /api/contact y /api/reviews respectivamente.
- En catalogo.html el formulario de adición de libro (id=add-book-form) está preparado para enviar campos: title, author, type, pages.
- Implementa en tu backend rutas POST para manejar estos endpoints y persistir en la DB.

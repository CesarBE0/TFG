SET NAMES utf8mb4;

-- Asegura que la base de datos se cree con soporte para tildes y ñ
CREATE DATABASE IF NOT EXISTS lectio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE lectio_db;
GRANT ALL PRIVILEGES ON lectio_db.* TO 'alumno'@'%';

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Tabla de Libros
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    pages INT,
    price DECIMAL(10, 2),
    image VARCHAR(255),
    summary TEXT
    );

-- DATOS DE PRUEBA (Con la ruta correcta: assets/img/...)
INSERT INTO books (id, title, author, type, pages, price, image, summary) VALUES
(1, 'Don Quijote de la Mancha', 'Miguel de Cervantes', 'Novela', 863, 27.99, 'assets/img/libro1.png', 'Clásico de la literatura española sobre un caballero andante.'),
(2, 'Cien años de soledad', 'Gabriel García Márquez', 'Novela', 417, 22.50, 'assets/img/libro1.png', 'Historia épica de la familia Buendía en Macondo.'),
(3, '1984', 'George Orwell', 'Distopía', 328, 18.90, 'assets/img/libro1.png', 'Novela sobre un régimen totalitario y vigilancia masiva.'),
(4, 'Orgullo y prejuicio', 'Jane Austen', 'Romántica', 279, 17.50, 'assets/img/libro1.png', 'Historia de amor y costumbres en Inglaterra del siglo XIX.'),
(5, 'Crimen y castigo', 'Fiódor Dostoyevski', 'Novela', 671, 24.99, 'assets/img/libro1.png', 'Un joven comete un crimen y enfrenta consecuencias morales y psicológicas.'),
(6, 'Ulises', 'James Joyce', 'Novela', 730, 29.95, 'assets/img/libro1.png', 'Retrata la vida de un día de Leopold Bloom en Dublín.'),
(7, 'Matar a un ruiseñor', 'Harper Lee', 'Novela', 281, 16.99, 'assets/img/libro1.png', 'Reflexión sobre racismo e injusticia en el sur de Estados Unidos.'),
(8, 'En busca del tiempo perdido', 'Marcel Proust', 'Novela', 4215, 39.99, 'assets/img/libro1.png', 'Exploración de la memoria y la experiencia humana.'),
(9, 'La Odisea', 'Homero', 'Épica', 541, 20.50, 'assets/img/libro1.png', 'Viaje de Odiseo de regreso a Ítaca tras la guerra de Troya.'),
(10, 'La Ilíada', 'Homero', 'Épica', 704, 21.99, 'assets/img/libro1.png', 'Relata los acontecimientos de la guerra de Troya y el héroe Aquiles.'),
(11, 'La divina comedia', 'Dante Alighieri', 'Poesía', 798, 28.99, 'assets/img/libro1.png', 'Viaje alegórico por el Infierno, Purgatorio y Paraíso.'),
(12, 'Don Juan Tenorio', 'Tirso de Molina', 'Teatro', 120, 11.99, 'assets/img/libro1.png', 'Historia del seductor Don Juan y sus aventuras.'),
(13, 'Cándido', 'Voltaire', 'Novela', 138, 12.50, 'assets/img/libro1.png', 'Sátira filosófica sobre el optimismo y los desastres de la vida.'),
(14, 'El gran Gatsby', 'F. Scott Fitzgerald', 'Novela', 180, 15.99, 'assets/img/libro1.png', 'Crítica al sueño americano y la decadencia social.'),
(15, 'Madame Bovary', 'Gustave Flaubert', 'Novela', 329, 19.50, 'assets/img/libro1.png', 'La historia de Emma Bovary y su búsqueda de amor y lujo.'),
(16, 'Los hermanos Karamazov', 'Fiódor Dostoyevski', 'Novela', 824, 27.99, 'assets/img/libro1.png', 'Conflictos familiares, éticos y religiosos en Rusia.'),
(17, 'La metamorfosis', 'Franz Kafka', 'Novela', 201, 14.99, 'assets/img/libro1.png', 'La transformación de Gregorio Samsa en un insecto gigante.'),
(18, 'El retrato de Dorian Gray', 'Oscar Wilde', 'Novela', 254, 16.99, 'assets/img/libro1.png', 'Hombre que conserva la juventud mientras su retrato envejece.'),
(19, 'La guerra y la paz', 'León Tolstói', 'Novela', 1225, 32.99, 'assets/img/libro1.png', 'Historia de Rusia durante las guerras napoleónicas.'),
(20, 'El extranjero', 'Albert Camus', 'Novela', 123, 12.99, 'assets/img/libro1.png', 'Un hombre indiferente ante la vida y la muerte.'),
(21, 'Anna Karénina', 'Lev Tolstói', 'Novela', 864, 26.99, 'assets/img/libro1.png', 'Trágica historia de amor y sociedad en Rusia.'),
(22, 'Crónica de una muerte anunciada', 'Gabriel García Márquez', 'Novela', 122, 13.99, 'assets/img/libro1.png', 'Relato sobre un asesinato anunciado en un pueblo latinoamericano.'),
(23, 'La sombra del viento', 'Carlos Ruiz Zafón', 'Misterio', 487, 22.99, 'assets/img/libro1.png', 'Un joven descubre secretos en el Cementerio de los Libros Olvidados.'),
(24, 'El nombre de la rosa', 'Umberto Eco', 'Misterio', 512, 23.50, 'assets/img/libro1.png', 'Monje investiga misteriosos asesinatos en una abadía medieval.'),
(25, 'El túnel', 'Ernesto Sabato', 'Novela', 190, 14.50, 'assets/img/libro1.png', 'Historia de obsesión y asesinato narrada por el protagonista.'),
(26, 'Pedro Páramo', 'Juan Rulfo', 'Novela', 160, 13.99, 'assets/img/libro1.png', 'Un hombre llega a Comala en busca de su padre y encuentra fantasmas.'),
(27, 'Fahrenheit 451', 'Ray Bradbury', 'Distopía', 194, 16.50, 'assets/img/libro1.png', 'Sociedad donde los libros están prohibidos y quemados.'),
(28, 'El señor de los anillos', 'J.R.R. Tolkien', 'Fantasía', 1216, 34.99, 'assets/img/libro1.png', 'Aventura épica en la Tierra Media para destruir un anillo maligno.'),
(29, 'La casa de los espíritus', 'Isabel Allende', 'Novela', 448, 21.99, 'assets/img/libro1.png', 'Saga familiar con elementos fantásticos y políticos en Chile.'),
(30, 'El perfume', 'Patrick Süskind', 'Novela', 255, 18.50, 'assets/img/libro1.png', 'Historia de un hombre obsesionado con crear la fragancia perfecta.'),
(31, 'La tregua', 'Mario Benedetti', 'Novela', 208, 14.99, 'assets/img/libro1.png', 'Un hombre encuentra amor y rutina en su vida diaria en Montevideo.'),
(32, 'Los miserables', 'Victor Hugo', 'Novela', 1463, 36.50, 'assets/img/libro1.png', 'Historia de redención y justicia en la Francia del siglo XIX.'),
(33, 'La peste', 'Albert Camus', 'Novela', 308, 19.99, 'assets/img/libro1.png', 'Ciudad francesa enfrenta una epidemia que revela lo humano.'),
(34, 'El amor en los tiempos del cólera', 'Gabriel García Márquez', 'Novela', 348, 20.50, 'assets/img/libro1.png', 'Historia de un amor que perdura durante décadas.'),
(35, 'El alquimista', 'Paulo Coelho', 'Novela', 208, 15.99, 'assets/img/libro1.png', 'Joven pastor busca un tesoro y descubre la vida y el destino.'),
(36, 'La insoportable levedad del ser', 'Milan Kundera', 'Novela', 414, 21.50, 'assets/img/libro1.png', 'Reflexión sobre amor, libertad y existencia durante la invasión de Checoslovaquia.'),
(37, 'Meditaciones', 'Marco Aurelio', 'Filosofía', 254, 17.99, 'assets/img/libro1.png', 'Reflexiones del emperador romano sobre la vida y la virtud.'),
(38, 'El príncipe', 'Nicolás Maquiavelo', 'Filosofía', 112, 13.50, 'assets/img/libro1.png', 'Manual sobre política, poder y estrategia de gobierno.'),
(39, 'La república', 'Platón', 'Filosofía', 416, 20.99, 'assets/img/libro1.png', 'Diálogo sobre justicia, política y sociedad ideal.'),
(40, 'El contrato social', 'Jean-Jacques Rousseau', 'Filosofía', 200, 15.50, 'assets/img/libro1.png', 'Reflexión sobre la libertad, la igualdad y la organización política.'),
(41, 'Hamlet', 'William Shakespeare', 'Teatro', 200, 14.99, 'assets/img/libro1.png', 'Tragedia sobre la venganza del príncipe Hamlet.'),
(42, 'Macbeth', 'William Shakespeare', 'Teatro', 180, 13.99, 'assets/img/libro1.png', 'Historia de ambición y traición en Escocia.'),
(43, 'La casa de Bernarda Alba', 'Federico García Lorca', 'Teatro', 120, 11.99, 'assets/img/libro1.png', 'Drama familiar sobre represión y conflictos de poder.'),
(44, 'Othello', 'William Shakespeare', 'Teatro', 190, 13.99, 'assets/img/libro1.png', 'Tragedia sobre celos y manipulación.'),
(45, 'Alicia en el país de las maravillas', 'Lewis Carroll', 'Infantil', 150, 12.50, 'assets/img/libro1.png', 'Aventuras fantásticas de Alicia en un mundo surrealista.'),
(46, 'En el camino', 'Jack Kerouac', 'Novela', 320, 19.99, 'assets/img/libro1.png', 'Historias de viajes y búsqueda de libertad en EEUU.'),
(47, 'Viaje al centro de la Tierra', 'Julio Verne', 'Fantasía', 200, 16.99, 'assets/img/libro1.png', 'Aventura científica en el interior del planeta.'),
(48, 'La vuelta al mundo en 80 días', 'Julio Verne', 'Aventura', 240, 17.99, 'assets/img/libro1.png', 'Un viajero intenta dar la vuelta al mundo en 80 días.'),
(49, 'El código Da Vinci', 'Dan Brown', 'Misterio', 454, 23.50, 'assets/img/libro1.png', 'Novela de misterio y conspiraciones históricas.'),
(50, 'Los juegos del hambre', 'Suzanne Collins', 'Distopía', 384, 21.99, 'assets/img/libro1.png', 'Sociedad distópica donde jóvenes luchan por sobrevivir en un reality mortal.');
//  Importación del módulo readline
const readline = require("readline");

//  Estructura de datos principal (Pila)
let pilaLibros = [];

//  Función constructora (objeto literal)
const crearLibro = (
  titulo,
  autor,
  genero,
  idioma,
  precio,
  formato,
  isbn,
  descripcion,
  estado,
  ubicacion,
  fecha_publicacion,
  editorial,
  paginas,
  dimensiones,
  peso
) => ({
  titulo,
  autor,
  genero,
  idioma,
  precio,
  formato,
  isbn,
  descripcion,
  estado,
  ubicacion,
  fecha_publicacion,
  editorial,
  paginas,
  dimensiones,
  peso,
  fecha_agregado: new Date().toISOString(),
});

// =====================================
//   OPERACIONES BÁSICAS SOBRE LA PILA
// =====================================

const agregarLibro = (libro) => pilaLibros.push(libro);

const quitarLibro = () => {
  if (pilaLibros.length === 0) {
    console.log(" No hay libros para eliminar.\n");
  } else {
    const eliminado = pilaLibros.pop();
    console.log(` Se eliminó "${eliminado.titulo}" de la pila.\n`);
  }
};

const mostrarPila = () => {
  console.clear();
  console.log(" LISTA DE LIBROS EN LA PILA:\n");
  if (pilaLibros.length === 0) {
    console.log("⚠️ La pila está vacía.");
  } else {
    pilaLibros.forEach((libro, index) => {
      console.log(
        `${index + 1}. ${libro.titulo} - ${libro.autor} [${libro.genero}] ($${libro.precio})`
      );
    });
  }
  console.log("\n----------\n");
};

const mostrarEstadisticas = () => {
  const total = pilaLibros.length;
  const precioTotal = pilaLibros.reduce((acc, libro) => acc + libro.precio, 0);
  const precioPromedio = total > 0 ? precioTotal / total : 0;

  const distribucionGeneros = pilaLibros.reduce((acc, libro) => {
    acc[libro.genero] = (acc[libro.genero] || 0) + 1;
    return acc;
  }, {});

  console.log("ESTADÍSTICAS DE LA COLECCIÓN");
  console.log(`Total de libros: ${total}`);
  console.log(`Precio total: $${precioTotal.toFixed(2)}`);
  console.log(`Precio promedio: $${precioPromedio.toFixed(2)}`);
  console.log("Distribución por género:", distribucionGeneros);
  console.log("\n----------------------------\n");
};

// ===========================================
//    FUNCIONES AVANZADAS DE ARRAY METHODS
// ===========================================

// 1. Filtrar y ordenar por precio (asume enStock = true si no existe)
const filtrarYOrdenarPorPrecio = () => {
  const resultado = pilaLibros
    .filter(libro => libro.enStock ?? true)
    .sort((a, b) => a.precio - b.precio)
    .map(libro => libro.titulo);

  console.log("\nTítulos de libros en stock ordenados por precio:");
  console.log(resultado);
  console.log("\n");
};

// 2. Agrupación y conteo por género
const contarPorGenero = () => {
  const resultado = pilaLibros.reduce((acc, libro) => {
    acc[libro.genero] = (acc[libro.genero] || 0) + 1;
    return acc;
  }, {});

  console.log("\nConteo por género:");
  console.log(resultado);
  console.log("\n");
};

// 3. Promedio de libros con más de 400 páginas
const precioPromedioLibrosLargos = () => {
  const largos = pilaLibros.filter(libro => libro.paginas > 400);

  if (largos.length === 0) {
    console.log("\nNo hay libros con más de 400 páginas.\n");
    return;
  }

  const promedio =
    largos.reduce((acc, libro) => acc + libro.precio, 0) / largos.length;

  console.log("\nPrecio promedio de libros con más de 400 páginas:");
  console.log(promedio.toFixed(2));
  console.log("\n");
};

// 4. Buscar libros de Borges en stock
const buscarLibrosDeBorges = () => {
  const resultado = pilaLibros
    .filter(libro => libro.autor === "Jorge Luis Borges")
    .filter(libro => libro.enStock ?? true)
    .map(libro => ({ titulo: libro.titulo, precio: libro.precio }));

  console.log("\nLibros de Borges en stock:");
  console.log(resultado);
  console.log("\n");
};

// 5. Ordenar por género y luego por precio
const ordenarPorGeneroYPrecio = () => {
  const resultado = [...pilaLibros]
    .sort((a, b) => a.precio - b.precio)
    .sort((a, b) => a.genero.localeCompare(b.genero));

  console.log("\nLibros ordenados por género y precio:");
  console.log(resultado);
  console.log("\n");
};

// 6. Libros por década
const librosPorDecada = () => {
  const resultado = pilaLibros.reduce((acc, libro) => {
    const year = parseInt(libro.fecha_publicacion) || 0;
    const decada = Math.floor(year / 10) * 10;

    if (!acc[decada]) acc[decada] = { libros: 0, totalPrecio: 0 };

    acc[decada].libros++;
    acc[decada].totalPrecio += libro.precio;

    return acc;
  }, {});

  console.log("\nLibros por década:");
  console.log(resultado);
  console.log("\n");
};

// 7. Resumen de libros
const resumenDeLibros = () => {
  const resultado = pilaLibros
    .map(libro => ({
      titulo: libro.titulo,
      disponibilidad: (libro.enStock ?? true) ? "Disponible" : "Agotado",
      precioRedondeado: Math.round(libro.precio)
    }))
    .sort((a, b) => a.precioRedondeado - b.precioRedondeado);

  console.log("\nResumen de libros:");
  console.log(resultado);
  console.log("\n");
};

// 8. Búsqueda avanzada con criterios múltiples
const busquedaAvanzada = () => {
  const resultado = pilaLibros
    .filter(libro => parseInt(libro.fecha_publicacion) > 1950)
    .filter(libro => libro.precio < 25000)
    .filter(libro => libro.paginas < 500)
    .map(libro => libro.titulo);

  console.log("\nLibros que cumplen criterios avanzados:");
  console.log(resultado);
  console.log("\n");
};

// 9. Estadísticas generales
const estadisticasGenerales = () => {
  const stats = {
    totalLibros: pilaLibros.length,
    librosEnStock: pilaLibros.filter(l => l.enStock ?? true).length,
    precioPromedio:
      pilaLibros.reduce((sum, l) => sum + l.precio, 0) / pilaLibros.length,
    paginasPromedio:
      pilaLibros.reduce((sum, l) => sum + l.paginas, 0) / pilaLibros.length,
  };

  console.log("\nEstadísticas generales:");
  console.log(stats);
  console.log("\n");
};

// 10. Buscar por palabra
const buscarPorPalabra = (palabra) => {
  const resultado = pilaLibros
    .filter(libro =>
      libro.titulo.toLowerCase().includes(palabra.toLowerCase())
    )
    .map(libro => ({
      titulo: libro.titulo,
      autor: libro.autor,
      precio: libro.precio
    }));

  console.log(`\nResultados de búsqueda por "${palabra}":`);
  console.log(resultado);
  console.log("\n");
};
  
// ===========================================
//   INICIALIZACIÓN DE LIBROS (TU MISMA LISTA)
// ===========================================

const inicializarLibros = () => {
  pilaLibros = [
    crearLibro("El Señor de los Anillos: La Comunidad del Anillo", "J.R.R. Tolkien", "fantasía", "inglés", 90000, "tapa dura", "9780261103573", "Una épica aventura en la Tierra Media", "nuevo", "A1", "1954", "Allen & Unwin", 423, "23x15cm", "0.9kg"),
    crearLibro("1984", "George Orwell", "ficción", "español", 45000, "tapa blanda", "9781234567890", "Distopía política", "nuevo", "A2", "1949", "Secker & Warburg", 328, "20x13cm", "0.5kg"),
    crearLibro("Cien años de soledad", "Gabriel García Márquez", "ficción", "español", 60000, "tapa dura", "9788497592208", "Realismo mágico", "como nuevo", "B1", "1967", "Sudamericana", 471, "22x15cm", "0.7kg"),
    crearLibro("Don Quijote de la Mancha", "Miguel de Cervantes", "clásico", "español", 70000, "tapa blanda", "9788491050292", "Obra maestra del Siglo de Oro", "excelente", "B2", "1605", "Francisco de Robles", 863, "23x15cm", "1.0kg"),
    crearLibro("Los miserables", "Victor Hugo", "clásico", "francés", 85000, "tapa dura", "9780140444308", "Historia de justicia y redención", "usado", "B3", "1862", "A. Lacroix", 1463, "24x16cm", "1.2kg"),
    crearLibro("Harry Potter y la piedra filosofal", "J.K. Rowling", "fantasía", "español", 50000, "tapa blanda", "9788478884452", "Inicio de la saga del joven mago", "nuevo", "C1", "1997", "Salamandra", 320, "21x14cm", "0.4kg"),
    crearLibro("El Hobbit", "J.R.R. Tolkien", "fantasía", "inglés", 55000, "ebook", "9780547928227", "Aventura fantástica", "nuevo", "C2", "1937", "Allen & Unwin", 310, "20x14cm", "0.4kg"),
    crearLibro("El nombre del viento", "Patrick Rothfuss", "fantasía", "inglés", 65000, "tapa blanda", "9788499082479", "Crónica del Asesino de Reyes", "nuevo", "C3", "2007", "DAW Books", 662, "22x15cm", "0.8kg"),
    crearLibro("Los juegos del hambre", "Suzanne Collins", "ciencia ficción", "inglés", 40000, "tapa blanda", "9780439023481", "Distopía juvenil", "nuevo", "C4", "2008", "Scholastic", 374, "21x13cm", "0.5kg"),
    crearLibro("Fahrenheit 451", "Ray Bradbury", "ciencia ficción", "inglés", 45000, "ebook", "9781451673319", "Sociedad donde los libros están prohibidos", "nuevo", "C5", "1953", "Ballantine Books", 249, "19x12cm", "0.3kg"),
    crearLibro("El código Da Vinci", "Dan Brown", "misterio", "español", 50000, "tapa blanda", "9780307474278", "Thriller de misterio y religión", "bueno", "D1", "2003", "Doubleday", 489, "22x14cm", "0.6kg"),
    crearLibro("La sombra del viento", "Carlos Ruiz Zafón", "ficción", "español", 60000, "tapa dura", "9788408172177", "Misterio en la Barcelona de posguerra", "nuevo", "D2", "2001", "Planeta", 565, "23x15cm", "0.8kg"),
    crearLibro("El alquimista", "Paulo Coelho", "ficción", "portugués", 40000, "tapa blanda", "9780061122415", "Viaje espiritual y búsqueda personal", "como nuevo", "D3", "1988", "HarperOne", 208, "20x13cm", "0.4kg"),
    crearLibro("El retrato de Dorian Gray", "Oscar Wilde", "clásico", "inglés", 35000, "ebook", "9780141439570", "Una novela sobre la belleza y la corrupción", "excelente", "D4", "1890", "Ward, Lock and Company", 254, "20x13cm", "0.4kg"),
  ];

  console.clear();
  console.log(" Se han cargado los libros iniciales.\n");
  mostrarPila();
};

// ======================================================
//   LIBROS ADICIONALES
// ======================================================

const agregarLibrosAdicionales = () => {
  const adicionales = [
    crearLibro("Dune", "Frank Herbert", "ciencia ficción", "inglés", 70000, "tapa dura", "9780441172719", "Planeta desértico y política galáctica", "nuevo", "E1", "1965", "Chilton Books", 412, "22x15cm", "0.8kg"),
    crearLibro("Neuromante", "William Gibson", "ciencia ficción", "inglés", 60000, "tapa blanda", "9780441569595", "El origen del ciberpunk", "nuevo", "E2", "1984", "Ace Books", 271, "21x13cm", "0.4kg"),
    crearLibro("El perfume", "Patrick Süskind", "ficción", "alemán", 50000, "tapa blanda", "9780143122975", "Historia de un asesino con olfato perfecto", "usado", "E3", "1985", "Diogenes Verlag", 255, "21x14cm", "0.4kg"),
    crearLibro("El club de la lucha", "Chuck Palahniuk", "ficción", "inglés", 45000, "tapa blanda", "9780393327342", "Crítica social y dualidad", "nuevo", "E4", "1996", "W.W. Norton", 218, "20x13cm", "0.3kg"),
    crearLibro("American Gods", "Neil Gaiman", "fantasía", "inglés", 60000, "ebook", "9780062472106", "Dioses antiguos en el mundo moderno", "nuevo", "E5", "2001", "HarperCollins", 465, "22x15cm", "0.6kg"),
    crearLibro("El libro de arena", "Jorge Luis Borges", "ficción", "español", 40000, "tapa blanda", "9789875669439", "Relatos metafísicos y filosóficos", "bueno", "E6", "1975", "Emecé", 181, "20x13cm", "0.3kg"),
    crearLibro("Pedro Páramo", "Juan Rulfo", "ficción", "español", 35000, "tapa blanda", "9786070707739", "Realismo mágico mexicano", "usado", "E7", "1955", "Fondo de Cultura Económica", 124, "20x13cm", "0.2kg"),
    crearLibro("Rayuela", "Julio Cortázar", "ficción", "español", 60000, "tapa dura", "9788437604947", "Novela experimental y lúdica", "nuevo", "E8", "1963", "Sudamericana", 736, "23x15cm", "0.8kg"),
    crearLibro("La casa de los espíritus", "Isabel Allende", "ficción", "español", 55000, "tapa blanda", "9788401013408", "Saga familiar y realismo mágico", "nuevo", "E9", "1982", "Plaza & Janés", 490, "22x14cm", "0.7kg"),
    crearLibro("Los detectives salvajes", "Roberto Bolaño", "ficción", "español", 70000, "tapa dura", "9788433966773", "Viaje poético y existencial", "nuevo", "E10", "1998", "Anagrama", 609, "23x15cm", "0.9kg"),
  ];

  adicionales.forEach(agregarLibro);
  console.log(" Se han agregado 10 libros adicionales.\n");
};

// ======================================================
//   MENÚ INTERACTIVO
// ======================================================

const iniciarMenu = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const mostrarOpciones = () => {
    console.log(`
==========================
SISTEMA DE GESTIÓN DE LIBROS
==========================
1️ Mostrar pila de libros
2️ Agregar libro manualmente
3️ Quitar último libro
4️ Mostrar estadísticas
5️ Reinicializar con libros base
6️ Agregar 10 libros adicionales
7️ Operaciones avanzadas (Array Methods)
8️ Salir
`);
  };

  const mostrarMenuAvanzado = () => {
    console.log(`
---- OPERACIONES AVANZADAS ----
1. Filtrar y ordenar por precio
2. Contar por género
3. Precio promedio (+400 páginas)
4. Libros de Borges en stock
5. Ordenar por género y precio
6. Libros por década
7. Resumen de libros
8. Búsqueda avanzada
9. Estadísticas generales
10. Buscar por palabra clave
11. Volver
`);
  };

  const preguntarAvanzado = () => {
    mostrarMenuAvanzado();
    rl.question("Seleccione una opción: ", (op) => {
      switch (op) {
        case "1": filtrarYOrdenarPorPrecio(); break;
        case "2": contarPorGenero(); break;
        case "3": precioPromedioLibrosLargos(); break;
        case "4": buscarLibrosDeBorges(); break;
        case "5": ordenarPorGeneroYPrecio(); break;
        case "6": librosPorDecada(); break;
        case "7": resumenDeLibros(); break;
        case "8": busquedaAvanzada(); break;
        case "9": estadisticasGenerales(); break;
        case "10":
          rl.question("Palabra clave: ", palabra => {
            buscarPorPalabra(palabra);
            preguntarAvanzado();
          });
          return;
        case "11":
          preguntar();
          return;
        default:
          console.log(" Opción inválida.\n");
      }
      preguntarAvanzado();
    });
  };

  const preguntar = () => {
    mostrarOpciones();
    rl.question("Seleccione una opción: ", (opcion) => {
      switch (opcion) {
        case "1":
          mostrarPila();
          preguntar();
          break;

        case "2":
          rl.question("Título del libro: ", (titulo) => {
            rl.question("Autor: ", (autor) => {
              const nuevoLibro = crearLibro(
                titulo,
                autor,
                "ficción",
                "español",
                50000,
                "tapa blanda",
                "1234567890",
                "Descripción genérica",
                "nuevo",
                "A1",
                "2025",
                "Editorial X",
                300,
                "20x13cm",
                "0.5kg"
              );
              agregarLibro(nuevoLibro);
              console.log(` Libro "${titulo}" agregado exitosamente.\n`);
              preguntar();
            });
          });
          break;

        case "3":
          quitarLibro();
          preguntar();
          break;

        case "4":
          mostrarEstadisticas();
          preguntar();
          break;

        case "5":
          inicializarLibros();
          preguntar();
          break;

        case "6":
          agregarLibrosAdicionales();
          preguntar();
          break;

        case "7":
          preguntarAvanzado();
          break;

        case "8":
          console.log(" Saliendo del sistema...");
          rl.close();
          break;

        default:
          console.log(" Opción no válida.\n");
          preguntar();
      }
    });
  };

  preguntar();
};

// ======================================================
//   INICIO DEL PROGRAMA
// ======================================================

inicializarLibros();
iniciarMenu();

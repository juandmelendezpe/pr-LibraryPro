# Documentación de la Interfaz Home (Estilo OS)

## Visión General
Se ha implementado una nueva pantalla principal (Home) para el sistema **LibraryPro**, basándose en un diseño inspirado en sistemas operativos de escritorio reales (ej. Mac OS). Se estructuraron los componentes globales de la aplicación (`app.html`) para proveer un entorno inmersivo sin barra de desplazamiento nativa, con un menú superior fijo y un Dock flotante inferior, encapsulando las rutas del sistema en una ventana principal (`<main>`).

---

## 1. Diseño de Interfaz Global (Layout OS)
El empaquetador global del sistema (`app.html` y `styles.css`) ha sido rediseñado utilizando **Tailwind CSS** puro y utilidades CSS en línea.

* **Fondo Dinámico (`.desktop-bg`):** Se creó una clase CSS global que inyecta un degradado abstracto en tonos azules (`#1152d4` a `#061a40`).
* **Barra de Sistema Superior (`<header>`):** Un menú estilo Mac OS modular y minimalista (`h-10 px-6`), anclado a la parte superior, que incluye:
  * El logotipo de la aplicación y controles de estado simulados (batería, red, buscar).
  * Saludo dinámico con el nombre del usuario activo procesado desde `AuthService`.
  * Reloj en tiempo real implementado mediante TypeScript nativo.
  * Opciones globales como soporte técnico y botón de "Cerrar login".
* **Contenedor Silencioso (`.no-scrollbar`):** El entorno principal donde reside el `<router-outlet>` fue liberado de margenes conflictivos y se le forzó a ocultar la barra nativa del navegador, logrando un lienzo infinito e inmersivo ("z-index" ininterumpido).
* **Dock Flotante Inferior (`<nav>`):** Menú de navegación principal con esquinas redondeadas, fondo traslúcido y efecto de desenfoque (`backdrop-blur-md`). Cuenta con íconos para acceder a los módulos de: Préstamos, Donaciones, Libros, Gestores y Reportes. Los iconos tienen un efecto de escala interactivo al interactuar (`hover:scale-110`).

---

## 2. Refactorización del Componente Home (InicioComponent)

El Dashboard o "Panel Central" que se carga en `/home` fue reestructurado desde paneles planos a "Ventanas" interactivas.

* **Estética Glassmórfica (`.glass`):** Se implementó de manera nativa la propiedad `backdrop-filter` para cristalizar las ventanas predeterminadas y dotarlas de transparencias sobre el degradado azul.
* **At a Glance (Estadísticas Globales):** Las tarjetas superiores fueron divididas en flex flex-wrap ("Préstamos Activos", "Donaciones del mes", etc.) incorporando un efecto flotante y colores dinámicos al mantener el mouse encima.
* **Tablas de Información de Ancho Dividido (Multi-Layout):** 
  * Se restructuraron las tablas de datos para presentarse a la par usando columnas del mismo tamaño (`w-full lg:w-1/2`).
  * **Actividad Reciente:** Resumen de operaciones recientes de los usuarios.
  * **Nuevos Ingresos:** Nueva tabla dinámica agregada que inyecta una simulación en TypeScript de los 3 últimos libros registrados, renderizando su Tipo, Autor y Género en celdas limpias.
* **Limpieza de Cabeceras:** Las tablas perdieron completamente los fondos opacos grises del diseño anterior, adoptando backgrounds completamente transparentes para mejorar el contraste sobre el ambiente oscuro.

---

## 3. Dinamismo y Lógica en TypeScript

### Manejo del Reloj Nativo (`app.ts`)
Para proveer la hora global mostrada en la barra del sistema, se inicializó un intervalo persistente en el ciclo de vida de Angular:
1. `ngOnInit`: Se inicia un invocador manual que llama a la función `updateTime()` ajustando un `setInterval` cada 60000ms.
2. `updateTime()`: Formatea la zona horaria del sistema del navegador al Español, inyectando día de la semana, número de día, mes, año y formato 24 horas usando métodos nativos `Intl.DateTimeFormat`.
3. `ngOnDestroy`: Limpia el `clearInterval` para evitar fugas de memoria (Memory Leaks) en caso de que el nodo deba apagarse.

### Datos Reactivos de Tarjetas (`inicio.ts`)
Se ha configurado la información interna del home.
1. Se conservó el objeto local `estadisticas` y sus propiedades enlazadas (`estadisticas.librosDisponibles`) al HTML usando el *two-way databinding*.
2. Se pobló al prototipo de un arreglo `nuevosIngresos`, el cual recorre los elementos a documentar en la tabla usando directivas reactivas nativas de Angular (`*ngFor="let libro...`).

# Documentación de Cambios y Nuevas Implementaciones (v108)

## 1. Creación del Formulario para Nuevo Libro (`LibroNuevoComponent`)
- **Ruta:** `/libros/nuevo`
- **Lógica de Catálogo:** Se implementó siguiendo la arquitectura relacional (Opción A). El componente registra exclusivamente la metadata del `Libro` en el catálogo principal, delegando la creación física (`Ejemplares`) al proceso posterior de Donaciones o Ingresos. Esto previene eficazmente la duplicación accidental de copias al donar un título inédito.
- **Diseño Glass:** Se construyó una interfaz unificada siguiendo el lenguaje de diseño "Dark Glassmorphism", equipada con inputs amplios (`py-3.5`), tipografía robusta (`text-base`), y amplios espacios de cuadrícula (`gap-8`).

## 2. Implementación de Menús Desplegables Tipo *Autocomplete*
- **Reemplazo de Nativos:** Se eliminaron las etiquetas nativas `<datalist>` y `<select>` en el registro de Autores y Géneros para lograr control total sobre la estética del menú desplegable.
- **Lógica Frontend:** Se incorporó manipulación de DOM mediante directivas Angular (`*ngIf`, `(focus)`, `(blur)`, `(mousedown)`) junto a filtrado asíncrono y en tiempo real usando el ValueChanges native del `(input)`.
- **Restricción de Altura:** El contenedor desplegable (`<ul>`) exhibirá dinámicamente coincidencias, constringido matemáticamente a `max-h-[370px]` para asegurar la visibilidad estricta de un máximo de ~10 elementos por vista, forzando la aparición del scroll.

## 3. Rediseño Global de Barras de Desplazamiento (`styles.css`)
- Se inyectó código CSS global apuntando al seudoelemento `::-webkit-scrollbar` para dar vida a la clase `.custom-scrollbar`.
- **Propiedades Visuales:** La barra de desplazamiento fue reducida a `6px` de ancho. El carril (`track`) es complemente transparente y el manejador (`thumb`) utiliza coloración blanca con una sutil opacidad del `20%` que se eleva suavemente en estado hover.

## 4. Modernización Modular del Componente Préstamo
- **`PrestamoFormComponent`:** Se migró el menú de selección de "Libro a Prestar" (Ejemplar) basado en HTML clásico a nuestro nuevo estándar de lista de búsqueda avanzada *Glass*.
- Ahora, los bibliotecarios pueden tipear una fracción del Título o el ID del ejemplar para reducir instantáneamente la enorme lista de selección, agilizando operativamente la asignación de préstamos físicos.

## 5. Pulido de Experiencia de Usuario (UX)
- **Inputs Flotantes:** Se integró la directiva Tailwind `hover:-translate-y-1` a todos los inputs del sistema de nuevo libro, pero con una ralentización de transición aplicada con un token estático `duration-[360ms]`. El resultado es una elevación sutil de los campos, lo cual resulta menos estresante visualmente que la rapidez de la animación estándar.
- Se experimentó con el confinamiento responsivo ("dashboard-lock mode") de la vista principal `libro-list`, aunque en función de preservar la adaptabilidad del diseño previo, los ajustes de bloqueo en el `body` fueron revertidos para prevalecer el estilo autoajustable.

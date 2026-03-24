# Documentación Versión v106 - Módulo de Préstamos y Usuarios

En esta versión se finalizaron los componentes y lógicas necesarias para la asignación avanzada de préstamos a los lectores y se actualizó sustancialmente la interfaz siguiendo el estándar de las pantallas iniciales (Glass Design / Tailwind Dark). 

## 1. Actualizaciones en la Base de Datos y Backend (Spring Boot)

*   **Búsqueda Unificada:** Se detectó la necesidad de buscar usuarios por múltiples parámetros (Nombre, Teléfono o Email).
*   **Repositorio (`UsuarioRepository`):** Se integró la anotación `@Query` para ejecutar una búsqueda usando `LIKE` en el nombre o comparación exacta en email/teléfono.
*   **Servicio y Controlador (`UsuarioService` y `UsuarioController`):** Se añadió el endpoint `GET /api/usuarios/buscar?termino=xxx` habilitando que el frontend se comunique y obtenga un array de posibles lectores basados en la cadena introducida.

## 2. Refactorización del Formulario de Préstamos (`prestamo-form`)

A nivel de experiencia de usuario, se buscó unificar el estilo con el Dashboard (`inicio.html`) para mayor inmersión. 

*   **Reestructuración Visual (Layout):** El contenedor principal pasó a ser un `flex-row` centrado con un ancho máximo del 80%.
*   **Panel Izquierdo - Búsqueda de Lector (Ancho ~40%):** En el lado izquierdo tenemos el formulario interactivo para registrar el préstamo. Se insertó un buscador en tiempo real, de manera que:
    *   Si se encuentra al usuario: El sistema pre-carga sus datos internamente en el objeto `Prestamo` y visualiza una tarjeta azul clara resumiendo su nombre, email y teléfono. El botón de Guardar Préstamo se habilita.
    *   Si no se encuentra al usuario: Se emite una alerta indicando que debe irse a *Crear Perfil Manualmente*.
    *   **Limpiar Campos en vivo:** Se agregó un botón de *Cancelar* que permite blanquear todo el estado actual e información pre-llenada sin necesidad de recargar la página a nivel de URL.
*   **Panel Derecho - Últimos Préstamos (Ancho ~60%):** Se añadió una simulación visual tipo "widget" al lado derecho para complementar espacios vacíos. Invoca asíncronamente al servicio de Préstamos al entrar a la ventana y renderiza las fechas, el nombre del libro en préstamo (usando null operators nativos `ej.libro?.titulo`) y el nombre abreviado del lector a través de una función TS para extraer iniciales. Al completar un préstamo, esta tabla se recarga en base de datos.

## 3. Desacoplamiento y Componente Individual (`usuario-nuevo`)

Previamente los campos para crear perfiles estaban empotrados en el mismo recuadro del componente de préstamos activados con la variable `usuarioNuevo`. 

*   **Nuevo Componente Independiente (`/usuarios/nuevo`):** Se ha extraído toda lógica de formularios de usuario y su servicio a una vista standalone y una ruta propia en `app.routes.ts` integrada en el guard.
*   **Interfaz Glass Mode Optimizado:** Se rediseñó el formulario para aceptar todos los datos de inserción de lector (Nombre, Email, Teléfono, Contraseña Opcional y Dirección). Se aplicaron ajustes específicos en márgenes (un margin-bottom del 2% y paddings más compactos) para subsanar un bug visual donde flotaba interceptando al menú global de la web.
*   **Flujo Ininterrumpido de Datos:** En vez de anidar subscripciones y guardados, el operador que entra al nuevo componente llena la data, guarda (en la base de datos de manera nativa), y un Pop-Up alerta el éxito re-dirigiendo al componente del Paso 2 de forma programática usando `Router`. Haciendo una escalabilidad del código mucho más sana y robusta para el sistema de biblioteca interconectado.

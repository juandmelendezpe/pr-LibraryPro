# Documentación de Cambios y Nuevas Implementaciones (v109)

Esta versión engloba la refactorización integral del módulo de "Gestionar Responsables", transformándolo en un panel (*dashboard*) interactivo y escalable.

## 1. Sistema de Pestañas (Tabs) y Navegación
- **Rutas Afectadas:** `/admin/responsables` (Componente `gestionar-responsable`).
- **Archivos Modificados:** `gestionar-responsable.html`, `gestionar-responsable.ts`.
- **Separación Lógica:** Se implementó un control de estado reactivo (`activeTab: 'lectores' | 'gestores'`) para estratificar la visualización de los usuarios en base a su rol administrativo.
- **Interfaz Tabular:** Se incorporó un sistema de solapas con estilos *glass-morphism* y transiciones sutiles, permitiendo navegar entre los directorios sin recargar la vista al servidor.

## 2. Formularios de Búsqueda Integrada
- Se diseñó e implementó una "Toolbar" dinámica que engloba los motores de búsqueda, con cancelación inteligente de criterios.
- **Búsqueda Reactiva:** Actúa independientemente para cada pestaña (`terminoBusquedaLectores` y `terminoBusquedaGestores`), filtrando al instante el listado según coincidencias en el nombre o el correo electrónico del usuario.

## 3. Lógica de Ordenamiento, Vista Acotada y Componente Tabla
- **Orden Descendente (`id`):** Los *getters* de array (tanto `lectores` como `gestores`) se refactorizaron para ordenar ascendentemente a los usuarios nuevos, utilizando la resta estricta de sus `id`. Con esto priorizamos a los perfiles recién inscritos en la cima de la tabla.
- **Límite de Dashboard:** Solo para los Lectores, se aplica automáticamente la traba visual `slice(0, 4)` cuando no existen búsquedas activas. Esto previene un desbordamiento visual y mantiene la estructura concisa propia del componente "Home".
- **Composición del Scroll Interno:** 
  - Al contenedor `.overflow-x-auto` se le adicionó `overflow-y-auto` y la restricción estricta de `max-h-[350px]`. Al cruzar este volumen, la tabla se trunca inyectando una delicada barra de desplazamiento.
  - El grupo `<thead/>` se hizo de naturaleza pegajosa (`sticky top-0 z-10`), aplicando simultáneamente `bg-slate-900/95` y `backdrop-blur-md` para evitar superposiciones opacas feas entre las celdas de datos al usar el scroll en los directorios inmensos.

## 4. Orquestador de Edición e Inserción: `UserEditarComponent`
- **Archivos Generados:** `user-editar.ts`, `user-editar.html`.
- **Arquitectura Modal:** Reemplazando las rutinas estándar de re-ruteo, este componente actúa exclusivamente de forma superpuesta mediante *backdrop overlays*, ahorrando tiempos muertos de recarga de DOM entero.
- **Comunicación Estricta:** Implementa bidireccionalmente decoradores. A través de `@Input() usuarioData`, absorbe instancias (o vacías, o un usuario a editar) y, haciendo uso de `@Output()`, emite los constructos al responsable padre para grabar o deshacer (`cerrarModal`), delegando la transacción pesada final a `UsuarioService`.

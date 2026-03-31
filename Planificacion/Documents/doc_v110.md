# Documentación de Implementación - Módulo de Reportes (v1.1.0)

## Resumen de la Funcionalidad
- **Módulo:** Reportes y Estadísticas del Sistema
- **Componente Principal:** `ReportesComponent`
- **Ruta asociada:** `/reportes`

## Descripción Técnica

### 1. Creación del Componente `ReportesComponent`
- **Ubicación:** `src/app/components/reportes/`
- **Propósito:** Mostrar métricas globales y estadísticas en tiempo real sobre la actividad dentro de la biblioteca.
- **Diseño de UI:** Se implementó una vista al estilo *Dashboard* utilizando el lenguaje de diseño *Glassmorphism* a través de Tailwind CSS. Las tarjetas métricas incorporan gradientes sutiles y bordes difuminados (`backdrop-blur`).
- **Inyección de Dependencias:** El componente inyecta y hace uso de múltiples servicios del sistema: `PrestamoService`, `DonacionService`, `UsuarioService`, `LibroService` y `EjemplarService`.

### 2. Cálculos y Agregación de Métricas
El componente recopila información disparando peticiones de red asíncronas en su método `ngOnInit`. Las estadísticas se calculan de la siguiente manera:
- **Total Préstamos:** Acumulación de todos los registros retornados de la tabla de préstamos.
- **Préstamos Activos:** Listado de préstamos filtrado estrictamente por su estado (`estado.descripcion` igual a *'Activo'* o *'Vigente'*).
- **Total Donaciones:** Conteo neto de los registros en donaciones.
- **Total Lectores:** Usuarios filtrados basándose en su entidad de Rol (`rol.titulo` igual a *'Lector'*).
- **Inventario Total:** Incluye el tamaño total del catálogo de Libros (`totalLibros`) y el acumulado de volúmenes físicos (`totalEjemplares`).

### 3. Actualización de Interfaz Global (`app.html`)
- **Gestión de Espacio de Pantalla:** Para mejorar y maximizar el área visible de los cuadros analíticos en `ReportesComponent`, se implementó una directriz estructural en `<nav>` del menú inferior tipo *Dock*.
- **Ocultamiento Dinámico:** Se utilizó la condición `*ngIf="router.url !== '/reportes'"` para apagar el renderizado del menú inferior flotante únicamente en esta vista. El usuario mantiene las herramientas de salida utilizando la barra superior del sistema operativo.

### 4. Enrutamiento (`app.routes.ts`)
- Se ha expandido el registro de componentes enrutables.
- Se agregó el acceso protegido con el `authGuard`:
  `{ path: 'reportes', component: ReportesComponent, canActivate: [authGuard] }`

### 5. Rediseño de la Barra de Navegación Superior (`Header`)
- **Ubicación de cambios:** `src/app/app.html` (Top Menu Bar)
- **Mejoras Visuales:**
  - Se eliminaron los separadores de texto rudimentarios (`|`) en favor de elementos interactivos compactos tipo "píldora" (`padding`, `rounded-md`).
  - Se implementaron efectos en cascada (*hover state*), incluyendo: transición de color (`hover:text-white`), fondo iluminado suave (`hover:bg-white/10`), sombra interna y transformación háptica (`hover:-translate-y-[1px]`, `active:scale-95`).
  - El logo del sistema (*settings_input_component*) ahora presenta una rotación temporal al interactuar.
  - El bloque de usuario y reloj adquirió íconos actualizados de Material Symbols (`person`, `schedule`) dentro de contenedores diferenciados (`rounded-full bg-white/5`).
  - El botón de cierre de sesión (`logout`) adoptó un diseño rojo alertante al pasar el mouse por encima (`hover:bg-red-500/20`), protegiendo frente a un clic accidental no deseado.

### 6. Creación del Componente de Soporte Técnico
- **Ubicación:** `src/app/components/soporte/`
- **Ruta asociada:** `/soporte`
- **Estructura Arquitectónica:** Se implementó una vista puramente estética e informativa (estática), enfocada a la exhibición del equipo, stack de proyecto y tecnologías base.
- **Micro-interacciones y UI:**
  - Empleo enfático de diseño de tarjeta única *Glassmorphism*.
  - *Header en línea (Inline Header)*: Configuración limpia con un contenedor ícono modular alineado a la izquierda para evitar choques visuales con gradientes.
  - Distribución tipo malla compacta (`grid-cols-2`, `gap-x-4 gap-y-3`) para alojar los lenguajes de programación, framework Java/Angular y datos de la institución o autor.
  - Se ajustaron estrictamente los márgenes visuales (`pt-8 px-6 pb-6`) en busca de un diseño responsivo y sin desproporción de espacios muertos.

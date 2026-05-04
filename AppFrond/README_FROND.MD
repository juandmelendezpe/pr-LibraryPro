# Frontend - LIFE SYSTEM

Interfaz de usuario desarrollada en **Angular 21**.

## Componentes Implementados
- `login`: Acceso al sistema.
- `home`: Dashboard principal.
- `libro-list`: Buscador y listado de libros.
- `prestamo-form`: Gestión de préstamos.
- `donacion-form`: Gestión de donaciones.
- `usuario-gestion`: Panel centralizado para Responsables (Lectores y Gestores).
- `gestor-editar` y `user-editar`: Interfaces de edición estructuradas por nivel de acceso (v1.1.2).
- `reportes`: Panel analítico de métricas globales de la biblioteca (v1.1.0).
- `soporte`: Vista informativa sobre tecnología y desarrollo (v1.1.0).
- `usuario-activity`: Dashboard interactivo de actividad por cada usuario (Préstamos, Devoluciones, Donaciones) (v1.1.3).
- `devolucion-form`: Flujo transaccional para el retorno de ejemplares (v1.1.3).

## Instalación
Ejecuta `npm install` y luego `ng serve` para ver la aplicación.

## Arquitectura y Estructura de Proyecto

El proyecto está diseñado de forma modular.

**Tecnologías base:**
- **Angular 21** (Framework Principal)
- **TypeScript** (Lógica de Componentes, Servicios y Tipado)
- **HTML** (Estructura de Vistas)
- **CSS / Tailwind** (Estilización con utilidades en línea y diseño Glassmorphism)

### Organización de Directorios (`src/app/`)

- `components/`: Contiene los módulos de la interfaz de usuario, organizados por contexto funcional:
  - `/admin`: Vistas dedicadas para administradores y configuración de accesos.
  - `/devoluciones`: Componentes para el flujo de retorno de libros/ejemplares.
  - `/donaciones`: Formularios y tablas para capturar información de donaciones.
  - `/inicio`: Dashboard principal u hogar tras el inicio de sesión.
  - `/libros`: Catálogo interactivo de libros.
  - `/login`: Vista de autenticación del sistema.
  - `/prestamos`: Gestión de asignación y tracking de ejemplares prestados.
  - `/reportes`: Panel analítico de métricas en tiempo real.
  - `/soporte`: Información técnica y stack del proyecto.
  - `/usuarios`: Flujos alrededor de cada lector (actividad, alta y edición de perfil).

- `services/`: Encapsula toda la comunicación asíncrona (Peticiones HTTP) mediante la API REST (Backend Spring Boot). Ejemplo: `auth.service.ts`, `libro.service.ts`, etc.

- `models/`: Contiene `models.ts`, donde habitan las interfaces tipadas (DTOs) que aseguran la consistencia de los objetos transitados (Ej: Entidad `Usuario`, `Libro`, `Prestamo`).

- `guards/`: Emplea mecanismos de protección (ej. `auth.guard.ts`) para denegar el paso a componentes privados si el usuario no cuenta con un token de sesión válido.

- Archivos Raíz:
  - `app.routes.ts`: Archivo base que define el árbol de navegación del frontend.
  - `app.html` & `app.ts`: Componente principal raíz que estructura elementos fijos (Como la barra superior o el Menú *Dock* inferior).
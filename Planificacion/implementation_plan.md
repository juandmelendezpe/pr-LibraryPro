# Plan de Implementación: Gestión de Préstamos y Donaciones de Libros

Este plan detalla la estructura inicial y los pasos para construir una aplicación web completa con un backend en **Spring Boot** y un frontend en **Angular**.

## Requisitos Analizados
- **Funcionalidad**: Gestión de préstamos, donaciones, buscador de libros y gestión de usuarios/responsables.
- **Backend**: Java con Spring Boot, arquitectura por capas.
- **Frontend**: Angular CLI, estructura de componentes y servicios.
- **Base de Datos**: Relacional (para Diagrama ER).

## Cambios Propuestos

### Backend (Spring Boot)
Se creará un proyecto base con la siguiente estructura de paquetes:
- `com.proyecto.final.model`: Entidades JPA (Libro, Usuario, Prestamo, Donacion).
- `com.proyecto.final.repository`: Interfaces para el acceso a datos.
- `com.proyecto.final.service`: Lógica de negocio.
- `com.proyecto.final.controller`: Endpoints REST.
- `com.proyecto.final.config`: Configuración de seguridad (CORS, JWT si aplica) y conexión a DB.

#### [NEW] [README_BACK.md]
Documentación de la API y pasos de ejecución.

---

### Frontend (Angular)
Se inicializará un proyecto Angular con los siguientes módulos/componentes:
- **Core**: Servicios para llamadas a la API y guardias de ruta.
- **Components**:
    - `Login`: Pantalla de acceso.
    - `Home`: Panel principal.
    - `Sidebar`: Navegación con acceso a Préstamos/Donaciones.
    - `Libros`: 
        - `list-all`: Buscador por nombre, autor y género.
        - `gestionar`: Edición de detalles (título, autor).
    - `Prestamos/Donaciones`: Formularios con botón para **crear perfil de usuario** si es nuevo.
    - `Reportes`: Listado y estadísticas de préstamos y donaciones.
    - `GestionarResponsable`: Panel para SuperAdmin para listar usuarios activos, actualizarlos o cambiar su rol a SuperAdmin o Inactivo.

#### [NEW] [README_FRONT.md]
Guía de instalación y estructura de componentes.

---

## Plan de Verificación

### Pruebas Automatizadas
- Ejecución de `mvn test` para validar la lógica del backend.
- Ejecución de `ng test` para componentes de Angular.

### Verificación Manual
- Acceso al panel principal tras el login simulado.
- Pruebas de navegación mediante el Sidebar.
- Validación de los formularios de préstamos y donaciones.
### Nota importante
--- a tener en cuenta que todas las interaciones sean en español, tanto en el backend como en el frontend, y que la base de datos sea en español
---- a tener en cuenta que el proyecto debe ser escalable y modular, para que se puedan agregar nuevas funcionalidades en el futuro


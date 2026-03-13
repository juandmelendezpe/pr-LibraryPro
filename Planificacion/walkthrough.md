# Walkthrough: Estructura Inicial del Proyecto

He inicializado la base de tu proyecto final de gestión bibliotecaria. Aquí tienes un resumen de lo que se ha creado:

## Organización de Carpetas

### [Backend (Spring Boot)
Se ha preparado la estructura de paquetes recomendada para un proyecto Java moderno:
- `src/main/java/com/proyecto/final/`:
    - `controller/`: Endpoints REST.
    - `service/`: Lógica de negocio.
    - `repository/`: Acceso a base de datos.
    - `model/`: Entidades (Usuario, Libro, Prestamo, Donacion).
    - `config/`: Configuración de CORS y Seguridad.

### [Frontend (Angular)
Estructura modular lista para componentes:
- `src/app/`:
    - `components/`: Pantallas principales (Login, Home, Libros, etc.)
    - `services/`: Comunicación con la API.
    - `models/`: Interfaces de datos para el frontend.

## Siguientes Pasos
1.  **Backend**: Configurar `application.properties` con tu base de datos local.
2.  **Frontend**: Instalar dependencias con `npm install` una vez inicialices el proyecto Angular CLI.

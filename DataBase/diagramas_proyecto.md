# Documentación Técnica: Diagramas del Proyecto

Este documento contiene los diagramas estructurales para la aplicación de gestión de préstamos y donaciones de libros.

## Diagrama Entidad-Relación (ER)
Este diagrama representa la estructura de la base de datos y cómo se relacionan las entidades principales.

```mermaid
erDiagram
    USUARIO ||--o{ PRESTAMO : realiza
    USUARIO ||--o{ DONACION : realiza
    LIBRO ||--o{ PRESTAMO : involucra
    LIBRO ||--o{ DONACION : involucra
    USUARIO {
        int id PK
        string nombre
        string email
        string password
        string telefono
        string direccion
        string rol "Lector, Responsable, Admin, SuperAdmin"
        boolean activo
    }
    LIBRO {
        int id PK
        string titulo
        string autor
        string genero
        string estado "Disponible, Prestado, Donado"
    }
    PRESTAMO {
        int id PK
        date fecha_inicio
        date fecha_devolucion
        string estado "Activo, Devuelto"
        int usuario_id FK
        int libro_id FK
    }
    DONACION {
        int id PK
        date fecha
        string observaciones
        int usuario_id FK
        int libro_id FK
    }
```

---

## Diagrama de Clases
Este diagrama representa la estructura de clases en el backend (Spring Boot), siguiendo la arquitectura por capas.

```mermaid
classDiagram
    class Usuario {
        +Long id
        +String nombre
        +String email
        +String telefono
        +String direccion
        +String rol
        +List~Prestamo~ prestamos
        +List~Donacion~ donaciones
    }
    class Libro {
        +Long id
        +String titulo
        +String autor
        +String genero
        +String estado
    }
    class Prestamo {
        +Long id
        +Date fechaInicio
        +Date fechaDevolucion
        +Usuario prestatario
        +Libro libro
    }
    class Donacion {
        +Long id
        +Date fecha
        +Usuario donante
        +Libro libro
    }

    Usuario "1" *-- "0..*" Prestamo
    Usuario "1" *-- "0..*" Donacion
    Libro "1" -- "0..*" Prestamo
    Libro "1" -- "0..*" Donacion
```

---

## Estructura de Capas (Spring Boot)
```mermaid
graph TD
    Controller --> Service
    Service --> Repository
    Repository --> Entity
```

# Documentación Técnica: Diagramas del Proyecto

Este documento contiene los diagramas estructurales para la aplicación de gestión de préstamos y donaciones de libros.

## Diagrama Entidad-Relación (ER)
Este diagrama representa la estructura de la base de datos y cómo se relacionan las entidades principales.

```mermaid
erDiagram
    USUARIO ||--o{ PRESTAMO : realiza
    USUARIO ||--o{ DONACION : realiza
    LIBRO ||--o{ EJEMPLAR : tiene
    EJEMPLAR ||--o{ PRESTAMO : involucra
    EJEMPLAR ||--o{ DONACION : involucra
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
        string isbn "Unique"
        string titulo
        string autor
        string genero
    }
    EJEMPLAR {
        int id PK
        int libro_id FK
        date fec_ingreso
        string detalle "Nuevo, Usado, etc."
        string estado "Disponible, Prestado, Donado"
    }
    PRESTAMO {
        int id PK
        date fecha_inicio
        date fecha_devolucion
        string estado "Activo, Devuelto"
        int usuario_id FK
        int ejemplar_id FK
    }
    DONACION {
        int id PK
        date fecha
        string observaciones
        int usuario_id FK
        int ejemplar_id FK
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
        +String isbn
        +String titulo
        +String autor
        +String genero
        +List~Ejemplar~ ejemplares
    }
    class Ejemplar {
        +Long id
        +Libro libro
        +Date fecIngreso
        +String detalle
        +String estado
        +List~Prestamo~ prestamos
        +List~Donacion~ donaciones
    }
    class Prestamo {
        +Long id
        +Date fechaInicio
        +Date fechaDevolucion
        +Usuario prestatario
        +Ejemplar ejemplar
    }
    class Donacion {
        +Long id
        +Date fecha
        +Usuario donante
        +Ejemplar ejemplar
    }

    Usuario "1" *-- "0..*" Prestamo
    Usuario "1" *-- "0..*" Donacion
    Libro "1" *-- "0..*" Ejemplar
    Ejemplar "1" -- "0..*" Prestamo
    Ejemplar "1" -- "0..*" Donacion
```

---

## Estructura de Capas (Spring Boot)
```mermaid
graph TD
    Controller --> Service
    Service --> Repository
    Repository --> Entity
```

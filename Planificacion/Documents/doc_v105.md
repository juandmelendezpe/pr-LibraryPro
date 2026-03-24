# Documentación de Cambios - Versión 1.0.5

**Objetivo Principal:** Refactorización de la base de datos y del código (Backend y Frontend) para separar conceptualmente la entidad `Libro` de sus correspondientes copias físicas (`Ejemplar`).

## 1. Base de Datos (PostgreSQL)
Se modificaron los scripts principales en la carpeta `DataBase/`:

*   **`schema.sql`:**
    *   **Tabla `libro`:** Se eliminó la columna `estado_id` y se agregó la columna `isbn` (única). Ahora representa la "Obra Literaria" abstracta.
    *   **Tabla `ejemplar`:** Se creó esta nueva tabla para representar las copias físicas. Contiene `id` (Inventario), `libro_id` (Clave foránea), `fec_ingreso`, `detalle` (Nuevo/Usado) y `estado_id`.
    *   **Tablas `prestamo` y `donacion`:** Se actualizó la clave foránea `libro_id` cambiándola a `ejemplar_id`, ya que los préstamos y donaciones se hacen sobre copias físicas específicas.
    *   **Estados (`estado_libro`):** Se eliminó el estado "Donado" (pues esto se maneja en la tabla de donaciones) y se agregaron los estados "Extraviado" y "Baja / Dañado".

*   **`libraryPro_DB.sql`:**
    *   Se actualizaron todas las sentencias `INSERT` para poblar correctamente las entidades separadas: 50 usuarios, 100 libros genéricos y 100 ejemplares.
    *   Se corrigió el error de "referencia ambigua" en los sub-queries de `donacion` y `prestamo` (indicando explícitamente `ejemplar.id`).
    *   Se agregó un script automático (`DO $$`) al final del archivo para insertar 4 copias ("El Principito"), 2 nuevas y 2 usadas, vinculadas directamente a donaciones del usuario "Super Admin".

*   **`diagramas_proyecto.md`:** Los diagramas Mermaid (Entidad-Relación y Diagrama de Clases) fueron actualizados y ahora muestran la nueva entidad `Ejemplar` y sus relaciones.

## 2. Backend (Spring Boot - `AppBack`)
Se alinearon las entidades ORM con la nueva estructura de la base de datos:

*   **Nuevas Clases:** Se crearon `Ejemplar.java` (Entidad), `EjemplarRepository.java` (Repositorio), `EjemplarService.java` (Servicio) y `EjemplarController.java` (Controlador) exponiendo los nuevos endpoints HTTP bajo `/api/ejemplares`.
*   **Modificaciones en Entidades:**
    *   `Libro.java`: Se removió la relación `@ManyToOne` con `Estado` y se agregó la propiedad `String isbn`.
    *   `Prestamo.java` y `Donacion.java`: Se cambió su propiedad de tipo `Libro` a `Ejemplar`, actualizando su `@JoinColumn(name = "ejemplar_id")`.

## 3. Frontend (Angular - `AppFrond`)
Se actualizaron los componentes y modelos para consumir la nueva estructura y evitar quiebres en la UI:

*   **Modelos TypeScript (`models.ts`):** 
    *   Se creó la interfaz `Ejemplar`.
    *   Se modificaron `Libro`, `Prestamo` y `Donacion` para reflejar el cambio de relación hacia `ejemplar`.
*   **Servicios:** Se creó `ejemplar.service.ts` para conectarse a `/api/ejemplares`.
*   **Componentes Modificados:**
    *   **`libro-list`:** Se adaptó internamente para hacer una petición al `EjemplarService` y en la tabla (HTML) listar objetos de tipo `Ejemplar`. Esta solución permitió mantener visible la columna de "Estado del Libro" (disponible, prestado) sin tener que rediseñar el concepto de búsqueda principal. La búsqueda y filtrado ahora operan en memoria validando la información anidada del componente.
    *   **`prestamo-form`:** Actualizado para cargar y guardar sobre arrays de `Ejemplares` con estado "Disponible" (obviando la antigua lógica del `LibroService`). El selector HTML ahora muestra el número de inventario además del título.
    *   **`donacion-form`:** Ajustes en los tipos de datos recibidos y actualización del HTML. Se agregó un `<select>` para establecer el `detalle` de condición del ejemplar (Nuevo o Usado).

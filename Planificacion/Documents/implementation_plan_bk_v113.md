# Plan de Implementación Backend: Devoluciones

Revisando el backend estructural en Java (Spring Boot) y las bases SQL de tu proyecto, efectivamente es forzoso crear la tabla transaccional y la arquitectura subyacente para soportar las Devoluciones que acabamos de programar en Angular.

## 1. Actualización de la BD (`schema.sql` / `libraryPro_DB.sql`)
Agregaremos una nueva tabla llamada `devolucion`. Esta tabla debe guardar la referencia al préstamo original y al usuario gestor que interviene.

```sql
CREATE TABLE devolucion (
    id SERIAL PRIMARY KEY,
    prestamo_id INT REFERENCES prestamo(id) ON DELETE CASCADE,
    fecha_devolucion DATE NOT NULL DEFAULT CURRENT_DATE,
    gestor_id INT REFERENCES usuario(id),
    descripcion TEXT
);
```

## 2. Nueva Entidad JPA: `Devolucion.java`
Dentro de `src/main/java/com/ssdk/libraryPro/model/` crearemos la clase `Devolucion` mapeada a la nueva tabla:
- `@ManyToOne` con `Prestamo`
- `@ManyToOne` con `Usuario` (referenciando a `gestor_id`)

## 3. Repositorio: `DevolucionRepository`
En la capa `repository/`, crearemos una interfaz vacía que herede de `JpaRepository<Devolucion, Long>`. Con esto Spring Boot nos regala los métodos de guardar, buscar, listar y eliminar devoluciones automáticamente.

## 4. Servicio Lógico: `DevolucionService`
En `service/`, este servicio contendrá el método de inserción (`guardar`) que hará algo valioso en cadena:
1. Guardar la nueva entidad `Devolucion`.
2. Actualizar el estado del `Prestamo` correspondiente marcándolo como "Devuelto/Inactivo" (el campo `estado_id` de la tabla de préstamos pasaría a ser ID 2).
3. Actualizar el estado del `Ejemplar` marcándolo nuevamente como "Disponible" (estado ID 1).

## 5. Controlador REST: `DevolucionController`
En `controller/`, crearemos los endpoints HTTP que el frontend `DevolucionService.ts` está buscando:
- `GET /api/devoluciones`
- `POST /api/devoluciones`

### User Review Required
> [!IMPORTANT]
> - ¿Qué te parece este esquema de base de datos (`CREATE TABLE devolucion`) y las operaciones automáticas para actualizar el `Prestamo` e `Ejemplar`?
> - Asegúrate de que, si apruebas esto, yo modifique tus scripts `.sql` localmente y te genere las clases Java de backend con la lógica transaccional.

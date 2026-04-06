# Plan de Implementación: Módulo de Devoluciones y Actividad de Usuario

Este plan cubre la creación de un flujo intuitivo que conecta la lista de responsables con un panel de actividad general para cada usuario, y desde allí manejar los procesos vinculados (como las devoluciones).

## 1. Modificación de la UI Base (`gestionar-responsable`)
- **Acción Click**: En `gestionar-responsable.html`, convertiremos el *Pill* de la columna "Rol de Acceso" correspondiente a los **Lectores** en un elemento clickeable.
- **Ruteo**: Al hacer click, redirigirá al nuevo componente de la ruta `/usuarios/actividad/:id`.

## 2. Nuevo Componente: `usuario-activity`
Crearemos este componente dentro de `src/app/components/usuarios/usuario-activity/`:
- **Propósito**: Actuar como el "Dashboard" personal de las operaciones de un lector.
- **Estructura UI**: Contendrá 3 tablas dedicadas (o vistas por pestañas) para:
  1. **Préstamos**
  2. **Devoluciones**
  3. **Donaciones**
- **Tabla de Préstamos**: Mostrará los atributos clave:
  - Título del libro (`prestamo.ejemplar.libro.titulo`).
  - Estado del préstamo (`prestamo.estado.descripcion`).
  - **Botón Dinámico (`gestionarDev`)**: Si el préstamo sigue activo (Aún no ha sido devuelto), este botón estará visible. Al pulsarlo, nos enviará al formulario de devolución usando ese préstamo particular e inyectando su ID en la URL (`/devoluciones/nuevo/:prestamoId`).

## 3. Modelo Frontend (`Devolucion`)
Actualizaremos el archivo de modelos (`models.ts`) para tipificar fuertemente el nuevo objeto de devoluciones que espera el backend:

```typescript
export interface Devolucion {
    id?: number;
    prestamo: Prestamo;      // Contiene todo el historial del prestatario y ejemplar
    fechaDevolucion: string; // Fecha de retorno
    gestorReceptor: Usuario; // Gestor/Admin que atiende la devolución (solo lectura)
    descripcion?: string;    // Observaciones o condición en la que se entregó
}
```

## 4. Nuevo Servicio: `DevolucionService`
Conectará el modelo del frontend con tu backend. El flujo enviará por POST al endpoint que especifiquemos (por ej: `/api/devoluciones`), gestionando la inserción de datos. Adicionalmente de este servicio, necesitaremos funciones backend para traer los listados de préstamos/donaciones limitados por el ID de un Lector (o filtrarlos en el Frontend desde los listados totales).

## 5. Componente Formulario de Devolución (`devolucion-form`)
Crearemos el propio formulario en `src/app/components/devoluciones/devolucion-form/`:
- **UI Glassmorphism**: Acorde con el diseño visual del resto del sitio.
- **Flujo Parametrizado**:
  - Al abrirse, ya **tendrá capturado** el `prestamoId` desde la URL (enviado por el botón `gestionarDev`).
  - Bloqueará y mostrará de solo lectura la información pre-existente: Libro, Lector Inicial, y "Gestor Receptor" (tomando el usuario actual del sistema de Login).
  - Dejará los inputs únicos de este formulario editables: "Fecha de Devolución" (valor de hoy por defecto) y "Descripción de Devolución".

## 6. Actualizaciones de Backend necesarias (Contexto)
Para soportar al 100% esta interfaz vas a necesitar en Spring Boot:
- Nuevo `@RestController` para `/api/devoluciones`.
- Lógica en el backend en que, al crear la `Devolucion`, actualices el ID de estado del préstamo a "Finalizado/Cerrado" y cambies el estado del `Ejemplar` para que vuelva a estar "Disponible".

### User Review Required
> [!IMPORTANT]
> El plan ha sido actualizado siguiendo tu excelente propuesta del Dashboard de Actividad como paso previo. 
> ¿Te parece que aborda al 100% el comportamiento que imaginas? Si es así, confírmalo y comenzaré a crear los componentes base (el Dashboard de actividad y el Formulario de devoluciones).



# Cambios Versión 1.1.2 - Reestructuración de Gestión de Usuarios

## Resumen de la Actualización
Esta actualización se centró en mejorar la arquitectura y la experiencia de usuario en la pantalla de "Gestionar Responsables". Se dividió la carga de trabajo de un único modal (`user-editar`) a múltiples componentes, permitiendo delegar responsabilidades únicas a los Lectores y los Gestores, aumentando la seguridad y limpiando el código y las interfaces.

## 1. Separación de Modales (Componentes)
- **Gestores y Administradores (`gestor-editar`)**:
  - Se creó un nuevo componente ubicado en `src/app/components/admin/gestor-editar/`.
  - Este modal interactúa exclusivamente con roles administrativos (Gestor, Admin).
  - La contraseña es obligatoria al momento de crear e incluye toda la gestión de estado activo e inactivo para usuarios críticos.
- **Lectores (`user-editar`)**:
  - Se movió el componente anterior `user-editar` de la carpeta `admin/` a la ruta `src/app/components/usuarios/user-editar/`.
  - El formulario se purificó, eliminando dependencias y campos innecesarios como la asignación de roles o el blanqueo de contraseñas. Funciona exclusiva y aisladamente para la **edición** de usuarios de tipo Lector.

## 2. Archivo Principal: `gestionar-responsable`
- **Separación Lógica en TypeScript**:
  - Se incorporó la dependencia a la clase `Router` para interceptar botones.
  - La función de crear cuenta con lógica de control:
    - Cuando se está posicionado en la pestaña *"Lectores"*, el sistema reacciona redirigiendo al usuario a la vista dedicada para añadir lector (`/usuarios/nuevo`) en lugar de usar un modal intrusivo.
    - Cuando la pestaña es *"Gestores"*, se invoca al nuevo modal `gestor-editar` forzando las medidas de seguridad correspondientes y su ruta nativa.
- **Lógica de Edición en TypeScript**:
  - La función `abrirModalEditar(usuario)` hace un chequeo del *Role* e invoca al modal `<app-user-editar>` si es lector, y al modal `<app-gestor-editar>` si es un usuario administrador.

## 3. Beneficios de esta arquitectura
* **Mantenibilidad Funcional**: Es más orgánico modificar características especiales de los lectores (como por ejemplo su límite de libros o deudas) y visualizarlas, sin chocar con campos requeridos por administradores.
* **Seguridad Visual**: Ya no es posible modificar por error la jerarquía o nivel de un rol administrativo desde un lector u ocultar inputs dinámicos en una misma interfaz, eliminando condicionales.
* **Navegabilidad**: Refuerza la identidad y el recorrido del Lector utilizando las bases y los componentes (como `usuario-nuevo`) que ya estaban integrados impecablemente en el flujo de "Préstamos" y "Donaciones".

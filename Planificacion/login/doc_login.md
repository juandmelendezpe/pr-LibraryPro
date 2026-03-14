# Documentación del Nuevo Login y Autenticación Basada en Roles

## Visión General
Se ha implementado una nueva pantalla de login basada en el diseño *glassmórfico* con una capa de seguridad para autenticación básica y control de acceso basado en roles (RBAC) para la plataforma **LibraryPro**.

---

## 1. Diseño de Interfaz (UI)
El componente de Login (`LoginComponent`) ha sido rediseñado utilizando **Tailwind CSS**.

*   **Página Completa sin Márgenes:** El contenedor principal ocupa el ancho y alto completo (`w-full min-h-screen`) y las clases conflictivas en la plantilla raíz (`app.html`) han sido condicionadas para no aplicarse a la ruta de `/login`.
*   **Imagen de Fondo:** Se utiliza la imagen predeterminada proporcionada en las guías técnicas (`background-image`).
*   **Tarjeta Glassmórfica:** Se integró un contenedor con `backdrop-blur-xl`, `bg-white/10` oscurecida bajo el tema oscuro y transparencias.
*   **Manejo de Estados de UI:**
    *   **Cargando (Loading):** Al presionar el botón "Entrar", este se bloquea (`[disabled]="loading"`) y muestra un ícono de estado de carga mediante Material Symbols.
    *   **Mensajes de Error:** Si la solicitud de validación falla, se renderiza condicionalmente un contenedor rojo usando `*ngIf="errorMessage"` con el detalle proporcionado por el servicio de Auth.

![Visualización del Nuevo Login](C:\Users\juand\.gemini\antigravity\brain\78532b82-b6e3-48eb-8a78-281f9abce50b\login_focused_inputs_1773504725403.png)

---

## 2. Autenticación y Control de Acceso (AuthService)

Dado que no existe actualmente un endpoint transaccional de *Login* en el backend, la autenticación fue delegada a un servicio interno en el Frontend (`AuthService`).

### Funcionamiento (`auth.service.ts`)
1.  **Captura de Credenciales:** El usuario ingresa un `email` y `password` desde el UI y lo envía vía `(ngSubmit)` de Angular.
2.  **Validación de Sesión:** `auth.service` consume un endpoint auxiliar (`usuario.service.ts`) para obtener la lista de usuarios. El servicio busca una coincidencia exacta de correo y contraseña usando el método `find()`. Si la credencial no existe, la promesa de observable devuelve un error `success: false`.
3.  **Autorización de Rol:** Si el usuario es encontrado, se inspecciona la entidad del `Rol` del usuario (`user.rol.titulo`). Una lista estática validará si el valor (`toLowerCase()`) está dentro de los permitidos: `['superadmin', 'admin', 'responsable']`. Si no lo es, se genera un rechazo por Falta de Permisos.
4.  **Estado:** Si ambas validaciones pasan, el usuario se agrega al `Signal` de la clase `currentUserSignal` y persitimos el objeto temporalmente en el `localStorage` mediante la clave `loggedUser` para evitar el re-login en caso de hacer (F5) Reload al navegador.

---

## 3. Protección de Rutas (AuthGuard)

Para que el modelo de seguridad tenga efecto impidiendo saltarse el login tipeando directamente en la URL, se creó el **Guardia de Autenticación**.

### Funcionamiento (`auth.guard.ts`)
El componente inyectable (`CanActivateFn`) actúa como middleware entre la solicitud de la ruta y la renderización en pantalla:
1.  Verifica el estado del usuario llamando al comprobador `authService.isAuthorised()`.
2.  Si la llamada devuelve `true`, `CanActivateFn` también retorna `true` permitiendo continuar el ruteo hacia el destino.
3.  De lo contrario, aborta la petición (retornando `false`) y redirige automáticamente al `'/login'`.

### Rutas Protegidas en `app.routes.ts`
El `canActivate: [authGuard]` fue agregado a todas las páginas navegables, dejando expuesta al público únicamente la portada del login.

```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: InicioComponent, canActivate: [authGuard] },
  { path: 'libros', component: LibroListComponent, canActivate: [authGuard] },
  // ...
];
```

---

## 4. Cierre de Sesión

El componente global de la app (`app.ts`) ahora inyecta el `AuthService`. Al hacer clic en el botón "Salir" del menú lateral, se dispara el método `logout()`.

**Flujo en Logout:**
1.  Borrar los registros de la variable `currentUserSignal` devolviendo el usuario a null.
2.  Destruir la persistencia de sesión llamando a `localStorage.removeItem('loggedUser')`.
3.  Evacuar y despachar la navegación hacia `/login`.

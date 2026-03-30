import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio';
import { LoginComponent } from './components/login/login';
import { LibroListComponent } from './components/libros/libro-list/libro-list';
import { PrestamoFormComponent } from './components/prestamos/prestamo-form/prestamo-form';
import { DonacionFormComponent } from './components/donaciones/donacion-form/donacion-form';
import { GestionarResponsableComponent } from './components/admin/gestionar-responsable/gestionar-responsable';
import { LibroNuevoComponent } from './components/libros/libro-nuevo/libro-nuevo';
import { UsuarioNuevoComponent } from './components/usuarios/usuario-nuevo/usuario-nuevo';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: InicioComponent, canActivate: [authGuard] },
  { path: 'libros', component: LibroListComponent, canActivate: [authGuard] },
  { path: 'libros/nuevo', component: LibroNuevoComponent, canActivate: [authGuard] },
  { path: 'prestamos', component: PrestamoFormComponent, canActivate: [authGuard] },
  { path: 'donaciones', component: DonacionFormComponent, canActivate: [authGuard] },
  { path: 'gestion-responsables', component: GestionarResponsableComponent, canActivate: [authGuard] },
  { path: 'usuarios/nuevo', component: UsuarioNuevoComponent, canActivate: [authGuard] }
];

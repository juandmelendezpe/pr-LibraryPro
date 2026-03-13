import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio';
import { LoginComponent } from './components/login/login';
import { LibroListComponent } from './components/libros/libro-list/libro-list';
import { PrestamoFormComponent } from './components/prestamos/prestamo-form/prestamo-form';
import { DonacionFormComponent } from './components/donaciones/donacion-form/donacion-form';
import { GestionarResponsableComponent } from './components/admin/gestionar-responsable/gestionar-responsable';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: InicioComponent },
  { path: 'libros', component: LibroListComponent },
  { path: 'prestamos', component: PrestamoFormComponent },
  { path: 'donaciones', component: DonacionFormComponent },
  { path: 'gestion-responsables', component: GestionarResponsableComponent },
];

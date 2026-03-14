import { Injectable, signal } from '@angular/core';
import { Usuario } from '../models/models';
import { UsuarioService } from './usuario.service';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal para mantener el estado reactivo del usuario logueado en la aplicación si se requiere.
  currentUserSignal = signal<Usuario | null>(null);

  // Roles permitidos para poder hacer login
  private allowedRoles = ['superadmin', 'admin', 'responsable'];

  constructor(private usuarioService: UsuarioService) {
    // Si la app se recarga, revisamos si hay una sesión guardada temporalmente (simulado con localStorage)
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      this.currentUserSignal.set(JSON.parse(storedUser));
    }
  }

  /**
   * Intenta loguear un usuario basándose en el endpoint de "listar todos los usuarios"
   * (Debido a que actualmente no hay endpoint de login en API).
   * Valida credenciales y rol permitido.
   */
  login(email: string, password: string): Observable<{ success: boolean; message: string; user?: Usuario }> {
    return this.usuarioService.listarTodos().pipe(
      map(usuarios => {
        // Buscar el usuario por credenciales
        const user = usuarios.find(u => u.email === email && u.contrasena === password);
        
        if (!user) {
          return { success: false, message: 'Credenciales inválidas.' };
        }

        // Revisar si el rol del usuario está dentro de la lista de roles permitidos
        const userRoleTitulo = user.rol.titulo.toLowerCase();
        if (!this.allowedRoles.includes(userRoleTitulo)) {
           return { success: false, message: `El rol (${user.rol.titulo}) no tiene permisos para acceder al sistema.` };
        }

        // Login exitoso
        this.setLoggedUser(user);
        return { success: true, message: 'Login exitoso', user };
      })
    );
  }

  logout() {
    this.currentUserSignal.set(null);
    localStorage.removeItem('loggedUser');
  }

  private setLoggedUser(user: Usuario) {
    this.currentUserSignal.set(user);
    // Para simplificar persistencia entre refrescos:
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  isAuthorised(): boolean {
    const user = this.currentUserSignal();
    if (!user) {
      return false;
    }
    const userRoleTitulo = user.rol.titulo.toLowerCase();
    return this.allowedRoles.includes(userRoleTitulo);
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSignal();
  }
}

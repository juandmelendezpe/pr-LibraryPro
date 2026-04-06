import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario, Rol } from '../../../models/models';
import { UserEditarComponent } from '../../usuarios/user-editar/user-editar';
import { GestorEditarComponent } from '../gestor-editar/gestor-editar';

@Component({
  selector: 'app-gestionar-responsable',
  standalone: true,
  imports: [CommonModule, FormsModule, UserEditarComponent, GestorEditarComponent],
  templateUrl: './gestionar-responsable.html',
})
export class GestionarResponsableComponent implements OnInit {
  usuarios: Usuario[] = [];
  
  // Tabs state
  activeTab: 'lectores' | 'gestores' = 'lectores';
  
  // Search state
  terminoBusquedaLectores: string = '';
  terminoBusquedaGestores: string = '';

  // Modal State
  isModalLectorOpen: boolean = false;
  isModalGestorOpen: boolean = false;
  modalLectorData: { user: Usuario | null } | null = null;
  modalGestorData: { user: Usuario | null } | null = null;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.listarTodos().subscribe(data => {
      this.usuarios = data;
    });
  }

  // Computed properties for UI
  get lectores(): Usuario[] {
    let filtrados = this.usuarios.filter(u => u.rol?.titulo === 'Lector');
    
    // Ordenar de más reciente a más antiguo (asumiendo id autoincremental)
    filtrados.sort((a, b) => {
      const idA = a.id ? Number(a.id) : 0;
      const idB = b.id ? Number(b.id) : 0;
      return idB - idA;
    });

    if (this.terminoBusquedaLectores.trim()) {
      const termino = this.terminoBusquedaLectores.toLowerCase();
      filtrados = filtrados.filter(u => 
        u.nombre.toLowerCase().includes(termino) || 
        u.email.toLowerCase().includes(termino)
      );
    }
    
    // Mostrar solo los 4 últimos
    return filtrados.slice(0, 4);
  }

  get gestores(): Usuario[] {
    let filtrados = this.usuarios.filter(u => ['Gestor', 'Admin', 'SuperAdmin'].includes(u.rol?.titulo));
    
    // Sort gestores as well for consistency
    filtrados.sort((a, b) => {
      const idA = a.id ? Number(a.id) : 0;
      const idB = b.id ? Number(b.id) : 0;
      return idB - idA;
    });

    if (this.terminoBusquedaGestores.trim()) {
      const termino = this.terminoBusquedaGestores.toLowerCase();
      filtrados = filtrados.filter(u => 
        u.nombre.toLowerCase().includes(termino) || 
        u.email.toLowerCase().includes(termino)
      );
    }
    return filtrados;
  }

  cambiarPestana(pestana: 'lectores' | 'gestores') {
    this.activeTab = pestana;
  }

  cancelarBusqueda(tipo: 'lectores' | 'gestores') {
    if (tipo === 'lectores') {
      this.terminoBusquedaLectores = '';
    } else {
      this.terminoBusquedaGestores = '';
    }
  }

  // Edit / Create Logic
  abrirModalCrear() {
    if (this.activeTab === 'lectores') {
      this.router.navigate(['/usuarios/nuevo']);
    } else {
      this.modalGestorData = { user: null };
      this.isModalGestorOpen = true;
    }
  }

  abrirModalEditar(usuario: Usuario) {
    if (usuario.rol?.titulo === 'Lector') {
      this.modalLectorData = { user: usuario };
      this.isModalLectorOpen = true;
    } else {
      this.modalGestorData = { user: usuario };
      this.isModalGestorOpen = true;
    }
  }

  cerrarModal() {
    this.isModalLectorOpen = false;
    this.isModalGestorOpen = false;
    this.modalLectorData = null;
    this.modalGestorData = null;
  }

  guardarUsuario(usuarioGuardado: Usuario) {
    this.usuarioService.guardar(usuarioGuardado).subscribe(() => {
      this.cargarUsuarios(); // Recargar la lista
      this.cerrarModal();
    });
  }

  cambiarEstado(usuario: Usuario) {
    usuario.activo = !usuario.activo;
    this.usuarioService.guardar(usuario).subscribe();
  }

  promoverASuperAdmin(usuario: Usuario) {
    usuario.rol = { id: 4, titulo: 'SuperAdmin' };
    this.usuarioService.guardar(usuario).subscribe();
  }
}

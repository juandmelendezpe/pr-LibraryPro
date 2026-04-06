import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario, Rol } from '../../../models/models';
import { UserEditarComponent } from '../user-editar/user-editar';

@Component({
  selector: 'app-gestionar-responsable',
  standalone: true,
  imports: [CommonModule, FormsModule, UserEditarComponent],
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
  isModalOpen: boolean = false;
  modalData: { user: Usuario | null, defaultRole: 'Lector' | 'Gestor' } | null = null;

  constructor(private usuarioService: UsuarioService) { }

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
    this.modalData = { user: null, defaultRole: this.activeTab === 'lectores' ? 'Lector' : 'Gestor' };
    this.isModalOpen = true;
  }

  abrirModalEditar(usuario: Usuario) {
    this.modalData = { user: usuario, defaultRole: this.activeTab === 'lectores' ? 'Lector' : 'Gestor' };
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.modalData = null;
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

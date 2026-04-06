import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../models/models';

@Component({
  selector: 'app-gestor-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestor-editar.html',
})
export class GestorEditarComponent {
  @Input() isOpen: boolean = false;
  @Input() 
  set gestorData(val: { user: Usuario | null } | null) {
    if (val && val.user) {
      // Editar existente
      this.editableUser = { ...val.user };
      this.isNew = false;
    } else {
      // Crear nuevo Gestor por defecto
      this.isNew = true;
      this.editableUser = {
        nombre: '',
        email: '',
        contrasena: '',
        telefono: '',
        direccion: '',
        rol: { id: 2, titulo: 'Gestor' },
        activo: true
      };
    }
  }

  @Output() save = new EventEmitter<Usuario>();
  @Output() cancel = new EventEmitter<void>();

  editableUser: Usuario = this.obtenerGestorVacio();
  isNew: boolean = false;

  obtenerGestorVacio(): Usuario {
    return {
      nombre: '',
      email: '',
      contrasena: '',
      telefono: '',
      direccion: '',
      rol: { id: 2, titulo: 'Gestor' },
      activo: true
    };
  }

  // Solo permite cambiar entre Gestor o Admin
  onRoleChange(event: any) {
    const rolTitulo = event.target.value;
    let rolId = 2; // Gestor
    if (rolTitulo === 'Admin') rolId = 3;
    if (rolTitulo === 'SuperAdmin') rolId = 4;
    this.editableUser.rol = { id: rolId, titulo: rolTitulo };
  }

  guardar() {
    this.save.emit(this.editableUser);
  }

  cerrar() {
    this.cancel.emit();
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../models/models';

@Component({
  selector: 'app-user-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-editar.html',
})
export class UserEditarComponent {
  @Input() isOpen: boolean = false;
  @Input() 
  set usuarioData(val: { user: Usuario | null } | null) {
    if (val && val.user) {
      // Editar existente
      this.editableUser = { ...val.user };
    } else {
      // Default to void
      this.editableUser = this.obtenerUsuarioVacio();
    }
  }

  @Output() save = new EventEmitter<Usuario>();
  @Output() cancel = new EventEmitter<void>();

  editableUser: Usuario = this.obtenerUsuarioVacio();

  obtenerUsuarioVacio(): Usuario {
    return {
      nombre: '',
      email: '',
      contrasena: '',
      telefono: '',
      direccion: '',
      rol: { id: 1, titulo: 'Lector' },
      activo: true
    };
  }

  // Eliminar onRoleChange, los lectores no cambian rol desde aquí
  guardar() {
    this.save.emit(this.editableUser);
  }

  cerrar() {
    this.cancel.emit();
  }
}

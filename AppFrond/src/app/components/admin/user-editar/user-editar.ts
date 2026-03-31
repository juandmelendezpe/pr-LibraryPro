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
  set usuarioData(val: { user: Usuario | null, defaultRole: 'Lector' | 'Gestor' } | null) {
    if (val && val.user) {
      // Editar existente
      this.editableUser = { ...val.user };
      this.isNew = false;
    } else {
      // Crear nuevo
      this.isNew = true;
      let initialRole = { id: 1, titulo: 'Lector' };
      if (val && val.defaultRole === 'Gestor') {
        initialRole = { id: 2, titulo: 'Admin' }; // Asumimos id 2 es Admin
      }
      this.editableUser = {
        nombre: '',
        email: '',
        contrasena: '',
        telefono: '',
        direccion: '',
        rol: initialRole,
        activo: true
      };
    }
  }

  @Output() save = new EventEmitter<Usuario>();
  @Output() cancel = new EventEmitter<void>();

  editableUser: Usuario = this.obtenerUsuarioVacio();
  isNew: boolean = false;

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

  // Permite seleccionar el rol (1=Lector, 2=Admin, 3=SuperAdmin - IDs asumidos)
  onRoleChange(event: any) {
    const rolTitulo = event.target.value;
    let rolId = 1;
    if (rolTitulo === 'Admin') rolId = 2;
    if (rolTitulo === 'SuperAdmin') rolId = 3;
    this.editableUser.rol = { id: rolId, titulo: rolTitulo };
  }

  guardar() {
    this.save.emit(this.editableUser);
  }

  cerrar() {
    this.cancel.emit();
  }
}

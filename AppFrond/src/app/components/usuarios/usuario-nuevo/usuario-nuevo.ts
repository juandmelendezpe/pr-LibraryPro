import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/models';

@Component({
  selector: 'app-usuario-nuevo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-nuevo.html'
})
export class UsuarioNuevoComponent {
  // Inicializamos un modelo de usuario con todos los campos
  usuario: Usuario = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    contrasena: '',
    rol: { id: 3, titulo: 'Lector' },
    activo: true
  };

  guardando = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  guardarUsuario() {
    this.guardando = true;
    this.usuarioService.guardar(this.usuario).subscribe({
      next: (res) => {
        this.guardando = false;
        alert('Usuario creado, presione para volver a préstamos.');
        this.router.navigate(['/prestamos']);
      },
      error: (err) => {
        this.guardando = false;
        console.error('Error al guardar el usuario', err);
        alert('Hubo un error al intentar crear el usuario. Por favor, verifique la consola.');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/prestamos']);
  }
}

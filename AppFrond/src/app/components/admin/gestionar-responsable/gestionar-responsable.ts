import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario, Rol } from '../../../models/models';

@Component({
  selector: 'app-gestionar-responsable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestionar-responsable.html',
})
export class GestionarResponsableComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.listarTodos().subscribe(data => {
      // Filtrar por los que no son lectores (Lector id assumed 1, adjust as needed)
      this.usuarios = data;
    });
  }

  cambiarEstado(usuario: Usuario) {
    usuario.activo = !usuario.activo;
    this.usuarioService.guardar(usuario).subscribe();
  }

  promoverASuperAdmin(usuario: Usuario) {
    console.log('Promoviendo a SuperAdmin:', usuario.nombre);
  }
}

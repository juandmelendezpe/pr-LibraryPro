import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrestamoService } from '../../../services/prestamo.service';
import { UsuarioService } from '../../../services/usuario.service';
import { LibroService } from '../../../services/libro.service';
import { Libro } from '../../../models/models';

@Component({
  selector: 'app-prestamo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prestamo-form.html',
})
export class PrestamoFormComponent implements OnInit {
  prestamo: any = {
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaDevolucion: '',
    prestatario: { nombre: '', email: '', rol: { titulo: 'Lector' }, activo: true },
    libro: { id: undefined, titulo: '', autor: '', estado: { descripcion: '' } }
  };
  
  usuarioNuevo = false;
  librosDisponibles: Libro[] = [];

  constructor(
    private prestamoService: PrestamoService,
    private usuarioService: UsuarioService,
    private libroService: LibroService
  ) { }

  ngOnInit(): void {
    this.libroService.listarTodos().subscribe(data => {
      this.librosDisponibles = data.filter(l => l.estado.descripcion === 'Disponible');
    });
  }

  registrarPrestamo() {
    console.log('Registrando préstamo:', this.prestamo);
    // Lógica para guardar
  }

  toggleUsuarioNuevo() {
    this.usuarioNuevo = !this.usuarioNuevo;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrestamoService } from '../../../services/prestamo.service';
import { UsuarioService } from '../../../services/usuario.service';
import { EjemplarService } from '../../../services/ejemplar.service';
import { Ejemplar } from '../../../models/models';

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
    ejemplar: { id: undefined, libro: { titulo: '', autor: '' }, estado: { descripcion: '' } }
  };
  
  usuarioNuevo = false;
  ejemplaresDisponibles: Ejemplar[] = [];

  constructor(
    private prestamoService: PrestamoService,
    private usuarioService: UsuarioService,
    private ejemplarService: EjemplarService
  ) { }

  ngOnInit(): void {
    this.ejemplarService.listarTodos().subscribe(data => {
      this.ejemplaresDisponibles = data.filter(e => e.estado.descripcion === 'Disponible');
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

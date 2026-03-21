import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DonacionService } from '../../../services/donacion.service';
import { UsuarioService } from '../../../services/usuario.service';
import { LibroService } from '../../../services/libro.service';

@Component({
  selector: 'app-donacion-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donacion-form.html',
})
export class DonacionFormComponent implements OnInit {
  donacion: any = {
    fecha: new Date().toISOString().split('T')[0],
    observaciones: '',
    donante: { nombre: '', email: '', rol: { titulo: 'Lector' }, activo: true },
    ejemplar: { libro: { titulo: '', autor: '', genero: '' }, estado: { id: 1, descripcion: 'Disponible' }, detalle: 'Nuevo' }
  };
  
  usuarioNuevo = false;

  constructor(
    private donacionService: DonacionService,
    private usuarioService: UsuarioService,
    private libroService: LibroService
  ) { }

  ngOnInit(): void { }

  registrarDonacion() {
    console.log('Registrando donación:', this.donacion);
  }

  toggleUsuarioNuevo() {
    this.usuarioNuevo = !this.usuarioNuevo;
  }
}

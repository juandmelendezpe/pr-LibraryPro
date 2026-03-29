import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  
  ultimasDonaciones: any[] = [];
  
  terminoBusquedaLibro: string = '';
  libroEncontrado: any = null;

  terminoBusquedaDonante: string = '';
  donanteEncontrado: any = null;

  constructor(
    private donacionService: DonacionService,
    private usuarioService: UsuarioService,
    private libroService: LibroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarUltimasDonaciones();
  }

  cargarUltimasDonaciones() {
    this.donacionService.listarTodas().subscribe({
      next: (data) => {
        this.ultimasDonaciones = data
          .sort((a, b) => (b.id || 0) - (a.id || 0))
          .slice(0, 8);
      },
      error: (err) => console.error('Error al cargar donaciones', err)
    });
  }

  buscarLibro() {
    if (!this.terminoBusquedaLibro.trim()) return;
    this.libroService.buscar({ titulo: this.terminoBusquedaLibro }).subscribe({
      next: (libros) => {
        if (libros && libros.length > 0) {
          this.libroEncontrado = libros[0];
          this.donacion.ejemplar.libro = this.libroEncontrado;
        } else {
          alert('Libro no encontrado. Puedes crearlo presionando "+ Crear Libro".');
          this.libroEncontrado = null;
        }
      },
      error: (err) => {
        console.error('Error buscando libro', err);
        alert('Error al buscar el libro.');
      }
    });
  }

  buscarDonante() {
    if (!this.terminoBusquedaDonante.trim()) return;
    this.usuarioService.buscarUsuario(this.terminoBusquedaDonante).subscribe({
      next: (usuarios) => {
        if (usuarios && usuarios.length > 0) {
          this.donanteEncontrado = usuarios[0];
          this.donacion.donante = this.donanteEncontrado;
        } else {
          alert('Donante no encontrado. Por favor, crea un perfil manualmente.');
          this.donanteEncontrado = null;
        }
      },
      error: (err) => {
        console.error('Error buscando donante', err);
        alert('Error al buscar el donante.');
      }
    });
  }

  irCrearLibro() {
    this.router.navigate(['/libros/nuevo']);
  }

  irCrearPerfil() {
    this.router.navigate(['/usuarios/nuevo']);
  }

  registrarDonacion() {
    if (!this.libroEncontrado || !this.donanteEncontrado) {
      alert('Debes buscar y seleccionar un libro y un donante antes de registrar.');
      return;
    }
    
    this.donacion.ejemplar.libro = this.libroEncontrado;
    this.donacion.donante = this.donanteEncontrado;

    this.donacionService.guardar(this.donacion).subscribe({
      next: () => {
        alert('Donación registrada exitosamente');
        this.cargarUltimasDonaciones();
        this.cancelar();
      },
      error: (err) => {
        console.error('Error al registrar donación', err);
        alert('Ocurrió un error al registrar la donación. Verifique la consola.');
      }
    });
  }

  cancelar() {
    this.donacion = {
      fecha: new Date().toISOString().split('T')[0],
      observaciones: '',
      donante: { nombre: '', email: '', rol: { titulo: 'Lector' }, activo: true },
      ejemplar: { libro: { titulo: '', autor: '', genero: '' }, estado: { id: 1, descripcion: 'Disponible' }, detalle: 'Nuevo' }
    };
    this.terminoBusquedaLibro = '';
    this.libroEncontrado = null;
    this.terminoBusquedaDonante = '';
    this.donanteEncontrado = null;
  }
}

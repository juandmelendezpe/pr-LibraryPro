import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
    prestatario: { nombre: '', email: '', telefono: '', rol: { id: 3, titulo: 'Lector' }, activo: true },
    ejemplar: { id: undefined, libro: { titulo: '', autor: '' }, estado: { descripcion: '' } },
    estado: { id: 1, descripcion: 'Activo' } 
  };
  
  terminoBusqueda: string = '';
  usuarioSeleccionado = false;
  ejemplaresDisponibles: Ejemplar[] = [];
  ultimosPrestamos: any[] = [];

  constructor(
    private prestamoService: PrestamoService,
    private usuarioService: UsuarioService,
    private ejemplarService: EjemplarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ejemplarService.listarTodos().subscribe(data => {
      this.ejemplaresDisponibles = data.filter(e => e.estado.descripcion === 'Disponible');
    });
    this.cargarUltimosPrestamos();
  }

  cargarUltimosPrestamos() {
    this.prestamoService.listarTodos().subscribe(data => {
      // Ordenamos por fecha descendente o ID descendente y cortamos los 9 primeros
      this.ultimosPrestamos = data
        .sort((a, b) => (b.id || 0) - (a.id || 0))
        .slice(0, 9);
    });
  }

  obtenerIniciales(nombre: string): string {
    if (!nombre) return 'U';
    const partes = nombre.trim().split(' ');
    if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  }

  buscarLector() {
    if (!this.terminoBusqueda) return;
    this.usuarioService.buscarUsuario(this.terminoBusqueda).subscribe(usuarios => {
      if (usuarios && usuarios.length > 0) {
        this.usuarioSeleccionado = true;
      } else {
        alert('Lector no encontrado. Por favor, haga clic en "Crear Perfil Manualmente".');
        this.usuarioSeleccionado = false;
        this.prestamo.prestatario = { nombre: '', email: '', telefono: '', rol: { id: 3, titulo: 'Lector' }, activo: true };
      }
    });
  }

  irCrearPerfil() {
    this.router.navigate(['/usuarios/nuevo']);
  }

  registrarPrestamo() {
    if (!this.usuarioSeleccionado) {
      alert('Debe buscar y seleccionar un lector antes de continuar.');
      return;
    }
    this.guardarPrestamo();
  }

  guardarPrestamo() {
    this.prestamoService.guardar(this.prestamo).subscribe({
      next: () => {
        alert('Préstamo registrado exitosamente');
        this.cargarUltimosPrestamos();
        // Opcional: limpiar formulario después de guardar
        // this.router.navigate(['/prestamos']);
      },
      error: (err) => {
        console.error('Error al registrar préstamo', err);
        alert('Ocurrió un error al registrar el préstamo. Verifique console.log');
      }
    });
  }

  cancelar() {
    this.prestamo = {
      fechaInicio: new Date().toISOString().split('T')[0],
      fechaDevolucion: '',
      prestatario: { nombre: '', email: '', telefono: '', rol: { id: 3, titulo: 'Lector' }, activo: true },
      ejemplar: { id: undefined, libro: { titulo: '', autor: '' }, estado: { descripcion: '' } },
      estado: { id: 1, descripcion: 'Activo' } 
    };
    this.terminoBusqueda = '';
    this.usuarioSeleccionado = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamoService } from '../../../services/prestamo.service';
import { DevolucionService } from '../../../services/devolucion.service';
import { Prestamo, Devolucion } from '../../../models/models';

@Component({
  selector: 'app-devolucion-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './devolucion-form.html',
})
export class DevolucionFormComponent implements OnInit {
  prestamo: Prestamo | null = null;
  devolucion: Partial<Devolucion> = {
    fechaDevolucion: new Date().toISOString().split('T')[0], // hoy
    descripcion: ''
  };
  
  // Usaremos un Gestor Mockeado si no hay auth implementada completa:
  gestorLogeado = { id: 1, nombre: 'Admin Demo', email: 'admin@demo.com', rol: { id: 3, titulo: 'Admin' }, activo: true };

  guardando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prestamoService: PrestamoService,
    private devolucionService: DevolucionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const prestamoId = Number(params.get('prestamoId'));
      if (prestamoId) {
        this.cargarPrestamo(prestamoId);
      }
    });
  }

  cargarPrestamo(id: number) {
    // Actualmente el backend no tiene buscarPorId en PrestamoService, 
    // lo agregaremos al frontend si no existe o usaremos listarTodos.
    this.prestamoService.listarTodos().subscribe(ps => {
      this.prestamo = ps.find(p => p.id === id) || null;
    });
  }

  procesarDevolucion() {
    if (!this.prestamo) return;

    this.guardando = true;
    const nuevaDevolucion: Devolucion = {
      prestamo: this.prestamo,
      fechaDevolucion: this.devolucion.fechaDevolucion!,
      gestorReceptor: this.gestorLogeado,
      descripcion: this.devolucion.descripcion
    };

    this.devolucionService.guardar(nuevaDevolucion).subscribe({
      next: () => {
        this.guardando = false;
        alert('Devolución registrada correctamente.');
        this.volver();
      },
      error: (err) => {
        this.guardando = false;
        console.error('Error al registrar devolución', err);
        alert('Error al registrar devolución. Revise la consola.');
      }
    });
  }

  volver() {
    if (this.prestamo?.prestatario?.id) {
      this.router.navigate(['/usuarios/actividad', this.prestamo.prestatario.id]);
    } else {
      this.router.navigate(['/gestion-responsables']);
    }
  }
}

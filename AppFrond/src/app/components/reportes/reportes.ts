import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamoService } from '../../services/prestamo.service';
import { DonacionService } from '../../services/donacion.service';
import { UsuarioService } from '../../services/usuario.service';
import { LibroService } from '../../services/libro.service';
import { EjemplarService } from '../../services/ejemplar.service';
import { Prestamo, Donacion, Usuario, Libro, Ejemplar } from '../../models/models';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.html'
})
export class ReportesComponent implements OnInit {
  totalPrestamos: number = 0;
  prestamosActivos: number = 0;
  totalDonaciones: number = 0;
  totalLectores: number = 0;
  totalLibros: number = 0;
  totalEjemplares: number = 0;

  isLoading = true;

  constructor(
    private prestamoService: PrestamoService,
    private donacionService: DonacionService,
    private usuarioService: UsuarioService,
    private libroService: LibroService,
    private ejemplarService: EjemplarService
  ) {}

  ngOnInit() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.isLoading = true;
    let completedRequests = 0;
    const totalRequests = 5;

    const checkCompletion = () => {
      completedRequests++;
      if (completedRequests === totalRequests) {
        this.isLoading = false;
      }
    };

    // 1. Préstamos Totales y Activos
    this.prestamoService.listarTodos().subscribe((prestamos: Prestamo[]) => {
      this.totalPrestamos = prestamos.length;
      this.prestamosActivos = prestamos.filter((p: Prestamo) => p.estado?.descripcion?.toLowerCase() === 'activo' || p.estado?.descripcion?.toLowerCase() === 'vigente').length;
      checkCompletion();
    }, () => checkCompletion());

    // 2. Donaciones Totales
    this.donacionService.listarTodas().subscribe((donaciones: Donacion[]) => {
      this.totalDonaciones = donaciones.length;
      checkCompletion();
    }, () => checkCompletion());

    // 3. Lectores (Usuarios con rol 'Lector')
    this.usuarioService.listarTodos().subscribe((usuarios: Usuario[]) => {
      this.totalLectores = usuarios.filter((u: Usuario) => u.rol?.titulo?.toLowerCase() === 'lector').length;
      checkCompletion();
    }, () => checkCompletion());

    // 4. Libros Totales
    this.libroService.listarTodos().subscribe((libros: Libro[]) => {
      this.totalLibros = libros.length;
      checkCompletion();
    }, () => checkCompletion());

    // 5. Ejemplares Totales
    this.ejemplarService.listarTodos().subscribe((ejemplares: Ejemplar[]) => {
      this.totalEjemplares = ejemplares.length;
      checkCompletion();
    }, () => checkCompletion());
  }
}

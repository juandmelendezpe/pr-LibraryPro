import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrestamoService } from '../../services/prestamo.service';
import { DonacionService } from '../../services/donacion.service';
import { LibroService } from '../../services/libro.service';
import { UsuarioService } from '../../services/usuario.service';
import { Prestamo, Donacion, Libro, Usuario } from '../../models/models';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
})
export class InicioComponent implements OnInit {
  estadisticas = {
    librosDisponibles: 0,
    prestamosActivos: 0,
    donacionesMes: 0,
    usuariosRegistrados: 0
  };

  nuevosIngresos = [
    { titulo: 'Clean Code', autor: 'Robert C. Martin', genero: 'Programación' },
    { titulo: 'Don Quijote', autor: 'Miguel de Cervantes', genero: 'Novela Clásica' },
    { titulo: 'El Color de la Magia', autor: 'Terry Pratchett', genero: 'Fantasía' }
  ];

  constructor(
    private prestamoService: PrestamoService,
    private donacionService: DonacionService,
    private libroService: LibroService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    // 1. Préstamos Activos
    this.prestamoService.listarTodos().subscribe((prestamos: Prestamo[]) => {
      this.estadisticas.prestamosActivos = prestamos.filter((p: Prestamo) => p.estado?.descripcion?.toLowerCase() === 'activo' || p.estado?.descripcion?.toLowerCase() === 'vigente').length;
    });

    // 2. Donaciones Totales
    this.donacionService.listarTodas().subscribe((donaciones: Donacion[]) => {
      this.estadisticas.donacionesMes = donaciones.length;
    });

    // 3. Libros Totales
    this.libroService.listarTodos().subscribe((libros: Libro[]) => {
      this.estadisticas.librosDisponibles = libros.length;
    });

    // 4. Total Usuarios (Lectores)
    this.usuarioService.listarTodos().subscribe((usuarios: Usuario[]) => {
      this.estadisticas.usuariosRegistrados = usuarios.filter((u: Usuario) => u.rol?.titulo?.toLowerCase() === 'lector').length;
    });
  }
}

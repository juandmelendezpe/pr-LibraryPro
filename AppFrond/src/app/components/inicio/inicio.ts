import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
})
export class InicioComponent implements OnInit {
  estadisticas = {
    librosDisponibles: 124,
    prestamosActivos: 42,
    donacionesMes: 15,
    usuariosRegistrados: 85
  };

  nuevosIngresos = [
    { titulo: 'Clean Code', autor: 'Robert C. Martin', genero: 'Programación' },
    { titulo: 'Don Quijote', autor: 'Miguel de Cervantes', genero: 'Novela Clásica' },
    { titulo: 'El Color de la Magia', autor: 'Terry Pratchett', genero: 'Fantasía' }
  ];

  constructor() { }

  ngOnInit(): void { }
}

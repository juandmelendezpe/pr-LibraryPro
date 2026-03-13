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

  constructor() { }

  ngOnInit(): void { }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EjemplarService } from '../../../services/ejemplar.service';
import { Ejemplar } from '../../../models/models';

@Component({
  selector: 'app-libro-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libro-list.html',
})
export class LibroListComponent implements OnInit {
  ejemplaresAll: Ejemplar[] = [];
  ejemplares: Ejemplar[] = [];
  filtros = {
    titulo: '',
    autor: '',
    genero: ''
  };

  constructor(private ejemplarService: EjemplarService) { }

  ngOnInit(): void {
    this.cargarEjemplares();
  }

  cargarEjemplares() {
    this.ejemplarService.listarTodos().subscribe(data => {
      this.ejemplaresAll = data;
      this.ejemplares = data;
    });
  }

  buscar() {
    this.ejemplares = this.ejemplaresAll.filter(e => 
      e.libro.titulo.toLowerCase().includes(this.filtros.titulo.toLowerCase()) &&
      e.libro.autor.toLowerCase().includes(this.filtros.autor.toLowerCase()) &&
      (e.libro.genero || '').toLowerCase().includes(this.filtros.genero.toLowerCase())
    );
  }

  limpiar() {
    this.filtros = { titulo: '', autor: '', genero: '' };
    this.ejemplares = [...this.ejemplaresAll];
  }
}


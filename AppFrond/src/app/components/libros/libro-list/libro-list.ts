import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../../services/libro.service';
import { Libro } from '../../../models/models';

@Component({
  selector: 'app-libro-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libro-list.html',
})
export class LibroListComponent implements OnInit {
  libros: Libro[] = [];
  filtros = {
    titulo: '',
    autor: '',
    genero: ''
  };

  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros() {
    this.libroService.listarTodos().subscribe(data => {
      this.libros = data;
    });
  }

  buscar() {
    this.libroService.buscar(this.filtros).subscribe(data => {
      this.libros = data;
    });
  }

  limpiar() {
    this.filtros = { titulo: '', autor: '', genero: '' };
    this.cargarLibros();
  }
}

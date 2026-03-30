import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LibroService } from '../../../services/libro.service';
import { Libro } from '../../../models/models';

@Component({
  selector: 'app-libro-nuevo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libro-nuevo.html',
})
export class LibroNuevoComponent implements OnInit {
  libro: Libro = {
    titulo: '',
    autor: '',
    genero: '',
    isbn: ''
  };

  autoresExistentes: string[] = [];
  generosExistentes: string[] = [];
  autoresFiltrados: string[] = [];
  generosFiltrados: string[] = [];
  mostrarDropdownAutor: boolean = false;
  mostrarDropdownGenero: boolean = false;
  guardando: boolean = false;

  constructor(
    private libroService: LibroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatosExistentes();
  }

  cargarDatosExistentes(): void {
    this.libroService.listarTodos().subscribe({
      next: (libros) => {
        // Extraer autores y géneros únicos para los data lists
        const autores = new Set<string>();
        const generos = new Set<string>();
        
        libros.forEach(l => {
          if (l.autor) autores.add(l.autor);
          if (l.genero) generos.add(l.genero);
        });

        this.autoresExistentes = Array.from(autores).sort();
        this.generosExistentes = Array.from(generos).sort();
        this.autoresFiltrados = [...this.autoresExistentes];
        this.generosFiltrados = [...this.generosExistentes];
      },
      error: (err) => console.error('Error al cargar datos existentes', err)
    });
  }

  filtrarAutores(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.autoresFiltrados = this.autoresExistentes.filter(a => a.toLowerCase().includes(valor));
    this.mostrarDropdownAutor = true;
  }

  seleccionarAutor(autor: string): void {
    this.libro.autor = autor;
    this.mostrarDropdownAutor = false;
  }

  ocultarAutores(): void {
    setTimeout(() => this.mostrarDropdownAutor = false, 150);
  }

  filtrarGeneros(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.generosFiltrados = this.generosExistentes.filter(g => g.toLowerCase().includes(valor));
    this.mostrarDropdownGenero = true;
  }

  seleccionarGenero(genero: string): void {
    this.libro.genero = genero;
    this.mostrarDropdownGenero = false;
  }

  ocultarGeneros(): void {
    setTimeout(() => this.mostrarDropdownGenero = false, 150);
  }

  guardarLibro(): void {
    if (!this.libro.titulo || !this.libro.autor) {
      alert('Por favor, completa los campos requeridos (Título y Autor).');
      return;
    }

    this.guardando = true;
    this.libroService.guardar(this.libro).subscribe({
      next: () => {
        alert('Libro registrado exitosamente en el catálogo. Puedes registrar ejemplares físicos a través de una Donación o Ingreso.');
        this.router.navigate(['/libros']);
      },
      error: (err) => {
        console.error('Error al guardar libro en el catálogo', err);
        alert('Ocurrió un error al guardar el libro.');
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/libros']);
  }
}

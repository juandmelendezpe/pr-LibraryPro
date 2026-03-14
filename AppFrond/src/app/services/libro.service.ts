import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'http://localhost:8087/api/libros';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  buscar(filtros: any): Observable<Libro[]> {
    let params = new HttpParams();
    if (filtros.titulo) params = params.set('titulo', filtros.titulo);
    if (filtros.autor) params = params.set('autor', filtros.autor);
    if (filtros.genero) params = params.set('genero', filtros.genero);
    return this.http.get<Libro[]>(`${this.apiUrl}/buscar`, { params });
  }

  buscarPorId(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  guardar(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ejemplar } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class EjemplarService {
  private apiUrl = 'http://localhost:8087/api/ejemplares';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Ejemplar[]> {
    return this.http.get<Ejemplar[]>(this.apiUrl);
  }

  buscarPorLibroId(libroId: number): Observable<Ejemplar[]> {
    return this.http.get<Ejemplar[]>(`${this.apiUrl}/libro/${libroId}`);
  }

  buscarPorEstadoId(estadoId: number): Observable<Ejemplar[]> {
    return this.http.get<Ejemplar[]>(`${this.apiUrl}/estado/${estadoId}`);
  }

  buscarPorId(id: number): Observable<Ejemplar> {
    return this.http.get<Ejemplar>(`${this.apiUrl}/${id}`);
  }

  guardar(ejemplar: Ejemplar): Observable<Ejemplar> {
    return this.http.post<Ejemplar>(this.apiUrl, ejemplar);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

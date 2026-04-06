import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Devolucion } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DevolucionService {
  private apiUrl = 'http://localhost:8087/api/devoluciones';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Devolucion[]> {
    return this.http.get<Devolucion[]>(this.apiUrl);
  }

  guardar(devolucion: Devolucion): Observable<Devolucion> {
    return this.http.post<Devolucion>(this.apiUrl, devolucion);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

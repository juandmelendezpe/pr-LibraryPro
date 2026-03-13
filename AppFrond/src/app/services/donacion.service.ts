import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donacion } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private apiUrl = 'http://localhost:8080/api/donaciones';

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(this.apiUrl);
  }

  guardar(donacion: Donacion): Observable<Donacion> {
    return this.http.post<Donacion>(this.apiUrl, donacion);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

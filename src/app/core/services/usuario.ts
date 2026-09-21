import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUrl = 'http://127.0.0.1:8000/api/usuarios';

  constructor(private http: HttpClient) {}

  listar(
    idDepartamento?: number | null,
    idCargo?: number | null
  ): Observable<Usuario[]> {

    let params = new HttpParams();

    if (idDepartamento) {
      params = params.set(
        'idDepartamento',
        idDepartamento.toString()
      );
    }

    if (idCargo) {
      params = params.set(
        'idCargo',
        idCargo.toString()
      );
    }

    return this.http.get<Usuario[]>(
      this.apiUrl,
      { params }
    );
  }

  obtener(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.apiUrl}/${id}`
    );
  }

  crear(usuario: Usuario): Observable<any> {
    return this.http.post(
      this.apiUrl,
      usuario
    );
  }

  actualizar(
    id: number,
    usuario: Usuario
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      usuario
    );
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}
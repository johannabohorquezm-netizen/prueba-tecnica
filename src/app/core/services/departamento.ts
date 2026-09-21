import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Departamento } from '../../models/departamento.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private readonly apiUrl =
    'http://127.0.0.1:8000/api/departamentos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(
      this.apiUrl
    );
  }
}
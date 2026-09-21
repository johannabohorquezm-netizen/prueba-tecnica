import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cargo } from '../../models/cargo.model';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private readonly apiUrl =
    'http://127.0.0.1:8000/api/cargos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(
      this.apiUrl
    );
  }
}
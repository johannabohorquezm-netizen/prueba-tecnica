import { Cargo } from './cargo.model';
import { Departamento } from './departamento.model';

export interface Usuario {
  id?: number;

  usuario: string;
  email: string;

  primerNombre: string;
  segundoNombre?: string | null;

  primerApellido: string;
  segundoApellido?: string | null;

  idDepartamento: number;
  idCargo: number;

  departamento?: Departamento;
  cargo?: Cargo;
}
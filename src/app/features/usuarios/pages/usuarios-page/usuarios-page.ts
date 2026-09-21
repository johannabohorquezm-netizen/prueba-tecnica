import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  ConfirmarEliminacionDialog
} from '../../components/confirmar-eliminacion-dialog/confirmar-eliminacion-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import {
  UsuarioFormDialog
} from '../../components/usuario-form-dialog/usuario-form-dialog';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { UsuarioService } from '../../../../core/services/usuario';
import { DepartamentoService } from '../../../../core/services/departamento';
import { CargoService } from '../../../../core/services/cargo';

import { Usuario } from '../../../../models/usuario.model';
import { Departamento } from '../../../../models/departamento.model';
import { Cargo } from '../../../../models/cargo.model';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './usuarios-page.html',
  styleUrl: './usuarios-page.scss'
})
export class UsuariosPage implements OnInit {

  usuarios: Usuario[] = [];
  departamentos: Departamento[] = [];
  cargos: Cargo[] = [];

  departamentoSeleccionado: number | null = null;
  cargoSeleccionado: number | null = null;

  columnas: string[] = [
    'usuario',
    'nombres',
    'apellidos',
    'departamento',
    'cargo',
    'email',
    'acciones'
  ];

  constructor(
    private usuarioService: UsuarioService,
    private departamentoService: DepartamentoService,
    private cargoService: CargoService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarDepartamentos();
    this.cargarCargos();
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {

  this.usuarioService.listar(
    this.departamentoSeleccionado,
    this.cargoSeleccionado
  ).subscribe({

    next: (data) => {

      this.usuarios = data;

      this.cdr.detectChanges();

    },

    error: (error) => {
      console.error(
        'Error al cargar usuarios:',
        error
      );
    }

  });

}

  cargarDepartamentos(): void {
    this.departamentoService.listar().subscribe({
      next: (data) => {
        this.departamentos = data;
      },
      error: (error) => {
        console.error('Error al cargar departamentos:', error);
      }
    });
  }

  cargarCargos(): void {
    this.cargoService.listar().subscribe({
      next: (data) => {
        this.cargos = data;
      },
      error: (error) => {
        console.error('Error al cargar cargos:', error);
      }
    });
  }

  crearUsuario(): void {

  const dialogRef = this.dialog.open(
  UsuarioFormDialog,
  {
    width: '720px',
    maxWidth: '95vw',
    maxHeight: '92vh',
    disableClose: true,
    autoFocus: false,
    data: {
      departamentos: this.departamentos,
      cargos: this.cargos
    }
  }
  );

  dialogRef.afterClosed().subscribe(
    resultado => {

      if (!resultado) {
        return;
      }

      this.usuarioService.crear(
        resultado
      ).subscribe({

        next: () => {
          this.cargarUsuarios();
        },

        error: (error) => {
          console.error(
            'Error al crear usuario:',
            error
          );
        }

      });

    }
  );
}

  editarUsuario(usuario: Usuario): void {

  if (!usuario.id) {
    return;
  }

  const dialogRef = this.dialog.open(
    UsuarioFormDialog,
    {
      width: '720px',
      maxWidth: '95vw',
      maxHeight: '92vh',
      disableClose: true,
      autoFocus: false,

      data: {
        usuario: usuario,
        departamentos: this.departamentos,
        cargos: this.cargos
      }
    }
  );

  dialogRef.afterClosed().subscribe(
    resultado => {

      if (!resultado) {
        return;
      }

      this.usuarioService.actualizar(
        usuario.id!,
        resultado
      ).subscribe({

        next: () => {
          this.cargarUsuarios();
        },

        error: (error) => {
          console.error(
            'Error al actualizar usuario:',
            error
          );
        }

      });

    }
  );
}


eliminarUsuario(usuario: Usuario): void {

  if (!usuario.id) {
    return;
  }

  const dialogRef = this.dialog.open(
    ConfirmarEliminacionDialog,
    {
      width: '450px',
      disableClose: true,
      autoFocus: false,
      data: usuario
    }
  );

  dialogRef.afterClosed().subscribe(
    confirmado => {

      if (!confirmado) {
        return;
      }

      this.usuarioService.eliminar(
        usuario.id!
      ).subscribe({

        next: () => {
          this.cargarUsuarios();
        },

        error: (error) => {
          console.error(
            'Error al eliminar usuario:',
            error
          );
        }

      });

    }
  );
}

  obtenerNombres(usuario: Usuario): string {
    return [
      usuario.primerNombre,
      usuario.segundoNombre
    ]
      .filter(Boolean)
      .join(' ');
  }

  obtenerApellidos(usuario: Usuario): string {
    return [
      usuario.primerApellido,
      usuario.segundoApellido
    ]
      .filter(Boolean)
      .join(' ');
  }
 
  cambiarDepartamento(
  idDepartamento: number | null
  ): void {

  this.departamentoSeleccionado =
    idDepartamento;

  this.cargarUsuarios();
  }

  cambiarCargo(
  idCargo: number | null
  ): void {

  this.cargoSeleccionado = idCargo;

  this.cargarUsuarios();
  }
}
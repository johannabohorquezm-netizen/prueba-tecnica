import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Departamento } from '../../../../models/departamento.model';
import { Cargo } from '../../../../models/cargo.model';
import { Usuario } from '../../../../models/usuario.model';

export interface UsuarioDialogData {
  usuario?: Usuario;
  departamentos: Departamento[];
  cargos: Cargo[];
}

@Component({
  selector: 'app-usuario-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './usuario-form-dialog.html',
  styleUrl: './usuario-form-dialog.scss'
})
export class UsuarioFormDialog implements OnInit {

  formulario!: FormGroup;

  esEdicion = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UsuarioFormDialog>,

    @Inject(MAT_DIALOG_DATA)
    public data: UsuarioDialogData
  ) {}

  ngOnInit(): void {

    this.esEdicion = !!this.data.usuario;

    this.formulario = this.fb.group({
      idDepartamento: [
        this.data.usuario?.idDepartamento ?? null,
        Validators.required
      ],

      idCargo: [
        this.data.usuario?.idCargo ?? null,
        Validators.required
      ],

      usuario: [
        this.data.usuario?.usuario ?? '',
        Validators.required
      ],

      email: [
        this.data.usuario?.email ?? '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      primerNombre: [
        this.data.usuario?.primerNombre ?? '',
        Validators.required
      ],

      segundoNombre: [
        this.data.usuario?.segundoNombre ?? ''
      ],

      primerApellido: [
        this.data.usuario?.primerApellido ?? '',
        Validators.required
      ],

      segundoApellido: [
        this.data.usuario?.segundoApellido ?? ''
      ]
    });
  }

  guardar(): void {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.dialogRef.close(
      this.formulario.value
    );
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
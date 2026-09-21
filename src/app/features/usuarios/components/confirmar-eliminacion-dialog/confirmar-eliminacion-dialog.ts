import { Component, Inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-confirmar-eliminacion-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirmar-eliminacion-dialog.html',
  styleUrl: './confirmar-eliminacion-dialog.scss'
})
export class ConfirmarEliminacionDialog {

  constructor(
    private dialogRef:
      MatDialogRef<ConfirmarEliminacionDialog>,

    @Inject(MAT_DIALOG_DATA)
    public usuario: Usuario
  ) {}

  aceptar(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}

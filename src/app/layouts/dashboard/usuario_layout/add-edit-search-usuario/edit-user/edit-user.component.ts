import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/Usuario.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  checked : boolean = false;
  form:FormGroup;

  constructor(
    private fb:FormBuilder,
    private _dialog:Dialog
  ) { 
    this.form = this.fb.group({
      identificacion: ['', [Validators.required, Validators.maxLength(10)]],
      nombre:         ['', [Validators.required, Validators.maxLength(50)]],
      correo:         ['', [Validators.required, Validators.email, Validators.maxLength(60)]],
      telefono:       ['', [Validators.required, Validators.maxLength(10)]],
      direccion:      ['', [Validators.required, Validators.maxLength(70)]],
      opcionEmpresa:  ['', Validators.required],
      opcionSecurity: ['', Validators.required],
      checked:        [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
  }

  closeView(){
    this._dialog.closeAll();
  }


}

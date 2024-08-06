import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/Usuario';
import { Role } from 'src/app/interfaces/role';
import { Iestado } from 'src/app/interfaces/iestado';
import { UsuarioService } from 'src/app/services/Usuario.service';
import { RolesService } from 'src/app/services/PerfilRol/roles.service';
import { EstadosService } from 'src/app/services/PerfilRol/estados.service';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  checked : boolean = false;
  form:FormGroup;
  listaRoles:Role[]=[];
  listaEstado: Iestado[]=[];


  constructor( 
    private _rolServicio:RolesService,
    private _estadoServicio:EstadosService,

    private _dialog:Dialog,
    private fb:FormBuilder
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

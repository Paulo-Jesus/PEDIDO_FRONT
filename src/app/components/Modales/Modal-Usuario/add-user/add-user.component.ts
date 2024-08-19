import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario, UsuarioEditar } from 'src/app/Interfaces/Usuario';
import { Role } from 'src/app/Interfaces/role';
import { Iestado } from 'src/app/Interfaces/iestado';
import { UsuarioService } from 'src/app/services/Usuario.service';
import { RolesService } from 'src/app/services/PerfilRol/roles.service';
import { EstadosService } from 'src/app/services/PerfilRol/estados.service';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmpresasService } from 'src/app/services/PerfilRol/empresas.service';
import { Empresa } from 'src/app/Interfaces/Empresa';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  checked : boolean = false;
  form:FormGroup;
  listaEmpresas:Empresa[]=[];
  listaRoles:Role[]=[];
  listaEstado: Iestado[]=[];

  

  constructor( 
     private modalActual: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
    private _rolServicio:RolesService,
    private _usuarioServicio:UsuarioService,
    private _estadoServicio:EstadosService,
    private _empresaServicio:EmpresasService,
    private fb:FormBuilder
  ) { 
    this.form = this.createForm();
  }


  ngOnInit() :void{
    // if(this.datosUsuario != null){
    //   this.form.patchValue(this.datosUsuario)
    // }
    this.servicies()
  }

  servicies(){
    this._empresaServicio.getEmpresas().subscribe({
      next:(data)=>{
        if(data.code)this.listaEmpresas=data.data
        console.log(data)
      },
      error:(e)=>{}
    }),
    this._rolServicio.getRoles().subscribe({
      next:(data)=>{
        if(data.code)this.listaRoles=data.data
        console.log(data)
      },
      error:(e)=>{}
    })

  }

  createForm(){
    return this.fb.group({
      idUsuario:      [0],
      cedula:         ['', [Validators.required, Validators.maxLength(10)]],
      nombre:         ['', [Validators.required, Validators.maxLength(50)]],
      correo:         ['', [Validators.required, Validators.email, Validators.maxLength(60)]],
      telefono:       ['', [Validators.required, Validators.maxLength(10)]],
      direccion:      ['', [Validators.required, Validators.maxLength(70)]],
      idRol:          ['', Validators.required],
      idEmpresa:      ['', Validators.required],
      idEstado:       [false, Validators.required],
      idCuenta:       [0]
    });
  }



  registrarUsuario() {
      const valueForm: Usuario = this.form.value
      valueForm.idEstado = valueForm.idEstado ? 1 : 2;
      console.log(this.form.value.idEstado);
  
    if (this.datosUsuario == null) {
      this._usuarioServicio.AgregarUsuarios(valueForm).subscribe({
        next: (data) => {
          if (data.code) {
            this.modalActual.close("true");
            this.form.reset();
          } else {
            console.log("No se registro los usuarios")
          }
        },
        error: (e) => { }
      });
    }
  }

  cerrarModal() {
    this.modalActual.close();
  }
}

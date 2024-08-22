import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-restablecerClave',
  templateUrl: './restablecerClave.component.html',
  styleUrls: ['./restablecerClave.component.css']
})
export class RestablecerClaveComponent implements OnInit {

  form! : FormGroup;
  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      Temporal: ['', Validators.required],
      Nueva: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      switchMap(({ token }) => this._loginService.comprobarToken(token)),
      tap(console.log)
    )
    .subscribe(
      (response) => {
        console.log('Se queda');
      },
      (error) => {
        console.log('Se va', error);
      }
    );
  }

  generarClave(){
    this.activatedRoute.params
      .pipe(
        switchMap(({ token }) => this._loginService.restablecerClave(token, this.form.value.Temporal, this.form.value.Nueva)),
        tap(console.log)
      )
      .subscribe(
        (response) => {
          console.log('Contraseña restablecida');
        },
        (error) => {
          console.log('Error al restablecer contraseña', error);
        }
      );
  }
  
}

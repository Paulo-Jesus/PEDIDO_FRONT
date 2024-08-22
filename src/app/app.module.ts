import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


// ??

import { EstadoPipe } from './Model/EstadoPipe';



// MATERIALES

import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule} from '@angular/cdk/dialog';
import {HttpClientModule } from '@angular/common/http';
import {NgFor} from '@angular/common';
import {OAuthModule } from 'angular-oauth2-oidc';
import {FormsModule } from '@angular/forms';

// MODULOS

import { SeguridadModule } from './modules/seguridad/seguridad.module';
import { ReporteModule } from './modules/reporte/reporte.module';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { ParametrosModule } from './modules/parametros/parametros.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { SharedModule } from './modules/shared/shared.module';








@NgModule({
  declarations: [
    AppComponent,    
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    DialogModule,
    NgFor,
    OAuthModule.forRoot(),
    


 

  ],
  exports:[],
 
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private ComparaToken =   Environment.ApiCompararToker;

  constructor(private http: HttpClient) { }

  compararTokens(tokenFrontend: string): Observable<boolean> {
  
    return this.http.post<boolean>(`${this.ComparaToken}`, tokenFrontend);
  }
}

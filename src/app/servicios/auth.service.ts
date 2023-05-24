import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { Observable } from 'rxjs';
import { SesionDTO } from '../modelo/sesion-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authURL = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) {} // Corrección: debe ser 'http' en lugar de 'authService'

  public registrar(usuario:UsuarioDTO):Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/registro`, usuario); 
    }
    
    public login(sesion:SesionDTO):Observable<MensajeDTO>{
      return this.http.post<MensajeDTO>(`${this.authURL}/login`, sesion); 
      }
}

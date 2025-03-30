import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Usuario } from '../models/usuario/usuario.interface';
import { LoginResponse } from '../models/usuario/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _usuarioSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private http: HttpClient) {}

  public cadastro(usuario: Usuario): Observable<Usuario> {
    const { username, email, password, role, imageUrl } = usuario;
  
    const payload = {
      username,
      email,
      password,
      role,
      imageUrl,
    };
  
    return this.http.post<Usuario>(`${environment.apiUrl}/users`, payload, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true 
    }).pipe(
      tap((res: Usuario) => {
        this.usuario = res;
        localStorage.setItem('user', JSON.stringify(res));
   
      })
    );
  }
  
  public login(usuario: Usuario): Observable<LoginResponse> {
    let { email, password } = usuario;
  
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth`, {
      username: email,
      password,
    }).pipe(
      tap((res: LoginResponse) => {
        const usuarioLogado: Usuario = {
          username: res.username, 
          email: res.email,
          role: res.role,
          imageUrl: 'avatar-0.png',
          password: '', 
        };
  
        this.usuario = usuarioLogado;
        localStorage.setItem('user', JSON.stringify(usuarioLogado));
        localStorage.setItem('token', res.token);
      })
    );
  }

  logout(): void {
    this.usuario = null;
  }

  getUsuarioId(): string | null {
    const user = localStorage.getItem('user');
    if (!user) return null;
    
    const parsed = JSON.parse(user);
    return parsed.id || parsed._id || null;
  }
  
  // Getter
  public get usuario(): Observable<Usuario | null> {
    return this._usuarioSubject.asObservable();
  }

  // Setter
  public set usuario(usuario: Usuario | null) {
    this._usuarioSubject.next(usuario);
  }
}

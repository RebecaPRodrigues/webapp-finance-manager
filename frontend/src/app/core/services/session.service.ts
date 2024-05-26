import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Usuario } from '../models/usuario/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _usuarioSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private http: HttpClient) {}

  public cadastro(usuario: Usuario): Observable<Usuario> {
    let { userName, email, password } = usuario;

    return this.http.post<Usuario>(`${environment.apiUrl}/users`, {
      userName,
      email,
      password,
    });
  }

  public login(usuario: Usuario): Observable<Usuario> {
    let { email, password } = usuario;

    return this.http.post<Usuario>(`${environment.apiUrl}/auth`, {
      email,
      password,
    });
  }

  logout(): void {
    this.usuario = null;
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

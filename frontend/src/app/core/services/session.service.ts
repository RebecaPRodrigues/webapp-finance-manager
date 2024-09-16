import { Injectable } from '@angular/core';

import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Usuario } from '../models/usuario/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _usuarioSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private http: HttpClient) {}

  public cadastro(username: string, email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(${environment.apiUrl}/users, {
      username,
      email,
      password,
    });
  }

  public login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(${environment.apiUrl}/auth, {
      username,
      password,
    });
  }

  public loadUserInfo(username: string) {
    return this.login('admin123', 'admin123').pipe(
      switchMap((response) => {
        const token = response.token; // Obtem o token da resposta de login
        const headers = new HttpHeaders({
          Authorization: Bearer ${token}, // Insere o token nos headers
        });

        // Faz a requisição para buscar os usuários, após receber o token
        return this.http.get<any[]>(${environment.apiUrl}/users, { headers }).pipe(
          map(users => users.find(user => user.userName === username)) // Filtra pelo username
        );
      })
    );
  }

  logout(): void {
    this.usuario = null;
    this.clearToken();
    this.clearUser();
  }

  /* TOKEN */
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  clearToken(): void {
    localStorage.removeItem('jwtToken');
  }

  /* USER */
  saveUser(user: any): void {
    const userString = JSON.stringify(user);
    localStorage.setItem('currentUser', userString);
  }

  getUser(): any | null {
    const userString = localStorage.getItem('currentUser');
    if (userString) return JSON.parse(userString);
    return null;
  }

  clearUser(): void {
    localStorage.removeItem('currentUser');
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

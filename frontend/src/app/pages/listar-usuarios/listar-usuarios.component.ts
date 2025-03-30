import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TituloComponent } from '../../core/components/titulo/titulo.component';
import { Usuario } from '../../core/models/usuario/usuario.interface';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    TableModule,
    TituloComponent,
    ButtonModule,
  ],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.scss',
})
export class ListarUsuariosComponent {
  public usuarios: Usuario[] = [];
  public carregando = true;
  public deletandoItem: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<Usuario[]>(`${environment.apiUrl}/users`, { headers }).subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao buscar usuários', err);
        this.carregando = false;
      },
    });
  }

  public deletarUsuario(id: string) {
    this.deletandoItem = id;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.delete(`${environment.apiUrl}/users/${id}`, { headers }).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u._id !== id);
        this.deletandoItem = null;
      },
      error: (err) => {
        console.error('Erro ao deletar usuário', err);
        this.deletandoItem = null;
      },
    });
  }
}

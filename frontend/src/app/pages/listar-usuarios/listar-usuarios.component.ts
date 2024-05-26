import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TituloComponent } from '../../core/components/titulo/titulo.component';
import { Usuario } from '../../core/models/usuario/usuario.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { usuariosMocked } from '../../core/models/usuario/usuario.mock';

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
    this.http.get<Usuario[]>(`${environment.apiUrl}/usuarios`).subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.carregando = false;
      },
      error: () => {
        this.usuarios = usuariosMocked;
        this.carregando = false;
      },
    });
  }

  public deletarUsuario(id: string) {
    this.deletandoItem = id;

    this.http.delete(`${environment.apiUrl}/usuarios`).subscribe({
      next: () => {
        this.router.navigate(['spa/listar-usuarios'])

        this.deletandoItem = null;
      },
      error: () => {
        const indiceParaRemover = usuariosMocked.findIndex(item => item._id === id);

        usuariosMocked.splice(indiceParaRemover, 1);

        this.deletandoItem = null;

        this.router.navigate(['spa/listar-usuarios'])
      },
    });
  }
}

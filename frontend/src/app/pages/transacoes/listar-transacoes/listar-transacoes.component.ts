import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { Transaction } from '../../../core/models/transacoes/transacoes.interface';
import { TituloComponent } from '../../../core/components/titulo/titulo.component';
import { ButtonModule } from 'primeng/button';
import { transactionsMocked } from '../../../core/models/transacoes/transacoes.mock';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-listar-transacoes',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    TableModule,
    TituloComponent,
    ButtonModule,
  ],
  templateUrl: './listar-transacoes.component.html',
  styleUrl: './listar-transacoes.component.scss',
})
export class ListarTransacoesComponent implements OnInit {
  public transasoes: Transaction[] = [];
  public carregando = true;
  public deletandoItem: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Transaction[]>(`${environment.apiUrl}/transacoes`).subscribe({
      next: (transasoes) => {
        this.transasoes = transasoes;
        this.carregando = false;
      },
      error: () => {
        this.transasoes = transactionsMocked;
        this.carregando = false;
      },
    });
  }

  public editarTransacao(id: string) {
    this.router.navigate([`spa/editar-transacao/${id}`]);
  }

  public deletarTransacao(id: string) {
    this.deletandoItem = id;

    this.http.delete(`${environment.apiUrl}/transacoes`).subscribe({
      next: () => {
        this.router.navigate(['spa/listar-transacoes'])

        this.deletandoItem = null;
      },
      error: () => {
        const indiceParaRemover = transactionsMocked.findIndex(item => item._id === id);

        transactionsMocked.splice(indiceParaRemover, 1);

        this.deletandoItem = null;

        this.router.navigate(['spa/listar-transacoes'])
      },
    });
  }

  public getSeverity(status: string) {
    switch (status) {
      case 'receita':
        return 'success';
      case 'despesa':
        return 'danger';
      default:
        return 'warning';
    }
  }
}

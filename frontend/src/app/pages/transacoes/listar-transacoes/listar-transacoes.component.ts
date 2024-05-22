import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { Transaction } from '../shared/transacoes.interface';
import { TituloComponent } from '../../../core/components/titulo/titulo.component';
import { ButtonModule } from 'primeng/button';
import { transactionsMocked } from '../shared/transacoes.mock';
import { Router } from '@angular/router';

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
export class ListarTransacoesComponent {
  public transasoes: Transaction[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.transasoes = transactionsMocked;
  }

  public novaTransacao() {
    this.router.navigate(['spa/criar-transacao'])
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

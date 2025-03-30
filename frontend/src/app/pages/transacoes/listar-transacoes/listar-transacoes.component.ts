import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { TituloComponent } from '../../../core/components/titulo/titulo.component';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environments';
import { Transaction } from '../../../core/models/transacoes/transacoes.interface';
import { SessionService } from '../../../core/services/session.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-listar-transacoes',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    TableModule,
    TituloComponent,
    ButtonModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './listar-transacoes.component.html',
  styleUrl: './listar-transacoes.component.scss',
})
export class ListarTransacoesComponent implements OnInit {
  public transasoes: Transaction[] = [];
  public carregando = true;
  public deletandoItem: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private sessionService: SessionService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const userId = this.sessionService.getUsuarioId();

    if (!userId || !token) {
      console.warn('Usuário ou token não encontrado no localStorage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<Transaction[]>(`${environment.apiUrl}/transactions/${userId}`, { headers })
      .subscribe({
        next: (transacoes: Transaction[]) => {
          this.transasoes = transacoes.map((t: any) => ({
            ...t,
            _id: t.id,
          }));
          this.carregando = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao buscar transações:', err.message);
          this.carregando = false;
        },
      });

    console.log('userId:', userId);
  }

  public editarTransacao(id: string): void {
    this.router.navigate([`spa/editar-transacao/${id}`]);
  }

  public deletarTransacao(id: string): void {
    this.confirmationService.confirm({
      header: 'Confirmação',
      message: 'Tem certeza que deseja deletar esta transação?\n\n<strong>Essa ação não pode ser desfeita.<\strong>',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Cancelar',
      accept: () => this.executarDelete(id),
    });
    
  }

  private executarDelete(id: string): void {
    this.deletandoItem = id;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.delete(`${environment.apiUrl}/transactions/${id}`, { headers }).subscribe({
      next: () => {
        this.transasoes = this.transasoes.filter((t) => t._id !== id);
        this.deletandoItem = null;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao deletar transação:', err);
        this.deletandoItem = null;
      },
    });
  }

  baixarRelatorio(): void {
    const userId = this.sessionService.getUsuarioId();
    const url = `http://localhost:3000/report?userId=${userId}`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.click();
  }

  public getSeverity(status: string): 'success' | 'danger' | 'warning' {
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

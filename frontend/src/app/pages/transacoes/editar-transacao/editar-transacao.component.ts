import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TituloComponent } from '../../../core/components/titulo/titulo.component';
import { environment } from '../../../../environments/environments';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from '../../../core/models/transacoes/transacoes.interface';

@Component({
  selector: 'app-editar-transacao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule,
    TituloComponent,
    ButtonModule,
  ],
  templateUrl: './editar-transacao.component.html',
  styleUrl: './editar-transacao.component.scss',
})
export class EditarTransacaoComponent {
  public formGroup!: FormGroup;
  public id = this.route.snapshot.params['id'];
  public tipos = [
    { label: 'Despesa', value: 'DESPESA' },
    { label: 'Receita', value: 'RECEITA' },
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      description: new FormControl<string | null>(null),
      type: new FormControl<string | null>(null),
      amount: new FormControl<number | null>(null),
      transactionWith: new FormControl<string | null>(null),
      date: new FormControl<string | null>(null),
      category: new FormControl<string | null>(null),
      paymentMethod: new FormControl<string | null>(null),
    });

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<Transaction>(`${environment.apiUrl}/transactions/transaction/${this.id}`, { headers })
    .subscribe({
      next: (transacao) => {
        console.log('Transação recebida:', transacao); 
  
        this.formGroup.patchValue({
          description: transacao.description,
          type: transacao.type?.toUpperCase() || null, 
          amount: transacao.amount,
          transactionWith: transacao.transactionWith,
          date: transacao.date,
          category: transacao.category,
          paymentMethod: transacao.paymentMethod,
        });
      },
      error: (err) => {
        console.error('Erro ao carregar transação:', err);
      },
    });
  }

  submit() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    const userId = user?.id || user?._id;
    if (!this.formGroup.valid || !userId) {
      console.warn('Formulário inválido ou usuário não autenticado');
      return;
    }
  
    const body = {
      ...this.formGroup.value,
      userId
    };
  
    this.http
      .put(`${environment.apiUrl}/transactions/${this.id}`, body, {
        headers,
      })
      .subscribe({
        next: () => this.router.navigate(['/spa/listar-transacoes']),
        error: (err) =>
          console.error('Erro ao atualizar transação:', err),
      });
  }
  
}

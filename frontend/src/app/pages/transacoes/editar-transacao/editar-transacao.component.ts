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
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../../../core/models/transacoes/transacoes.interface';
import { transactionsMocked } from '../../../core/models/transacoes/transacoes.mock';

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
  public tipos = ['despesa', 'receita'];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.http
      .get<Transaction>(`${environment.apiUrl}/transacoes/${this.id}`)
      .subscribe({
        next: (transacao) => this.loadForm(transacao),
        error: () =>
          this.loadForm(
            transactionsMocked.find((transacao) => transacao._id === this.id) ??
              transactionsMocked[0]
          ),
      });
  }

  loadForm(transacao: Transaction) {
    this.formGroup = new FormGroup({
      description: new FormControl<string | null>(transacao.description),
      type: new FormControl<string>(transacao.type),
      amount: new FormControl<number>(transacao.amount),
      transactionWith: new FormControl<string | null>(
        transacao.transactionWith
      ),
      date: new FormControl<string>(transacao.date),
      category: new FormControl<string | null>(transacao.category),
      paymentMethod: new FormControl<string | null>(transacao.paymentMethod),
    });
  }

  createDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
  }

  submit() {
    console.log(this.formGroup?.value);

    if (this.formGroup?.valid) {
      this.http
        .put(
          `${environment.apiUrl}/transacoes/${this.id}`,
          this.formGroup.value
        )
        .subscribe({
          next: () => this.router.navigate(['/spa/listar-transacoes']),
          error: () => {
            const indiceParaAtualizar = transactionsMocked.findIndex(
              (item) => item._id === this.id
            );

            transactionsMocked[indiceParaAtualizar] = {
              _id: this.id,
              ...this.formGroup.value,
            };

            this.router.navigate(['/spa/listar-transacoes']);
          },
        });
    } else {
      console.log('formulário inválido! ', this.formGroup?.value);
    }
  }
}

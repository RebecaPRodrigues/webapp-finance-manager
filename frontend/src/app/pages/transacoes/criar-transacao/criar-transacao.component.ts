import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { TituloComponent } from '../../../core/components/titulo/titulo.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environments';
import { transactionsMocked } from '../../../core/models/transacoes/transacoes.mock';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-criar-transacao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule,
    TituloComponent,
    ToastModule,
    ButtonModule,
  ],
  templateUrl: './criar-transacao.component.html',
  styleUrl: './criar-transacao.component.scss',
})
export class CriarTransacaoComponent {
  formGroup!: FormGroup;
  tipos: string[] = ['despesa', 'receita'];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      description: new FormControl<string | null>(null),
      type: new FormControl<string>('despesa'),
      amount: new FormControl<number>(0),
      transactionWith: new FormControl<string | null>(null),
      date: new FormControl<string>(this.createDate()),
      category: new FormControl<string | null>(null),
      paymentMethod: new FormControl<string | null>(null),
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
        .post(`${environment.apiUrl}/transacoes`, this.formGroup.value)
        .subscribe({
          next: () => this.router.navigate(['/spa/listar-transacoes']),
          error: () => {
            transactionsMocked.unshift(this.formGroup.value)
            this.router.navigate(['/spa/listar-transacoes'])
          }
        });
    } else {
      console.log('formulário inválido! ', this.formGroup?.value);
    }
  }
}

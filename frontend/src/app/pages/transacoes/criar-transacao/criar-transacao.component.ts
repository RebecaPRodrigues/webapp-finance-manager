import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { TituloComponent } from '../../../core/components/titulo/titulo.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

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
  ],
  templateUrl: './criar-transacao.component.html',
  styleUrl: './criar-transacao.component.scss',
})
export class CriarTransacaoComponent {
  public form!: FormGroup;
  public tipos = ['despesa', 'receita'];

  public description = '';
  public type = 'despesa';
  public amount = 0;
  public transactionWith = '';
  public date = '';
  public category = '';
  public paymentMethod = '';

  constructor(private formBuilder: FormBuilder) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    this.date = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
  }

  ngOnInit(): void {
    this.createForm();
    // this.loadData();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      descricao: [this.description, [Validators.required]],
      type: [this.type, [Validators.required]],
      amount: [this.amount, [Validators.required]],
      transactionWith: [this.transactionWith, [Validators.required]],
      date: [this.date, [Validators.required]],
      category: [this.category, [Validators.required]],
      paymentMethod: [this.paymentMethod, [Validators.required]],
    });
  }

  submit() {
    if (this.form.valid) {
      // this.sendMethod(this.form.value).subscribe({
      //   next: (resource: T) => {},
      //   error: (error: any) => {},
      // });
    } else {
      console.log('formulário inválido! ', this.form.value);
    }
  }
}

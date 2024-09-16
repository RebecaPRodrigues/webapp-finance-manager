import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { SessionService } from '../../core/services/session.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    DividerModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public formGroup!: FormGroup;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl<string | null>(null),
      password: new FormControl<string | null>(null),
    });
  }

  redirectToCadastro() {
    this.router.navigate(['/cadastro']);
  }

  submit() {
    console.log(this.formGroup?.value);

    if (this.formGroup?.valid) {
      let form = this.formGroup.value;
      this.sessionService.login(form.username, form.password).subscribe({
        next: (response) => {
          this.sessionService.setToken(response.token);
          this.router.navigate(['/spa/listar-transacoes']);
          this.sessionService.loadUserInfo(form.username).subscribe({
            next: (user) => this.sessionService.saveUser(user)
          })
        },
        error: () => this.erroAoLogarUsuario(),
      });
    } else {
      console.log('formulário inválido! ', this.formGroup?.value);
    }
  }


  private erroAoLogarUsuario() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Senha inválida',
    });
    this.formGroup.reset();
  }
}
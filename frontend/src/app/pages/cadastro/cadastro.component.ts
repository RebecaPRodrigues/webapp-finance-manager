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
import { Usuario } from '../../core/models/usuario/usuario.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DividerModule,
    ToastModule,
    ButtonModule,
  ],
  providers: [MessageService],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      fullName: new FormControl<string | null>(null),
      username: new FormControl<string | null>(null),
      email: new FormControl<string | null>(null),
      password: new FormControl<string | null>(null),
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  submit() {
    if (this.formGroup.valid) {
      const { fullName, username, email, password } = this.formGroup.value;

      if (!fullName || !username || !email || !password) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Campos obrigatórios',
          detail: 'Preencha todos os campos para continuar.',
        });
        return;
      }

      const payload: Usuario = {
        username,
        email,
        password,
        role: 'USER',
        imageUrl: 'avatar-0.png',
        fullName,
      };

      this.sessionService.cadastro(payload).subscribe({
        next: (usuario) => this.sucessoAoCadastrarUsuario(usuario),
        error: (error) => this.erroAoCadastrarUsuario(error),
      });
    } else {
      console.log('formulário inválido!', this.formGroup.value);
    }
  }

  sucessoAoCadastrarUsuario(usuario: Usuario) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Usuário criado com sucesso',
    });
    this.sessionService.usuario = usuario;
    this.router.navigate(['/spa/listar-transacoes']);
    localStorage.setItem('user', JSON.stringify(usuario));
  }

  erroAoCadastrarUsuario(error: any) {
    console.error('Erro ao cadastrar usuário:', error);
    this.messageService.add({
      severity: 'error',
      summary: 'Erro ao cadastrar',
      detail: error?.error?.message || 'Erro inesperado. Tente novamente.',
    });
  }
}

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
      username: new FormControl<string | null>(null),
      email: new FormControl<string | null>(null),
      password: new FormControl<string | null>(null),
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  submit() {
    console.log(this.formGroup?.value);

    if (this.formGroup?.valid) {
      let form = this.formGroup.value;
      this.sessionService.cadastro(form.username, form.email, form.password).subscribe({
        next: (usuario) => this.sucessoAoCadastrarUsuario(usuario),
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Não foi possível criar o usuario',
          })
        },
      });
    } else {
      console.log('formulário inválido! ', this.formGroup?.value);
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
  }
}
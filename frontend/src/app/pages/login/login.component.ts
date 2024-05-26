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
import { usuariosMocked } from '../../core/models/usuario/usuario.mock';
import { Usuario } from '../../core/models/usuario/usuario.interface';
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
      email: new FormControl<string | null>(null),
      password: new FormControl<string | null>(null),
    });
  }

  redirectToCadastro() {
    this.router.navigate(['/cadastro']);
  }

  submit() {
    console.log(this.formGroup?.value);

    if (this.formGroup?.valid) {
      this.sessionService.login(this.formGroup.value).subscribe({
        next: (usuario) => this.sucessoAoLogarUsuario(usuario),
        error: () => this.erroAoLogarUsuario(),
      });
    } else {
      console.log('formulário inválido! ', this.formGroup?.value);
    }
  }

  private sucessoAoLogarUsuario(usuario: Usuario) {
    this.sessionService.usuario = usuario;
    this.router.navigate(['/spa/listar-transacoes']);
  }

  private erroAoLogarUsuario() {
    let { email, password } = this.formGroup.value;
    let usuario = usuariosMocked.find((usuario) => usuario.email == email);

    console.log(usuario);

    if (usuario && usuario?.password === password) {
      this.sessionService.usuario = usuario;
      this.router.navigate(['/spa/listar-transacoes']);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Senha inválida',
      });
      this.formGroup.reset();
    }
  }
}

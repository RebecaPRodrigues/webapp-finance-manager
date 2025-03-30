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
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { HttpHeaders } from '@angular/common/http';

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
    private messageService: MessageService,
    private http: HttpClient
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
    this.sessionService.login(this.formGroup.value).subscribe({
      next: (res) => {
        console.log('Resposta do login:', res);
  
        const usuario: Usuario = {
          _id: res.id,
          email: res.email,
          admin: res.role === 'ADMIN',
          username: res.username, 
          role: res.role          
        };
  
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(usuario));
        this.sessionService.usuario = usuario;
  
        this.router.navigate(['/spa/listar-transacoes']);
      },
      error: (err) => {
        console.error('Erro no login', err);
        this.erroAoLogarUsuario();
      },
    });
  }

  private erroAoLogarUsuario() {
    let { email, password } = this.formGroup.value;
    let usuario = usuariosMocked.find((usuario) => usuario.email == email);

    console.log(usuario);

    if (usuario && usuario?.password === password) {
      this.sessionService.usuario = usuario;
      localStorage.setItem('user', JSON.stringify(usuario));
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

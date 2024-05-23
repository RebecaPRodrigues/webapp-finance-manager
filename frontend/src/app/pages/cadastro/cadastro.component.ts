import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    DividerModule,
    ButtonModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  constructor(private router: Router) {}

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}

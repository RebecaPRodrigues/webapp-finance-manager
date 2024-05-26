import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { Usuario } from '../../models/usuario/usuario.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss',
})
export class MenuLateralComponent implements OnInit, OnDestroy {
  private sub: Subscription = Subscription.EMPTY;
  public usuario: Usuario | null = null;

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.sessionService.usuario.subscribe({
      next: (usuario) => (this.usuario = usuario)
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout() {
    this.sessionService.logout();
    this.router.navigate(['']);
  }
}

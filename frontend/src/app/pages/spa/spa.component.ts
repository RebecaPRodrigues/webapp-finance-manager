import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuLateralComponent } from '../../core/components/menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-spa',
  standalone: true,
  imports: [RouterOutlet, MenuLateralComponent],
  templateUrl: './spa.component.html',
  styleUrl: './spa.component.scss',
})
export class SpaComponent {}

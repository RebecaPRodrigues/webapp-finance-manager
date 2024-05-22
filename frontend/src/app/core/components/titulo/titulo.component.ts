import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-titulo',
  standalone: true,
  imports: [DividerModule, CommonModule],
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.scss'
})
export class TituloComponent {
  @Input() titulo = ''
}

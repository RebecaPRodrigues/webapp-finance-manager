import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListarTransacoesComponent } from './pages/transacoes/listar-transacoes/listar-transacoes.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { SpaComponent } from './pages/spa/spa.component';
import { rotasSPA } from './pages/spa/spa.routes';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'spa',
    component: SpaComponent,
    children: rotasSPA
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

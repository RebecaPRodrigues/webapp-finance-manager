import { Routes } from "@angular/router";
import { ListarTransacoesComponent } from "../transacoes/listar-transacoes/listar-transacoes.component";
import { HomeComponent } from "../home/home.component";
import { CriarTransacaoComponent } from "../transacoes/criar-transacao/criar-transacao.component";

export const rotasSPA: Routes = [
  {
    path: 'listar-transacoes',
    component: ListarTransacoesComponent,
  },
  {
    path: 'criar-transacao',
    component: CriarTransacaoComponent,
  },
  {
    path: 'cpf',
    component: ListarTransacoesComponent,
  },
  {
    path: 'token-app',
    component: ListarTransacoesComponent,
  },
];

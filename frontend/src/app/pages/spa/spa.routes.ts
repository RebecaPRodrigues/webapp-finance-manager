import { Routes } from "@angular/router";
import { ListarTransacoesComponent } from "../transacoes/listar-transacoes/listar-transacoes.component";
import { HomeComponent } from "../home/home.component";
import { CriarTransacaoComponent } from "../transacoes/criar-transacao/criar-transacao.component";
import { EditarTransacaoComponent } from "../transacoes/editar-transacao/editar-transacao.component";
import { ListarUsuariosComponent } from "../listar-usuarios/listar-usuarios.component";

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
    path: 'editar-transacao/:id',
    component: EditarTransacaoComponent,
  },
  {
    path: 'listar-usuarios',
    component: ListarUsuariosComponent,
  }
];

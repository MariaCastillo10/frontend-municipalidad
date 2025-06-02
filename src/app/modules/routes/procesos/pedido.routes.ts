import { Routes } from '@angular/router';
import { pedidoComponent } from '../../intranet/procesos/views/pedido/index/index-pedido.component';

export const pedidosRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'pedidos' },
    component: pedidoComponent,
  },
];

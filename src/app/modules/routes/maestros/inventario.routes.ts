import { Routes } from '@angular/router';
import { MatrimoniosComponent } from '../../intranet/maestros/views/matrimonio/index/index-inventario.component';

export const InventarioRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Divorcios' },
    component: MatrimoniosComponent,
  },
];

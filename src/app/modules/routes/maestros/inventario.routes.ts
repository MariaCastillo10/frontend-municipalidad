import { Routes } from '@angular/router';
import { InventarioComponent } from '../../intranet/maestros/views/inventario/index/index-inventario.component';

export const InventarioRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Trámite' },
    component: InventarioComponent,
  },
];

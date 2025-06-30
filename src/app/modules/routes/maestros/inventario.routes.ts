import { Routes } from '@angular/router';
import { DivorciosComponent } from '../../intranet/maestros/views/divorcios/index/index-divorcio.component';

export const InventarioRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Divorcios' },
    component: DivorciosComponent,
  },
];

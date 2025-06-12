import { Routes } from '@angular/router';
import { RentasComponent } from '../../intranet/maestros/views/rentas/index/index-permiso.component';

export const RentasRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Rentas' },
    component: RentasComponent,
  },
];

import { Routes } from '@angular/router';
import { LicenciasComponent } from '../../intranet/maestros/views/licencias/index/index-inventario.component';

export const LicenciaRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Licencias' },
    component: LicenciasComponent,
  },
];

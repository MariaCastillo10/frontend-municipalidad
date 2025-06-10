import { Routes } from '@angular/router';
import { PermisosComponent } from '../../intranet/maestros/views/permisos/index/index-permiso.component';

export const PermisosRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Permisos' },
    component: PermisosComponent,
  },
];

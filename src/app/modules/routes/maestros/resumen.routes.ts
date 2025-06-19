import { Routes } from '@angular/router';
import { ResumenComponent } from '../../intranet/maestros/views/resumen/index/index-resumen.component';

export const ResumenRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Resumen' },
    component: ResumenComponent,
  },
];

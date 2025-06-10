import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { MenuService } from './layout/service/app.menu.service';
import { ErrorComponent } from './modules/auth/error/error.component';
import { LoginComponent } from './modules/auth/views/login/login.component';
import { RegistrateComponent } from './modules/auth/views/registrate/registrate.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';

const hideMenuResolver: ResolveFn<boolean> = () => {
  const menuService = inject(MenuService);
  menuService.hideMenu();
  return true;
};

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registrate',
    component: RegistrateComponent,
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'inventario',
        loadChildren: () =>
          import('./modules/routes/maestros/inventario.routes').then(
            (m) => m.InventarioRoutes,
          ),
      },
      {
        path: 'licencia',
        loadChildren: () =>
          import('./modules/routes/maestros/licencia.routes').then(
            (m) => m.LicenciaRoutes,
          ),
      },
      {
        path: 'permiso',
        loadChildren: () =>
          import('./modules/routes/maestros/permiso.routes').then(
            (m) => m.PermisosRoutes,
          ),
      },
    ],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];

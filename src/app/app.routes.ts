import { Route } from '@angular/router';
import { AuthGuard, UnauthGuard } from './core/auth';

export const appRoutes: Route[] = [

  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', canActivate: [UnauthGuard], loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent) },

      {
        path: 'store', canActivate: [AuthGuard],
        data: { role: 'user' }, loadComponent: () => import('./modules/store/store.component').then(m => m.StoreComponent)
      },
      {
        path: 'dashboard', canActivate: [AuthGuard],
        data: { role: 'admin' }, loadComponent: () => import('./modules/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      }
    ]
  }

];

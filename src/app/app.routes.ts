import { Route } from '@angular/router';

export const appRoutes: Route[] = [

  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'store', loadComponent: () => import('./modules/store/store.component').then(m => m.StoreComponent) },
      { path: 'dashboard', loadComponent: () => import('./modules/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
    ]
  }

];

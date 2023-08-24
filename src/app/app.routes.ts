import { Route } from '@angular/router';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [

  {
    path: '',
    component: AppComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent) },
    ]
  }

];

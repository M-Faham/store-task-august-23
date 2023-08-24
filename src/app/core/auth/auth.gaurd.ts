import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = localStorage.getItem('stcUser');
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }
    return next.data['role'] ? this._checkRole(user, next) : true;
  }

  private _checkRole(user: string, next: ActivatedRouteSnapshot): boolean {
    if (user === next.data['role']) {
      return true;
    }
    return this._navigateToProperRoute(user, next);
  }

  private _navigateToProperRoute(user: string, route: ActivatedRouteSnapshot): boolean {
    const baseRoute = user === 'admin' ? 'dashboard' : 'store';
    this.router.navigate([`/${baseRoute}`]);
    return false;
  }

}

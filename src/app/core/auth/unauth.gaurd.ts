import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = localStorage.getItem('stcUser');
    if (user) {
      this._navigateToProperRoute(user, next);
      return false;
    } else {
      return true;
    }
  }


  private _navigateToProperRoute(user: string, route: ActivatedRouteSnapshot): boolean {
    const baseRoute = user === 'admin' ? 'dashboard' : 'store';
    this.router.navigate([`/${baseRoute}`]);
    return false;
  }
}

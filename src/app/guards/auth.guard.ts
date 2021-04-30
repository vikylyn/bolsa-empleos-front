import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService,
              private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('token') || '';
      if (token.length > 0 ) {
        return true;
      }else {
        this.router.navigateByUrl('/login');
        return false;
      }

      /* return this.loginService.validarToken()
            .pipe(
             tap( estaAutenticado => {
               if (!estaAutenticado) {
                 this.router.navigateByUrl('/login');
               }
             }
             )
            );
    */
  }

}

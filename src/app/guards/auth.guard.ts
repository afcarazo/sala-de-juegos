import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }
async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
  const result = await this.authService.getCurrentUser();
  let resultado = false;
  if (result) {
    //console.log(result);
   resultado = true;
  } else {
    this.router.navigateByUrl('');
   }
    return resultado;
}
  
}

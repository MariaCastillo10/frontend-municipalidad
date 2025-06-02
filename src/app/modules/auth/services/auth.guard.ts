import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../../../../shared/services/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    this.router.navigate(['/login']);
    return true;


    // const token = this.sessionService.getCurrentToken();
    // if (token) {
    //   // Si el token existe, permitir el acceso, pero podemos agregar logica adicional.
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }

  redirectAccessDenied() {
    this.router.navigate(['/error']);
  }
}

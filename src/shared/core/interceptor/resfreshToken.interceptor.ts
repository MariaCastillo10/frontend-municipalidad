import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { SessionService } from '../../services/session.service';
import { inject } from '@angular/core';
import { AuthService } from '../../../app/modules/auth/services/auth.service';
const sessionService = inject(SessionService);
const token = sessionService.getCurrentToken();

export const resfreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('REFRESH TOKEN', req);
  console.log(token);
  const authService = inject(AuthService);

  // if (token) {
  //   console.log("INGRESA");

  //   authService.refreshToken(token).subscribe((refresh) => {
  //     sessionService.saveSession(refresh);
  //     const headerModified = req.clone({
  //       headers: req.headers.set('Authorization', `Bearer ${refresh.token}`),
  //     });
  //     return next(headerModified);
  //   });
  // }
  return next(req);
};

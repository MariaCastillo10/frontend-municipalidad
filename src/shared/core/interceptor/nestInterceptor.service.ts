import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptorFn,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  catchError,
  from,
  mergeMap,
  Observable,
  switchMap,
  throwError,
} from 'rxjs';
import { AuthService } from '../../../app/modules/auth/services/auth.service';
import { SessionService } from '../../services/session.service';
import { resfreshTokenInterceptor } from './resfreshToken.interceptor';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('TOKEN');

  const authService = inject(AuthService);
  const sessionService = inject(SessionService);

  if (!req.url.includes('auth')) {
    const token = sessionService.getCurrentToken();
    if (token) {
      const headerModified = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });

      return next(headerModified).pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          if (error.status === 401) {
            return authService.refreshToken(token).pipe(
              switchMap((refresh) => {
                sessionService.saveSession(refresh);
                const headerModifiedx = req.clone({
                  headers: req.headers.set(
                    'Authorization',
                    `Bearer ${refresh.token}`,
                  ),
                });
                return next(headerModifiedx); // Retorna la nueva solicitud
              }),
              catchError((refreshError) => {
                console.error('Error refreshing token', refreshError);
                return throwError(() => refreshError); // Maneja el error al refrescar el token
              }),
            );
          } else {
            return throwError(() => error); // Maneja otros errores
          }
        }),
      );
    } else {
      console.error('No hay token existente!');
    }
  }

  return next(req); // Si no hay token, continúa con la solicitud original
};

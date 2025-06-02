import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../../app/modules/auth/services/auth.service';
import { SessionService } from '../../services/session.service';

export const interceptService: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const sessionService = inject(SessionService);
  const router = inject(Router);
  const authService = inject(AuthService);

  const addToken = (request: HttpRequest<any>, token: string) => {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleError = (
    request: HttpRequest<any>,
    next: HttpHandlerFn,
    error: any,
  ) => {
    console.log('Error en la petición', error);
    if (
      error instanceof HttpErrorResponse &&
      !request.url.includes('login') &&
      error.status === 401
    ) {
      return handle401Error(request, next, error);
    }
    return throwError(() => error);
  };

  const handle401Error = (
    request: HttpRequest<any>,
    next: HttpHandlerFn,
    error: HttpErrorResponse,
  ) => {
    sessionService.removesKeys();
    router.navigate(['/login']);
    return throwError(() => error);
  };

  const token = sessionService.getCurrentToken();
  if (token) {
    req = addToken(req, token);
  }

  return next(req).pipe(catchError((error) => handleError(req, next, error)));
};

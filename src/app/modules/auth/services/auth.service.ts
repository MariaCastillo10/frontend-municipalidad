import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PATHS } from '../../../../shared/common/paths.model';
import { PermissionService } from '../../../../shared/services/permission.service';
import { SessionService } from '../../../../shared/services/session.service';
import { IRegisterData, ISessionData } from '../models/user.model';

// "http://localhost:5001/api/auth/login",
// http://localhost:5001/api/auth/register
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private permissionService: PermissionService,
  ) {}

  login(email: string, password: string): Observable<ISessionData> {
    return this.http.post<ISessionData>(
      `${this.apiUrl}/api${PATHS.INTRANET.Auth}/login`,
      {
        email,
        password,
      },
    );
    // .pipe(
    //   tap((sessionData: ISessionData) => {
    //     this.sessionService.saveSession(sessionData);
    //     this.permissionService.setToken(sessionData.accessToken);
    //   }),
    // );
  }

  register(registerData: IRegisterData): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api${PATHS.INTRANET.Auth}/register`,
      registerData,
    );
  }
}

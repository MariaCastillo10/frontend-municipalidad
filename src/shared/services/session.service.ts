import { Injectable } from '@angular/core';
import { ISessionData } from '../../app/modules/auth/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public static readonly KEY = {
    token: 'PI_int_token',
    user: 'PI_int_user',
  };

  saveSession(sessionData: ISessionData) {
    this.removesKeys();
    localStorage.setItem(SessionService.KEY.token, sessionData.token);
    localStorage.setItem(
      SessionService.KEY.user,
      JSON.stringify(sessionData.user),
    );
  }

  getCurrentToken(): string {
    return localStorage.getItem(SessionService.KEY.token) ?? '';
  }

  getUser(): any {
    const user = localStorage.getItem(SessionService.KEY.user);
    return user ? JSON.parse(user) : null;
  }

  public removesKeys() {
    localStorage.removeItem(SessionService.KEY.token);
    localStorage.removeItem(SessionService.KEY.user);
  }
}

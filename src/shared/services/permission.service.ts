import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private permissions: string[] = [];

  constructor() {
    this.loadPermissionsFromToken();
  }

  setToken(token: string): void {
    const decodedToken: any = jwtDecode(token);
    this.permissions = decodedToken.permissions || [];
  }

  hasPermission(module: string, action: string): boolean {
    const hasPerm = this.permissions.includes(`${module}:${action}`);
    return hasPerm;
  }

  private loadPermissionsFromToken(): void {
    const token = localStorage.getItem('ims_int_token');
    if (token) {
      this.setToken(token);
    }
  }
}

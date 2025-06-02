import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PATHS } from '../common/paths.model';
import { IResponseList } from '@shared/interfaces';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getInspectorsList(): Observable<IResponseList<any[]>> {
    return this.http.get<IResponseList<any[]>>(
      `${this.apiUrl}${PATHS.INTRANET.Users}/?roleName=Inspector`,
    );
  }
}

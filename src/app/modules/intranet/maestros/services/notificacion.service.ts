import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PATHS } from '../../../../../shared/common/paths.model';
import { NotificacionModel } from '../models/notificacion.model';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPendientesList(): Observable<NotificacionModel> {
    return this.http.get<NotificacionModel>(
      `${this.apiUrl}/api${PATHS.INTRANET.Pendiente}`,
    );
  }
}

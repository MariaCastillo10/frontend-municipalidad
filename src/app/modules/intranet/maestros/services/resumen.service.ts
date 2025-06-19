import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseList } from '@shared/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PATHS } from '../../../../../shared/common/paths.model';
import { ResumenModel } from '../models/notificacionInterna.model';

@Injectable({
  providedIn: 'root',
})
export class ResumenService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLicenciaList(): Observable<IResponseList<ResumenModel[]>> {
    return this.http.get<IResponseList<ResumenModel[]>>(
      `${this.apiUrl}/api${PATHS.INTRANET.Resumen}`,
    );
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseList } from '@shared/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PATHS } from '../../../../../shared/common/paths.model';
import { PermisoModel } from '../models/permiso.model';

@Injectable({
  providedIn: 'root',
})
export class PermisoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPermisoList(): Observable<IResponseList<PermisoModel[]>> {
    return this.http.get<IResponseList<PermisoModel[]>>(
      `${this.apiUrl}/api${PATHS.INTRANET.Permiso}`,
    );
  }

  addPermiso(tramite: PermisoModel): Observable<PermisoModel> {
    return this.http.post<PermisoModel>(
      `${this.apiUrl}/api${PATHS.INTRANET.Permiso}`,
      tramite,
    );
  }

  updateEstadoPermiso(id: string, estado: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/api${PATHS.INTRANET.Permiso}/${id}/estado`,
      { estado },
    );
  }

  updatePermiso(id: string, licencia: PermisoModel): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/api${PATHS.INTRANET.Permiso}/${id}`,
      licencia,
    );
  }
}

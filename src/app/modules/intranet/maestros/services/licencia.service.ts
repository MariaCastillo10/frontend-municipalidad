import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseList } from '@shared/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PATHS } from '../../../../../shared/common/paths.model';
import { LicenciaModel } from '../models/licencia.model';

@Injectable({
  providedIn: 'root',
})
export class LicenciaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLicenciaList(): Observable<IResponseList<LicenciaModel[]>> {
    return this.http.get<IResponseList<LicenciaModel[]>>(
      `${this.apiUrl}/api${PATHS.INTRANET.Licencia}`,
    );
  }

  addLicencia(licencia: LicenciaModel): Observable<LicenciaModel> {
    return this.http.post<LicenciaModel>(
      `${this.apiUrl}/api${PATHS.INTRANET.Licencia}`,
      licencia,
    );
  }

  updateEstadoLicencia(id: string, estado: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/api${PATHS.INTRANET.Licencia}/${id}/estado`,
      { estado },
    );
  }

  updateLicencia(id: string, licencia: LicenciaModel): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/api${PATHS.INTRANET.Licencia}/${id}`,
      licencia,
    );
  }

  descargarPDF(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/api${PATHS.INTRANET.Licencia}/${id}/pdf`, {
      responseType: 'blob'
    });
  }
}

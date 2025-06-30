import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseList } from '@shared/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PATHS } from '../../../../../shared/common/paths.model';
import { TramiteModel } from '../models/inventario.model';

@Injectable({
  providedIn: 'root',
})
export class DivorcioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTramiteList(): Observable<IResponseList<TramiteModel[]>> {
    return this.http.get<IResponseList<TramiteModel[]>>(
      `${this.apiUrl}/api${PATHS.INTRANET.Tramite}`,
    );
  }

  addTramite(tramite: TramiteModel): Observable<TramiteModel> {
    return this.http.post<TramiteModel>(
      `${this.apiUrl}/api${PATHS.INTRANET.Tramite}`,
      tramite,
    );
  }

  updateEstadoTramite(id: string, estado: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/api${PATHS.INTRANET.Tramite}/${id}/estado`,
      { estado },
    );
  }

  addPago(tramite: any): Observable<any> {
    return this.http.post<TramiteModel>(
      `${this.apiUrl}/api${PATHS.INTRANET.Tramite}/extraer-recibo`,
      tramite,
    );
  }

  updateTramite(id: string, licencia: TramiteModel): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/api${PATHS.INTRANET.Tramite}/${id}`,
      licencia,
    );
  }

  deleteTramite(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/api${PATHS.INTRANET.Tramite}/${id}`,
    );
  }
}

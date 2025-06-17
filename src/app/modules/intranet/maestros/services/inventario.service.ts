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
// export class InventarioService {
//   private apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   getInventarioList(): Observable<IResponseList<InventarioModel[]>> {
//     return this.http.get<IResponseList<InventarioModel[]>>(
//       `${this.apiUrl}${PATHS.INTRANET.Inventario}`,
//     );
//   }

//   addCalibers(calibers: InventarioModel): Observable<InventarioModel> {
//     return this.http.post<InventarioModel>(
//       `${this.apiUrl + PATHS.INTRANET.Inventario}`,
//       calibers,
//     );
//   }

//   updateCalibers(
//     id: string,
//     calibers: InventarioModel,
//   ): Observable<InventarioModel> {
//     return this.http.put<InventarioModel>(
//       `${this.apiUrl}${PATHS.INTRANET.Inventario}/${id}`,
//       calibers,
//     );
//   }

//   deleteCalibers(id: string): Observable<void> {
//     return this.http.put<void>(
//       `${this.apiUrl}${PATHS.INTRANET.Inventario}/${id}/remove`,
//       {},
//     );
//   }

//   deleteMultipleCalibers(ids: string[]): Observable<void> {
//     const body = { ids };
//     return this.http.put<void>(
//       `${this.apiUrl}${PATHS.INTRANET.Inventario}/remove`,
//       body,
//     );
//   }
// }
export class SolicitudService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {
  }

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
}

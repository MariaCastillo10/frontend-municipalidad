import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PATHS } from '../../../../../shared/common/paths.model';

@Injectable({
  providedIn: 'root',
})
export class DeudaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchDeuda(dni: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api${PATHS.INTRANET.Deuda}/${dni}`,
    );
  }
}

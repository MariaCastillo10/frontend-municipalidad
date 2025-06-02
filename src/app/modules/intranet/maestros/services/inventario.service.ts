import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
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
  private inventarioCollection;
  private apiUrl = environment.apiUrl;

  constructor(
    private firestore: Firestore,
    private http: HttpClient,
  ) {
    this.inventarioCollection = collection(
      this.firestore,
      PATHS.INTRANET.Tramite,
    );
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

  /** Obtener lista de inventario */
  getInventarioList(): Observable<any[]> {
    return collectionData(this.inventarioCollection, { idField: 'id' });
  }

  /** Agregar un nuevo producto al inventario */
  addInventarioItem(item: any): Promise<void> {
    return addDoc(this.inventarioCollection, item)
      .then(() => console.log('✅ Producto agregado con éxito'))
      .catch((error) => console.error('❌ Error al agregar producto:', error));
  }

  /** Actualizar un producto existente en el inventario */
  updateInventarioItem(id: string, data: any): Promise<void> {
    const itemRef = doc(this.firestore, `${PATHS.INTRANET.Tramite}/${id}`);
    return updateDoc(itemRef, data)
      .then(() => console.log(`✅ Producto ${id} actualizado con éxito`))
      .catch((error) =>
        console.error('❌ Error al actualizar producto:', error),
      );
  }

  /** Eliminar un producto del inventario */
  deleteInventarioItem(id: string): Promise<void> {
    const itemRef = doc(this.firestore, `${PATHS.INTRANET.Tramite}/${id}`);
    return deleteDoc(itemRef)
      .then(() => console.log(`✅ Producto ${id} eliminado con éxito`))
      .catch((error) => console.error('❌ Error al eliminar producto:', error));
  }
}

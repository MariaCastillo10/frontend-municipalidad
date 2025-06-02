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
import { Observable } from 'rxjs';
import { PATHS } from '../../../../../shared/common/paths.model';

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
export class InventarioService {
  private inventarioCollection;

  constructor(private firestore: Firestore) {
    this.inventarioCollection = collection(
      this.firestore,
      PATHS.INTRANET.Tramite,
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

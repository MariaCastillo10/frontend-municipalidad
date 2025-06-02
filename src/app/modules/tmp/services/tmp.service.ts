import { Injectable } from '@angular/core';
import { IPlantilla } from '@shared/interfaces';
import { BehaviorSubject } from 'rxjs';
const tmpPlantillas: IPlantilla[] = [];
@Injectable({ providedIn: 'root' })
export class TmpService {
  private plantillaList$ = new BehaviorSubject<IPlantilla[]>(tmpPlantillas);
  private newPlanillaData$ = new BehaviorSubject<IPlantilla[]>(tmpPlantillas);

  updateValue(nuevaPlantilla: IPlantilla) {
    console.log(nuevaPlantilla);

    this.plantillaList$.next([...this.plantillaList$.value, nuevaPlantilla]);
  }

  getValue() {
    return this.plantillaList$.asObservable();
  }
}

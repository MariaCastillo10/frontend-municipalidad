import { FORM_TYPE, HEADER_TYPE, SELECTOR_TYPE } from '@shared/interfaces';

export interface IPlantillaFront extends Omit<IRowPlantilla, 'name'> {
  sectionPosition?: number;
  name: string;
  rowName: string;
}

export interface IPlantilla {
  id?: string;
  code: string;
  name: string;
  description?: string;
  isPublished: boolean;
  headers: ITypeInput[];
  type: FORM_TYPE;
  sections: ISectionPlantilla[];
}

export interface ISectionPlantilla {
  id?: string;
  name: string;
  position: number;
  rows: IRowPlantilla[];
}

export interface IRowPlantilla {
  id?: string;
  position: number;
  isEditable: boolean;
  isOnlyText: boolean;
  isTotal?: boolean;
  isTolerance?: boolean;
  name: string;
  cells: ICellPlantilla[];
}

export interface ICellPlantilla {
  id?: string;
  name: string;
  position: number;
}

export interface ITypeInput {
  id?: string; //
  position: number; // posicion del array
  headerType: HEADER_TYPE; //
  columnSize: string; //ColumnSize
  headerValue: any; // String - Number - Boolean - Date
  name: string; //Name Optional;
  selectorType?: SELECTOR_TYPE; // category
}

export interface IPlantillaList {
  id?: string;
  name: string;
  description?: string;
  isPublished: boolean;
  type: FORM_TYPE;
}

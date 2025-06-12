export class PermisoModel {
  id?: string;
  _id: string;
  tipo: number;
  lugar: string;
  fecha: Date;
  horario: string;
  aforo: number;
  estado: number;
  correo: string;

  constructor(params?: Partial<PermisoModel>) {
    this.id = params?.id || '';
    this._id = params?._id || '';
    this.fecha = params?.fecha || new Date();
    this.estado = params?.estado || 0;
    this.tipo = params?.tipo || 0;
    this.lugar = params?.lugar || '';
    this.horario = params?.horario || '';
    this.aforo = params?.aforo || 0;
    this.estado = params?.estado || 0;
    this.correo = params?.correo || '';
  }
}

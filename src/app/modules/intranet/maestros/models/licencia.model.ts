export class LicenciaModel {
  id?: string;
  _id: string;
  razonSocial: string;
  ruc: string;
  representanteLegal: string;
  dni: string;
  direccion: string;
  giroNegocio: string;
  telefono: string;
  correo: string;
  fechaSolicitud?: Date;
  estado: number;
  observaciones: string;

  constructor(params?: Partial<LicenciaModel>) {
    this.id = params?.id || '';
    this._id = params?._id || '';
    this.razonSocial = params?.razonSocial || '';
    this.ruc = params?.ruc || '';
    this.representanteLegal = params?.representanteLegal || '';
    this.dni = params?.dni || '';
    this.direccion = params?.direccion || '';
    this.giroNegocio = params?.giroNegocio || '';
    this.telefono = params?.telefono || '';
    this.correo = params?.correo || '';
    this.fechaSolicitud = params?.fechaSolicitud || new Date();
    this.estado = params?.estado || 0;
    this.observaciones = params?.observaciones || '';
  }
}

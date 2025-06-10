export class InventarioModel {
  id: string;
  index: number;
  codigo: string;
  nombre: string;
  costo: number;
  unidades: number;
  porciones: number;

  constructor(params?: Partial<InventarioModel>) {
    this.id = params?.id || '';
    this.index = params?.index || 0;
    this.codigo = params?.codigo || '';
    this.nombre = params?.nombre || '';
    this.costo = params?.costo || 0;
    this.unidades = params?.unidades || 0;
    this.porciones = params?.porciones || 0;
  }
}

export class TramiteModel {
  id?: string;
  index: number;
  dniSolicitante: string;
  nombreSolicitante: string;
  correoSolicitante: string;
  celularSolicitante: string;
  direccionSolicitante: string;
  dniConyuge: string;
  nombreConyuge: string;
  correoConyuge: string;
  celularConyuge: string;
  fechaMatrimonio: string;
  municipalidad: number;
  distrito: number;
  estado: number;
  codigoPago: string;
  fechaPago: string;
  montoPago: string;
  nombrePago: string;
  nroOperacionPago: string;

  constructor(params?: Partial<TramiteModel>) {
    this.id = params?.id || '';
    this.index = params?.index || 0;
    this.dniSolicitante = params?.dniSolicitante || '';
    this.nombreSolicitante = params?.nombreSolicitante || '';
    this.correoSolicitante = params?.correoSolicitante || '';
    this.celularSolicitante = params?.celularSolicitante || '';
    this.direccionSolicitante = params?.direccionSolicitante || '';
    this.dniConyuge = params?.dniConyuge || '';
    this.nombreConyuge = params?.nombreConyuge || '';
    this.correoConyuge = params?.correoConyuge || '';
    this.celularConyuge = params?.celularConyuge || '';
    this.fechaMatrimonio = params?.fechaMatrimonio || '';
    this.municipalidad = params?.municipalidad || 0;
    this.distrito = params?.distrito || 0;
    this.estado = params?.estado || 0;
    this.codigoPago = params?.codigoPago || '';
    this.fechaPago = params?.fechaPago || '';
    this.montoPago = params?.montoPago || '';
    this.nombrePago = params?.nombrePago || '';
    this.nroOperacionPago = params?.nroOperacionPago || '';
  }
}

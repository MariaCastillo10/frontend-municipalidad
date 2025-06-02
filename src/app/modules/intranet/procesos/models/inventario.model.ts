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

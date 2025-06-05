export class NotificacionModel {
  divorciosPendientes: number;
  licenciasPendientes: number;

  constructor(params?: Partial<NotificacionModel>) {
    this.divorciosPendientes = params?.divorciosPendientes || 0;
    this.licenciasPendientes = params?.licenciasPendientes || 0;
  }
}

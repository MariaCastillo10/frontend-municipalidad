import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  confirm(
    message: string,
    header: string,
    acceptCallback: () => void,
    rejectCallback?: () => void,
  ) {
    this.confirmationService.confirm({
      message: message,
      header: header,
      icon: 'pi pi-exclamation-triangle',
      accept: acceptCallback,
      reject: rejectCallback,
    });
  }

  error(message: string, header: string = 'Error') {
    this.messageService.add({
      severity: 'error',
      summary: header,
      detail: message,
      icon: 'pi pi-times',
    });
  }

  warn(message: string, header: string = 'Advertencia') {
    this.messageService.add({
      severity: 'warn',
      summary: header,
      detail: message,
      icon: 'pi pi-exclamation-circle',
    });
  }

  success(message: string, header: string = 'Éxito') {
    console.log(message, header);

    this.messageService.add({
      severity: 'success',
      summary: header,
      detail: message,
      icon: 'pi pi-check',
    });
  }
}

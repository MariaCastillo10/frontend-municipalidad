import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { NotificacionModel } from '../intranet/maestros/models/notificacion.model';
import { NotificacionService } from '../intranet/maestros/services/notificacion.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ToastModule, DialogModule, ButtonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  mostrarDialog = false;
  pendientes = new NotificacionModel();
  esAdmin: boolean = false;

  constructor(
    private notificacionService: NotificacionService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.capturarNombre();
    if (this.esAdmin) {
      this.Notificacion();
      this.VerDialog();
    }
  }

  capturarNombre() {
    const user = localStorage.getItem('PI_int_user');
    if (user) {
      const userObj = JSON.parse(user);
      this.esAdmin = userObj.esAdmin;
    }
  }

  Notificacion() {
    this.notificacionService.getPendientesList().subscribe((res) => {
      const totalPendientes =
        (res.divorciosPendientes || 0) + (res.licenciasPendientes || 0);
      if (totalPendientes > 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Pendientes por revisar',
          detail: `Tienes ${res.divorciosPendientes} divorcios y ${res.licenciasPendientes} licencias pendientes.`,
          life: 6000,
        });
      }
    });
  }

  VerDialog() {
    this.notificacionService.getPendientesList().subscribe((res) => {
      const totalPendientes =
        (res.divorciosPendientes || 0) + (res.licenciasPendientes || 0);
      if (totalPendientes > 0) {
        this.pendientes = res;
        this.mostrarDialog = true;
      }
    });
  }

  verListado(tipo: 'inventario' | 'licencia') {
    this.mostrarDialog = false;
    if (tipo === 'inventario') {
      this.router.navigate(['/inventario']);
    } else if (tipo === 'licencia') {
      this.router.navigate(['/licencia']);
    }
  }
}

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMSTableComponent } from '@shared/components';
import { ButtonItems, ITableConfig } from '@shared/interfaces';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Constans } from '../../../../../../../shared/common/constants.model';
import { InputComponent } from '../../../../../../../shared/components/input/input.component';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { PopupService } from '../../../../../../../shared/services/dialog.service';
import { Converter } from '../../../../../../../shared/tools/converter.helper';
import { TramiteModel } from '../../../models/inventario.model';
import { DeudaService } from '../../../services/deuda.service';
import { rptModuleExcel } from '../../../utils/report-excel';
import { rptModulePDF } from '../../../utils/report-pdf';
import { EditRentaComponent } from '../edit/edit-permiso.component';
@Component({
  selector: 'list-permisos',
  standalone: true,
  imports: [
    IMSTableComponent,
    CommonModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    CalendarModule,
    SplitButtonModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    TooltipModule,
    BadgeModule,
    InputComponent,
  ],
  templateUrl: './index-permiso.component.html',
  providers: [AlertService, ConfirmationService, MessageService],
})
export class RentasComponent implements OnInit {
  @ViewChild(EditRentaComponent)
  editInventarioComponent!: EditRentaComponent;

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  listInventario: TramiteModel[] = [];
  filteredInventario: TramiteModel[] = [];
  searchTerm: string = '';
  usuario: any = null;
  #alertService = inject(AlertService);

  configTable: ITableConfig = {
    selection: false,
    columns: [
      { columnName: 'Concepto', property: 'concepto', sortable: true },
      { columnName: 'Monto', property: 'monto', sortable: true },
      {
        columnName: 'Fecha de Emisión',
        property: 'fechaEmision',
        sortable: true,
      },
      {
        columnName: 'Fecha de Vencimiento',
        property: 'fechaVencimiento',
        sortable: true,
      },
      { columnName: 'Estado', property: 'estado', sortable: true },
      {
        columnName: 'Observaciones',
        property: 'observaciones',
        sortable: false,
      },
      {
        columnName: 'Acciones',
        property: 'acciones',
        sortable: false,
        width: '170px',
      },
    ],
  };

  displayPopup: boolean = false;
  popupTitle: string = '';
  items: ButtonItems[] = [];
  exportAll: boolean = true;
  esAdmin: boolean = false;
  public Constans = Constans;
  dniIngresado: string = '';
  usuarioEncontrado: any = null;
  mostrarTablaDeuda: boolean = false;
  deudas: any[] = [];
  dni: string = '';

  constructor(
    private popup: PopupService,
    private deudaService: DeudaService,
    private alertService: AlertService,
  ) {
    this.items = Converter.createButtonItems(
      this.exportToExcel.bind(this),
      this.exportToPDF.bind(this),
    );
  }

  ngOnInit() {
    this.capturarNombre();
    this.list();
  }

  list() {
    // this.deuda.getPermisoList().subscribe((response: any) => {
    //   this.listInventario = (response || []).map(
    //     (item: any, index: number) => ({
    //       ...item,
    //       id: item._id,
    //       index: index + 1,
    //       tipo: Constans.TIPO_PERMISO.toString(item.tipo),
    //       estadoValue: item.estado,
    //       estado: Constans.TYPE_ESTADO.toString(item.estado),
    //       lugar: Constans.LUGAR_LIST.toString(item.lugar),
    //     }),
    //   );
    //   this.filteredInventario = this.listInventario;
    // });
  }

  filterInventario() {
    const searchValue = this.searchTerm.toLowerCase();
    this.filteredInventario = this.listInventario.filter((Calibers) =>
      Object.values(Calibers).some((val) =>
        String(val).toLowerCase().includes(searchValue),
      ),
    );
  }

  edit(rowData: any) {
    this.editInventarioComponent.inventarioSaved.subscribe(() => {
      this.list();
      this.searchTerm = '';
    });
    this.popup.showPopup('Editar registro', rowData);
    this.displayPopup = true;
  }

  buscarPorDni() {
    if (!this.dniIngresado.trim()) {
      this.alertService.warn('Debe ingresar un número de DNI válido');
      return;
    }

    console.log('HOLA', this.dniIngresado);

    this.deudaService.searchDeuda(this.dniIngresado).subscribe({
      next: (usuario: any) => {
        if (usuario) {
          this.deudas = Array.isArray(usuario) ? usuario : [];
          this.usuarioEncontrado = usuario.length ? usuario[0] : null;
          this.mostrarTablaDeuda = this.deudas.length > 0;
          this.alertService.success('Usuario encontrado');
        } else {
          this.alertService.warn('No se encontró usuario con ese DNI');
          this.usuarioEncontrado = null;
          this.mostrarTablaDeuda = false;
        }
      },
      error: (error) => {
        console.error('Error al buscar por DNI:', error);
        this.alertService.error('Error al buscar usuario');
      },
    });
  }

  enviarLinkPago(value: any) {
    this.#alertService.confirm(
      '¿Desea enviar el detalle y método de pago a su correo electronico?',
      'Guardar',
      () => {
        this.alertService.success('Se ha enviado correctamente');
      },
    );
  }

  capturarNombre() {
    const user = localStorage.getItem('PI_int_user');
    if (user) {
      const userObj = JSON.parse(user);
      this.esAdmin = userObj.esAdmin;
    }
  }

  aprobar(rowData: any) {
    // this.alertService.confirm(
    //   `¿Está seguro de aprobar la solicitud de <strong>${rowData.nombreSolicitante}</strong>?`,
    //   'Aprobar solicitud',
    //   () => {
    //     this.deudaService.updateEstadoPermiso(rowData._id, 2).subscribe({
    //       next: () => {
    //         this.alertService.success('Registro aprobado exitosamente');
    //         this.list();
    //       },
    //       error: (error) => {
    //         console.error('❌ Error al aprobar:', error);
    //         this.alertService.error('No se pudo aprobar la solicitud');
    //       },
    //     });
    //   },
    //   () => {
    //     console.log('🛑 Aprobación cancelada');
    //   },
    // );
  }

  new() {
    this.editInventarioComponent.inventarioSaved.subscribe(() => {
      this.list();
      this.searchTerm = '';
    });
    this.popup.showPopup('Nuevo registro', {});
    this.displayPopup = true;
  }

  delete(rowData: any) {}

  exportToExcel = async () => {
    try {
      await rptModuleExcel.rptCalibersExcel.create(this.filteredInventario);
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
    }
  };

  exportToPDF = async () => {
    try {
      const pdf = await rptModulePDF.rptCalibersPdf.create(
        this.filteredInventario,
      );
      pdf.download(`Rpt-Divorcios - ${new Date().toLocaleDateString()}.pdf`);
    } catch (error) {
      console.error('Error al exportar a PDF:', error);
    }
  };
}

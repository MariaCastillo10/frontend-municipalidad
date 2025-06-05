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
import { SearchComponent } from '../../../../../../../shared/components/search/search.component';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { PopupService } from '../../../../../../../shared/services/dialog.service';
import { PermissionService } from '../../../../../../../shared/services/permission.service';
import { Converter } from '../../../../../../../shared/tools/converter.helper';
import { LicenciaModel } from '../../../models/licencia.model';
import { LicenciaService } from '../../../services/licencia.service';
import { rptModuleExcel } from '../../../utils/report-excel';
import { rptModulePDF } from '../../../utils/report-pdf';
import { EditLicenciaComponent } from '../edit/edit-inventario.component';
@Component({
  selector: 'list-licencia',
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
    SearchComponent,
    MessageModule,
    MessagesModule,
    ToastModule,
    EditLicenciaComponent,
    TooltipModule,
    BadgeModule,
  ],
  templateUrl: './index-inventario.component.html',
  providers: [AlertService, ConfirmationService, MessageService],
})
export class LicenciasComponent implements OnInit {
  @ViewChild(EditLicenciaComponent)
  editInventarioComponent!: EditLicenciaComponent;

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  listInventario: LicenciaModel[] = [];
  filteredInventario: LicenciaModel[] = [];
  searchTerm: string = '';

  configTable: ITableConfig = {
    selection: false,
    columns: [
      { columnName: '#', property: 'index', sortable: true },
      { columnName: 'Fecha', property: 'fechaSolicitud', sortable: true },
      {
        columnName: 'Representante',
        property: 'representanteLegal',
        sortable: true,
      },
      { columnName: 'DNI', property: 'dni', sortable: true },
      { columnName: 'Dirección', property: 'direccion', sortable: true },
      { columnName: 'Estado', property: 'estado', sortable: true },
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

  constructor(
    private popup: PopupService,
    private licenciaService: LicenciaService,
    private alertService: AlertService,
    public permissionService: PermissionService,
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
    this.licenciaService.getLicenciaList().subscribe((response: any) => {
      this.listInventario = (response || []).map(
        (item: any, index: number) => ({
          ...item,
          id: item._id,
          index: index + 1,
          estado: Constans.TYPE_ESTADO.toString(item.estado),
          estadoValue: item.estado,
        }),
      );
      this.filteredInventario = this.listInventario;
    });
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

  capturarNombre() {
    const user = localStorage.getItem('PI_int_user');
    if (user) {
      const userObj = JSON.parse(user);
      this.esAdmin = userObj.esAdmin;
    }
  }

  aprobar(rowData: any) {
    this.alertService.confirm(
      `¿Está seguro de aprobar la solicitud de <strong>${rowData.representanteLegal}</strong>?`,
      'Aprobar solicitud',
      () => {
        this.licenciaService.updateEstadoLicencia(rowData._id, 2).subscribe({
          next: () => {
            this.alertService.success('Registro aprobado exitosamente');
            this.list();
          },
          error: (error) => {
            console.error('❌ Error al aprobar:', error);
            this.alertService.error('No se pudo aprobar la solicitud');
          },
        });
      },
      () => {
        console.log('🛑 Aprobación cancelada');
      },
    );
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
      const pdf = await rptModulePDF.rptLicenciaPdf.create(
        this.filteredInventario,
      );
      pdf.download(`Rpt-Licencias- ${new Date().toLocaleDateString()}.pdf`);
    } catch (error) {
      console.error('Error al exportar a PDF:', error);
    }
  };
}

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
import { Converter } from '../../../../../../../shared/tools/converter.helper';
import { TramiteModel } from '../../../models/inventario.model';
import { PermisoService } from '../../../services/permiso.service';
import { rptModuleExcel } from '../../../utils/report-excel';
import { rptModulePDF } from '../../../utils/report-pdf';
import { EditPermisoComponent } from '../edit/edit-permiso.component';
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
    SearchComponent,
    MessageModule,
    MessagesModule,
    ToastModule,
    EditPermisoComponent,
    TooltipModule,
    BadgeModule,
  ],
  templateUrl: './index-permiso.component.html',
  providers: [AlertService, ConfirmationService, MessageService],
})
export class PermisosComponent implements OnInit {
  @ViewChild(EditPermisoComponent)
  editInventarioComponent!: EditPermisoComponent;

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  listPermiso: TramiteModel[] = [];
  filteredPermiso: TramiteModel[] = [];
  searchTerm: string = '';

  configTable: ITableConfig = {
    selection: false,
    columns: [
      { columnName: '#', property: 'index', sortable: true },
      {
        columnName: 'Nombres',
        property: 'nombreSolicitante',
        sortable: true,
      },
      {
        columnName: 'Tipo',
        property: 'tipo',
        sortable: true,
      },
      { columnName: 'Lugar', property: 'lugar', sortable: true },
      { columnName: 'Fecha', property: 'fecha', sortable: true },
      { columnName: 'Horario', property: 'horario', sortable: true },
      { columnName: 'Aforo', property: 'aforo', sortable: true },
      { columnName: 'Costo x Aforo', property: 'costo', sortable: true },
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
    private permisoService: PermisoService,
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
    this.permisoService.getPermisoList().subscribe((response: any) => {
      this.listPermiso = (response || []).map((item: any, index: number) => ({
        ...item,
        id: item._id,
        index: index + 1,
        tipo: Constans.TIPO_PERMISO.toString(item.tipo),
        estadoValue: item.estado,
        estado: Constans.TYPE_ESTADO.toString(item.estado),
        lugar: Constans.LUGAR_LIST.toString(item.lugar),
      }));
      this.filteredPermiso = this.listPermiso;
    });
  }

  filterInventario() {
    const searchValue = this.searchTerm.toLowerCase();
    this.filteredPermiso = this.listPermiso.filter((Calibers) =>
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
      `¿Está seguro de aprobar la solicitud de <strong>${rowData.nombreSolicitante}</strong>?`,
      'Aprobar solicitud',
      () => {
        this.permisoService.updateEstadoPermiso(rowData._id, 2).subscribe({
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

  delete(rowData: any) {
    this.alertService.confirm(
      `¿Está seguro de eliminar la solicitud de <strong>${rowData.nombreSolicitante}</strong>?`,
      'Aprobar solicitud',
      () => {
        this.permisoService.deletePermiso(rowData._id).subscribe({
          next: () => {
            this.alertService.success('Registro eliminado exitosamente');
            this.list();
          },
          error: (error) => {
            console.error('❌ Error al aprobar:', error);
            this.alertService.error('No se pudo eliminar la solicitud');
          },
        });
      },
      () => {
        console.log('🛑 Aprobación cancelada');
      },
    );
  }

  exportToExcel = async () => {
    try {
      await rptModuleExcel.rptPermisoExcel.create(this.filteredPermiso);
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
    }
  };

  exportToPDF = async () => {
    try {
      const pdf = await rptModulePDF.rptPermisosPdf.create(
        this.filteredPermiso,
      );
      pdf.download(`Rpt-Divorcios - ${new Date().toLocaleDateString()}.pdf`);
    } catch (error) {
      console.error('Error al exportar a PDF:', error);
    }
  };
}

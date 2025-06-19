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
import { SolicitudService } from '../../../services/inventario.service';
import { rptModuleExcel } from '../../../utils/report-excel';
import { rptModulePDF } from '../../../utils/report-pdf';
import { EditMatrimonioComponent } from '../edit/edit-inventario.component';
@Component({
  selector: 'list-inventario',
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
    EditMatrimonioComponent,
    TooltipModule,
    BadgeModule,
  ],
  templateUrl: './index-inventario.component.html',
  providers: [AlertService, ConfirmationService, MessageService],
})
export class MatrimoniosComponent implements OnInit {
  @ViewChild(EditMatrimonioComponent)
  editInventarioComponent!: EditMatrimonioComponent;

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  listInventario: TramiteModel[] = [];
  filteredInventario: TramiteModel[] = [];
  searchTerm: string = '';

  configTable: ITableConfig = {
    selection: false,
    columns: [
      { columnName: '#', property: 'index', sortable: true },
      {
        columnName: 'Solicitante',
        property: 'nombreSolicitante',
        sortable: true,
      },
      { columnName: 'Cónyuge', property: 'nombreConyuge', sortable: true },
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
    private solicitudService: SolicitudService,
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
    this.solicitudService.getTramiteList().subscribe((response: any) => {
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
      `¿Está seguro de aprobar la solicitud de <strong>${rowData.nombreSolicitante}</strong>?`,
      'Aprobar solicitud',
      () => {
        this.solicitudService.updateEstadoTramite(rowData._id, 2).subscribe({
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
    // this.alertService.confirm(
    //   `¿Está seguro de eliminar el registro <strong>${rowData.nombre}</strong>?`,
    //   'Eliminar registro',
    //   () => {
    //     this.solicitudService
    //       .deleteInventarioItem(rowData.id)
    //       .then(() => {
    //         this.alertService.success('Registro eliminado correctamente');
    //         this.searchTerm = '';
    //         this.list();
    //       })
    //       .catch((error) => {
    //         console.error('❌ Error al eliminar el registro:', error);
    //       });
    //   },
    //   () => {
    //     console.log('🛑 Eliminación cancelada');
    //   },
    // );
  }

  exportToExcel = async () => {
    try {
      await rptModuleExcel.rptMatrimonioExcel.create(this.filteredInventario);
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
    }
  };

  exportToPDF = async () => {
    try {
      const pdf = await rptModulePDF.rptMatrominioPdf.create(
        this.filteredInventario,
      );
      pdf.download(`Rpt-Divorcios - ${new Date().toLocaleDateString()}.pdf`);
    } catch (error) {
      console.error('Error al exportar a PDF:', error);
    }
  };
}

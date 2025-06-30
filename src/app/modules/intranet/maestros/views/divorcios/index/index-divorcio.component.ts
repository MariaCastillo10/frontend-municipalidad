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
import { DivorcioService } from '../../../services/inventario.service';
import { rptModuleExcel } from '../../../utils/report-excel';
import { rptModulePDF } from '../../../utils/report-pdf';
import { EditDivorcioComponent } from '../edit/edit-divorcio.component';
@Component({
  selector: 'list-divorcios',
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
    EditDivorcioComponent,
    TooltipModule,
    BadgeModule,
  ],
  templateUrl: './index-divorcio.component.html',
  providers: [AlertService, ConfirmationService, MessageService],
})
export class DivorciosComponent implements OnInit {
  @ViewChild(EditDivorcioComponent)
  editInventarioComponent!: EditDivorcioComponent;

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  listDivorcio: TramiteModel[] = [];
  filteredDivorcio: TramiteModel[] = [];
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
    private divorcioService: DivorcioService,
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
    this.divorcioService.getTramiteList().subscribe((response: any) => {
      this.listDivorcio = (response || []).map((item: any, index: number) => ({
        ...item,
        id: item._id,
        index: index + 1,
        estado: Constans.TYPE_ESTADO.toString(item.estado),
        estadoValue: item.estado,
      }));
      this.filteredDivorcio = this.listDivorcio;
    });
  }

  filterDivorcio() {
    const searchValue = this.searchTerm.toLowerCase();
    this.filteredDivorcio = this.listDivorcio.filter((Calibers) =>
      Object.values(Calibers).some((val) =>
        String(val).toLowerCase().includes(searchValue),
      ),
    );
  }

  edit(rowData: any) {
    this.editInventarioComponent.divorcioSaved.subscribe(() => {
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
        this.divorcioService.updateEstadoTramite(rowData._id, 2).subscribe({
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
    this.editInventarioComponent.divorcioSaved.subscribe(() => {
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
        this.divorcioService.deleteTramite(rowData._id).subscribe({
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
      await rptModuleExcel.rptDivorcioExcel.create(this.filteredDivorcio);
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
    }
  };

  exportToPDF = async () => {
    try {
      const pdf = await rptModulePDF.rptDivorcioPdf.create(
        this.filteredDivorcio,
      );
      pdf.download(`Rpt-Divorcios - ${new Date().toLocaleDateString()}.pdf`);
    } catch (error) {
      console.error('Error al exportar a PDF:', error);
    }
  };
}

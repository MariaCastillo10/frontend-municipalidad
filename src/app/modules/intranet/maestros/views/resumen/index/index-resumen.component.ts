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
import { ResumenService } from '../../../services/resumen.service';

@Component({
  selector: 'list-resumen',
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
    TooltipModule,
    BadgeModule,
  ],
  templateUrl: './index-resumencomponent.html',
  providers: [AlertService, ConfirmationService, MessageService],
})
export class ResumenComponent implements OnInit {

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
        columnName: 'Persona',
        property: 'nombres',
        sortable: true,
      },
      { columnName: 'Correo', property: 'correo', sortable: true },
      { columnName: 'Modulo', property: 'modulo', sortable: true },
      { columnName: 'Área', property: 'areaDestino', sortable: true },
      { columnName: 'Prioridad', property: 'prioridad', sortable: true },
      { columnName: 'Msjs enviados', property: 'totalEnviados', sortable: true }
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
    private resumenService: ResumenService,
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
    this.resumenService.getLicenciaList().subscribe((response: any) => {
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
      console.log('this.filteredInventario ', this.filteredInventario )
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

  capturarNombre() {
    const user = localStorage.getItem('PI_int_user');
    if (user) {
      const userObj = JSON.parse(user);
      this.esAdmin = userObj.esAdmin;
    }
  }

  aprobar(rowData: any) {
  }

  new() {
  }

  delete(rowData: any) {
  }

  exportToExcel = async () => {

  };

  exportToPDF = async () => {

  };
}

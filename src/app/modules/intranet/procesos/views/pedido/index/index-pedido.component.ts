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
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { SearchComponent } from '../../../../../../../shared/components/search/search.component';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { PopupService } from '../../../../../../../shared/services/dialog.service';
import { PermissionService } from '../../../../../../../shared/services/permission.service';
import { Converter } from '../../../../../../../shared/tools/converter.helper';
import { InventarioModel } from '../../../models/inventario.model';
import { InventarioService } from '../../../services/inventario.service';
import { rptModuleExcel } from '../../../utils/report-excel';
import { rptModulePDF } from '../../../utils/report-pdf';
import { EditpedidoComponent } from '../edit/edit-pedido.component';

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
    TooltipModule,
    BadgeModule,
    EditpedidoComponent,
    CardModule,
  ],
  templateUrl: './index-pedido.component.html',
  styleUrls: ['./index-pedido.component.scss'],
  providers: [AlertService, ConfirmationService, MessageService],
})
export class pedidoComponent implements OnInit {
  @ViewChild(EditpedidoComponent)
  editInventarioComponent!: EditpedidoComponent;

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  listInventario: InventarioModel[] = [];
  filteredInventario: any[] = [];
  searchTerm: string = '';

  configTable: ITableConfig = {
    selection: false,
    columns: [
      { columnName: '#', property: 'index', sortable: true },
      { columnName: 'Código', property: 'codigo', sortable: true },
      { columnName: 'Nombre', property: 'nombre', sortable: true },
      { columnName: 'Costo', property: 'costo', sortable: true },
      { columnName: 'Unidades', property: 'unidades', sortable: true },
      { columnName: 'Porciones', property: 'porciones', sortable: true },
      {
        columnName: 'Acciones',
        property: 'acciones',
        sortable: false,
        width: '140px',
      },
    ],
  };

  displayPopup: boolean = false;
  popupTitle: string = '';
  items: ButtonItems[] = [];
  exportAll: boolean = true;

  pedidos: any[] = [];

  constructor(
    private popup: PopupService,
    private inventarioService: InventarioService,
    private alertService: AlertService,
    public permissionService: PermissionService,
  ) {
    this.items = Converter.createButtonItems(
      this.exportToExcel.bind(this),
      this.exportToPDF.bind(this),
    );
  }

  ngOnInit() {
    this.pedidos = [
      {
        numeroPedido: 1,
        numeroMesa: 5,
        hora: '12:30 PM',
        estado: 'Para llevar',
        color: 'green',
        resumen: '2 hamburguesas, 1 gaseosa',
      },
      {
        numeroPedido: 2,
        numeroMesa: 3,
        hora: '1:00 PM',
        estado: 'Delivery',
        color: 'yellow',
        resumen: '1 pizza grande, 2 cervezas',
      },
      {
        numeroPedido: 3,
        numeroMesa: 7,
        hora: '1:15 PM',
        estado: 'Observado',
        color: 'red',
        resumen: '1 ensalada, 1 jugo natural',
      },
      {
        numeroPedido: 4,
        numeroMesa: 2,
        hora: '1:45 PM',
        estado: 'Para llevar',
        color: 'green',
        resumen: '3 tacos, 1 refresco',
      },
      {
        numeroPedido: 5,
        numeroMesa: 8,
        hora: '2:00 PM',
        estado: 'Delivery',
        color: 'yellow',
        resumen: '1 sushi combo, 1 té verde',
      },
    ];
  }

  list() {
    this.inventarioService.getInventarioList().subscribe((data) => {
      this.listInventario = data.map((item: any, index: number) => ({
        ...item,
        index: index + 1,
      }));
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
      `¿Está seguro de eliminar el registro <strong>${rowData.nombre}</strong>?`,
      'Eliminar registro',
      () => {
        this.inventarioService
          .deleteInventarioItem(rowData.id)
          .then(() => {
            this.alertService.success('Registro eliminado correctamente');
            this.searchTerm = '';
            this.list();
          })
          .catch((error) => {
            console.error('❌ Error al eliminar el registro:', error);
          });
      },
      () => {
        console.log('🛑 Eliminación cancelada');
      },
    );
  }

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
      pdf.download(`Rpt-Inventario - ${new Date().toLocaleDateString()}.pdf`);
    } catch (error) {
      console.error('Error al exportar a PDF:', error);
    }
  };
}

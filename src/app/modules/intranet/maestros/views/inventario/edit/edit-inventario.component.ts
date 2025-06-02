import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { Constans } from '../../../../../../../shared/common/constants.model';
import { InputComponent } from '../../../../../../../shared/components/input/input.component';
import { PopupComponent } from '../../../../../../../shared/components/popup/popup.component';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { PopupService } from '../../../../../../../shared/services/dialog.service';
import { TramiteModel } from '../../../models/inventario.model';
import { SolicitudService } from '../../../services/inventario.service';

@Component({
  selector: 'app-edit-inventario',
  templateUrl: './edit-inventario.component.html',
  styleUrls: ['./edit-inventario.component.scss'],
  standalone: true,
  imports: [
    PopupComponent,
    CommonModule,
    ButtonModule,
    InputComponent,
    ReactiveFormsModule,
    ToastModule,
    CalendarModule,
    DropdownModule,
    FileUploadModule,
  ],
})
export class EditInventarioComponent implements OnInit {
  @Output() inventarioSaved = new EventEmitter<void>();
  visible: boolean = false;
  title: string = '';
  data: TramiteModel = new TramiteModel();
  codigo: string = '';
  nombre: string = '';
  listInventario: TramiteModel[] = [];
  municipalidadCbo: any[] = [];
  distritoCbo: any[] = [];
  form: FormGroup;

  constructor(
    private popupService: PopupService,
    private fb: FormBuilder,
    private tramiteService: SolicitudService,
    private alertService: AlertService,
  ) {
    this.form = this.fb.group({
      dniSolicitante: ['', Validators.required],
      nombreSolicitante: ['', Validators.required],
      correoSolicitante: ['', Validators.required],
      celularSolicitante: [''],
      direccionSolicitante: [''],
      dniConyuge: [''],
      nombreConyuge: [''],
      correoConyuge: [''],
      celularConyuge: [''],
      fechaMatrimonio: [new Date()],
      municipalidad: [''],
      distrito: [''],
    });
  }

  ngOnInit() {
    this.popupService.displayPopup$.subscribe((visible) => {
      this.visible = visible;
      if (!visible) {
        this.resetForm();
      }
    });
    this.popupService.popupTitle$.subscribe((title) => {
      this.title = title;
    });
    this.popupService.popupData$.subscribe((data) => {
      this.data = new TramiteModel(data);
      let fechaMatrimonio = this.data.fechaMatrimonio
        ? new Date(this.data.fechaMatrimonio)
        : null;

      if (this.data) {
        this.form.patchValue({
          dniSolicitante: this.data.dniSolicitante,
          nombreSolicitante: this.data.nombreSolicitante,
          correoSolicitante: this.data.correoSolicitante,
          celularSolicitante: this.data.celularSolicitante,
          direccionSolicitante: this.data.direccionSolicitante,
          dniConyuge: this.data.dniConyuge,
          nombreConyuge: this.data.nombreConyuge,
          correoConyuge: this.data.correoConyuge,
          celularConyuge: this.data.celularConyuge,
          fechaMatrimonio: fechaMatrimonio,
          municipalidad: this.data.municipalidad,
          distrito: this.data.distrito,
        });
        this.nombre = this.data.nombreSolicitante;
        this.title = ` ${this.title} | ${this.nombre}`;
      }
    });
    this.municipalidadCbo = Constans.MUNICIPALIDAD_LIST.toList();
    this.distritoCbo = Constans.DISTRITO_LIST.toList();
  }

  close() {
    this.popupService.hidePopup();
  }

  save() {
    if (this.form.valid) {
      const tramite = this.form.value as TramiteModel;
      tramite.id = this.data.id;
      tramite.estado = 1;
      // tramite.esAdmin = false;

      if (!tramite.id) {
        this.tramiteService.addTramite(tramite).subscribe((response) => {
          this.inventarioSaved.emit();
          this.alertService.success('Registro Agregado Exitosamente');
          this.close();
        });
      }
      // else {
      //   this.inventarioService
      //     .updateInventarioItem(inventario.id, inventario)
      //     .then(() => {
      //       console.log('✅ Registro actualizado con éxito');
      //       this.inventarioSaved.emit();
      //       this.resetForm();
      //       this.alertService.success('Registro Actualizado Exitosamente');
      //       this.close();
      //     })
      //     .catch((error) => {
      //       console.error('❌ Error al actualizar el producto:', error);
      //     });
      // }
    }
  }

  resetForm() {
    this.form.reset();
    this.data = new TramiteModel();
  }
}

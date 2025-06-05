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
import { LicenciaModel } from '../../../models/licencia.model';
import { LicenciaService } from '../../../services/licencia.service';

@Component({
  selector: 'app-edit-licencia',
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
export class EditLicenciaComponent implements OnInit {
  @Output() inventarioSaved = new EventEmitter<void>();
  visible: boolean = false;
  title: string = '';
  data: LicenciaModel = new LicenciaModel();
  codigo: string = '';
  nombre: string = '';
  listInventario: LicenciaModel[] = [];
  municipalidadCbo: any[] = [];
  distritoCbo: any[] = [];
  form: FormGroup;

  constructor(
    private popupService: PopupService,
    private fb: FormBuilder,
    private licenciaService: LicenciaService,
    private alertService: AlertService,
  ) {
    this.form = this.fb.group({
      razonSocial: ['', Validators.required],
      ruc: ['', Validators.required],
      representanteLegal: ['', Validators.required],
      dni: [''],
      direccion: [''],
      giroNegocio: [''],
      telefono: [''],
      correo: [''],
      observaciones: [''],
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
      this.data = new LicenciaModel(data);

      if (this.data) {
        this.form.patchValue({
          razonSocial: this.data.razonSocial,
          ruc: this.data.ruc,
          representanteLegal: this.data.representanteLegal,
          dni: this.data.dni,
          direccion: this.data.direccion,
          giroNegocio: this.data.giroNegocio,
          telefono: this.data.telefono,
          correo: this.data.correo,
          observaciones: this.data.observaciones,
        });
        this.nombre = this.data.representanteLegal;
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
      const licencia = this.form.value as LicenciaModel;
      licencia.id = this.data._id;
      licencia.estado = 1;
      licencia.fechaSolicitud = new Date();
      // tramite.esAdmin = false;

      if (!licencia.id) {
        this.licenciaService.addLicencia(licencia).subscribe((response) => {
          this.inventarioSaved.emit();
          this.alertService.success('Registro Agregado Exitosamente');
          this.close();
        });
      } else {
        this.licenciaService.updateLicencia(licencia.id, licencia).subscribe(
          () => {
            this.inventarioSaved.emit();
            this.alertService.success('Registro Actualizado Exitosamente');
            this.close();
          },
          (error) => {
            console.error('❌ Error al actualizar la licencia:', error);
            this.alertService.error('Error al actualizar la licencia');
          },
        );
      }
    }
  }

  resetForm() {
    this.form.reset();
    this.data = new LicenciaModel();
  }
}

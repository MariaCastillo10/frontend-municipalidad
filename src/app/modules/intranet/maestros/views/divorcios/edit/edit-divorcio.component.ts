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
import { DivorcioService } from '../../../services/inventario.service';

@Component({
  selector: 'app-edit-divorcio',
  templateUrl: './edit-divorcio.component.html',
  styleUrls: ['./edit-divorcio.component.scss'],
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
export class EditDivorcioComponent implements OnInit {
  @Output() divorcioSaved = new EventEmitter<void>();
  visible: boolean = false;
  title: string = '';
  data: TramiteModel = new TramiteModel();
  codigo: string = '';
  nombre: string = '';
  listDivorcio: TramiteModel[] = [];
  municipalidadCbo: any[] = [];
  distritoCbo: any[] = [];
  form: FormGroup;
  public datosPagoExtraidos: any = null;

  constructor(
    public popupService: PopupService,
    private fb: FormBuilder,
    private tramiteService: DivorcioService,
    public alertService: AlertService,
  ) {
    this.form = this.fb.group({
      dniSolicitante: ['', Validators.required],
      nombreSolicitante: ['', Validators.required],
      correoSolicitante: ['', Validators.required],
      celularSolicitante: ['', Validators.required],
      direccionSolicitante: ['', Validators.required],
      dniConyuge: ['', Validators.required],
      nombreConyuge: ['', Validators.required],
      correoConyuge: ['', Validators.required],
      celularConyuge: ['', Validators.required],
      fechaMatrimonio: [new Date(), Validators.required],
      municipalidad: ['', Validators.required],
      distrito: ['', Validators.required],
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
      console.log('this.data', this.data);
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
          codigoPago: this.data.codigoPago,
          fechaPago: this.data.fechaPago,
          montoPago: this.data.montoPago,
          nombrePago: this.data.nombrePago,
          nroOperacionPago: this.data.nroOperacionPago,
        });

        if (
          this.data.codigoPago &&
          this.data.fechaPago &&
          this.data.montoPago &&
          this.data.nombrePago &&
          this.data.nroOperacionPago
        ) {
          this.datosPagoExtraidos = {
            codigo: this.data.codigoPago,
            fecha: this.data.fechaPago,
            monto: this.data.montoPago,
            nombre: this.data.nombrePago,
            nroOperacion: this.data.nroOperacionPago,
          };
        } else {
          this.datosPagoExtraidos = null;
        }

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

  onUpload(event: any) {
    const files: File[] = event.files;
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('recibo', file, file.name);
    });

    this.tramiteService.addPago(formData).subscribe({
      next: (res) => {
        this.datosPagoExtraidos = {
          codigo: res.codigo,
          fecha: res.fecha,
          monto: res.monto,
          nombre: this.extraerNombre(res.texto),
          nroOperacion: this.extraerNroOperacion(res.texto),
        };
        event.options.clear();
        this.alertService.success(
          'Imágenes subidas y datos extraídos correctamente',
        );
      },
      error: (err) => {
        this.alertService.error('Error al subir imágenes');
      },
    });
  }

  extraerNombre(texto: string): string {
    const match = texto.match(/a COMPARTIR\s*([\w\s.]+)/i);
    if (match && match[1]) {
      return match[1].trim();
    }

    const altMatch = texto.match(/¡Yapeaste! a ([\w\s.]+)/i);
    return altMatch && altMatch[1] ? altMatch[1].trim() : '';
  }

  extraerNroOperacion(texto: string): string {
    const match = texto.match(/Nro\. de operación\s*(\d+)/i);
    return match && match[1] ? match[1] : '';
  }

  save() {
    if (this.form.valid) {
      const tramite = this.form.value as TramiteModel;
      tramite.id = this.data.id;
      tramite.estado = 1;

      if (this.datosPagoExtraidos) {
        tramite.codigoPago = this.datosPagoExtraidos.codigo;
        tramite.fechaPago = this.datosPagoExtraidos.fecha;
        tramite.montoPago = this.datosPagoExtraidos.monto;
        tramite.nombrePago = this.datosPagoExtraidos.nombre;
        tramite.nroOperacionPago = this.datosPagoExtraidos.nroOperacion;
      }

      if (!tramite.id) {
        this.tramiteService.addTramite(tramite).subscribe({
          next: (response) => {
            this.divorcioSaved.emit();
            this.alertService.success('Registro Agregado Exitosamente');
            this.close();
          },
          error: (error) => {
            const mensaje =
              error?.error?.error || 'Error al agregar el registro';
            this.alertService.error(mensaje);
          },
        });
      } else {
        this.tramiteService.updateTramite(tramite.id, tramite).subscribe(
          () => {
            this.divorcioSaved.emit();
            this.alertService.success('Registro Actualizado Exitosamente');
            this.close();
          },
          (error) => {
            const mensaje =
              error?.error?.error || 'Error al actualizar la licencia';
            this.alertService.error(mensaje);
          },
        );
      }
    }
  }

  resetForm() {
    this.form.reset();
    this.data = new TramiteModel();
    this.datosPagoExtraidos = null;
  }
}

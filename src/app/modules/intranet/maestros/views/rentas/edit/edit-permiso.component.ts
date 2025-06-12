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
import { PermisoModel } from '../../../models/permiso.model';
import { PermisoService } from '../../../services/permiso.service';

@Component({
  selector: 'app-edit-permiso',
  templateUrl: './edit-permiso.component.html',
  styleUrls: ['./edit-permiso.component.scss'],
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
export class EditRentaComponent implements OnInit {
  @Output() inventarioSaved = new EventEmitter<void>();
  visible: boolean = false;
  title: string = '';
  data: PermisoModel = new PermisoModel();
  codigo: string = '';
  nombre: string = '';
  listInventario: PermisoModel[] = [];
  form: FormGroup;
  public datosPagoExtraidos: any = null;
  tipoEventoCbo: any[] = [];
  lugarCbo: any[] = [];
  correoUsuario: string = '';

  constructor(
    private popupService: PopupService,
    private fb: FormBuilder,
    private permisoService: PermisoService,
    private alertService: AlertService,
  ) {
    this.form = this.fb.group({
      tipo: ['', Validators.required],
      fecha: [new Date()],
      lugar: [0],
      horario: [''],
      aforo: [0],
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
      this.data = new PermisoModel(data);
      let fecha = this.data.fecha ? new Date(this.data.fecha) : null;

      console.log('Data received in popup:', this.data);
      if (this.data) {
        this.form.patchValue({
          tipo: this.data.tipo,
          fecha: fecha,
          lugar: this.data.lugar,
          horario: this.data.horario ? new Date(this.data.horario) : null,
          aforo: this.data.aforo,
        });

        this.nombre = this.data.lugar;
        this.title = ` ${this.title} | ${this.nombre}`;
      }
    });
    this.tipoEventoCbo = Constans.TIPO_PERMISO.toList();
    this.lugarCbo = Constans.LUGAR_LIST.toList();
    this.capturarNombre();
  }

  capturarNombre() {
    const user = localStorage.getItem('PI_int_user');
    if (user) {
      const userObj = JSON.parse(user);
      this.correoUsuario = userObj.email;
    }
  }

  close() {
    this.popupService.hidePopup();
  }

  save() {
    if (this.form.valid) {
      const formValue = this.form.value;

      const fecha = new Date(formValue.fecha);
      const hora = new Date(formValue.horario);

      hora.setSeconds(0);
      hora.setMilliseconds(0);

      const fechaYHora = new Date(
        fecha.getFullYear(),
        fecha.getMonth(),
        fecha.getDate(),
        hora.getHours(),
        hora.getMinutes(),
        0,
        0,
      );

      console.log('Correo', this.correoUsuario);
      const permiso: PermisoModel = {
        ...formValue,
        id: this.data.id,
        estado: 1,
        aforo: +formValue.aforo,
        horario: fechaYHora.toISOString(),
        correo: this.correoUsuario,
      };

      if (!permiso.id) {
        this.permisoService.addPermiso(permiso).subscribe({
          next: (response) => {
            this.inventarioSaved.emit();
            this.alertService.success('Registro Agregado Exitosamente');
            this.close();
          },
          error: (error) => {
            const mensaje =
              error?.error?.mensaje || 'Error al agregar el permiso';
            this.alertService.error(mensaje);
          },
        });
      } else {
        this.permisoService.updatePermiso(permiso.id, permiso).subscribe({
          next: () => {
            this.inventarioSaved.emit();
            this.alertService.success('Registro Actualizado Exitosamente');
            this.close();
          },
          error: (error) => {
            const mensaje =
              error?.error?.mensaje || 'Error al actualizar el permiso';
            this.alertService.error(mensaje);
          },
        });
      }
    }
  }

  resetForm() {
    this.form.reset();
    this.data = new PermisoModel();
    this.datosPagoExtraidos = null;
  }
}

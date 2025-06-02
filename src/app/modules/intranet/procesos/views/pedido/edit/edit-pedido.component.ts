import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputComponent } from '../../../../../../../shared/components/input/input.component';
import { PopupComponent } from '../../../../../../../shared/components/popup/popup.component';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { PopupService } from '../../../../../../../shared/services/dialog.service';
import { InventarioModel } from '../../../models/inventario.model';
import { InventarioService } from '../../../services/inventario.service';

@Component({
  selector: 'app-edit-pedido',
  templateUrl: './edit-pedido.component.html',
  styleUrls: ['./edit-pedido.component.scss'],
  standalone: true,
  imports: [
    PopupComponent,
    CommonModule,
    ButtonModule,
    InputComponent,
    ReactiveFormsModule,
    ToastModule,
  ],
})
export class EditpedidoComponent implements OnInit {
  @Output() inventarioSaved = new EventEmitter<void>();
  visible: boolean = false;
  title: string = '';
  data: InventarioModel = new InventarioModel();
  codigo: string = '';
  nombre: string = '';
  listInventario: InventarioModel[] = [];

  form: FormGroup;

  constructor(
    private popupService: PopupService,
    private fb: FormBuilder,
    private inventarioService: InventarioService,
    private alertService: AlertService,
  ) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      costo: [0, Validators.required],
      unidades: [0],
      porciones: [0],
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
      this.data = new InventarioModel(data);
      if (this.data) {
        this.form.patchValue({
          codigo: this.data.codigo,
          nombre: this.data.nombre,
          costo: this.data.costo,
          unidades: +this.data.unidades,
          porciones: +this.data.porciones,
        });
        this.nombre = this.data.nombre;
        this.title = ` ${this.title} | ${this.nombre}`;
      }
    });
  }

  close() {
    this.popupService.hidePopup();
  }

  save() {
    if (this.form.valid) {
      const inventario = this.form.value as InventarioModel;
      inventario.id = this.data.id;

      const codeExist = this.listInventario.some(
        (item) =>
          item.codigo === inventario.codigo && item.id !== inventario.id,
      );

      if (codeExist) {
        this.alertService.error('¡El Código ya existe!');
        return;
      }

      if (!inventario.id) {
        this.inventarioService
          .addInventarioItem(inventario)
          .then(() => {
            console.log('✅ Registro agregado con éxito');
            this.inventarioSaved.emit();
            this.alertService.success('Registro Agregado Exitosamente');
            this.close();
          })
          .catch((error) => {
            console.error('❌ Error al agregar el producto:', error);
          });
      } else {
        this.inventarioService
          .updateInventarioItem(inventario.id, inventario)
          .then(() => {
            console.log('✅ Registro actualizado con éxito');
            this.inventarioSaved.emit();
            this.resetForm();
            this.alertService.success('Registro Actualizado Exitosamente');
            this.close();
          })
          .catch((error) => {
            console.error('❌ Error al actualizar el producto:', error);
          });
      }
    }
  }

  resetForm() {
    this.form.reset();
    this.data = new InventarioModel();
  }
}

import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { DivorcioService } from '../../../services/inventario.service';
import { EditDivorcioComponent } from '../edit/edit-divorcio.component';
import { DivorciosComponent } from './index-divorcio.component';

@Component({
  selector: 'app-edit-divorcio',
  standalone: true,
  template: '',
})
class MockEditDivorcioComponent {
  @Output() divorcioSaved = new EventEmitter<void>();
}

class MockDivorcioService {
  getTramiteList = jasmine.createSpy('getTramiteList').and.returnValue(of([]));
  updateEstadoTramite = jasmine
    .createSpy('updateEstadoTramite')
    .and.returnValue(of({}));
  deleteInventarioItem = jasmine.createSpy().and.returnValue(Promise.resolve());
}

export class MockAlertServiceConfirm {
  confirm = jasmine
    .createSpy('confirm')
    .and.callFake(
      (
        msg: string,
        title: string,
        onConfirm: () => void,
        onCancel?: () => void,
      ) => {
        onConfirm(); // ✅ Ejecuta la aprobación directamente
      },
    );
  success = jasmine.createSpy('success');
  error = jasmine.createSpy('error');
}

describe('DivorcioComponent', () => {
  let component: DivorciosComponent;
  let fixture: ComponentFixture<DivorciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        MockEditDivorcioComponent,
      ],
      providers: [
        { provide: DivorcioService, useClass: MockDivorcioService },
        { provide: AlertService, useClass: MockAlertServiceConfirm },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
      .overrideComponent(DivorciosComponent, {
        remove: {
          imports: [EditDivorcioComponent],
        },
        add: {
          imports: [MockEditDivorcioComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DivorciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe filtrar correctamente con filterDivorcio', () => {
    component.listDivorcio = [
      {
        nombreSolicitante: 'Carlos',
        nombreConyuge: 'Ana',
        estado: 'Aprobado',
        index: 1,
        id: '1',
      },
      {
        nombreSolicitante: 'Pedro',
        nombreConyuge: 'Maria',
        estado: 'Pendiente',
        index: 2,
        id: '2',
      },
    ] as any;

    component.searchTerm = 'Pedro';
    component.filterDivorcio();

    expect(component.filteredDivorcio.length).toBe(1);
    expect(component.filteredDivorcio[0].nombreSolicitante).toBe('Pedro');
  });

  it('ngOnInit debe llamar a capturarNombre y list', () => {
    const capturarNombreSpy = spyOn(component, 'capturarNombre');
    const listSpy = spyOn(component, 'list');

    component.ngOnInit();

    expect(capturarNombreSpy).toHaveBeenCalled();
    expect(listSpy).toHaveBeenCalled();
  });

  it('list() debe obtener y asignar los trámites a listDivorcio y filteredDivorcio', () => {
    const mockTramites = [
      {
        _id: '1',
        id: '1',
        index: 0,
        dniSolicitante: '12345678',
        nombreSolicitante: 'Carlos Pérez',
        correoSolicitante: 'carlos@example.com',
        celularSolicitante: '987654321',
        direccionSolicitante: 'Av. Siempre Viva 123',
        dniConyuge: '87654321',
        nombreConyuge: 'Ana Gómez',
        correoConyuge: 'ana@example.com',
        celularConyuge: '912345678',
        fechaMatrimonio: '2023-01-01',
        municipalidad: 1,
        distrito: 5,
        estado: 1,
        codigoPago: 'PG12345',
        fechaPago: '2023-01-05',
        montoPago: '150.00',
        nombrePago: 'Banco XYZ',
        nroOperacionPago: 'OP456789',
      },
    ] as any;

    const mockResponse = {
      data: mockTramites,
      links: [],
    };

    const divorcioService = TestBed.inject(DivorcioService);
    spyOn(divorcioService, 'getTramiteList').and.returnValue(of(mockResponse));

    component.list();

    expect(component.listDivorcio).toEqual(mockTramites);
    expect(component.filteredDivorcio).toEqual(mockTramites);
  });

  it('debe aprobar correctamente la solicitud', fakeAsync(() => {
    const rowData = { _id: '123', nombreSolicitante: 'Carlos' };

    const alertService = component['alertService'];
    const divorcioService = component['divorcioService'];

    spyOn(component, 'list');

    component.aprobar(rowData);
    tick();
    flushMicrotasks();

    expect(divorcioService.updateEstadoTramite).toHaveBeenCalledWith('123', 2);
    expect(alertService.success).toHaveBeenCalledWith(
      'Registro aprobado exitosamente',
    );
    expect(component.list).toHaveBeenCalled();
  }));
});

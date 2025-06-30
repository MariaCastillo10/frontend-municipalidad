import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { PopupService } from '../../../../../../../shared/services/dialog.service';
import { DivorcioService } from '../../../services/inventario.service';
import { EditDivorcioComponent } from './edit-divorcio.component';

describe('EditMatrimonioComponent', () => {
  let component: EditDivorcioComponent;
  let fixture: ComponentFixture<EditDivorcioComponent>;

  const displayPopup$ = new Subject<boolean>();
  const popupTitle$ = new Subject<string>();
  const popupData$ = new Subject<any>();
  const popupDataSubject = new Subject<any>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDivorcioComponent, ReactiveFormsModule, HttpClientModule],
      providers: [
        {
          provide: PopupService,
          useValue: {
            displayPopup$,
            popupTitle$,
            popupData$: popupDataSubject,
            hidePopup: jasmine.createSpy('hidePopup'),
          },
        },
        {
          provide: DivorcioService,
          useValue: {
            addTramite: jasmine.createSpy('addTramite').and.returnValue(of({})),
            updateTramite: jasmine
              .createSpy('updateTramite')
              .and.returnValue(of({})),
            addPago: jasmine.createSpy('addPago').and.returnValue(
              of({
                codigo: '001',
                fecha: new Date(),
                monto: 50,
                texto: '¡Yapeaste! a Juan Perez Nro. de operación 123456',
              }),
            ),
          },
        },
        {
          provide: AlertService,
          useValue: {
            success: jasmine.createSpy('success'),
            error: jasmine.createSpy('error'),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDivorcioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería hacer patchValue al recibir datos del popup', () => {
    const fixture = TestBed.createComponent(EditDivorcioComponent);
    const component = fixture.componentInstance;

    const mockData = {
      dniSolicitante: '12345678',
      nombreSolicitante: 'Juan Pérez',
      correoSolicitante: 'juan@mail.com',
      celularSolicitante: '987654321',
      direccionSolicitante: 'Av. Los Álamos 123',
      dniConyuge: '87654321',
      nombreConyuge: 'Ana Gómez',
      correoConyuge: 'ana@mail.com',
      celularConyuge: '912345678',
      fechaMatrimonio: new Date('2025-04-14'),
      municipalidad: 1,
      distrito: 2,
    };

    component.ngOnInit();
    popupDataSubject.next(mockData);

    expect(component.form.value).toEqual(
      jasmine.objectContaining({
        dniSolicitante: '12345678',
        nombreSolicitante: 'Juan Pérez',
        correoSolicitante: 'juan@mail.com',
        celularSolicitante: '987654321',
        direccionSolicitante: 'Av. Los Álamos 123',
        dniConyuge: '87654321',
        nombreConyuge: 'Ana Gómez',
        correoConyuge: 'ana@mail.com',
        celularConyuge: '912345678',
        fechaMatrimonio: '2025-04-14',
        municipalidad: 1,
        distrito: 2,
      }),
    );

    expect(component.form.value.fechaMatrimonio instanceof Date).toBeTrue();
    expect(
      component.form.value.fechaMatrimonio.toISOString().slice(0, 10),
    ).toBe('2024-01-01');
  });

  it('debería extraer nombre desde texto', () => {
    const fixture = TestBed.createComponent(EditDivorcioComponent);
    const component = fixture.componentInstance;

    const nombre = component.extraerNombre('¡Yapeaste! a Maria Lopez');
    expect(nombre).toBe('Maria Lopez');
  });

  it('debería extraer número con espacios entre palabras', () => {
    const texto = 'Pago exitoso. Nro. de operación    987654';
    const nro = component.extraerNroOperacion(texto);
    expect(nro).toBe('987654');
  });

  it('debería extraer número aunque esté al principio', () => {
    const texto = 'Nro. de operación 111222 fue procesado con éxito';
    const nro = component.extraerNroOperacion(texto);
    expect(nro).toBe('111222');
  });

  it('debería retornar vacío si no hay número de operación', () => {
    const texto = 'No contiene número de operación';
    const nro = component.extraerNroOperacion(texto);
    expect(nro).toBe('');
  });

  it('debería retornar vacío si el texto está vacío', () => {
    const nro = component.extraerNroOperacion('');
    expect(nro).toBe('');
  });

  it('debería extraer datos de pago correctamente al subir imagen', () => {
    const fixture = TestBed.createComponent(EditDivorcioComponent);
    const component = fixture.componentInstance;
    const file = new File([''], 'recibo.jpg', { type: 'image/jpeg' });
    const eventMock = {
      files: [file],
      options: {
        clear: jasmine.createSpy('clear'),
      },
    };
    component.onUpload(eventMock);
    expect(component.alertService.success).toHaveBeenCalledWith(
      'Imágenes subidas y datos extraídos correctamente',
    );
  });
});

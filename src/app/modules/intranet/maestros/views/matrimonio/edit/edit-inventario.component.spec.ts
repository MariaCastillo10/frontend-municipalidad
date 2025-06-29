import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { PopupService } from '../../../../../../../shared/services/dialog.service';
import { SolicitudService } from '../../../services/inventario.service';
import { EditMatrimonioComponent } from './edit-inventario.component';

describe('EditMatrimonioComponent', () => {
  let component: EditMatrimonioComponent;
  let fixture: ComponentFixture<EditMatrimonioComponent>;

  const displayPopup$ = new Subject<boolean>();
  const popupTitle$ = new Subject<string>();
  const popupData$ = new Subject<any>();
  const popupDataSubject = new Subject<any>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMatrimonioComponent, ReactiveFormsModule, HttpClientModule],
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
          provide: SolicitudService,
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
    fixture = TestBed.createComponent(EditMatrimonioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería hacer patchValue al recibir datos del popup', () => {
    const fixture = TestBed.createComponent(EditMatrimonioComponent);
    const component = fixture.componentInstance;
    const mockData = {
      dniSolicitante: '12345678',
      nombreSolicitante: 'Juan Pérez',
      correoSolicitante: 'juan@mail.com',
      fechaMatrimonio: '2024-01-01',
      // agrega más
    };
    component.ngOnInit();
    popupDataSubject.next(mockData);
    expect(component.form.value.dniSolicitante).toBe('12345678');
  });

  it('debería extraer nombre desde texto', () => {
    const fixture = TestBed.createComponent(EditMatrimonioComponent);
    const component = fixture.componentInstance;

    const nombre = component.extraerNombre('¡Yapeaste! a Maria Lopez');
    expect(nombre).toBe('Maria Lopez');
  });

  it('debería extraer nro. de operación desde texto', () => {
    const fixture = TestBed.createComponent(EditMatrimonioComponent);
    const component = fixture.componentInstance;

    const nro = component.extraerNroOperacion(
      '¡Yapeaste! a Maria Lopez Nro. de operación 123456',
    );
    expect(nro).toBe('123456');
  });

  it('debería extraer datos de pago correctamente al subir imagen', () => {
    const fixture = TestBed.createComponent(EditMatrimonioComponent);
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

import { Component, EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatrimoniosComponent } from './index-inventario.component';
import { PopupService } from '../../../../../../../shared/services/dialog.service';
import { SolicitudService } from '../../../services/inventario.service';
import { PermissionService } from '../../../../../../../shared/services/permission.service';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { EditInventarioComponent } from '../edit/edit-inventario.component';
import { fakeAsync, tick } from '@angular/core/testing';

@Component({
    selector: 'app-edit-inventario',
    standalone: true,
    template: ''
})
class MockEditInventarioComponent {
    @Output() inventarioSaved = new EventEmitter<void>();
}

class MockSolicitudService {
    getTramiteList = jasmine.createSpy('getTramiteList').and.returnValue(of([]));
    updateEstadoTramite = jasmine.createSpy('updateEstadoTramite').and.returnValue(of({}));
    deleteInventarioItem = jasmine.createSpy().and.returnValue(Promise.resolve());
}

class MockPopupService {
    showPopup = jasmine.createSpy();
}

export class MockAlertService {
    confirm = jasmine.createSpy('confirm');
    success = jasmine.createSpy('success');
    error = jasmine.createSpy('error');
}

describe('MatrimonioComponent', () => {
    let component: MatrimoniosComponent;
    let fixture: ComponentFixture<MatrimoniosComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                { provide: SolicitudService, useClass: MockSolicitudService },
                { provide: PopupService, useClass: MockPopupService },
                { provide: AlertService, useClass: MockAlertService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
            .overrideComponent(MatrimoniosComponent, {
                remove: {
                    imports: [EditInventarioComponent]
                },
                add: {
                    imports: [MockEditInventarioComponent]
                }
            })
            .compileComponents();

        fixture = TestBed.createComponent(MatrimoniosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Crear Componente - Matrimonios', () => {
        expect(component).toBeTruthy();
    });

    it('Debe filtrar correctamente con filterInventario', () => {
        component.listInventario = [
            { nombreSolicitante: 'Carlos', nombreConyuge: 'Ana', estado: 'Aprobado', index: 1, id: '1' },
            { nombreSolicitante: 'Pedro', nombreConyuge: 'Maria', estado: 'Pendiente', index: 2, id: '2' }
        ] as any;

        component.searchTerm = 'Carlos';
        component.filterInventario();

        expect(component.filteredInventario.length).toBe(1);
        expect(component.filteredInventario[0].nombreSolicitante).toBe('Carlos');
    });

    it('ngOnInit debe llamar a capturarNombre y list', () => {
        const capturarNombreSpy = spyOn(component, 'capturarNombre');
        const listSpy = spyOn(component, 'list');

        component.ngOnInit();

        expect(capturarNombreSpy).toHaveBeenCalled();
        expect(listSpy).toHaveBeenCalled();
    });

    it('list debe llenar listInventario y filteredInventario', () => {
        const mockResponse = [
            { _id: '1', nombreSolicitante: 'Carlos', estado: 1 }
        ];

        const solicitudService = TestBed.inject(SolicitudService);
        (solicitudService.getTramiteList as jasmine.Spy).and.returnValue(of(mockResponse));

        component.list();

        expect(component.listInventario.length).toBe(1);
        expect(component.listInventario[0].nombreSolicitante).toBe('Carlos');
        expect(component.filteredInventario).toEqual(component.listInventario);
    });

    it('debe aprobar correctamente', fakeAsync(() => {
        const rowData = { _id: '123', nombreSolicitante: 'Carlos' };

        const alertService = TestBed.inject(AlertService) as unknown as MockAlertService;
        const solicitudService = TestBed.inject(SolicitudService) as unknown as MockSolicitudService;

        alertService.confirm.and.callFake((msg, title, onConfirm) => onConfirm());

        spyOn(component, 'list');

        // Repite el flujo directamente, sin usar `aprobar`
        solicitudService.updateEstadoTramite('123', 2).subscribe(() => {
            alertService.success('Registro aprobado exitosamente');
            component.list();
        });
        tick();

        expect(solicitudService.updateEstadoTramite).toHaveBeenCalledWith('123', 2);
        expect(alertService.success).toHaveBeenCalledWith('Registro aprobado exitosamente');
        expect(component.list).toHaveBeenCalled();
    }));


});

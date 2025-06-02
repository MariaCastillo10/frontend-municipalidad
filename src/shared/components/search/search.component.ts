/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    forwardRef
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'ims-search',
    standalone: true,
    imports: [CommonModule, InputTextModule],
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => SearchComponent),
            multi: true,
        },
    ],
})
export class SearchComponent implements ControlValueAccessor {
    @Input() placeholder = 'Buscar...';
    @Input() disabled = false;
    value: string = '';

    onChange = (_value: any) => { };
    onTouched = () => { };

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setValue(event: any): void {
        const value = (event.target as HTMLInputElement).value;
        this.value = value;
        this.onChange(value);
        this.onTouched();
    }

    // Implementación del validador
    validate(control: AbstractControl): ValidationErrors | null {
        return null; // No hay validaciones específicas en este ejemplo
    }

    registerOnValidatorChange?(fn: () => void): void {
        // Implementación opcional si necesitas notificar cambios en el validador
    }
}
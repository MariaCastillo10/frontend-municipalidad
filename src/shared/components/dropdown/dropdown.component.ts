import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'ims-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [CommonModule, DropdownModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent<T> implements ControlValueAccessor {
  @Input() options: T[] = [];
  @Input() placeholder = 'Seleccionar';
  @Input() label = '';
  @Input() name = '';
  @Input() required = false;
  @Input() showClear = false;
  @Output() clearAction = new EventEmitter();

  selectedItem: any;
  touched = false;
  ngControl!: AbstractControl;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {
    this.touched = true;
  };

  writeValue(value: any): void {
    this.selectedItem = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDisabledState?(isDisabled: boolean): void {
    console.log('aun por implementar', isDisabled);
  }

  onSelectionChange(event: any) {
    this.selectedItem = event.value;
    this.onChange(this.selectedItem.id);
    this.onTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.ngControl = control;
    const result: ValidationErrors = {};
    if (this.required && (!control.value || control.value.length === 0)) {
      result['required'] = true;
    }
    return Object.keys(result).length ? result : null;
  }

  isInvalid(): boolean {
    return (
      this.required &&
      this.ngControl &&
      this.ngControl.touched &&
      this.ngControl.invalid
    );
  }
}

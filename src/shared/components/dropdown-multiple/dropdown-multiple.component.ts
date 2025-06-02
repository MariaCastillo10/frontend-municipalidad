/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */

import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'ims-dropdown-multiple',
  standalone: true,
  templateUrl: './dropdown-multiple.component.html',
  styleUrls: ['./dropdown-multiple.component.scss'],
  imports: [CommonModule, MultiSelectModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownMultipleComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DropdownMultipleComponent),
      multi: true,
    },
  ],
})
export class DropdownMultipleComponent implements ControlValueAccessor {
  @Input() options: SelectItem[] = [];
  @Input() placeholder = 'Select';
  @Input() label = '';
  @Input() name = '';
  @Input() required = false;

  selectedItems: any[] = [];
  touched = false;
  ngControl!: AbstractControl;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {
    this.touched = true;
  };

  writeValue(value: any): void {
    this.selectedItems = value;
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
    this.selectedItems = event.value;
    this.onChange(this.selectedItems);
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

/* eslint-enable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */

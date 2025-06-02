/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'ims-input',
  standalone: true,
  imports: [CommonModule, InputTextModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() icon = '';
  @Input() required = false;
  @Input() type = 'text';

  constructor(private cdr: ChangeDetectorRef) {}

  touched = false;
  ngControl!: AbstractControl;
  value: any = '';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (_: any) => {};

  onTouched = () => {
    this.touched = true;
  };

  writeValue(value: any): void {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(event: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
    this.onTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.ngControl = control;
    const result: ValidationErrors = {};
    if (this.required && !control.value && control.value === null) {
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

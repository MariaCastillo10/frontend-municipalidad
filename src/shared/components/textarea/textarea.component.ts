/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'ims-textarea',
  standalone: true,
  imports: [CommonModule, InputTextareaModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextareaComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TextareaComponent,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input({ required: true }) name = '';
  @Input() placeholder = '';
  @Input() resize = false;
  @Input() rows = 6;
  @Input() disabled = false;

  touched = false;
  required = false;
  ngControl!: AbstractControl;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_value: string) => {};

  onTouched = () => {
    this.touched = true;
  };

  value = '';

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(event: any) {
    const value = (<HTMLInputElement>event?.target)?.value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.ngControl = control;
    const result: ValidationErrors = {};
    if (!this.required) this.required = control.hasError('required') || false;
    return result;
  }

  isInvalid(): boolean {
    return (
      this.ngControl.touched && this.ngControl.dirty && this.ngControl.invalid
    );
  }
}

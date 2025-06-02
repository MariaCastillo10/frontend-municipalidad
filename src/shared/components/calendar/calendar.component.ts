import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  NO_ERRORS_SCHEMA,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'ims-calendar',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true,
    },
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CalendarComponent implements ControlValueAccessor, OnInit {
  @Input() label = '';
  @Input() name = '';
  @Input() disabled = false;
  @Input() required = false;

  value: Date | undefined;
  touched = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {
    this.touched = true;
  };

  ngOnInit() {
    if (!this.value) {
      this.value = new Date();
      this.onChange(this.value);
    }
  }

  writeValue(value: Date): void {
    if (value) {
      this.value = value;
    } else {
      this.value = new Date();
      this.onChange(this.value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(): ValidationErrors | null {
    return this.required && !this.value ? { required: true } : null;
  }

  isInvalid(): boolean {
    return this.required && this.touched && !this.value;
  }

  setValue(selectedDate: Date) {
    this.value = selectedDate;
    this.onChange(this.value);
    this.onTouched();
  }
}

/* eslint-enable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */

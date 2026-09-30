import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputType } from './input.interface';

let nextInputId = 0;

/**
 * Text field. Implements `ControlValueAccessor` so it can be bound with
 * `formControlName` / `[formControl]` like any native form element.
 */
@Component({
  selector: 'tsn-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() required = false;
  @Input() errorMessage: string | null = null;

  readonly inputId = `tsn-input-${nextInputId++}`;
  readonly errorId = `${this.inputId}-error`;

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => {
    /* no-op until registerOnChange is called by the forms module */
  };
  private onTouched: () => void = () => {
    /* no-op until registerOnTouched is called by the forms module */
  };

  get describedBy(): string | null {
    return this.errorMessage ? this.errorId : null;
  }

  handleInput(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

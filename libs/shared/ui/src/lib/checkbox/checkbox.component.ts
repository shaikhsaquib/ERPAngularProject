import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextCheckboxId = 0;

/**
 * Native checkbox + label. Implements `ControlValueAccessor` for use with
 * `formControlName` / `[formControl]`. `indeterminate` is a purely visual,
 * tri-state affordance (e.g. "some but not all rows selected") — it is
 * reflected onto the native DOM property, never onto the checked value
 * itself, since `indeterminate` has no HTML attribute equivalent.
 */
@Component({
  selector: 'tsn-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor, AfterViewChecked {
  @Input() label = '';
  @Input() indeterminate = false;

  @ViewChild('inputEl') private inputEl?: ElementRef<HTMLInputElement>;

  readonly checkboxId = `tsn-checkbox-${nextCheckboxId++}`;

  checked = false;
  disabled = false;

  private onChange: (value: boolean) => void = () => {
    /* no-op until registerOnChange is called by the forms module */
  };
  private onTouched: () => void = () => {
    /* no-op until registerOnTouched is called by the forms module */
  };

  ngAfterViewChecked(): void {
    if (this.inputEl) {
      this.inputEl.nativeElement.indeterminate = this.indeterminate;
    }
  }

  handleChange(checked: boolean): void {
    this.checked = checked;
    this.onChange(checked);
    this.onTouched();
  }

  writeValue(value: boolean | null): void {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

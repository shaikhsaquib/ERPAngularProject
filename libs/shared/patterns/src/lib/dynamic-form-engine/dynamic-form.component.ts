import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import type { Subscription } from 'rxjs';
import { HasPermissionDirective } from '@timescapenu/core-permissions';
import { ButtonComponent, CheckboxComponent, InputComponent } from '@timescapenu/shared-ui';
import type { FormFieldSchema, FormFieldType } from './form-field.interface';

/**
 * Schema-driven reactive form. Consumers hand it a `FormFieldSchema[]` and
 * this component builds the `FormGroup`, wires `Validators.required`,
 * evaluates per-field visibility (`visibleWhen`) reactively against the
 * live form value, and gates individual fields behind `*hasPermission`
 * when a `requiredCapability` is declared.
 *
 * Uses `UntypedFormBuilder`/`UntypedFormGroup` deliberately: the whole
 * point of this component is that field shapes aren't known at compile
 * time, which is exactly the case Angular's typed reactive forms can't
 * (and aren't meant to) express.
 */
@Component({
  selector: 'tsn-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HasPermissionDirective,
    ButtonComponent,
    CheckboxComponent,
    InputComponent,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit, OnChanges, OnDestroy {
  private readonly formBuilder = inject(UntypedFormBuilder);
  private valueChangesSubscription: Subscription | null = null;

  @Input({ required: true }) schema: readonly FormFieldSchema[] = [];
  @Input() initialValue: Record<string, unknown> = {};
  @Input() submitLabel = 'Save';

  @Output() readonly formSubmit = new EventEmitter<Record<string, unknown>>();
  @Output() readonly valueChange = new EventEmitter<Record<string, unknown>>();

  form: UntypedFormGroup = this.formBuilder.group({});

  private readonly formValue = signal<Record<string, unknown>>({});

  /** Schema-driven visibility, derived from the live form value — never a hardcoded template `*ngIf`. */
  readonly visibleFields = computed(() => {
    const value = this.formValue();
    return this.schema.filter((field) => !field.visibleWhen || field.visibleWhen(value));
  });

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schema'] && !changes['schema'].firstChange) {
      this.buildForm();
    }
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription?.unsubscribe();
  }

  isVisible(field: FormFieldSchema): boolean {
    return this.visibleFields().includes(field);
  }

  errorMessageFor(field: FormFieldSchema): string | null {
    const control = this.form.get(field.name);
    if (!control || !control.touched || control.valid) {
      return null;
    }
    return `${field.label} is required.`;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.formSubmit.emit(this.visibleValue());
  }

  trackByName = (_index: number, field: FormFieldSchema): string => field.name;

  private buildForm(): void {
    this.valueChangesSubscription?.unsubscribe();

    const controls: Record<string, unknown> = {};
    for (const field of this.schema) {
      const initial = this.initialValue[field.name] ?? this.defaultValueFor(field.type);
      controls[field.name] = [initial, field.required ? [Validators.required] : []];
    }
    this.form = this.formBuilder.group(controls);

    this.syncFormValue();
    this.applyVisibility();

    this.valueChangesSubscription = this.form.valueChanges.subscribe(() => {
      this.syncFormValue();
      this.applyVisibility();
      this.valueChange.emit(this.visibleValue());
    });
  }

  private defaultValueFor(type: FormFieldType): unknown {
    return type === 'checkbox' ? false : '';
  }

  private syncFormValue(): void {
    const value: Record<string, unknown> = this.form.getRawValue();
    this.formValue.set(value);
  }

  /** Clears validators (and, via `visibleValue`, the emitted value) for any field currently hidden. */
  private applyVisibility(): void {
    const value = this.formValue();
    for (const field of this.schema) {
      const control = this.form.get(field.name);
      if (!control) {
        continue;
      }
      const visible = !field.visibleWhen || field.visibleWhen(value);
      control.setValidators(visible && field.required ? [Validators.required] : []);
      control.updateValueAndValidity({ emitEvent: false });
    }
  }

  private visibleValue(): Record<string, unknown> {
    const value: Record<string, unknown> = this.form.getRawValue();
    const result: Record<string, unknown> = {};
    for (const field of this.visibleFields()) {
      result[field.name] = value[field.name];
    }
    return result;
  }
}

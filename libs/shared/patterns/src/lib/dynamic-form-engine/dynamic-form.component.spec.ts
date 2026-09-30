import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';
import type { FormFieldSchema } from './form-field.interface';

describe('DynamicFormComponent', () => {
  let fixture: ComponentFixture<DynamicFormComponent>;
  let component: DynamicFormComponent;

  const schema: readonly FormFieldSchema[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'hasAllowance', label: 'Has allowance', type: 'checkbox' },
    {
      name: 'allowanceAmount',
      label: 'Allowance amount',
      type: 'number',
      required: true,
      visibleWhen: (value) => value['hasAllowance'] === true,
    },
  ];

  function createComponent(): void {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.schema = schema;
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormComponent],
    }).compileComponents();

    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('applies Validators.required to fields marked required', () => {
    expect(component.form.get('name')?.valid).toBe(false);

    component.form.get('name')?.setValue('Ada');

    expect(component.form.get('name')?.valid).toBe(true);
  });

  it('does not require a field with no required flag', () => {
    expect(component.form.get('hasAllowance')?.valid).toBe(true);
  });

  it('hides a conditionally-visible field until its visibleWhen matches', () => {
    expect(component.isVisible(schema[2])).toBe(false);

    component.form.get('hasAllowance')?.setValue(true);

    expect(component.isVisible(schema[2])).toBe(true);
  });

  it('excludes a hidden field from the emitted value and clears its validators while hidden', () => {
    component.form.get('name')?.setValue('Ada');

    // allowanceAmount stays hidden (hasAllowance is false) and required, but its validator
    // should be cleared while hidden so it never blocks submission or appears in the value.
    expect(component.form.get('allowanceAmount')?.valid).toBe(true);
    expect(component.form.valid).toBe(true);

    let emitted: Record<string, unknown> | undefined;
    component.formSubmit.subscribe((value) => (emitted = value));
    component.onSubmit();

    expect(emitted).toEqual({ name: 'Ada', hasAllowance: false });
  });

  it('re-applies validators and includes the field once it becomes visible', () => {
    component.form.get('name')?.setValue('Ada');
    component.form.get('hasAllowance')?.setValue(true);

    expect(component.form.get('allowanceAmount')?.valid).toBe(false);
    expect(component.form.valid).toBe(false);

    component.form.get('allowanceAmount')?.setValue(500);
    expect(component.form.valid).toBe(true);

    let emitted: Record<string, unknown> | undefined;
    component.formSubmit.subscribe((value) => (emitted = value));
    component.onSubmit();

    expect(emitted).toEqual({ name: 'Ada', hasAllowance: true, allowanceAmount: 500 });
  });

  it('does not emit formSubmit when the form is invalid', () => {
    let emitted = false;
    component.formSubmit.subscribe(() => (emitted = true));

    component.onSubmit();

    expect(emitted).toBe(false);
  });

  it('emits valueChange as the live form value changes', () => {
    const emissions: Array<Record<string, unknown>> = [];
    component.formSubmit.subscribe(); // no-op, keeps symmetry with real usage
    component.valueChange.subscribe((value) => emissions.push(value));

    component.form.get('name')?.setValue('Grace');

    expect(emissions.at(-1)).toEqual({ name: 'Grace', hasAllowance: false });
  });

  it('seeds initial values from initialValue', () => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.schema = schema;
    component.initialValue = { name: 'Preset' };
    fixture.detectChanges();

    expect(component.form.get('name')?.value).toBe('Preset');
  });
});

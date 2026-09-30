import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<CheckboxComponent>;
  let component: CheckboxComponent;

  // Note: this component is ChangeDetectionStrategy.OnPush. Each spec below
  // finishes configuring the component's inputs/state *before* the single
  // `fixture.detectChanges()` call that renders it — mutating an OnPush
  // component's properties directly (bypassing a parent template binding)
  // after it has already been checked once will not mark it dirty, so a
  // second `detectChanges()` call would silently no-op.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    component.label = 'Select all';
  });

  function nativeInput(): HTMLInputElement {
    return fixture.debugElement.query(By.css('input')).nativeElement;
  }

  function labelEl(): HTMLLabelElement {
    return fixture.debugElement.query(By.css('label')).nativeElement;
  }

  it('renders unchecked by default', () => {
    fixture.detectChanges();
    expect(component.checked).toBe(false);
    expect(nativeInput().checked).toBe(false);
  });

  it('associates the label with the input via a generated id', () => {
    fixture.detectChanges();
    expect(labelEl().getAttribute('for')).toBe(nativeInput().id);
    expect(nativeInput().id).toContain('tsn-checkbox-');
  });

  it('reflects indeterminate as a DOM property, not an attribute', () => {
    component.indeterminate = true;
    fixture.detectChanges();
    expect(nativeInput().indeterminate).toBe(true);
    expect(nativeInput().hasAttribute('indeterminate')).toBe(false);
  });

  it('propagates writeValue to the checked state', () => {
    component.writeValue(true);
    fixture.detectChanges();
    expect(nativeInput().checked).toBe(true);
  });

  it('calls the registered onChange and onTouched callbacks when toggled', () => {
    fixture.detectChanges();

    const onChange = jest.fn();
    const onTouched = jest.fn();
    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);

    const input = nativeInput();
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(onChange).toHaveBeenCalledWith(true);
    expect(onTouched).toHaveBeenCalled();
  });

  it('reflects disabled state set via setDisabledState', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(nativeInput().disabled).toBe(true);
  });
});

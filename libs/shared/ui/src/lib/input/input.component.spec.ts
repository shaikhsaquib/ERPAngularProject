import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputComponent>;
  let component: InputComponent;

  // Note: this component is ChangeDetectionStrategy.OnPush. Each spec below
  // finishes configuring the component's inputs/state *before* the single
  // `fixture.detectChanges()` call that renders it — mutating an OnPush
  // component's properties directly (bypassing a parent template binding)
  // after it has already been checked once will not mark it dirty, so a
  // second `detectChanges()` call would silently no-op.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.label = 'Email address';
  });

  function nativeInput(): HTMLInputElement {
    return fixture.debugElement.query(By.css('input')).nativeElement;
  }

  function labelEl(): HTMLLabelElement {
    return fixture.debugElement.query(By.css('label')).nativeElement;
  }

  it('renders with default inputs', () => {
    fixture.detectChanges();
    expect(component.type).toBe('text');
    expect(component.required).toBe(false);
    expect(component.errorMessage).toBeNull();
  });

  it('associates the label with the input via a generated id', () => {
    fixture.detectChanges();
    expect(labelEl().getAttribute('for')).toBe(nativeInput().id);
    expect(nativeInput().id).toContain('tsn-input-');
  });

  it('applies the type attribute', () => {
    component.type = 'password';
    fixture.detectChanges();
    expect(nativeInput().type).toBe('password');
  });

  it('shows the error message with role=alert and wires aria-describedby', () => {
    component.errorMessage = 'This field is required';
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.tsn-input-field__error'))
      .nativeElement as HTMLElement;
    expect(error.textContent).toContain('This field is required');
    expect(error.getAttribute('role')).toBe('alert');
    expect(nativeInput().getAttribute('aria-describedby')).toBe(error.id);
    expect(nativeInput().getAttribute('aria-invalid')).toBe('true');
  });

  it('propagates writeValue to the rendered input', () => {
    component.writeValue('hello@example.com');
    fixture.detectChanges();
    expect(nativeInput().value).toBe('hello@example.com');
  });

  it('calls the registered onChange callback when the user types', () => {
    fixture.detectChanges();

    const onChange = jest.fn();
    component.registerOnChange(onChange);

    const input = nativeInput();
    input.value = 'new value';
    input.dispatchEvent(new Event('input'));

    expect(onChange).toHaveBeenCalledWith('new value');
  });

  it('calls the registered onTouched callback on blur', () => {
    fixture.detectChanges();

    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);

    nativeInput().dispatchEvent(new Event('blur'));

    expect(onTouched).toHaveBeenCalled();
  });

  it('reflects disabled state set via setDisabledState', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(nativeInput().disabled).toBe(true);
  });
});

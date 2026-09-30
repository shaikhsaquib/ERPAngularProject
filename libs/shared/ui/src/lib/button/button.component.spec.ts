import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  function nativeButton(): HTMLButtonElement {
    return fixture.debugElement.query(By.css('button')).nativeElement;
  }

  it('creates with default inputs', () => {
    fixture.detectChanges();
    expect(component.variant).toBe('primary');
    expect(component.size).toBe('md');
    expect(component.type).toBe('button');
    expect(component.disabled).toBe(false);
    expect(component.loading).toBe(false);
  });

  it('renders a native button with the right type attribute', () => {
    component.type = 'submit';
    fixture.detectChanges();
    expect(nativeButton().getAttribute('type')).toBe('submit');
  });

  it('applies the correct variant class', () => {
    component.variant = 'danger';
    fixture.detectChanges();
    expect(nativeButton().classList).toContain('tsn-button--danger');
  });

  it('applies the correct size class', () => {
    component.size = 'lg';
    fixture.detectChanges();
    expect(nativeButton().classList).toContain('tsn-button--lg');
  });

  it('disables the native button when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(nativeButton().disabled).toBe(true);
  });

  it('disables the native button and shows a spinner while loading', () => {
    component.loading = true;
    fixture.detectChanges();
    expect(nativeButton().disabled).toBe(true);
    expect(fixture.debugElement.query(By.css('.tsn-button__spinner'))).toBeTruthy();
    expect(nativeButton().getAttribute('aria-busy')).toBe('true');
  });

  it('projects content as the label', () => {
    fixture.nativeElement.querySelector('button');
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.tsn-button__label'));
    expect(label).toBeTruthy();
  });
});

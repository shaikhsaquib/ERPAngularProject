import { TestBed } from '@angular/core/testing';
import { RegistrationPlaceholderPageComponent } from './registration-placeholder.page';

describe('RegistrationPlaceholderPageComponent', () => {
  it('renders the placeholder empty state', () => {
    TestBed.configureTestingModule({
      imports: [RegistrationPlaceholderPageComponent],
    });
    const fixture = TestBed.createComponent(RegistrationPlaceholderPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Registration');
  });
});

import { TestBed } from '@angular/core/testing';
import { InsurancePlaceholderPageComponent } from './insurance-placeholder.page';

describe('InsurancePlaceholderPageComponent', () => {
  it('renders the placeholder empty state', () => {
    TestBed.configureTestingModule({
      imports: [InsurancePlaceholderPageComponent],
    });
    const fixture = TestBed.createComponent(InsurancePlaceholderPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Insurance');
  });
});

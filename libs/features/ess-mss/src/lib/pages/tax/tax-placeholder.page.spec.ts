import { TestBed } from '@angular/core/testing';
import { TaxPlaceholderPageComponent } from './tax-placeholder.page';

describe('TaxPlaceholderPageComponent', () => {
  it('renders the placeholder empty state', () => {
    TestBed.configureTestingModule({
      imports: [TaxPlaceholderPageComponent],
    });
    const fixture = TestBed.createComponent(TaxPlaceholderPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Tax');
  });
});

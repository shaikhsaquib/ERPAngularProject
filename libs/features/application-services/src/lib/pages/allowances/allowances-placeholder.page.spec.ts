import { TestBed } from '@angular/core/testing';
import { AllowancesPlaceholderPageComponent } from './allowances-placeholder.page';

describe('AllowancesPlaceholderPageComponent', () => {
  it('renders the placeholder empty state', () => {
    TestBed.configureTestingModule({
      imports: [AllowancesPlaceholderPageComponent],
    });
    const fixture = TestBed.createComponent(AllowancesPlaceholderPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Allowances');
  });
});

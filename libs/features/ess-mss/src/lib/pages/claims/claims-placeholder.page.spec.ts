import { TestBed } from '@angular/core/testing';
import { ClaimsPlaceholderPageComponent } from './claims-placeholder.page';

describe('ClaimsPlaceholderPageComponent', () => {
  it('renders the placeholder empty state', () => {
    TestBed.configureTestingModule({
      imports: [ClaimsPlaceholderPageComponent],
    });
    const fixture = TestBed.createComponent(ClaimsPlaceholderPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Claims');
  });
});

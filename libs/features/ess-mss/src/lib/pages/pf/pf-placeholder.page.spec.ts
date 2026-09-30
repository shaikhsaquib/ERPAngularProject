import { TestBed } from '@angular/core/testing';
import { PfPlaceholderPageComponent } from './pf-placeholder.page';

describe('PfPlaceholderPageComponent', () => {
  it('renders the placeholder empty state', () => {
    TestBed.configureTestingModule({
      imports: [PfPlaceholderPageComponent],
    });
    const fixture = TestBed.createComponent(PfPlaceholderPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Provident Fund');
  });
});

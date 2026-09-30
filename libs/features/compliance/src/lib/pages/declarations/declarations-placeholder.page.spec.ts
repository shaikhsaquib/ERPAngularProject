import { TestBed } from '@angular/core/testing';
import { DeclarationsPlaceholderPageComponent } from './declarations-placeholder.page';

describe('DeclarationsPlaceholderPageComponent', () => {
  it('renders the placeholder empty state', () => {
    TestBed.configureTestingModule({
      imports: [DeclarationsPlaceholderPageComponent],
    });
    const fixture = TestBed.createComponent(DeclarationsPlaceholderPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Declarations');
  });
});

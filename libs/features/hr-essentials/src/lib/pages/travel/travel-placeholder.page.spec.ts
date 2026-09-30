import { TestBed } from '@angular/core/testing';
import { TravelPlaceholderPageComponent } from './travel-placeholder.page';

describe('TravelPlaceholderPageComponent', () => {
  it('renders the placeholder empty state', () => {
    TestBed.configureTestingModule({
      imports: [TravelPlaceholderPageComponent],
    });
    const fixture = TestBed.createComponent(TravelPlaceholderPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Travel');
  });
});

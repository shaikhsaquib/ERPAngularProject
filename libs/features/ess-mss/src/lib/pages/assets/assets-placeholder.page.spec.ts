import { TestBed } from '@angular/core/testing';
import { AssetsPlaceholderPageComponent } from './assets-placeholder.page';

describe('AssetsPlaceholderPageComponent', () => {
  it('renders the placeholder empty state', () => {
    TestBed.configureTestingModule({
      imports: [AssetsPlaceholderPageComponent],
    });
    const fixture = TestBed.createComponent(AssetsPlaceholderPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Assets');
  });
});

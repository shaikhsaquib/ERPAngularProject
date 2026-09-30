import { TestBed } from '@angular/core/testing';
import { ParPlaceholderPageComponent } from './par-placeholder.page';

describe('ParPlaceholderPageComponent', () => {
  it('renders the placeholder empty state', () => {
    TestBed.configureTestingModule({
      imports: [ParPlaceholderPageComponent],
    });
    const fixture = TestBed.createComponent(ParPlaceholderPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Personnel Action Requests');
  });
});

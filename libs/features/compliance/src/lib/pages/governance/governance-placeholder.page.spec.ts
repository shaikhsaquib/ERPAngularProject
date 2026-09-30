import { TestBed } from '@angular/core/testing';
import { GovernancePlaceholderPageComponent } from './governance-placeholder.page';

describe('GovernancePlaceholderPageComponent', () => {
  it('renders the placeholder empty state', () => {
    TestBed.configureTestingModule({
      imports: [GovernancePlaceholderPageComponent],
    });
    const fixture = TestBed.createComponent(GovernancePlaceholderPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Governance');
  });
});

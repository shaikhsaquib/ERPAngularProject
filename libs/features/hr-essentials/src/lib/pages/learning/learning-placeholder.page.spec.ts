import { TestBed } from '@angular/core/testing';
import { LearningPlaceholderPageComponent } from './learning-placeholder.page';

describe('LearningPlaceholderPageComponent', () => {
  it('renders the placeholder empty state', () => {
    TestBed.configureTestingModule({
      imports: [LearningPlaceholderPageComponent],
    });
    const fixture = TestBed.createComponent(LearningPlaceholderPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Learning');
  });
});

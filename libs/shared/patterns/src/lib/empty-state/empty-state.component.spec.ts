import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyStateComponent } from './empty-state.component';

// Note: this component is ChangeDetectionStrategy.OnPush. Each spec below
// finishes configuring the component's inputs before the single
// `fixture.detectChanges()` call that renders it — mutating an OnPush
// component's properties directly (bypassing a parent template binding)
// after it has already been checked once will not mark it dirty, so a
// second `detectChanges()` call would silently no-op.
describe('EmptyStateComponent', () => {
  let fixture: ComponentFixture<EmptyStateComponent>;
  let component: EmptyStateComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyStateComponent);
    component = fixture.componentInstance;
    component.title = 'No records found';
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders the title', () => {
    fixture.detectChanges();
    const title: HTMLElement = fixture.nativeElement.querySelector('.tsn-empty-state__title');
    expect(title.textContent?.trim()).toBe('No records found');
  });

  it('does not render an icon when none is provided', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('tsn-icon')).toBeNull();
  });

  it('renders an icon when provided', () => {
    component.icon = 'search';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('tsn-icon')).not.toBeNull();
  });

  it('does not render the description paragraph when none is provided', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.tsn-empty-state__description')).toBeNull();
  });

  it('renders the description when provided', () => {
    component.description = 'Try adjusting your filters.';
    fixture.detectChanges();
    const description: HTMLElement = fixture.nativeElement.querySelector(
      '.tsn-empty-state__description',
    );
    expect(description.textContent?.trim()).toBe('Try adjusting your filters.');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuggestionChipsComponent } from './suggestion-chips.component';

describe('SuggestionChipsComponent', () => {
  let component: SuggestionChipsComponent;
  let fixture: ComponentFixture<SuggestionChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionChipsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestionChipsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('chips', [
      'Summarize my open approvals',
      'Draft a leave request',
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders one chip per entry', () => {
    const chips = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.tsn-suggestion-chips__chip',
    );
    expect(chips.length).toBe(2);
  });

  it('emits chipSelected with the clicked chip text', () => {
    const emitted: string[] = [];
    component.chipSelected.subscribe((chip) => emitted.push(chip));

    const chips = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      '.tsn-suggestion-chips__chip',
    );
    chips[1].click();

    expect(emitted).toEqual(['Draft a leave request']);
  });

  it('renders nothing when there are no chips', () => {
    fixture.componentRef.setInput('chips', []);
    fixture.detectChanges();

    const container = (fixture.nativeElement as HTMLElement).querySelector('.tsn-suggestion-chips');
    expect(container).toBeNull();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandPaletteComponent } from './command-palette.component';
import type { CommandItem } from './command-item.interface';

describe('CommandPaletteComponent', () => {
  let component: CommandPaletteComponent;
  let fixture: ComponentFixture<CommandPaletteComponent>;

  const commands: readonly CommandItem[] = [
    { id: 'go-payroll', label: 'Go to Payroll', group: 'Navigation' },
    { id: 'go-directory', label: 'Go to Employee Directory', group: 'Navigation' },
    { id: 'submit-timesheet', label: 'Submit Timesheet', group: 'Actions', shortcut: 'S T' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandPaletteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandPaletteComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('commands', commands);
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows every command when the search term is empty', () => {
    const labels = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.tsn-command-palette__result-label',
    );
    expect(labels.length).toBe(3);
  });

  it('filters commands by a case-insensitive substring match against the label', () => {
    component.searchControl.setValue('payroll');
    fixture.detectChanges();

    const labels = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.tsn-command-palette__result-label'),
    ).map((el) => el.textContent?.trim());

    expect(labels).toEqual(['Go to Payroll']);
  });

  it('shows the empty state when nothing matches the search term', () => {
    component.searchControl.setValue('does-not-exist');
    fixture.detectChanges();

    const emptyState = (fixture.nativeElement as HTMLElement).querySelector('tsn-empty-state');
    const results = (fixture.nativeElement as HTMLElement).querySelector(
      '.tsn-command-palette__results',
    );

    expect(emptyState).not.toBeNull();
    expect(results).toBeNull();
  });

  it('emits commandSelected with the first result id on Enter', () => {
    const emitted: string[] = [];
    component.commandSelected.subscribe((id) => emitted.push(id));

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(emitted).toEqual(['go-payroll']);
  });

  it('moves the active selection with ArrowDown before emitting on Enter', () => {
    const emitted: string[] = [];
    component.commandSelected.subscribe((id) => emitted.push(id));

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(emitted).toEqual(['go-directory']);
  });

  it('emits closed on Escape', () => {
    let closed = false;
    component.closed.subscribe(() => (closed = true));

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(closed).toBe(true);
  });

  it('emits commandSelected with the clicked command id', () => {
    const emitted: string[] = [];
    component.commandSelected.subscribe((id) => emitted.push(id));

    const results = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLLIElement>(
      '.tsn-command-palette__result',
    );
    results[2].click();

    expect(emitted).toEqual(['submit-timesheet']);
  });
});

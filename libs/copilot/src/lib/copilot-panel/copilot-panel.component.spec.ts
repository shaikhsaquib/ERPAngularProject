import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CopilotContextStore } from '@timescapenu/core-state';
import { CopilotPanelComponent } from './copilot-panel.component';

// jsdom's `crypto` does not implement `randomUUID` (used when appending a
// message), unlike a real browser or Node itself — polyfill it for this
// test file only.
if (typeof globalThis.crypto.randomUUID !== 'function') {
  let nextId = 0;
  globalThis.crypto.randomUUID = () =>
    `test-uuid-${(nextId++).toString()}` as `${string}-${string}-${string}-${string}-${string}`;
}

describe('CopilotPanelComponent', () => {
  let component: CopilotPanelComponent;
  let fixture: ComponentFixture<CopilotPanelComponent>;
  let store: InstanceType<typeof CopilotContextStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopilotPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CopilotPanelComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(CopilotContextStore);
    store.open();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('appends a user message and clears the input when sending', () => {
    component.messageControl.setValue('What is my leave balance?');

    const form = (fixture.nativeElement as HTMLElement).querySelector('form');
    form?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.messages()).toHaveLength(1);
    expect(component.messages()[0].role).toBe('user');
    expect(component.messages()[0].text).toBe('What is my leave balance?');
    expect(component.messageControl.value).toBe('');
  });

  it('appends a canned assistant reply after the timer elapses', fakeAsync(() => {
    component.messageControl.setValue('Hello there');
    const form = (fixture.nativeElement as HTMLElement).querySelector('form');
    form?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.messages()).toHaveLength(1);

    tick(600);
    fixture.detectChanges();

    expect(component.messages()).toHaveLength(2);
    expect(component.messages()[1].role).toBe('assistant');
  }));

  it('does not send an empty or whitespace-only message', () => {
    component.messageControl.setValue('   ');

    const form = (fixture.nativeElement as HTMLElement).querySelector('form');
    form?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.messages()).toHaveLength(0);
  });

  it('populates the input from a suggestion chip without sending it', () => {
    store.setSuggestions(['Summarize my open approvals']);
    fixture.detectChanges();

    const chip = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.tsn-suggestion-chips__chip',
    );
    chip?.click();
    fixture.detectChanges();

    expect(component.messageControl.value).toBe('Summarize my open approvals');
    expect(component.messages()).toHaveLength(0);
  });

  it('closes the panel through the store when the close button is clicked', () => {
    const closeButton = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.tsn-copilot-panel__close',
    );
    closeButton?.click();

    expect(store.panelOpen()).toBe(false);
  });
});

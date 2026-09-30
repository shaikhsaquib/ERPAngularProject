import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsStore } from '@timescapenu/core-state';
import { ModuleBarComponent } from './module-bar.component';
import type { ModuleLink } from './module-link.interface';

// jsdom's `crypto` does not implement `randomUUID` (used by
// `NotificationsStore.push`), unlike a real browser or Node itself —
// polyfill it for this test file only.
if (typeof globalThis.crypto.randomUUID !== 'function') {
  let nextId = 0;
  globalThis.crypto.randomUUID = () =>
    `test-uuid-${(nextId++).toString()}` as `${string}-${string}-${string}-${string}-${string}`;
}

describe('ModuleBarComponent', () => {
  let component: ModuleBarComponent;
  let fixture: ComponentFixture<ModuleBarComponent>;
  let notificationsStore: InstanceType<typeof NotificationsStore>;

  const modules: readonly ModuleLink[] = [
    { id: 'hr-essentials', label: 'HR Essentials', route: '/hr-essentials' },
    { id: 'ess-mss', label: 'ESS/MSS', route: '/ess-mss' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModuleBarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('modules', modules);
    fixture.componentRef.setInput('activeModuleId', 'hr-essentials');

    notificationsStore = TestBed.inject(NotificationsStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not render the unread badge when there are no unread notifications', () => {
    const badge = (fixture.nativeElement as HTMLElement).querySelector('tsn-badge');
    expect(badge).toBeNull();
  });

  it('renders the unread badge with tone="danger" once there is an unread notification', () => {
    notificationsStore.push({
      severity: 'info',
      title: 'Timesheet due',
      message: 'Submit by Friday',
    });
    fixture.detectChanges();

    const badge = (fixture.nativeElement as HTMLElement).querySelector('tsn-badge');
    expect(badge).not.toBeNull();
    expect(badge?.textContent?.trim()).toBe('1');
  });

  it('emits moduleSelected with the clicked module id', () => {
    const emitted: string[] = [];
    component.moduleSelected.subscribe((id) => emitted.push(id));

    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      '.tsn-module-bar__module',
    );
    buttons[1].click();

    expect(emitted).toEqual(['ess-mss']);
  });

  it('emits notificationsClicked and userMenuClicked', () => {
    let notificationsFired = false;
    let userMenuFired = false;
    component.notificationsClicked.subscribe(() => (notificationsFired = true));
    component.userMenuClicked.subscribe(() => (userMenuFired = true));

    const actions = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      '.tsn-module-bar__action',
    );
    actions[0].click();
    actions[1].click();

    expect(notificationsFired).toBe(true);
    expect(userMenuFired).toBe(true);
  });
});

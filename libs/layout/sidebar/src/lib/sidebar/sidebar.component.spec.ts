import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import type { SidebarItem } from './sidebar-item.interface';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const items: readonly SidebarItem[] = [
    { label: 'Overview', route: '/hr/overview' },
    {
      label: 'People',
      route: '/hr/people',
      children: [
        { label: 'Directory', route: '/hr/people/directory' },
        { label: 'Org chart', route: '/hr/people/org-chart' },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not render nested children until the parent is expanded', () => {
    let children = (fixture.nativeElement as HTMLElement).querySelectorAll('.tsn-sidebar__child');
    expect(children.length).toBe(0);

    const parentButtons = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLButtonElement>('.tsn-sidebar__item');
    parentButtons[1].click();
    fixture.detectChanges();

    children = (fixture.nativeElement as HTMLElement).querySelectorAll('.tsn-sidebar__child');
    expect(children.length).toBe(2);
  });

  it('collapses an expanded parent back on a second click', () => {
    const parentButtons = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLButtonElement>('.tsn-sidebar__item');
    parentButtons[1].click();
    fixture.detectChanges();
    parentButtons[1].click();
    fixture.detectChanges();

    const children = (fixture.nativeElement as HTMLElement).querySelectorAll('.tsn-sidebar__child');
    expect(children.length).toBe(0);
  });

  it('emits itemSelected with the route when a leaf item is clicked', () => {
    const emitted: string[] = [];
    component.itemSelected.subscribe((route) => emitted.push(route));

    const parentButtons = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLButtonElement>('.tsn-sidebar__item');
    parentButtons[0].click();

    expect(emitted).toEqual(['/hr/overview']);
  });

  it('emits itemSelected with the child route when a nested child is clicked', () => {
    const emitted: string[] = [];
    component.itemSelected.subscribe((route) => emitted.push(route));

    const parentButtons = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLButtonElement>('.tsn-sidebar__item');
    parentButtons[1].click();
    fixture.detectChanges();

    const childButton = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.tsn-sidebar__child',
    );
    childButton?.click();

    expect(emitted).toEqual(['/hr/people/directory']);
  });

  it('emits collapsedChange when the collapse toggle is clicked', () => {
    let latest: boolean | undefined;
    component.collapsedChange.subscribe((value) => (latest = value));
    fixture.componentRef.setInput('collapsed', false);

    const toggle = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.tsn-sidebar__toggle',
    );
    toggle?.click();

    expect(latest).toBe(true);
  });
});

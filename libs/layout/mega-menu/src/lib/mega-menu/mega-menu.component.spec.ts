import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MegaMenuComponent } from './mega-menu.component';
import type { MegaMenuSection } from './mega-menu-section.interface';

describe('MegaMenuComponent', () => {
  let component: MegaMenuComponent;
  let fixture: ComponentFixture<MegaMenuComponent>;

  const sections: readonly MegaMenuSection[] = [
    {
      title: 'Payroll',
      links: [
        { label: 'Payslips', route: '/payroll/payslips' },
        { label: 'Tax forms', route: '/payroll/tax-forms' },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MegaMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MegaMenuComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('sections', sections);
    fixture.componentRef.setInput('open', true);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
  });

  afterEach(() => {
    (fixture.nativeElement as HTMLElement).remove();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits linkSelected with the route when a link is clicked', () => {
    const emitted: string[] = [];
    component.linkSelected.subscribe((route) => emitted.push(route));

    const link = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.tsn-mega-menu__link',
    );
    link?.click();

    expect(emitted).toEqual(['/payroll/payslips']);
  });

  it('does not emit closed when clicking inside the panel', () => {
    let closed = false;
    component.closed.subscribe(() => (closed = true));

    const link = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.tsn-mega-menu__link',
    );
    link?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(closed).toBe(false);
  });

  it('emits closed when clicking outside the panel', () => {
    let closed = false;
    component.closed.subscribe(() => (closed = true));

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(closed).toBe(true);
  });

  it('does not emit closed from an outside click when the panel is not open', () => {
    fixture.componentRef.setInput('open', false);
    fixture.detectChanges();

    let closed = false;
    component.closed.subscribe(() => (closed = true));

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(closed).toBe(false);
  });
});

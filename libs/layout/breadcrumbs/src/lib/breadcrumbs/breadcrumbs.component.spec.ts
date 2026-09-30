import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import type { Breadcrumb } from './breadcrumb.interface';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  const crumbs: readonly Breadcrumb[] = [
    { label: 'Home', route: '/' },
    { label: 'HR Essentials', route: '/hr-essentials' },
    { label: 'Employee Directory', route: null },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('crumbs', crumbs);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('marks aria-current="page" only on the last crumb', () => {
    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('.tsn-breadcrumbs__item');
    expect(items.length).toBe(3);

    const current = (fixture.nativeElement as HTMLElement).querySelector(
      '.tsn-breadcrumbs__current',
    );
    expect(current?.getAttribute('aria-current')).toBe('page');
    expect(current?.textContent?.trim()).toBe('Employee Directory');
  });

  it('renders every non-current crumb as a link', () => {
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll('.tsn-breadcrumbs__link');
    expect(links.length).toBe(2);
  });

  it('emits crumbSelected with the route when a link crumb is clicked', () => {
    const emitted: string[] = [];
    component.crumbSelected.subscribe((route) => emitted.push(route));

    const links = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>(
      '.tsn-breadcrumbs__link',
    );
    links[1].click();

    expect(emitted).toEqual(['/hr-essentials']);
  });
});

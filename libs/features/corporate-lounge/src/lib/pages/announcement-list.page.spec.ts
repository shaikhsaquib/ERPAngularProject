import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PermissionService } from '@timescapenu/core-permissions';
import type { PagedResult } from '@timescapenu/shared-models';
import { AnnouncementListPageComponent } from './announcement-list.page';
import { AnnouncementService } from '../services/announcement.service';
import type { Announcement } from '../models/announcement.interface';

describe('AnnouncementListPageComponent', () => {
  let fixture: ComponentFixture<AnnouncementListPageComponent>;
  let component: AnnouncementListPageComponent;
  let announcementServiceMock: { list: jest.Mock };
  let permissionService: PermissionService;

  const announcements: readonly Announcement[] = [
    {
      id: 'a-1',
      title: 'Q3 town hall recap',
      category: 'Company update',
      author: 'HR Team',
      publishedAt: '2026-09-01',
    },
  ];

  beforeEach(async () => {
    announcementServiceMock = { list: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [AnnouncementListPageComponent],
      providers: [{ provide: AnnouncementService, useValue: announcementServiceMock }],
    }).compileComponents();

    permissionService = TestBed.inject(PermissionService);
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(AnnouncementListPageComponent);
    component = fixture.componentInstance;
  }

  it('loads announcements and updates rows/totalCount/loading signals when permitted', () => {
    permissionService.setContext({ capabilities: new Set(['corporate-lounge.announcement.view']) });
    const pagedResult: PagedResult<Announcement> = {
      items: announcements,
      totalCount: 1,
      page: 1,
      pageSize: 10,
    };
    announcementServiceMock.list.mockReturnValue(of(pagedResult));

    createComponent();
    fixture.detectChanges();

    expect(announcementServiceMock.list).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      sort: undefined,
    });
    expect(component.rows()).toEqual(announcements);
    expect(component.totalCount()).toBe(1);
    expect(component.loading()).toBe(false);
  });

  it('hides the data table and shows the restricted empty state without the view capability', () => {
    permissionService.setContext({ capabilities: new Set() });
    announcementServiceMock.list.mockReturnValue(
      of({ items: [], totalCount: 0, page: 1, pageSize: 10 } satisfies PagedResult<Announcement>),
    );

    createComponent();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('tsn-data-table')).toBeNull();
    expect(compiled.textContent).toContain('Access restricted');
  });
});

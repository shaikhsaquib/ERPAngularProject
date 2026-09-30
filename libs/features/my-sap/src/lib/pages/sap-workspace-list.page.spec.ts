import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PermissionService } from '@timescapenu/core-permissions';
import type { PagedResult } from '@timescapenu/shared-models';
import { SapWorkspaceListPageComponent } from './sap-workspace-list.page';
import { SapWorkspaceService } from '../services/sap-workspace.service';
import type { SapWorkspaceLink } from '../models/sap-workspace-link.interface';

describe('SapWorkspaceListPageComponent', () => {
  let fixture: ComponentFixture<SapWorkspaceListPageComponent>;
  let component: SapWorkspaceListPageComponent;
  let sapWorkspaceServiceMock: { list: jest.Mock };
  let permissionService: PermissionService;

  const links: readonly SapWorkspaceLink[] = [
    {
      id: 'w-1',
      name: 'Purchase order display',
      transactionCode: 'ME23N',
      description: 'View purchase order details',
    },
  ];

  beforeEach(async () => {
    sapWorkspaceServiceMock = { list: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [SapWorkspaceListPageComponent],
      providers: [{ provide: SapWorkspaceService, useValue: sapWorkspaceServiceMock }],
    }).compileComponents();

    permissionService = TestBed.inject(PermissionService);
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(SapWorkspaceListPageComponent);
    component = fixture.componentInstance;
  }

  it('loads sap workspace links and updates rows/totalCount/loading signals when permitted', () => {
    permissionService.setContext({ capabilities: new Set(['my-sap.workspace.view']) });
    const pagedResult: PagedResult<SapWorkspaceLink> = {
      items: links,
      totalCount: 1,
      page: 1,
      pageSize: 10,
    };
    sapWorkspaceServiceMock.list.mockReturnValue(of(pagedResult));

    createComponent();
    fixture.detectChanges();

    expect(sapWorkspaceServiceMock.list).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      sort: undefined,
    });
    expect(component.rows()).toEqual(links);
    expect(component.totalCount()).toBe(1);
    expect(component.loading()).toBe(false);
  });

  it('opens a placeholder SAP launch URL for the clicked row', () => {
    permissionService.setContext({
      capabilities: new Set(['my-sap.workspace.view', 'my-sap.workspace.launch']),
    });
    sapWorkspaceServiceMock.list.mockReturnValue(
      of({
        items: links,
        totalCount: 1,
        page: 1,
        pageSize: 10,
      } satisfies PagedResult<SapWorkspaceLink>),
    );
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    createComponent();
    fixture.detectChanges();

    component.openInSap(links[0]);

    expect(openSpy).toHaveBeenCalledWith('https://sap.example.com/launch?tcode=ME23N', '_blank');
    openSpy.mockRestore();
  });

  it('hides the data table and shows the restricted empty state without the view capability', () => {
    permissionService.setContext({ capabilities: new Set() });
    sapWorkspaceServiceMock.list.mockReturnValue(
      of({
        items: [],
        totalCount: 0,
        page: 1,
        pageSize: 10,
      } satisfies PagedResult<SapWorkspaceLink>),
    );

    createComponent();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('tsn-data-table')).toBeNull();
    expect(compiled.textContent).toContain('Access restricted');
  });
});

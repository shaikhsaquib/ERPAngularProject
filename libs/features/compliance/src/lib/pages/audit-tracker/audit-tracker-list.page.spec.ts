import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { buildPagedResult } from '@timescapenu/testing';
import { PermissionService } from '@timescapenu/core-permissions';
import { AuditTrackerService } from '../../services/audit-tracker.service';
import type { AuditTrackerEntry } from '../../models/audit-tracker-entry.interface';
import { AuditTrackerListPageComponent } from './audit-tracker-list.page';

describe('AuditTrackerListPageComponent', () => {
  let fixture: ComponentFixture<AuditTrackerListPageComponent>;
  let component: AuditTrackerListPageComponent;
  let permissionService: PermissionService;
  let auditTrackerServiceMock: { list: jest.Mock };

  const sampleEntry: AuditTrackerEntry = {
    id: 'at-1',
    area: 'Finance',
    description: 'Quarterly control review',
    status: 'submitted',
    dueDate: '2026-02-01',
    owner: 'Jane Doe',
  };

  beforeEach(async () => {
    auditTrackerServiceMock = {
      list: jest.fn().mockReturnValue(of(buildPagedResult([sampleEntry]))),
    };

    await TestBed.configureTestingModule({
      imports: [AuditTrackerListPageComponent],
      providers: [{ provide: AuditTrackerService, useValue: auditTrackerServiceMock }],
    }).compileComponents();

    permissionService = TestBed.inject(PermissionService);
    fixture = TestBed.createComponent(AuditTrackerListPageComponent);
    component = fixture.componentInstance;
  });

  it('loads entries on init and populates rows/totalCount, clearing loading', () => {
    fixture.detectChanges();

    expect(auditTrackerServiceMock.list).toHaveBeenCalledWith({
      page: 1,
      pageSize: 20,
      sort: undefined,
    });
    expect(component['rows']()).toEqual([sampleEntry]);
    expect(component['totalCount']()).toBe(1);
    expect(component['loading']()).toBe(false);
  });

  it('reloads with the new sort on sortChange', () => {
    fixture.detectChanges();
    auditTrackerServiceMock.list.mockClear();

    component['onSortChange']({ field: 'dueDate', direction: 'asc' });

    expect(auditTrackerServiceMock.list).toHaveBeenCalledWith({
      page: 1,
      pageSize: 20,
      sort: [{ field: 'dueDate', direction: 'asc' }],
    });
  });

  it('shows the access-restricted empty state without the view capability', () => {
    permissionService.setContext({ capabilities: new Set() });
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('tsn-data-table'))).toBeNull();
    expect(fixture.debugElement.query(By.css('tsn-empty-state'))).not.toBeNull();
  });

  it('renders the table once the view capability is granted', () => {
    permissionService.setContext({ capabilities: new Set(['compliance.audit-tracker.view']) });
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('tsn-data-table'))).not.toBeNull();
  });
});

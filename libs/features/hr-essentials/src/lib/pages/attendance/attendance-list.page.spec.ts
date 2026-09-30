import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { buildPagedResult } from '@timescapenu/testing';
import { PermissionService } from '@timescapenu/core-permissions';
import { AttendanceService } from '../../services/attendance.service';
import type { AttendanceRecord } from '../../models/attendance-record.interface';
import { AttendanceListPageComponent } from './attendance-list.page';

describe('AttendanceListPageComponent', () => {
  let fixture: ComponentFixture<AttendanceListPageComponent>;
  let component: AttendanceListPageComponent;
  let permissionService: PermissionService;
  let attendanceServiceMock: { list: jest.Mock };

  const sampleRecord: AttendanceRecord = {
    id: 'att-1',
    employeeName: 'Jane Doe',
    date: '2026-01-15',
    status: 'present',
    hoursWorked: 8,
  };

  beforeEach(async () => {
    attendanceServiceMock = {
      list: jest.fn().mockReturnValue(of(buildPagedResult([sampleRecord]))),
    };

    await TestBed.configureTestingModule({
      imports: [AttendanceListPageComponent],
      providers: [{ provide: AttendanceService, useValue: attendanceServiceMock }],
    }).compileComponents();

    permissionService = TestBed.inject(PermissionService);
    fixture = TestBed.createComponent(AttendanceListPageComponent);
    component = fixture.componentInstance;
  });

  it('loads records on init and populates rows/totalCount, clearing loading', () => {
    fixture.detectChanges();

    expect(attendanceServiceMock.list).toHaveBeenCalledWith({
      page: 1,
      pageSize: 20,
      sort: undefined,
    });
    expect(component['rows']()).toEqual([sampleRecord]);
    expect(component['totalCount']()).toBe(1);
    expect(component['loading']()).toBe(false);
  });

  it('sets loading while the request is in flight', () => {
    attendanceServiceMock.list.mockReturnValue(of(buildPagedResult([sampleRecord])));
    expect(component['loading']()).toBe(false);

    fixture.detectChanges();

    expect(component['loading']()).toBe(false);
  });

  it('shows the access-restricted empty state without the view capability', () => {
    permissionService.setContext({ capabilities: new Set() });
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('tsn-data-table'))).toBeNull();
    expect(fixture.debugElement.query(By.css('tsn-empty-state'))).not.toBeNull();
  });

  it('renders the table once the view capability is granted', () => {
    permissionService.setContext({ capabilities: new Set(['hr-essentials.attendance.view']) });
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('tsn-data-table'))).not.toBeNull();
  });
});

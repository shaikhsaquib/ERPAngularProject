import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { buildPagedResult } from '@timescapenu/testing';
import { ApiClientService } from '@timescapenu/core-api-client';
import { AttendanceService } from './attendance.service';
import type { AttendanceRecord } from '../models/attendance-record.interface';

describe('AttendanceService', () => {
  let service: AttendanceService;
  let apiClient: { getPaged: jest.Mock };

  beforeEach(() => {
    apiClient = { getPaged: jest.fn() };

    TestBed.configureTestingModule({
      providers: [{ provide: ApiClientService, useValue: apiClient }],
    });

    service = TestBed.inject(AttendanceService);
  });

  it('lists attendance records through the paged endpoint', () => {
    const query = { page: 1, pageSize: 20 };
    apiClient.getPaged.mockReturnValue(of(buildPagedResult<AttendanceRecord>([])));

    service.list(query).subscribe();

    expect(apiClient.getPaged).toHaveBeenCalledWith('hr-essentials/attendance', query);
  });
});

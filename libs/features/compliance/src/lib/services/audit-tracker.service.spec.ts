import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { buildPagedResult } from '@timescapenu/testing';
import { ApiClientService } from '@timescapenu/core-api-client';
import { AuditTrackerService } from './audit-tracker.service';
import type { AuditTrackerEntry } from '../models/audit-tracker-entry.interface';

describe('AuditTrackerService', () => {
  let service: AuditTrackerService;
  let apiClient: { getPaged: jest.Mock };

  beforeEach(() => {
    apiClient = { getPaged: jest.fn() };

    TestBed.configureTestingModule({
      providers: [{ provide: ApiClientService, useValue: apiClient }],
    });

    service = TestBed.inject(AuditTrackerService);
  });

  it('lists audit tracker entries through the paged endpoint', () => {
    const query = { page: 1, pageSize: 20 };
    apiClient.getPaged.mockReturnValue(of(buildPagedResult<AuditTrackerEntry>([])));

    service.list(query).subscribe();

    expect(apiClient.getPaged).toHaveBeenCalledWith('compliance/audit-tracker', query);
  });
});

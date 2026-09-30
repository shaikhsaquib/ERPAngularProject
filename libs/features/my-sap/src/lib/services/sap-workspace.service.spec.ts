import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiClientService } from '@timescapenu/core-api-client';
import type { PagedResult } from '@timescapenu/shared-models';
import { SapWorkspaceService } from './sap-workspace.service';
import type { SapWorkspaceLink } from '../models/sap-workspace-link.interface';

describe('SapWorkspaceService', () => {
  let service: SapWorkspaceService;
  let apiClientMock: { getPaged: jest.Mock };

  beforeEach(() => {
    apiClientMock = { getPaged: jest.fn() };

    TestBed.configureTestingModule({
      providers: [SapWorkspaceService, { provide: ApiClientService, useValue: apiClientMock }],
    });

    service = TestBed.inject(SapWorkspaceService);
  });

  it('requests the my-sap workspaces endpoint with the given query', () => {
    const pagedResult: PagedResult<SapWorkspaceLink> = {
      items: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
    };
    apiClientMock.getPaged.mockReturnValue(of(pagedResult));

    service.list({ page: 1, pageSize: 10 }).subscribe();

    expect(apiClientMock.getPaged).toHaveBeenCalledWith('my-sap/workspaces', {
      page: 1,
      pageSize: 10,
    });
  });
});

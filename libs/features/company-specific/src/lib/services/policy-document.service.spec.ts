import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiClientService } from '@timescapenu/core-api-client';
import type { PagedResult } from '@timescapenu/shared-models';
import { PolicyDocumentService } from './policy-document.service';
import type { PolicyDocument } from '../models/policy-document.interface';

describe('PolicyDocumentService', () => {
  let service: PolicyDocumentService;
  let apiClientMock: { getPaged: jest.Mock };

  beforeEach(() => {
    apiClientMock = { getPaged: jest.fn() };

    TestBed.configureTestingModule({
      providers: [PolicyDocumentService, { provide: ApiClientService, useValue: apiClientMock }],
    });

    service = TestBed.inject(PolicyDocumentService);
  });

  it('requests the company-specific policies endpoint with the given query', () => {
    const pagedResult: PagedResult<PolicyDocument> = {
      items: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
    };
    apiClientMock.getPaged.mockReturnValue(of(pagedResult));

    service.list({ page: 1, pageSize: 10 }).subscribe();

    expect(apiClientMock.getPaged).toHaveBeenCalledWith('company-specific/policies', {
      page: 1,
      pageSize: 10,
    });
  });
});

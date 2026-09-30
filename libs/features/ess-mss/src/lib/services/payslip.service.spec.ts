import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiClientService } from '@timescapenu/core-api-client';
import type { PagedResult } from '@timescapenu/shared-models';
import { PayslipService } from './payslip.service';
import type { Payslip } from '../models/payslip.interface';

describe('PayslipService', () => {
  let service: PayslipService;
  let apiClientMock: { getPaged: jest.Mock };

  beforeEach(() => {
    apiClientMock = { getPaged: jest.fn() };

    TestBed.configureTestingModule({
      providers: [PayslipService, { provide: ApiClientService, useValue: apiClientMock }],
    });

    service = TestBed.inject(PayslipService);
  });

  it('requests the ess-mss payslips endpoint with the given query', () => {
    const pagedResult: PagedResult<Payslip> = { items: [], totalCount: 0, page: 1, pageSize: 10 };
    apiClientMock.getPaged.mockReturnValue(of(pagedResult));

    service.list({ page: 1, pageSize: 10 }).subscribe();

    expect(apiClientMock.getPaged).toHaveBeenCalledWith('ess-mss/payslips', {
      page: 1,
      pageSize: 10,
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { buildPagedResult } from '@timescapenu/testing';
import { ApiClientService } from '@timescapenu/core-api-client';
import { GatepassService } from './gatepass.service';
import type { Gatepass } from '../models/gatepass.interface';

describe('GatepassService', () => {
  let service: GatepassService;
  let apiClient: { getPaged: jest.Mock; post: jest.Mock };

  beforeEach(() => {
    apiClient = { getPaged: jest.fn(), post: jest.fn() };

    TestBed.configureTestingModule({
      providers: [{ provide: ApiClientService, useValue: apiClient }],
    });

    service = TestBed.inject(GatepassService);
  });

  it('lists gatepasses through the paged gatepasses endpoint', () => {
    const query = { page: 1, pageSize: 20 };
    apiClient.getPaged.mockReturnValue(of(buildPagedResult<Gatepass>([])));

    service.list(query).subscribe();

    expect(apiClient.getPaged).toHaveBeenCalledWith('application-services/gatepasses', query);
  });

  it('creates a gatepass via a POST to the gatepasses endpoint', () => {
    const payload: Omit<Gatepass, 'id' | 'status'> = {
      visitorName: 'Jane Doe',
      purpose: 'Vendor visit',
      validFrom: '2026-01-01',
      validTo: '2026-01-02',
    };
    apiClient.post.mockReturnValue(of({ id: 'gp-1', status: 'draft', ...payload }));

    service.create(payload).subscribe();

    expect(apiClient.post).toHaveBeenCalledWith('application-services/gatepasses', payload);
  });
});

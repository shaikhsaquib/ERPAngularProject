import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiClientService } from '@timescapenu/core-api-client';
import type { PagedResult } from '@timescapenu/shared-models';
import { AnnouncementService } from './announcement.service';
import type { Announcement } from '../models/announcement.interface';

describe('AnnouncementService', () => {
  let service: AnnouncementService;
  let apiClientMock: { getPaged: jest.Mock };

  beforeEach(() => {
    apiClientMock = { getPaged: jest.fn() };

    TestBed.configureTestingModule({
      providers: [AnnouncementService, { provide: ApiClientService, useValue: apiClientMock }],
    });

    service = TestBed.inject(AnnouncementService);
  });

  it('requests the corporate-lounge announcements endpoint with the given query', () => {
    const pagedResult: PagedResult<Announcement> = {
      items: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
    };
    apiClientMock.getPaged.mockReturnValue(of(pagedResult));

    service.list({ page: 1, pageSize: 10 }).subscribe();

    expect(apiClientMock.getPaged).toHaveBeenCalledWith('corporate-lounge/announcements', {
      page: 1,
      pageSize: 10,
    });
  });
});

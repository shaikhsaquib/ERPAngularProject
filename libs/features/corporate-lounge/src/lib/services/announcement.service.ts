import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { ApiClientService } from '@timescapenu/core-api-client';
import type { PagedResult, QueryParams } from '@timescapenu/shared-models';
import type { Announcement } from '../models/announcement.interface';

/** Company announcements & recognition posts. */
@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private readonly api = inject(ApiClientService);

  list(query: QueryParams): Observable<PagedResult<Announcement>> {
    return this.api.getPaged<Announcement>('corporate-lounge/announcements', query);
  }
}

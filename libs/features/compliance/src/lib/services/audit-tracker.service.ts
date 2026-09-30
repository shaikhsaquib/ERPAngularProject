import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PagedResult, QueryParams } from '@timescapenu/shared-models';
import { ApiClientService } from '@timescapenu/core-api-client';
import type { AuditTrackerEntry } from '../models/audit-tracker-entry.interface';

@Injectable({ providedIn: 'root' })
export class AuditTrackerService {
  private readonly api = inject(ApiClientService);

  list(query: QueryParams): Observable<PagedResult<AuditTrackerEntry>> {
    return this.api.getPaged<AuditTrackerEntry>('compliance/audit-tracker', query);
  }
}

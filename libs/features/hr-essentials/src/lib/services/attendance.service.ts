import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PagedResult, QueryParams } from '@timescapenu/shared-models';
import { ApiClientService } from '@timescapenu/core-api-client';
import type { AttendanceRecord } from '../models/attendance-record.interface';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private readonly api = inject(ApiClientService);

  list(query: QueryParams): Observable<PagedResult<AttendanceRecord>> {
    return this.api.getPaged<AttendanceRecord>('hr-essentials/attendance', query);
  }
}

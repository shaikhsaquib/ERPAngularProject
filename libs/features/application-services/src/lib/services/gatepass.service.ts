import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PagedResult, QueryParams } from '@timescapenu/shared-models';
import { ApiClientService } from '@timescapenu/core-api-client';
import type { Gatepass } from '../models/gatepass.interface';

const GATEPASSES_PATH = 'application-services/gatepasses';

@Injectable({ providedIn: 'root' })
export class GatepassService {
  private readonly api = inject(ApiClientService);

  list(query: QueryParams): Observable<PagedResult<Gatepass>> {
    return this.api.getPaged<Gatepass>(GATEPASSES_PATH, query);
  }

  create(payload: Omit<Gatepass, 'id' | 'status'>): Observable<Gatepass> {
    return this.api.post<Gatepass, Omit<Gatepass, 'id' | 'status'>>(GATEPASSES_PATH, payload);
  }
}

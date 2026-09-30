import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { ApiClientService } from '@timescapenu/core-api-client';
import type { PagedResult, QueryParams } from '@timescapenu/shared-models';
import type { PolicyDocument } from '../models/policy-document.interface';

/** Company-specific policy documents. */
@Injectable({ providedIn: 'root' })
export class PolicyDocumentService {
  private readonly api = inject(ApiClientService);

  list(query: QueryParams): Observable<PagedResult<PolicyDocument>> {
    return this.api.getPaged<PolicyDocument>('company-specific/policies', query);
  }
}

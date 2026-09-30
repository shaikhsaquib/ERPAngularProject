import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { ApiClientService } from '@timescapenu/core-api-client';
import type { PagedResult, QueryParams } from '@timescapenu/shared-models';
import type { SapWorkspaceLink } from '../models/sap-workspace-link.interface';

/** Launcher into legacy SAP transactions. */
@Injectable({ providedIn: 'root' })
export class SapWorkspaceService {
  private readonly api = inject(ApiClientService);

  list(query: QueryParams): Observable<PagedResult<SapWorkspaceLink>> {
    return this.api.getPaged<SapWorkspaceLink>('my-sap/workspaces', query);
  }
}

import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { ApiClientService } from '@timescapenu/core-api-client';
import type { PagedResult, QueryParams } from '@timescapenu/shared-models';
import type { Payslip } from '../models/payslip.interface';

/** Employee/manager self-service payslip listing. */
@Injectable({ providedIn: 'root' })
export class PayslipService {
  private readonly api = inject(ApiClientService);

  list(query: QueryParams): Observable<PagedResult<Payslip>> {
    return this.api.getPaged<Payslip>('ess-mss/payslips', query);
  }
}

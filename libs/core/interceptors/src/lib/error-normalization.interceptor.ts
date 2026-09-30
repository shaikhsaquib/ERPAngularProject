import { HttpErrorResponse, type HttpInterceptorFn } from '@angular/common/http';
import type { ApiErrorSeverity, NormalizedApiError } from '@timescapenu/shared-models';
import { catchError, throwError } from 'rxjs';
import { CORRELATION_ID_HEADER } from './correlation-id.interceptor';

function severityForStatus(status: number): ApiErrorSeverity {
  if (status === 0) return 'network';
  if (status === 401 || status === 403) return 'auth';
  if (status === 422) return 'validation';
  if (status >= 500) return 'server';
  return 'business';
}

/** Every error thrown from core/api-client arrives at feature code in this one shape. */
export const errorNormalizationInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse)) {
        return throwError(() => error);
      }

      const body = typeof error.error === 'object' && error.error !== null ? error.error : {};
      const normalized: NormalizedApiError = {
        severity: severityForStatus(error.status),
        status: error.status,
        code: 'code' in body ? String(body.code) : `HTTP_${error.status}`,
        message: 'message' in body ? String(body.message) : error.message,
        correlationId: req.headers.get(CORRELATION_ID_HEADER) ?? 'unknown',
        fieldErrors: 'fieldErrors' in body ? body.fieldErrors : undefined,
      };

      return throwError(() => normalized);
    }),
  );

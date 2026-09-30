import { HttpErrorResponse, type HttpInterceptorFn } from '@angular/common/http';
import { timer } from 'rxjs';
import { retry } from 'rxjs/operators';

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 200;

function isRetryable(error: unknown): boolean {
  if (!(error instanceof HttpErrorResponse)) {
    return false;
  }
  return error.status === 0 || error.status >= 500;
}

/** Idempotent GET requests only: transient network/5xx failures get retried with exponential backoff. */
export const retryWithBackoffInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  return next(req).pipe(
    retry({
      count: MAX_RETRIES,
      delay: (error: unknown, retryCount: number) => {
        if (!isRetryable(error)) {
          throw error;
        }
        return timer(BASE_DELAY_MS * 2 ** (retryCount - 1));
      },
    }),
  );
};

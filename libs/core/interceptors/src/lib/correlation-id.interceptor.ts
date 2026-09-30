import type { HttpInterceptorFn } from '@angular/common/http';

export const CORRELATION_ID_HEADER = 'X-Correlation-Id';

function generateCorrelationId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Stamps every outgoing request with a correlation ID so it can be traced end-to-end in logs. */
export const correlationIdInterceptor: HttpInterceptorFn = (req, next) => {
  const correlationId = req.headers.get(CORRELATION_ID_HEADER) ?? generateCorrelationId();
  return next(req.clone({ setHeaders: { [CORRELATION_ID_HEADER]: correlationId } }));
};

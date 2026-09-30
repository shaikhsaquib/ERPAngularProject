import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionStore } from '@timescapenu/core-state';
import type { AuditLogEntry } from '@timescapenu/shared-models';
import { tap } from 'rxjs/operators';
import { AuditLogService } from './audit-log.service';
import { CORRELATION_ID_HEADER } from './correlation-id.interceptor';

const STATE_CHANGING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function pathSegments(url: string): string[] {
  const path = url.startsWith('http') ? new URL(url).pathname : url;
  return path
    .split('/')
    .filter(Boolean)
    .filter((segment) => segment !== 'api');
}

/**
 * Every state-changing call made through core/api-client passes through here
 * automatically, so feature services never have to remember to call an
 * "audit" method themselves — the traceability is structural, not opt-in.
 */
export const auditLogInterceptor: HttpInterceptorFn = (req, next) => {
  if (!STATE_CHANGING_METHODS.has(req.method)) {
    return next(req);
  }

  const auditLog = inject(AuditLogService);
  const sessionStore = inject(SessionStore);
  const [module = 'unknown', entity = module, entityId = ''] = pathSegments(req.urlWithParams);

  return next(req).pipe(
    tap({
      next: () => {
        const entry: AuditLogEntry = {
          correlationId: req.headers.get(CORRELATION_ID_HEADER) ?? 'unknown',
          actorId: sessionStore.user()?.id ?? 'anonymous',
          module,
          entity,
          entityId,
          action: req.method,
          occurredAt: new Date().toISOString(),
          after: req.body,
        };
        auditLog.record(entry);
      },
    }),
  );
};

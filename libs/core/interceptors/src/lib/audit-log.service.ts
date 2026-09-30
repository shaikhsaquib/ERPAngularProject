import { Injectable, signal } from '@angular/core';
import type { AuditLogEntry } from '@timescapenu/shared-models';

const MAX_BUFFERED_ENTRIES = 200;

/**
 * Buffers audit entries emitted by auditLogInterceptor. Kept as an in-memory
 * buffer rather than posting synchronously from the interceptor itself,
 * since that request would re-enter the same HttpClient interceptor chain.
 * TODO(platform-team): wire a periodic flush (e.g. from apps/shell) that
 * drains this buffer to POST /api/audit-log via ApiClientService.
 */
@Injectable({ providedIn: 'root' })
export class AuditLogService {
  private readonly _entries = signal<readonly AuditLogEntry[]>([]);
  readonly entries = this._entries.asReadonly();

  record(entry: AuditLogEntry): void {
    this._entries.update((entries) => [...entries, entry].slice(-MAX_BUFFERED_ENTRIES));
  }

  drain(): readonly AuditLogEntry[] {
    const entries = this._entries();
    this._entries.set([]);
    return entries;
  }
}

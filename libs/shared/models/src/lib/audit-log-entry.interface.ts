/** Emitted by core/interceptors' audit-log interceptor for every state-changing service call. */
export interface AuditLogEntry {
  correlationId: string;
  actorId: string;
  module: string;
  entity: string;
  entityId: string;
  action: string;
  occurredAt: string;
  before?: unknown;
  after?: unknown;
}

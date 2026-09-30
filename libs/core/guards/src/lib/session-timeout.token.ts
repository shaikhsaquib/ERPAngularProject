import { InjectionToken } from '@angular/core';

/** Idle-timeout threshold in milliseconds before sessionTimeoutGuard forces re-authentication. */
export const SESSION_IDLE_TIMEOUT_MS = new InjectionToken<number>('SESSION_IDLE_TIMEOUT_MS', {
  providedIn: 'root',
  factory: () => 30 * 60 * 1000,
});

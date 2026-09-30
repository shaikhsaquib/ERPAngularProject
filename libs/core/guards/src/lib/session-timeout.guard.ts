import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { AuthService } from '@timescapenu/core-auth';
import { SessionActivityService } from './session-activity.service';
import { SESSION_IDLE_TIMEOUT_MS } from './session-timeout.token';

/** Forces re-authentication once a signed-in user has been idle past the configured threshold. */
export const sessionTimeoutGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const activity = inject(SessionActivityService);
  const idleTimeoutMs = inject(SESSION_IDLE_TIMEOUT_MS);

  if (!authService.isAuthenticated()) {
    return true;
  }

  if (activity.idleForMs() < idleTimeoutMs) {
    activity.touch();
    return true;
  }

  authService.logout();
  return false;
};

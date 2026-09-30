import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { AuthService } from '@timescapenu/core-auth';

/** Blocks navigation for anonymous users and kicks off the SSO redirect instead. */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }

  authService.login();
  return false;
};

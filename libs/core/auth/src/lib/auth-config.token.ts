import { InjectionToken } from '@angular/core';

export interface AuthConfig {
  authorizeEndpoint: string;
  logoutEndpoint: string;
  clientId: string;
  redirectUri: string;
}

/** Provided by apps/shell's bootstrap config (per-environment IdP settings). */
export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AUTH_CONFIG');

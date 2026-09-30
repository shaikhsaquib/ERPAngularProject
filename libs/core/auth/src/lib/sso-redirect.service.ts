import { Injectable } from '@angular/core';
import type { SsoCallbackParams } from './auth-session.interface';

const STATE_STORAGE_KEY = 'tsn.auth.sso-state';

/**
 * Builds the outbound redirect to the identity provider and validates the
 * `state` nonce on the way back, guarding against CSRF on the SSO callback.
 * The actual IdP authorize URL is expected to come from server-provided
 * config (bootstrapped into apps/shell) rather than being hardcoded here.
 */
@Injectable({ providedIn: 'root' })
export class SsoRedirectService {
  buildAuthorizeUrl(authorizeEndpoint: string, clientId: string, redirectUri: string): string {
    const state = this.generateState();
    sessionStorage.setItem(STATE_STORAGE_KEY, state);

    const url = new URL(authorizeEndpoint);
    url.searchParams.set('client_id', clientId);
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', 'openid profile email');
    url.searchParams.set('state', state);
    return url.toString();
  }

  redirectToIdentityProvider(
    authorizeEndpoint: string,
    clientId: string,
    redirectUri: string,
  ): void {
    window.location.assign(this.buildAuthorizeUrl(authorizeEndpoint, clientId, redirectUri));
  }

  /** Reads `?code=&state=` off the current URL and validates state against the stored nonce. */
  captureCallbackParams(currentUrl: string): SsoCallbackParams | null {
    const url = new URL(currentUrl);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const expectedState = sessionStorage.getItem(STATE_STORAGE_KEY);
    sessionStorage.removeItem(STATE_STORAGE_KEY);

    if (!code || !state || !expectedState || state !== expectedState) {
      return null;
    }
    return { code, state };
  }

  private generateState(): string {
    return crypto.randomUUID();
  }
}

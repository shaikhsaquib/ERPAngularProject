import { Injectable, computed, inject } from '@angular/core';
import { ApiClientService } from '@timescapenu/core-api-client';
import { PermissionService } from '@timescapenu/core-permissions';
import { SessionStore } from '@timescapenu/core-state';
import type { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AUTH_CONFIG } from './auth-config.token';
import type { LoginResponse, SsoCallbackParams } from './auth-session.interface';
import { SsoRedirectService } from './sso-redirect.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiClientService);
  private readonly sessionStore = inject(SessionStore);
  private readonly permissionService = inject(PermissionService);
  private readonly ssoRedirect = inject(SsoRedirectService);
  private readonly config = inject(AUTH_CONFIG);

  readonly isAuthenticated = computed(() => this.sessionStore.isAuthenticated());
  readonly accessToken = computed(() => this.sessionStore.accessToken());

  /** Kicks off the SSO redirect flow — call from a "Sign in" action, never auto-redirect from a guard. */
  login(): void {
    this.sessionStore.beginAuthentication();
    this.ssoRedirect.redirectToIdentityProvider(
      this.config.authorizeEndpoint,
      this.config.clientId,
      this.config.redirectUri,
    );
  }

  /** Called once from the SSO callback route after the IdP redirects back with `?code=&state=`. */
  completeSsoLogin(currentUrl: string): Observable<LoginResponse> | null {
    const params = this.ssoRedirect.captureCallbackParams(currentUrl);
    if (!params) {
      return null;
    }
    return this.exchangeCodeForSession(params);
  }

  refreshAccessToken(): Observable<string> {
    return this.api.post<LoginResponse>('auth/refresh', {}).pipe(
      tap((response) => this.applySession(response)),
      map((response) => response.accessToken),
    );
  }

  logout(): void {
    this.sessionStore.clearSession();
    this.permissionService.clear();
    window.location.assign(this.config.logoutEndpoint);
  }

  private exchangeCodeForSession(params: SsoCallbackParams): Observable<LoginResponse> {
    return this.api
      .post<LoginResponse>('auth/sso/callback', params)
      .pipe(tap((response) => this.applySession(response)));
  }

  private applySession(response: LoginResponse): void {
    this.sessionStore.setSession(response.user, response.accessToken);
    this.permissionService.setContext({ capabilities: new Set(response.capabilities) });
  }
}

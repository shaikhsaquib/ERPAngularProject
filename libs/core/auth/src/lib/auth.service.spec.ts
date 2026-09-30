import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SessionStore } from '@timescapenu/core-state';
import { buildUser } from '@timescapenu/testing';
import { AUTH_CONFIG } from './auth-config.token';
import { AuthService } from './auth.service';
import { SsoRedirectService } from './sso-redirect.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let sessionStore: InstanceType<typeof SessionStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AUTH_CONFIG,
          useValue: {
            authorizeEndpoint: 'https://idp.example.com/authorize',
            logoutEndpoint: 'https://idp.example.com/logout',
            clientId: 'timescapenu-shell',
            redirectUri: 'https://app.example.com/auth/callback',
          },
        },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    sessionStore = TestBed.inject(SessionStore);
  });

  afterEach(() => httpMock.verify());

  it('is unauthenticated before a session is established', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('returns null and makes no request when the callback URL has no valid state', () => {
    const result = service.completeSsoLogin('https://app.example.com/auth/callback?code=abc');
    expect(result).toBeNull();
  });

  it('exchanges a valid SSO callback for a session', () => {
    const ssoRedirect = TestBed.inject(SsoRedirectService);
    jest.spyOn(ssoRedirect, 'captureCallbackParams').mockReturnValue({ code: 'abc', state: 'xyz' });

    const user = buildUser();
    service
      .completeSsoLogin('https://app.example.com/auth/callback?code=abc&state=xyz')
      ?.subscribe();

    const req = httpMock.expectOne('/api/auth/sso/callback');
    req.flush({
      user,
      accessToken: 'access-token',
      accessTokenExpiresAt: new Date().toISOString(),
      capabilities: ['ess.payslip.view'],
    });

    expect(sessionStore.isAuthenticated()).toBe(true);
    expect(service.accessToken()).toBe('access-token');
  });
});

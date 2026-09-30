import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AUTH_CONFIG } from '@timescapenu/core-auth';
import { SessionStore } from '@timescapenu/core-state';
import { buildUser } from '@timescapenu/testing';
import { SessionActivityService } from './session-activity.service';
import { sessionTimeoutGuard } from './session-timeout.guard';
import { SESSION_IDLE_TIMEOUT_MS } from './session-timeout.token';

describe('sessionTimeoutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SESSION_IDLE_TIMEOUT_MS, useValue: 1000 },
        {
          provide: AUTH_CONFIG,
          useValue: {
            authorizeEndpoint: 'https://idp.example.com/authorize',
            logoutEndpoint: 'https://idp.example.com/logout',
            clientId: 'shell',
            redirectUri: 'https://app.example.com/auth/callback',
          },
        },
      ],
    });
  });

  it('allows anonymous navigation through untouched', () => {
    const result = TestBed.runInInjectionContext(() =>
      sessionTimeoutGuard({} as never, {} as never),
    );
    expect(result).toBe(true);
  });

  it('logs out an authenticated-but-idle session', () => {
    const sessionStore = TestBed.inject(SessionStore);
    sessionStore.setSession(buildUser(), 'token');
    // Establish the "last activity" timestamp at the real current time
    // BEFORE mocking Date.now — otherwise the service's lazy construction
    // would pick up the mocked future time as its own baseline, making
    // idleForMs() always compute 0.
    const activity = TestBed.inject(SessionActivityService);
    activity.touch();

    jest.spyOn(Date, 'now').mockReturnValue(Date.now() + 5000);

    const result = TestBed.runInInjectionContext(() =>
      sessionTimeoutGuard({} as never, {} as never),
    );

    expect(result).toBe(false);
    expect(sessionStore.isAuthenticated()).toBe(false);

    jest.restoreAllMocks();
  });
});

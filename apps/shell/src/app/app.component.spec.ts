import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AUTH_CONFIG } from '@timescapenu/core-auth';
import { API_BASE_URL } from '@timescapenu/core-api-client';
import { LOCALE_CONFIG } from '@timescapenu/shared-i18n';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(appRoutes),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' },
        {
          provide: AUTH_CONFIG,
          useValue: {
            authorizeEndpoint: 'https://idp.example.com/authorize',
            logoutEndpoint: 'https://idp.example.com/logout',
            clientId: 'shell-test',
            redirectUri: 'http://localhost/auth/callback',
          },
        },
        {
          provide: LOCALE_CONFIG,
          useValue: {
            locale: 'en-US',
            currencyCode: 'USD',
            timeZone: 'UTC',
            dateFormat: 'MM/dd/yyyy',
            dateTimeFormat: 'MM/dd/yyyy HH:mm',
          },
        },
      ],
    }).compileComponents();
  });

  it('creates the root component and its chrome', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.querySelector('tsn-module-bar')).not.toBeNull();
  });
});

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { AUTH_CONFIG } from '@timescapenu/core-auth';
import { API_BASE_URL } from '@timescapenu/core-api-client';
import { LOCALE_CONFIG } from '@timescapenu/shared-i18n';
import {
  auditLogInterceptor,
  correlationIdInterceptor,
  errorNormalizationInterceptor,
  jwtInterceptor,
  retryWithBackoffInterceptor,
} from '@timescapenu/core-interceptors';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideAnimations(),
    provideHttpClient(
      // Order matters: request flows left-to-right, responses/errors flow
      // right-to-left. retryWithBackoff must sit closest to the backend so
      // it sees the RAW HttpErrorResponse (before normalization rewrites
      // it), and correlationId must sit outermost so every interceptor
      // after it sees the header already attached.
      withInterceptors([
        correlationIdInterceptor,
        jwtInterceptor,
        auditLogInterceptor,
        errorNormalizationInterceptor,
        retryWithBackoffInterceptor,
      ]),
    ),
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    { provide: AUTH_CONFIG, useValue: environment.auth },
    { provide: LOCALE_CONFIG, useValue: environment.locale },
  ],
};

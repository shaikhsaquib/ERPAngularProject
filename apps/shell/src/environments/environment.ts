import type { ShellEnvironment } from './shell-environment.interface';

/** Local development defaults. `environment.prod.ts` replaces this file in production builds (see project.json). */
export const environment: ShellEnvironment = {
  production: false,
  apiBaseUrl: '/api',
  auth: {
    authorizeEndpoint: 'https://idp.example.com/authorize',
    logoutEndpoint: 'https://idp.example.com/logout',
    clientId: 'timescapenu-shell-dev',
    redirectUri: 'http://localhost:4200/auth/callback',
  },
  locale: {
    locale: 'en-US',
    currencyCode: 'USD',
    timeZone: 'UTC',
    dateFormat: 'MM/dd/yyyy',
    dateTimeFormat: 'MM/dd/yyyy HH:mm',
  },
};

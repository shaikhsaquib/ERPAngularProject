import type { ShellEnvironment } from './shell-environment.interface';

/** TODO(platform-team): replace with the real per-environment IdP/API values at deploy time. */
export const environment: ShellEnvironment = {
  production: true,
  apiBaseUrl: '/api',
  auth: {
    authorizeEndpoint: 'https://idp.timescapenu.example.com/authorize',
    logoutEndpoint: 'https://idp.timescapenu.example.com/logout',
    clientId: 'timescapenu-shell',
    redirectUri: 'https://app.timescapenu.example.com/auth/callback',
  },
  locale: {
    locale: 'en-US',
    currencyCode: 'USD',
    timeZone: 'UTC',
    dateFormat: 'MM/dd/yyyy',
    dateTimeFormat: 'MM/dd/yyyy HH:mm',
  },
};

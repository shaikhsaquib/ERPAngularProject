import { Routes } from '@angular/router';

/**
 * Root route for the home module — single landing/dashboard page, no
 * sub-domains. apps/shell applies authGuard/sessionTimeoutGuard around this
 * array; it stays guard-free here.
 */
export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-dashboard.page').then((m) => m.HomeDashboardPageComponent),
  },
];

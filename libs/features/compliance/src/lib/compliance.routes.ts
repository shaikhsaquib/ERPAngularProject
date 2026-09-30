import { Routes } from '@angular/router';

/**
 * Sub-domains: audit-tracker (fully built demo), governance / declarations
 * (placeholders). apps/shell applies authGuard/sessionTimeoutGuard around
 * this array; it stays guard-free here.
 */
export const complianceRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'audit-tracker' },
  {
    path: 'audit-tracker',
    loadComponent: () =>
      import('./pages/audit-tracker/audit-tracker-list.page').then(
        (m) => m.AuditTrackerListPageComponent,
      ),
  },
  {
    path: 'governance',
    loadComponent: () =>
      import('./pages/governance/governance-placeholder.page').then(
        (m) => m.GovernancePlaceholderPageComponent,
      ),
  },
  {
    path: 'declarations',
    loadComponent: () =>
      import('./pages/declarations/declarations-placeholder.page').then(
        (m) => m.DeclarationsPlaceholderPageComponent,
      ),
  },
];

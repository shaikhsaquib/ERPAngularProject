import { Routes } from '@angular/router';

/**
 * Sub-domains: gatepass (fully built demo), par / registration / allowances
 * (placeholders). apps/shell applies authGuard/sessionTimeoutGuard around
 * this array; it stays guard-free here.
 */
export const applicationServicesRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'gatepass' },
  {
    path: 'gatepass',
    loadComponent: () =>
      import('./pages/gatepass/gatepass-list.page').then((m) => m.GatepassListPageComponent),
  },
  {
    path: 'par',
    loadComponent: () =>
      import('./pages/par/par-placeholder.page').then((m) => m.ParPlaceholderPageComponent),
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./pages/registration/registration-placeholder.page').then(
        (m) => m.RegistrationPlaceholderPageComponent,
      ),
  },
  {
    path: 'allowances',
    loadComponent: () =>
      import('./pages/allowances/allowances-placeholder.page').then(
        (m) => m.AllowancesPlaceholderPageComponent,
      ),
  },
];

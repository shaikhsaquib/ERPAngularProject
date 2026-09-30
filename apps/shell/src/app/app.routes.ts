import type { Routes } from '@angular/router';
import { authGuard, sessionTimeoutGuard } from '@timescapenu/core-guards';

export const appRoutes: Routes = [
  {
    path: 'auth/callback',
    loadComponent: () =>
      import('./auth-callback/auth-callback.component').then((m) => m.AuthCallbackComponent),
  },
  {
    path: '',
    canActivate: [authGuard, sessionTimeoutGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: () => import('@timescapenu/feature-home').then((m) => m.homeRoutes),
      },
      {
        path: 'application-services',
        loadChildren: () =>
          import('@timescapenu/feature-application-services').then(
            (m) => m.applicationServicesRoutes,
          ),
      },
      {
        path: 'compliance',
        loadChildren: () =>
          import('@timescapenu/feature-compliance').then((m) => m.complianceRoutes),
      },
      {
        path: 'hr-essentials',
        loadChildren: () =>
          import('@timescapenu/feature-hr-essentials').then((m) => m.hrEssentialsRoutes),
      },
      {
        path: 'ess-mss',
        loadChildren: () => import('@timescapenu/feature-ess-mss').then((m) => m.essMssRoutes),
      },
      {
        path: 'corporate-lounge',
        loadChildren: () =>
          import('@timescapenu/feature-corporate-lounge').then((m) => m.corporateLoungeRoutes),
      },
      {
        path: 'company-specific',
        loadChildren: () =>
          import('@timescapenu/feature-company-specific').then((m) => m.companySpecificRoutes),
      },
      {
        path: 'my-sap',
        loadChildren: () => import('@timescapenu/feature-my-sap').then((m) => m.mySapRoutes),
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

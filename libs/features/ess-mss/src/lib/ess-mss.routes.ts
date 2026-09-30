import { Routes } from '@angular/router';

/**
 * ESS/MSS is the largest module — sub-organized by sub-domain. Only
 * `payslip` is fully built out here; the rest are placeholder landing
 * pages for their respective teams to flesh out. Route guards are applied
 * once by the shell at the parent route, not here.
 */
export const essMssRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'payslip',
  },
  {
    path: 'payslip',
    loadComponent: () =>
      import('./pages/payslip/payslip-list.page').then((m) => m.PayslipListPageComponent),
  },
  {
    path: 'tax',
    loadComponent: () =>
      import('./pages/tax/tax-placeholder.page').then((m) => m.TaxPlaceholderPageComponent),
  },
  {
    path: 'claims',
    loadComponent: () =>
      import('./pages/claims/claims-placeholder.page').then(
        (m) => m.ClaimsPlaceholderPageComponent,
      ),
  },
  {
    path: 'pf',
    loadComponent: () =>
      import('./pages/pf/pf-placeholder.page').then((m) => m.PfPlaceholderPageComponent),
  },
  {
    path: 'declarations',
    loadComponent: () =>
      import('./pages/declarations/declarations-placeholder.page').then(
        (m) => m.DeclarationsPlaceholderPageComponent,
      ),
  },
  {
    path: 'assets',
    loadComponent: () =>
      import('./pages/assets/assets-placeholder.page').then(
        (m) => m.AssetsPlaceholderPageComponent,
      ),
  },
];

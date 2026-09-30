import { Routes } from '@angular/router';

/** Single domain: company-specific policy documents. */
export const companySpecificRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/policy-list.page').then((m) => m.PolicyListPageComponent),
  },
];

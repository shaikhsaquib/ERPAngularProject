import { Routes } from '@angular/router';

/** Single domain: a launcher into legacy SAP transactions. */
export const mySapRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/sap-workspace-list.page').then((m) => m.SapWorkspaceListPageComponent),
  },
];

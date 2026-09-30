import { Routes } from '@angular/router';

/**
 * Sub-domains: attendance (fully built demo), travel / insurance / learning
 * (placeholders). apps/shell applies authGuard/sessionTimeoutGuard around
 * this array; it stays guard-free here.
 */
export const hrEssentialsRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'attendance' },
  {
    path: 'attendance',
    loadComponent: () =>
      import('./pages/attendance/attendance-list.page').then((m) => m.AttendanceListPageComponent),
  },
  {
    path: 'travel',
    loadComponent: () =>
      import('./pages/travel/travel-placeholder.page').then(
        (m) => m.TravelPlaceholderPageComponent,
      ),
  },
  {
    path: 'insurance',
    loadComponent: () =>
      import('./pages/insurance/insurance-placeholder.page').then(
        (m) => m.InsurancePlaceholderPageComponent,
      ),
  },
  {
    path: 'learning',
    loadComponent: () =>
      import('./pages/learning/learning-placeholder.page').then(
        (m) => m.LearningPlaceholderPageComponent,
      ),
  },
];

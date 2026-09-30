import { Routes } from '@angular/router';

/** Single domain: company announcements & recognition posts. */
export const corporateLoungeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/announcement-list.page').then((m) => m.AnnouncementListPageComponent),
  },
];

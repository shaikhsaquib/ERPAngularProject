import { InjectionToken } from '@angular/core';

/** Override in apps/shell's bootstrap config per environment; defaults to a same-origin `/api`. */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => '/api',
});

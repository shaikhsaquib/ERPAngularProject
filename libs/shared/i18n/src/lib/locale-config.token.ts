import { InjectionToken } from '@angular/core';
import type { LocaleConfig } from '@timescapenu/shared-models';

/**
 * The one locale config every formatting pipe in the app reads from.
 * Provided by apps/shell's bootstrap config (`environment.locale`) — no
 * component should ever call `Intl`/`DatePipe`/`DecimalPipe` directly.
 */
export const LOCALE_CONFIG = new InjectionToken<LocaleConfig>('LOCALE_CONFIG');

import type { AuthConfig } from '@timescapenu/core-auth';
import type { LocaleConfig } from '@timescapenu/shared-models';

export interface ShellEnvironment {
  production: boolean;
  apiBaseUrl: string;
  auth: AuthConfig;
  locale: LocaleConfig;
}

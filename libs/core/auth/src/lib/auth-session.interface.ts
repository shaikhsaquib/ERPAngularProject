import type { Capability, User } from '@timescapenu/shared-models';

/** Response shape from the SSO callback / refresh endpoints. */
export interface LoginResponse {
  user: User;
  accessToken: string;
  accessTokenExpiresAt: string;
  capabilities: readonly Capability[];
}

export interface SsoCallbackParams {
  code: string;
  state: string;
}

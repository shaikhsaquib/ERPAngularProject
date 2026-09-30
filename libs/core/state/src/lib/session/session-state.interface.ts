import type { User } from '@timescapenu/shared-models';

export type SessionStatus = 'anonymous' | 'authenticating' | 'authenticated' | 'expired';

export interface SessionState {
  user: User | null;
  accessToken: string | null;
  status: SessionStatus;
}

export const initialSessionState: SessionState = {
  user: null,
  accessToken: null,
  status: 'anonymous',
};

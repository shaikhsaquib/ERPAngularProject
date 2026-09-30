import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import type { User } from '@timescapenu/shared-models';
import { initialSessionState } from './session-state.interface';

/**
 * Cross-cutting state: the logged-in user and session lifecycle. This is the
 * kind of state that genuinely spans every module (auth, guards, the shell
 * header, permission bootstrapping) — everything else should default to
 * local component signals instead of reaching for a store.
 */
export const SessionStore = signalStore(
  { providedIn: 'root' },
  withState(initialSessionState),
  withComputed(({ status, user }) => ({
    isAuthenticated: computed(() => status() === 'authenticated'),
    displayName: computed(() => user()?.displayName ?? null),
  })),
  withMethods((store) => ({
    beginAuthentication(): void {
      patchState(store, { status: 'authenticating' });
    },
    setSession(user: User, accessToken: string): void {
      patchState(store, { user, accessToken, status: 'authenticated' });
    },
    markExpired(): void {
      patchState(store, { status: 'expired' });
    },
    clearSession(): void {
      patchState(store, initialSessionState);
    },
  })),
);

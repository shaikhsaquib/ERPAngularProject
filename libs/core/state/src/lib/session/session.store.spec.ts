import { TestBed } from '@angular/core/testing';
import { buildUser } from '@timescapenu/testing';
import { SessionStore } from './session.store';

describe('SessionStore', () => {
  it('starts anonymous', () => {
    const store = TestBed.inject(SessionStore);
    expect(store.isAuthenticated()).toBe(false);
  });

  it('transitions to authenticated on setSession', () => {
    const store = TestBed.inject(SessionStore);
    const user = buildUser({ displayName: 'Jane Doe' });

    store.setSession(user, 'token-123');

    expect(store.isAuthenticated()).toBe(true);
    expect(store.displayName()).toBe('Jane Doe');
  });

  it('clearSession resets to anonymous', () => {
    const store = TestBed.inject(SessionStore);
    store.setSession(buildUser(), 'token-123');
    store.clearSession();
    expect(store.isAuthenticated()).toBe(false);
  });
});

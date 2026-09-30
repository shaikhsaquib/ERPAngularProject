import { Injectable, signal } from '@angular/core';

const ACTIVITY_EVENTS = ['click', 'keydown', 'pointermove', 'scroll'] as const;

/** Tracks wall-clock time of the last user interaction, for idle/session-timeout detection. */
@Injectable({ providedIn: 'root' })
export class SessionActivityService {
  private readonly _lastActivityAt = signal(Date.now());
  readonly lastActivityAt = this._lastActivityAt.asReadonly();

  constructor() {
    if (typeof document === 'undefined') {
      return;
    }
    for (const eventName of ACTIVITY_EVENTS) {
      document.addEventListener(eventName, () => this.touch(), { passive: true });
    }
  }

  touch(): void {
    this._lastActivityAt.set(Date.now());
  }

  idleForMs(): number {
    return Date.now() - this._lastActivityAt();
  }
}

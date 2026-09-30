import { Injectable, signal } from '@angular/core';
import type { Capability, PermissionContext } from '@timescapenu/shared-models';

/**
 * Single source of truth for "what can the current user do". Populated by
 * core/auth on login/session-refresh and read from everywhere else —
 * field-level, action-level and table-row-level checks all go through here,
 * either directly or via the `*hasPermission` directive.
 */
@Injectable({ providedIn: 'root' })
export class PermissionService {
  private readonly _context = signal<PermissionContext>({ capabilities: new Set() });
  readonly context = this._context.asReadonly();

  setContext(context: PermissionContext): void {
    this._context.set(context);
  }

  clear(): void {
    this._context.set({ capabilities: new Set() });
  }

  has(capability: Capability): boolean {
    return this._context().capabilities.has(capability);
  }

  hasAny(capabilities: readonly Capability[]): boolean {
    return capabilities.some((capability) => this.has(capability));
  }

  hasAll(capabilities: readonly Capability[]): boolean {
    return capabilities.every((capability) => this.has(capability));
  }
}

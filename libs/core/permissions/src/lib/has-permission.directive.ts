import { Directive, DoCheck, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import type { Capability } from '@timescapenu/shared-models';
import { PermissionService } from './permission.service';

type HasPermissionMode = 'any' | 'all';

/**
 * Structural directive gating a template on the current user's capabilities.
 * Usable at field, action and table-row level — the same directive, just
 * applied at different granularity:
 *
 *   <button *hasPermission="'mss.approval.approve'">Approve</button>
 *   <tr *hasPermission="row.requiredCapabilities; mode: 'all'">...</tr>
 *   <span *hasPermission="'ess.tax.view'; else locked">{{ value }}</span>
 */
@Directive({
  selector: '[hasPermission]',
  standalone: true,
})
export class HasPermissionDirective implements DoCheck {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly permissionService = inject(PermissionService);

  private capabilities: readonly Capability[] = [];
  private mode: HasPermissionMode = 'any';
  private elseTemplateRef: TemplateRef<unknown> | null = null;
  private hasView = false;
  private showingElse = false;

  @Input({ required: true }) set hasPermission(value: Capability | readonly Capability[]) {
    this.capabilities = Array.isArray(value) ? value : [value];
  }

  @Input() set hasPermissionMode(value: HasPermissionMode) {
    this.mode = value;
  }

  @Input() set hasPermissionElse(templateRef: TemplateRef<unknown> | null) {
    this.elseTemplateRef = templateRef;
  }

  /**
   * Deliberately implemented via ngDoCheck rather than `effect()`: this
   * directive nests (a row-level check wrapping an action-level check, an
   * action-level check wrapping a field-level one), and creating an
   * embedded view — which instantiates the nested directive's constructor —
   * from inside a running `effect()` callback throws NG0602 ("effect()
   * cannot be called from within a reactive context"). ngDoCheck runs as
   * part of ordinary change detection instead of as a registered effect, so
   * nesting is unrestricted. Angular's signal/CD integration still tracks
   * the `permissionService.context()` read below as a dependency of the
   * hosting view, same as a template binding would.
   */
  ngDoCheck(): void {
    this.render();
  }

  private isGranted(): boolean {
    this.permissionService.context();
    if (this.capabilities.length === 0) {
      return true;
    }
    return this.mode === 'all'
      ? this.permissionService.hasAll(this.capabilities)
      : this.permissionService.hasAny(this.capabilities);
  }

  private render(): void {
    const granted = this.isGranted();

    if (granted && !this.hasView) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
      this.showingElse = false;
      return;
    }

    if (!granted && (this.hasView || !this.showingElse)) {
      this.viewContainerRef.clear();
      this.hasView = false;
      this.showingElse = false;
      if (this.elseTemplateRef) {
        this.viewContainerRef.createEmbeddedView(this.elseTemplateRef);
        this.showingElse = true;
      }
    }
  }
}

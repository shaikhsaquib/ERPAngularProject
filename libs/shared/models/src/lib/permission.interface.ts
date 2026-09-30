/**
 * A capability string is `<domain>.<resource>.<action>`, e.g. `ess.payslip.view`
 * or `mss.approval.approve`. Kept as a branded string rather than an enum so
 * feature modules can register their own capabilities without touching core.
 */
export type Capability = string & { readonly __brand?: 'Capability' };

export interface PermissionContext {
  readonly capabilities: ReadonlySet<Capability>;
}

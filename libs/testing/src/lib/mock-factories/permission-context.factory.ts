import type { Capability, PermissionContext } from '@timescapenu/shared-models';

export function buildPermissionContext(
  capabilities: readonly Capability[] = [],
): PermissionContext {
  return { capabilities: new Set(capabilities) };
}

import type { IconName } from '@timescapenu/shared-ui';

/**
 * A single entry in the module sidebar. Supports one level of nesting via
 * `children` — parent items with children are expandable/collapsible and
 * are not themselves navigable destinations in the current design.
 */
export interface SidebarItem {
  label: string;
  route: string;
  icon?: IconName;
  children?: readonly SidebarItem[];
}

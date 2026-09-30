/**
 * A single crumb in the breadcrumb trail. `route: null` marks the current
 * page — the last crumb in the trail — which renders as plain text instead
 * of a link.
 */
export interface Breadcrumb {
  label: string;
  route: string | null;
}

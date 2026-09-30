/**
 * A single top-level business module the module bar can switch between
 * (e.g. HR Essentials, ESS/MSS, Compliance). `route` is the router path the
 * shell navigates to when the module is selected.
 */
export interface ModuleLink {
  id: string;
  label: string;
  route: string;
}

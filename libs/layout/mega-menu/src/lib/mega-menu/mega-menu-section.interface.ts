/**
 * One labelled group of links inside the mega menu (e.g. "Payroll",
 * "Time & Attendance"). A module's mega menu is made up of several of
 * these sections rendered side by side.
 */
export interface MegaMenuSection {
  title: string;
  links: readonly MegaMenuLink[];
}

export interface MegaMenuLink {
  label: string;
  route: string;
}

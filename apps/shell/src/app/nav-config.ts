import type { ModuleLink } from '@timescapenu/layout-module-bar';
import type { SidebarItem } from '@timescapenu/layout-sidebar';
import type { MegaMenuSection } from '@timescapenu/layout-mega-menu';
import type { CommandItem } from '@timescapenu/layout-command-palette';

/**
 * Shell-owned navigation metadata. This lives here — not in the feature
 * libs — deliberately: the shell already knows its own route tree, and
 * keeping nav labels/icons out of libs/features/* means a feature lib
 * never has to know how (or whether) it's presented in the module bar,
 * sidebar or command palette.
 */
export const MODULE_LINKS: readonly ModuleLink[] = [
  { id: 'home', label: 'Home', route: '/home' },
  { id: 'application-services', label: 'Application & Services', route: '/application-services' },
  { id: 'compliance', label: 'Compliance', route: '/compliance' },
  { id: 'hr-essentials', label: 'HR Essentials', route: '/hr-essentials' },
  { id: 'ess-mss', label: 'ESS / MSS', route: '/ess-mss' },
  { id: 'corporate-lounge', label: 'Corporate Lounge', route: '/corporate-lounge' },
  { id: 'company-specific', label: 'Company Specific', route: '/company-specific' },
  { id: 'my-sap', label: 'My SAP', route: '/my-sap' },
];

export const SIDEBAR_ITEMS_BY_MODULE: Readonly<Record<string, readonly SidebarItem[]>> = {
  home: [{ label: 'Dashboard', route: '/home' }],
  'application-services': [
    { label: 'Gatepass', route: '/application-services/gatepass' },
    { label: 'PAR', route: '/application-services/par' },
    { label: 'Registration', route: '/application-services/registration' },
    { label: 'Allowances', route: '/application-services/allowances' },
  ],
  compliance: [
    { label: 'Audit Tracker', route: '/compliance/audit-tracker' },
    { label: 'Governance', route: '/compliance/governance' },
    { label: 'Declarations', route: '/compliance/declarations' },
  ],
  'hr-essentials': [
    { label: 'Attendance', route: '/hr-essentials/attendance' },
    { label: 'Travel', route: '/hr-essentials/travel' },
    { label: 'Insurance', route: '/hr-essentials/insurance' },
    { label: 'Learning', route: '/hr-essentials/learning' },
  ],
  'ess-mss': [
    { label: 'Payslip', route: '/ess-mss/payslip' },
    { label: 'Tax', route: '/ess-mss/tax' },
    { label: 'Claims', route: '/ess-mss/claims' },
    { label: 'PF', route: '/ess-mss/pf' },
    { label: 'Declarations', route: '/ess-mss/declarations' },
    { label: 'Assets', route: '/ess-mss/assets' },
  ],
  'corporate-lounge': [{ label: 'Announcements', route: '/corporate-lounge' }],
  'company-specific': [{ label: 'Policies', route: '/company-specific' }],
  'my-sap': [{ label: 'Workspaces', route: '/my-sap' }],
};

/** The active module's mega-menu is just its sidebar links, grouped under one section. */
export function megaMenuSectionsFor(moduleId: string | null): readonly MegaMenuSection[] {
  const moduleLabel = MODULE_LINKS.find((module) => module.id === moduleId)?.label ?? '';
  const items = (moduleId && SIDEBAR_ITEMS_BY_MODULE[moduleId]) || [];
  if (items.length === 0) {
    return [];
  }
  return [{ title: moduleLabel, links: items.map(({ label, route }) => ({ label, route })) }];
}

export const COMMANDS: readonly CommandItem[] = MODULE_LINKS.map((module) => ({
  id: module.route,
  label: `Go to ${module.label}`,
  group: 'Navigate',
}));

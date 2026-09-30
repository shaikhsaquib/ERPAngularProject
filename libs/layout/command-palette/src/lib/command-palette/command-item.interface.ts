/**
 * A single jump-to action in the global command palette (e.g. "Go to
 * Payroll", "Submit timesheet"). `group` clusters related commands in the
 * results list, `shortcut` is an optional display-only keyboard hint
 * (e.g. "G P").
 */
export interface CommandItem {
  id: string;
  label: string;
  group: string;
  shortcut?: string;
}

/** Commands bucketed by `group`, in first-seen order, for rendering. */
export interface CommandGroup {
  group: string;
  items: readonly CommandItem[];
}

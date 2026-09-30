import type { Capability } from '@timescapenu/shared-models';

export type FormFieldType = 'text' | 'number' | 'select' | 'checkbox' | 'date';

export interface FormFieldOption {
  label: string;
  value: string | number;
}

export interface FormFieldSchema {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  /** Only meaningful for `type: 'select'`. */
  options?: readonly FormFieldOption[];
  /** Field-level permission gate — the field (and its `*hasPermission` wrapper) is skipped entirely when unset. */
  requiredCapability?: Capability;
  /** Schema-driven conditional visibility, evaluated against the form's live value. */
  visibleWhen?: (value: Record<string, unknown>) => boolean;
}

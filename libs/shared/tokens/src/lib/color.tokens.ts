/** Mirrors the custom properties defined in `tokens.css`. Keep both in sync. */
export const colorTokens = {
  primary: 'var(--tsn-color-primary)',
  primaryHover: 'var(--tsn-color-primary-hover)',
  primaryActive: 'var(--tsn-color-primary-active)',
  onPrimary: 'var(--tsn-color-on-primary)',

  success: 'var(--tsn-color-success)',
  successSurface: 'var(--tsn-color-success-surface)',
  warning: 'var(--tsn-color-warning)',
  warningSurface: 'var(--tsn-color-warning-surface)',
  danger: 'var(--tsn-color-danger)',
  dangerSurface: 'var(--tsn-color-danger-surface)',
  info: 'var(--tsn-color-info)',
  infoSurface: 'var(--tsn-color-info-surface)',

  textPrimary: 'var(--tsn-color-text-primary)',
  textSecondary: 'var(--tsn-color-text-secondary)',
  textDisabled: 'var(--tsn-color-text-disabled)',
  textInverse: 'var(--tsn-color-text-inverse)',
  border: 'var(--tsn-color-border)',
  borderStrong: 'var(--tsn-color-border-strong)',
  surface: 'var(--tsn-color-surface)',
  surfaceSunken: 'var(--tsn-color-surface-sunken)',
  surfaceRaised: 'var(--tsn-color-surface-raised)',
  surfaceOverlay: 'var(--tsn-color-surface-overlay)',
  surfaceInverse: 'var(--tsn-color-surface-inverse)',
  focusRing: 'var(--tsn-color-focus-ring)',
} as const;

export type ColorToken = keyof typeof colorTokens;

/** Semantic status → colour-token mapping, used by workflow-status and badges. */
export const statusColorTokens = {
  neutral: colorTokens.textSecondary,
  info: colorTokens.info,
  success: colorTokens.success,
  warning: colorTokens.warning,
  danger: colorTokens.danger,
} as const;

export type StatusColorTone = keyof typeof statusColorTokens;

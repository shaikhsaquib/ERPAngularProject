export const spacingTokens = {
  0: 'var(--tsn-space-0)',
  1: 'var(--tsn-space-1)',
  2: 'var(--tsn-space-2)',
  3: 'var(--tsn-space-3)',
  4: 'var(--tsn-space-4)',
  5: 'var(--tsn-space-5)',
  6: 'var(--tsn-space-6)',
  8: 'var(--tsn-space-8)',
  10: 'var(--tsn-space-10)',
  12: 'var(--tsn-space-12)',
  16: 'var(--tsn-space-16)',
} as const;

export type SpacingToken = keyof typeof spacingTokens;

export const radiusTokens = {
  sm: 'var(--tsn-radius-sm)',
  md: 'var(--tsn-radius-md)',
  lg: 'var(--tsn-radius-lg)',
  full: 'var(--tsn-radius-full)',
} as const;

export type RadiusToken = keyof typeof radiusTokens;

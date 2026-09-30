export const elevationTokens = {
  0: 'var(--tsn-elevation-0)',
  1: 'var(--tsn-elevation-1)',
  2: 'var(--tsn-elevation-2)',
  3: 'var(--tsn-elevation-3)',
  4: 'var(--tsn-elevation-4)',
} as const;

export type ElevationToken = keyof typeof elevationTokens;

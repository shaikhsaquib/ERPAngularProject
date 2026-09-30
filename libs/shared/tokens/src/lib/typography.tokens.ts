export const typographyTokens = {
  fontFamilyBase: 'var(--tsn-font-family-base)',
  fontFamilyMono: 'var(--tsn-font-family-mono)',

  fontSizeXs: 'var(--tsn-font-size-xs)',
  fontSizeSm: 'var(--tsn-font-size-sm)',
  fontSizeBase: 'var(--tsn-font-size-base)',
  fontSizeMd: 'var(--tsn-font-size-md)',
  fontSizeLg: 'var(--tsn-font-size-lg)',
  fontSizeXl: 'var(--tsn-font-size-xl)',
  fontSize2xl: 'var(--tsn-font-size-2xl)',

  lineHeightTight: 'var(--tsn-line-height-tight)',
  lineHeightBase: 'var(--tsn-line-height-base)',
  lineHeightLoose: 'var(--tsn-line-height-loose)',

  fontWeightRegular: 'var(--tsn-font-weight-regular)',
  fontWeightMedium: 'var(--tsn-font-weight-medium)',
  fontWeightSemibold: 'var(--tsn-font-weight-semibold)',
  fontWeightBold: 'var(--tsn-font-weight-bold)',
} as const;

export type TypographyToken = keyof typeof typographyTokens;

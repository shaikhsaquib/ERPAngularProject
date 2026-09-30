export const motionTokens = {
  durationFast: 'var(--tsn-motion-duration-fast)',
  durationBase: 'var(--tsn-motion-duration-base)',
  durationSlow: 'var(--tsn-motion-duration-slow)',
  easingStandard: 'var(--tsn-motion-easing-standard)',
  easingDecelerate: 'var(--tsn-motion-easing-decelerate)',
  easingAccelerate: 'var(--tsn-motion-easing-accelerate)',
} as const;

/** Millisecond values for use in TS-driven timers/animations (kept in sync with motionTokens). */
export const motionDurationsMs = {
  fast: 100,
  base: 180,
  slow: 280,
} as const;

export type MotionDurationToken = keyof typeof motionTokens;

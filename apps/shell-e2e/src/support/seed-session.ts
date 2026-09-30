import type { Page } from '@playwright/test';

/**
 * TODO(platform-team): the shell's authGuard hard-redirects unauthenticated
 * users to the real SSO provider, which doesn't exist in this test
 * environment yet. Until a test IdP (or a stubbed AUTH_CONFIG for e2e) is
 * wired up, seed `sessionStorage`/`localStorage` here with whatever the real
 * implementation ends up checking so per-module specs can assume an
 * authenticated session. Left as a no-op for now — every module spec calls
 * this first so there's a single place to wire it once the real auth flow
 * lands.
 */
export async function seedAuthenticatedSession(page: Page): Promise<void> {
  await page.addInitScript(() => {
    // Placeholder — real seeding lands once a test IdP / auth stub exists.
  });
}

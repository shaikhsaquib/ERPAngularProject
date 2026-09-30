import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';

import { workspaceRoot } from '@nx/devkit';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npx nx serve shell',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
  // One Playwright project per business module, each scoped to its own
  // testDir — mirrors the libs/features/* split so a team can run just
  // `nx e2e shell-e2e -- --project=ess-mss` for their own module.
  projects: [
    { name: 'home', testDir: './src/home', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'application-services',
      testDir: './src/application-services',
      use: { ...devices['Desktop Chrome'] },
    },
    { name: 'compliance', testDir: './src/compliance', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'hr-essentials',
      testDir: './src/hr-essentials',
      use: { ...devices['Desktop Chrome'] },
    },
    { name: 'ess-mss', testDir: './src/ess-mss', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'corporate-lounge',
      testDir: './src/corporate-lounge',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'company-specific',
      testDir: './src/company-specific',
      use: { ...devices['Desktop Chrome'] },
    },
    { name: 'my-sap', testDir: './src/my-sap', use: { ...devices['Desktop Chrome'] } },
  ],
});

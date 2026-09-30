import type { TestRunnerConfig } from '@storybook/test-runner';
import { checkA11y, injectAxe } from 'axe-playwright';

/**
 * Shared @storybook/test-runner config for both shared/ui and shared/patterns.
 * Every story in either project gets an axe-core accessibility scan on visit.
 */
const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page) {
    await checkA11y(page, '#storybook-root', {
      axeOptions: {},
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  },
};

export default config;

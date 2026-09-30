import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  // Avoids the first-run telemetry consent prompt hanging on stdin in
  // non-interactive shells/CI (STORYBOOK_DISABLE_TELEMETRY covers the same
  // thing for anyone running the CLI directly instead of through Nx).
  core: {
    disableTelemetry: true,
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs

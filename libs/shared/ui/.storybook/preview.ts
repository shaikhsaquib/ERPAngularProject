import type { Preview } from '@storybook/angular';

// Design tokens are loaded via preview-head.html's <link>, not a JS import —
// see the comment on `staticDirs` in main.ts for why.
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
  },
};

export default preview;

import type { Preview } from '@storybook/angular';
import '../../tokens/src/lib/_tokens.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
  },
};

export default preview;

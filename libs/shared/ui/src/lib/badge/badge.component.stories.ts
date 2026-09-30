import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Shared UI/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'danger'] },
  },
};
export default meta;

type Story = StoryObj<BadgeComponent>;

export const Neutral: Story = {
  args: { tone: 'neutral' },
  render: (args) => ({
    props: args,
    template: `<tsn-badge [tone]="tone">Draft</tsn-badge>`,
  }),
};

export const Info: Story = {
  args: { tone: 'info' },
  render: (args) => ({
    props: args,
    template: `<tsn-badge [tone]="tone">Submitted</tsn-badge>`,
  }),
};

export const Success: Story = {
  args: { tone: 'success' },
  render: (args) => ({
    props: args,
    template: `<tsn-badge [tone]="tone">Approved</tsn-badge>`,
  }),
};

export const Warning: Story = {
  args: { tone: 'warning' },
  render: (args) => ({
    props: args,
    template: `<tsn-badge [tone]="tone">Pending review</tsn-badge>`,
  }),
};

export const Danger: Story = {
  args: { tone: 'danger' },
  render: (args) => ({
    props: args,
    template: `<tsn-badge [tone]="tone">Rejected</tsn-badge>`,
  }),
};

import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Shared UI/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', disabled: false, loading: false },
  render: (args) => ({
    props: args,
    template: `<tsn-button [variant]="variant" [size]="size" [type]="type" [disabled]="disabled" [loading]="loading">Save changes</tsn-button>`,
  }),
};

export const Secondary: Story = {
  args: { ...Primary.args, variant: 'secondary' },
  render: (args) => ({
    props: args,
    template: `<tsn-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading">Cancel</tsn-button>`,
  }),
};

export const Danger: Story = {
  args: { ...Primary.args, variant: 'danger' },
  render: (args) => ({
    props: args,
    template: `<tsn-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading">Delete</tsn-button>`,
  }),
};

export const Loading: Story = {
  args: { ...Primary.args, loading: true },
  render: (args) => ({
    props: args,
    template: `<tsn-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading">Saving…</tsn-button>`,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:12px;">
        <tsn-button size="sm">Small</tsn-button>
        <tsn-button size="md">Medium</tsn-button>
        <tsn-button size="lg">Large</tsn-button>
      </div>
    `,
  }),
};

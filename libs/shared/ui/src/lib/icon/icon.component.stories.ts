import type { Meta, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { IconName } from './icon-name.type';

const ALL_ICON_NAMES: IconName[] = [
  'chevron-down',
  'chevron-right',
  'check',
  'close',
  'search',
  'warning',
  'user',
  'bell',
];

const meta: Meta<IconComponent> = {
  title: 'Shared UI/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: ALL_ICON_NAMES },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;

type Story = StoryObj<IconComponent>;

export const Default: Story = {
  args: { name: 'check', size: 'md' },
  render: (args) => ({
    props: args,
    template: `<tsn-icon [name]="name" [size]="size"></tsn-icon>`,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:12px;">
        <tsn-icon name="bell" size="sm"></tsn-icon>
        <tsn-icon name="bell" size="md"></tsn-icon>
        <tsn-icon name="bell" size="lg"></tsn-icon>
      </div>
    `,
  }),
};

export const Gallery: Story = {
  render: () => ({
    moduleMetadata: { imports: [CommonModule] },
    props: { icons: ALL_ICON_NAMES },
    template: `
      <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:16px; text-align:center;">
        <div *ngFor="let icon of icons">
          <tsn-icon [name]="icon" size="lg"></tsn-icon>
          <div style="font-size:12px; margin-top:4px;">{{ icon }}</div>
        </div>
      </div>
    `,
  }),
};

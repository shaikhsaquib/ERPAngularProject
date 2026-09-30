import type { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Shared UI/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    indeterminate: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<CheckboxComponent>;

export const Unchecked: Story = {
  args: { label: 'Remember me' },
  render: (args) => ({
    props: args,
    template: `<tsn-checkbox [label]="label"></tsn-checkbox>`,
  }),
};

export const Checked: Story = {
  render: () => ({
    template: `<tsn-checkbox label="Notify me by email"></tsn-checkbox>`,
  }),
  play: async ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector<HTMLInputElement>('input[type="checkbox"]');
    checkbox?.click();
  },
};

export const Indeterminate: Story = {
  args: { label: 'Select all rows', indeterminate: true },
  render: (args) => ({
    props: args,
    template: `<tsn-checkbox [label]="label" [indeterminate]="indeterminate"></tsn-checkbox>`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    moduleMetadata: { imports: [ReactiveFormsModule] },
    props: { control: new FormControl({ value: true, disabled: true }) },
    template: `<tsn-checkbox label="Locked option" [formControl]="control"></tsn-checkbox>`,
  }),
};

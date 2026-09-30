import type { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Shared UI/Input',
  component: InputComponent,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'jane.doe@company.com',
    type: 'email',
    required: true,
  },
  render: (args) => ({
    props: args,
    template: `<tsn-input [label]="label" [placeholder]="placeholder" [type]="type" [required]="required"></tsn-input>`,
  }),
};

export const WithError: Story = {
  args: {
    ...Default.args,
    errorMessage: 'Enter a valid email address',
  },
  render: (args) => ({
    props: args,
    template: `<tsn-input [label]="label" [placeholder]="placeholder" [type]="type" [required]="required" [errorMessage]="errorMessage"></tsn-input>`,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Employee code',
    placeholder: '',
    type: 'text',
  },
  render: (args) => ({
    moduleMetadata: { imports: [ReactiveFormsModule] },
    props: { ...args, control: new FormControl({ value: 'EMP-00214', disabled: true }) },
    template: `<tsn-input [label]="label" [placeholder]="placeholder" [type]="type" [formControl]="control"></tsn-input>`,
  }),
};

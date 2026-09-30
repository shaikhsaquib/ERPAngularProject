import type { Meta, StoryObj } from '@storybook/angular';
import { DynamicFormComponent } from './dynamic-form.component';
import type { FormFieldSchema } from './form-field.interface';

const employeeSchema: readonly FormFieldSchema[] = [
  { name: 'name', label: 'Full name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'text', required: true },
  {
    name: 'department',
    label: 'Department',
    type: 'select',
    required: true,
    options: [
      { label: 'Finance', value: 'finance' },
      { label: 'Human Resources', value: 'hr' },
      { label: 'Engineering', value: 'engineering' },
    ],
  },
  { name: 'isManager', label: 'Is a people manager', type: 'checkbox' },
  {
    name: 'directReports',
    label: 'Number of direct reports',
    type: 'number',
    required: true,
    visibleWhen: (value) => value['isManager'] === true,
  },
];

const meta: Meta<DynamicFormComponent> = {
  title: 'Shared Patterns/Dynamic Form Engine',
  component: DynamicFormComponent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<DynamicFormComponent>;

export const EmployeeProfile: Story = {
  render: () => ({
    props: {
      schema: employeeSchema,
      submitLabel: 'Save employee',
    },
  }),
};

export const WithInitialValue: Story = {
  render: () => ({
    props: {
      schema: employeeSchema,
      initialValue: {
        name: 'Amelia Chen',
        email: 'amelia.chen@gep.com',
        department: 'engineering',
      },
      submitLabel: 'Update employee',
    },
  }),
};

export const ConditionalFieldRevealed: Story = {
  render: () => ({
    props: {
      schema: employeeSchema,
      initialValue: { isManager: true, directReports: 4 },
      submitLabel: 'Save employee',
    },
  }),
};

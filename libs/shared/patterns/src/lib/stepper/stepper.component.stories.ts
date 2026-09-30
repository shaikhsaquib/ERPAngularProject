import type { Meta, StoryObj } from '@storybook/angular';
import { StepperComponent } from './stepper.component';
import type { StepDescriptor } from './step-descriptor.interface';

const oneOfEachState: readonly StepDescriptor[] = [
  { label: 'Employee details', state: 'complete' },
  { label: 'Compensation', state: 'active' },
  { label: 'Manager approval', state: 'error' },
  { label: 'Payroll sync', state: 'upcoming' },
];

const meta: Meta<StepperComponent> = {
  title: 'Shared Patterns/Stepper',
  component: StepperComponent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<StepperComponent>;

export const Default: Story = {
  render: () => ({ props: { steps: oneOfEachState } }),
};

export const AllComplete: Story = {
  render: () => ({
    props: {
      steps: oneOfEachState.map((step) => ({ ...step, state: 'complete' as const })),
    },
  }),
};

export const NotStarted: Story = {
  render: () => ({
    props: {
      steps: oneOfEachState.map((step) => ({ ...step, state: 'upcoming' as const })),
    },
  }),
};

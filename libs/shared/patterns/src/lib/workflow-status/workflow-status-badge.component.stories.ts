import type { Meta, StoryObj } from '@storybook/angular';
import { WorkflowStatusBadgeComponent } from './workflow-status-badge.component';
import type { WorkflowState } from '@timescapenu/shared-models';

const meta: Meta<WorkflowStatusBadgeComponent> = {
  title: 'Shared Patterns/Workflow Status/Badge',
  component: WorkflowStatusBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['draft', 'submitted', 'approved', 'rejected', 'cancelled'] as WorkflowState[],
    },
  },
};
export default meta;

type Story = StoryObj<WorkflowStatusBadgeComponent>;

function stateStory(state: WorkflowState): Story {
  return {
    args: { state },
    render: (args) => ({
      props: args,
      template: `<tsn-workflow-status-badge [state]="state"></tsn-workflow-status-badge>`,
    }),
  };
}

export const Draft: Story = stateStory('draft');
export const Submitted: Story = stateStory('submitted');
export const Approved: Story = stateStory('approved');
export const Rejected: Story = stateStory('rejected');
export const Cancelled: Story = stateStory('cancelled');

import type { Meta, StoryObj } from '@storybook/angular';
import { WorkflowValidActionsComponent } from './workflow-valid-actions.component';
import type { WorkflowState } from '@timescapenu/shared-models';

const meta: Meta<WorkflowValidActionsComponent> = {
  title: 'Shared Patterns/Workflow Status/Valid Actions',
  component: WorkflowValidActionsComponent,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['draft', 'submitted', 'approved', 'rejected', 'cancelled'] as WorkflowState[],
    },
  },
};
export default meta;

type Story = StoryObj<WorkflowValidActionsComponent>;

function stateStory(state: WorkflowState): Story {
  return {
    args: { state },
    render: (args) => ({
      props: args,
      template: `<tsn-workflow-valid-actions [state]="state"></tsn-workflow-valid-actions>`,
    }),
  };
}

export const Draft: Story = stateStory('draft');
export const Submitted: Story = stateStory('submitted');
export const Approved: Story = stateStory('approved');
export const Rejected: Story = stateStory('rejected');
export const Cancelled: Story = stateStory('cancelled');

import type { Meta, StoryObj } from '@storybook/angular';
import { EmptyStateComponent } from './empty-state.component';

const meta: Meta<EmptyStateComponent> = {
  title: 'Shared Patterns/Empty State',
  component: EmptyStateComponent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<EmptyStateComponent>;

export const WithoutActions: Story = {
  render: () => ({
    props: {
      icon: 'search',
      title: 'No expense reports found',
      description: 'Try adjusting your filters or search criteria.',
    },
    template: `
      <tsn-empty-state [icon]="icon" [title]="title" [description]="description"></tsn-empty-state>
    `,
  }),
};

export const WithActions: Story = {
  render: () => ({
    props: {
      icon: 'bell',
      title: 'No pending approvals',
      description: 'You are all caught up — new approval requests will appear here.',
    },
    template: `
      <tsn-empty-state [icon]="icon" [title]="title" [description]="description">
        <div tsnEmptyStateActions>
          <button type="button">Refresh</button>
        </div>
      </tsn-empty-state>
    `,
  }),
};

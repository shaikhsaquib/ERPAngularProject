import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal.component';

const meta: Meta<ModalComponent> = {
  title: 'Shared Patterns/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;

type Story = StoryObj<ModalComponent>;

export const Open: Story = {
  args: { open: true, size: 'md' },
  render: (args) => ({
    props: args,
    template: `
      <tsn-modal [open]="open" [size]="size">
        <span tsnModalHeader>Approve time-off request</span>
        <p>Jamie Fox has requested 3 days of PTO starting Oct 12. Approve this request?</p>
        <ng-container tsnModalFooter>
          <button type="button">Cancel</button>
          <button type="button">Approve</button>
        </ng-container>
      </tsn-modal>
    `,
  }),
};

export const Closed: Story = {
  args: { open: false, size: 'md' },
  render: (args) => ({
    props: args,
    template: `
      <p style="color: var(--tsn-color-text-secondary);">
        The dialog is closed and renders nothing visible — set "open" to true in Controls to see it.
      </p>
      <tsn-modal [open]="open" [size]="size">
        <span tsnModalHeader>Approve time-off request</span>
        <p>Jamie Fox has requested 3 days of PTO starting Oct 12. Approve this request?</p>
        <ng-container tsnModalFooter>
          <button type="button">Cancel</button>
          <button type="button">Approve</button>
        </ng-container>
      </tsn-modal>
    `,
  }),
};

export const LargeSize: Story = {
  args: { open: true, size: 'lg' },
  render: (args) => ({
    props: args,
    template: `
      <tsn-modal [open]="open" [size]="size">
        <span tsnModalHeader>Employee details</span>
        <p>A larger modal for content-heavy flows, such as a full record editor.</p>
        <ng-container tsnModalFooter>
          <button type="button">Close</button>
        </ng-container>
      </tsn-modal>
    `,
  }),
};

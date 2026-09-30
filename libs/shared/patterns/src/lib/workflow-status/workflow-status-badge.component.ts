import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { WorkflowState } from '@timescapenu/shared-models';
import { BadgeComponent, type BadgeTone } from '@timescapenu/shared-ui';

const TONE_BY_STATE: Readonly<Record<WorkflowState, BadgeTone>> = {
  draft: 'neutral',
  submitted: 'info',
  approved: 'success',
  rejected: 'danger',
  cancelled: 'neutral',
};

const LABEL_BY_STATE: Readonly<Record<WorkflowState, string>> = {
  draft: 'Draft',
  submitted: 'Submitted',
  approved: 'Approved',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
};

/** Generic status badge reused by every draft -> submitted -> approved/rejected flow in the ERP. */
@Component({
  selector: 'tsn-workflow-status-badge',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  templateUrl: './workflow-status-badge.component.html',
  styleUrl: './workflow-status-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowStatusBadgeComponent {
  @Input({ required: true }) state!: WorkflowState;

  get tone(): BadgeTone {
    return TONE_BY_STATE[this.state];
  }

  get label(): string {
    return LABEL_BY_STATE[this.state];
  }
}

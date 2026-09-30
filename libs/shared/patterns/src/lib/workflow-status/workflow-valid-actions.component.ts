import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  WORKFLOW_TRANSITIONS,
  type Capability,
  type WorkflowAction,
  type WorkflowState,
} from '@timescapenu/shared-models';
import { HasPermissionDirective } from '@timescapenu/core-permissions';
import { ButtonComponent, type ButtonVariant } from '@timescapenu/shared-ui';

const ACTION_LABEL: Readonly<Record<WorkflowAction, string>> = {
  submit: 'Submit',
  approve: 'Approve',
  reject: 'Reject',
  cancel: 'Cancel',
  recall: 'Recall',
  edit: 'Edit',
};

const ACTION_VARIANT: Readonly<Record<WorkflowAction, ButtonVariant>> = {
  submit: 'primary',
  approve: 'primary',
  reject: 'danger',
  cancel: 'danger',
  recall: 'secondary',
  edit: 'secondary',
};

/**
 * Renders one button per action legal from `state` per `WORKFLOW_TRANSITIONS`
 * — the generic "valid actions for state" component reused by every
 * draft -> submitted -> approved/rejected flow across the ERP.
 */
@Component({
  selector: 'tsn-workflow-valid-actions',
  standalone: true,
  imports: [CommonModule, ButtonComponent, HasPermissionDirective],
  templateUrl: './workflow-valid-actions.component.html',
  styleUrl: './workflow-valid-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowValidActionsComponent {
  @Input({ required: true }) state!: WorkflowState;
  @Input() actionCapability?: (action: WorkflowAction) => Capability | undefined;

  @Output() readonly actionSelected = new EventEmitter<WorkflowAction>();

  get actions(): readonly WorkflowAction[] {
    return WORKFLOW_TRANSITIONS[this.state];
  }

  labelFor(action: WorkflowAction): string {
    return ACTION_LABEL[action];
  }

  variantFor(action: WorkflowAction): ButtonVariant {
    return ACTION_VARIANT[action];
  }

  capabilityFor(action: WorkflowAction): Capability | undefined {
    return this.actionCapability?.(action);
  }

  trackByAction = (_index: number, action: WorkflowAction): WorkflowAction => action;
}

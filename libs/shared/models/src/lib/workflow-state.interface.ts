/** Generic lifecycle shared by every draft → submitted → approved/rejected flow in the ERP. */
export type WorkflowState = 'draft' | 'submitted' | 'approved' | 'rejected' | 'cancelled';

export type WorkflowAction = 'submit' | 'approve' | 'reject' | 'cancel' | 'recall' | 'edit';

export interface WorkflowStatusInfo {
  state: WorkflowState;
  label: string;
  actionedBy?: string;
  actionedAt?: string;
  comment?: string;
}

/** Which actions are legal from a given state — consumed by workflow-status's valid-actions-for-state component. */
export const WORKFLOW_TRANSITIONS: Readonly<Record<WorkflowState, readonly WorkflowAction[]>> = {
  draft: ['submit', 'edit'],
  submitted: ['approve', 'reject', 'recall'],
  approved: [],
  rejected: ['edit', 'submit'],
  cancelled: [],
};

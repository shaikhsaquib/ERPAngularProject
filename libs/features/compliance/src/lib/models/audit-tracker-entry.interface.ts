import type { WorkflowState } from '@timescapenu/shared-models';

export interface AuditTrackerEntry {
  id: string;
  area: string;
  description: string;
  status: WorkflowState;
  dueDate: string;
  owner: string;
}

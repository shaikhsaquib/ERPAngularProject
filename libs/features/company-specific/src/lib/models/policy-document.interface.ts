import type { WorkflowState } from '@timescapenu/shared-models';

export interface PolicyDocument {
  id: string;
  title: string;
  category: string;
  effectiveDate: string;
  status: WorkflowState;
}

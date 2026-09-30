import type { WorkflowState } from '@timescapenu/shared-models';

export type GatepassStatus = Extract<
  WorkflowState,
  'draft' | 'submitted' | 'approved' | 'rejected'
>;

export interface Gatepass {
  id: string;
  visitorName: string;
  purpose: string;
  status: GatepassStatus;
  validFrom: string;
  validTo: string;
}

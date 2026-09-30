export type StepState = 'complete' | 'active' | 'upcoming' | 'error';

export interface StepDescriptor {
  label: string;
  state: StepState;
}

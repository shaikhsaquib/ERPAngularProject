export type CopilotMessageRole = 'user' | 'assistant';

export interface CopilotMessage {
  id: string;
  role: CopilotMessageRole;
  text: string;
  sentAt: string;
}

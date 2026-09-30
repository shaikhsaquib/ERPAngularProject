export interface CopilotContextState {
  panelOpen: boolean;
  activeModule: string | null;
  contextSummary: string | null;
  suggestions: readonly string[];
}

export const initialCopilotContextState: CopilotContextState = {
  panelOpen: false,
  activeModule: null,
  contextSummary: null,
  suggestions: [],
};

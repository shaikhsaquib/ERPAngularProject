import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { initialCopilotContextState } from './copilot-context-state.interface';

/**
 * What the Copilot chat panel currently knows about — which module the user
 * is in and what it should suggest. Feature modules update `activeModule` /
 * `contextSummary` on navigation; the copilot lib reads them to scope its
 * answers and suggestion chips.
 */
export const CopilotContextStore = signalStore(
  { providedIn: 'root' },
  withState(initialCopilotContextState),
  withMethods((store) => ({
    open(): void {
      patchState(store, { panelOpen: true });
    },
    close(): void {
      patchState(store, { panelOpen: false });
    },
    toggle(): void {
      patchState(store, { panelOpen: !store.panelOpen() });
    },
    setContext(activeModule: string, contextSummary: string | null = null): void {
      patchState(store, { activeModule, contextSummary });
    },
    setSuggestions(suggestions: readonly string[]): void {
      patchState(store, { suggestions });
    },
  })),
);

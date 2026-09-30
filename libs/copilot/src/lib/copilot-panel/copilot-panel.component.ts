import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { CopilotContextStore } from '@timescapenu/core-state';
import { ButtonComponent, IconComponent, InputComponent } from '@timescapenu/shared-ui';
import { SuggestionChipsComponent } from '../suggestion-chips/suggestion-chips.component';
import type { CopilotMessage } from './copilot-message.interface';

const ASSISTANT_REPLY_DELAY_MS = 600;

/**
 * The slide-over Copilot chat panel. Visibility, the active module and the
 * suggestion chips all come from `CopilotContextStore`; the conversation
 * itself is local component state — nothing here is shared across viewers.
 */
@Component({
  selector: 'tsn-copilot-panel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    IconComponent,
    InputComponent,
    SuggestionChipsComponent,
  ],
  templateUrl: './copilot-panel.component.html',
  styleUrl: './copilot-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopilotPanelComponent {
  protected readonly store = inject(CopilotContextStore);

  /** Public (read-only signal) so the shell and tests can inspect the conversation. */
  readonly messages = signal<readonly CopilotMessage[]>([]);
  readonly messageControl = new FormControl<string>('', { nonNullable: true });

  // Bridged into a signal so the "Send" button's disabled state (an OnPush
  // template binding) reacts correctly regardless of which nested control
  // originated the value change — see `messageValue` usage in the template.
  protected readonly messageValue = toSignal(this.messageControl.valueChanges, {
    initialValue: '',
  });

  private readonly destroyRef = inject(DestroyRef);

  protected onClose(): void {
    this.store.close();
  }

  protected onSuggestionSelected(suggestion: string): void {
    this.messageControl.setValue(suggestion);
  }

  protected onSend(event: Event): void {
    // Plain (submit) rather than Angular's `(ngSubmit)`, which is an output
    // of the template-driven `NgForm` directive (`FormsModule`) — this stays
    // on reactive forms only and still fires for both a button click and
    // pressing Enter in the message input.
    event.preventDefault();

    const text = this.messageControl.value.trim();
    if (!text) {
      return;
    }

    this.appendMessage('user', text);
    this.messageControl.setValue('');
    this.queueAssistantReply();
  }

  private appendMessage(role: CopilotMessage['role'], text: string): void {
    const message: CopilotMessage = {
      id: crypto.randomUUID(),
      role,
      text,
      sentAt: new Date().toISOString(),
    };
    this.messages.set([...this.messages(), message]);
  }

  private queueAssistantReply(): void {
    // Scaffold placeholder: real Copilot API wiring is a follow-up, this just
    // echoes back a canned response so the panel is demoable end to end.
    timer(ASSISTANT_REPLY_DELAY_MS)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.appendMessage(
          'assistant',
          "Thanks — I don't have a live connection yet, but I've noted that and will follow up here shortly.",
        );
      });
  }
}

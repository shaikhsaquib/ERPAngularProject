import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ModalSize } from './modal.interface';

/**
 * Content-projection based modal — header/body/footer slots, not a
 * flag-driven `type: 'confirm' | 'alert'` variant with built-in buttons.
 * Built on the native `<dialog>` element, which gives us focus-trapping
 * and Escape-to-close for free via `showModal()`.
 */
@Component({
  selector: 'tsn-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input()
  set open(value: boolean) {
    this._open.set(value);
  }
  get open(): boolean {
    return this._open();
  }
  private readonly _open = signal(false);

  @Input() size: ModalSize = 'md';

  @Output() readonly closed = new EventEmitter<void>();

  @ViewChild('dialogEl') private readonly dialogElRef?: ElementRef<HTMLDialogElement>;

  constructor() {
    effect(() => {
      const shouldBeOpen = this._open();
      const dialog = this.dialogElRef?.nativeElement;
      if (!dialog) {
        return;
      }
      if (shouldBeOpen && !dialog.open) {
        dialog.showModal();
      } else if (!shouldBeOpen && dialog.open) {
        dialog.close();
      }
    });
  }

  /** Bound to the dialog's native `close` event — fires on Escape too, so this is the single source of truth for `closed`. */
  onDialogClose(): void {
    this.closed.emit();
  }

  /** Clicking the native `::backdrop` dispatches a click whose target is the dialog itself. */
  onDialogClick(event: MouseEvent): void {
    const dialog = this.dialogElRef?.nativeElement;
    if (dialog && event.target === dialog) {
      dialog.close();
    }
  }
}

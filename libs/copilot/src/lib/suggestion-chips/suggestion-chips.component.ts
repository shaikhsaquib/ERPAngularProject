import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable row of pill-style suggestion chips. Purely presentational —
 * clicking a chip just tells the caller which text was picked; it is up
 * to the caller to decide what that means (e.g. `tsn-copilot-panel`
 * populates its message input with it).
 */
@Component({
  selector: 'tsn-suggestion-chips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestion-chips.component.html',
  styleUrl: './suggestion-chips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionChipsComponent {
  @Input() chips: readonly string[] = [];

  @Output() chipSelected = new EventEmitter<string>();

  protected onChipClick(chip: string): void {
    this.chipSelected.emit(chip);
  }
}

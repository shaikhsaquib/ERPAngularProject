import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonSize, ButtonType, ButtonVariant } from './button.interface';

/**
 * Pure presentational button. Consumers control the label/content via
 * `<ng-content>` so this component never owns text or icon markup.
 */
@Component({
  selector: 'tsn-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() loading = false;

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }
}

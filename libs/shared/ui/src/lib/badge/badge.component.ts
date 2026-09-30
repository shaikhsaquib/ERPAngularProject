import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusColorTone } from '@timescapenu/shared-tokens';

/**
 * Re-exported so consumers of `tsn-badge` can type their own `tone`
 * bindings without reaching into `@timescapenu/shared-tokens` directly.
 */
export type BadgeTone = StatusColorTone;

@Component({
  selector: 'tsn-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  @Input() tone: BadgeTone = 'neutral';
}

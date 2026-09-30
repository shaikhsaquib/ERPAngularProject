import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, type IconName } from '@timescapenu/shared-ui';

/** Simple centered empty-state layout, with an actions slot for follow-up buttons. */
@Component({
  selector: 'tsn-empty-state',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  @Input() icon?: IconName;
  @Input({ required: true }) title!: string;
  @Input() description?: string;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-learning-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  templateUrl: './learning-placeholder.page.html',
  styleUrl: './learning-placeholder.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningPlaceholderPageComponent {}

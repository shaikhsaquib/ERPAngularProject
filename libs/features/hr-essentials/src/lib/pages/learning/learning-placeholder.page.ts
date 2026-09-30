import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-learning-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  template: ` <tsn-empty-state title="Learning" description="Coming soon"></tsn-empty-state> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningPlaceholderPageComponent {}

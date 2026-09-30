import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-par-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  template: `
    <tsn-empty-state title="Personnel Action Requests" description="Coming soon"></tsn-empty-state>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParPlaceholderPageComponent {}

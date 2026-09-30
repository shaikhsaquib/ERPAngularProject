import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-claims-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  template: `<tsn-empty-state icon="search" title="Claims" description="Coming soon" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsPlaceholderPageComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-pf-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  templateUrl: './pf-placeholder.page.html',
  styleUrl: './pf-placeholder.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PfPlaceholderPageComponent {}

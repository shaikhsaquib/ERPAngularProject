import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-claims-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  templateUrl: './claims-placeholder.page.html',
  styleUrl: './claims-placeholder.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsPlaceholderPageComponent {}

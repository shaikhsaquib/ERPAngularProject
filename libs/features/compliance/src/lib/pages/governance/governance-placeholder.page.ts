import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-governance-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  templateUrl: './governance-placeholder.page.html',
  styleUrl: './governance-placeholder.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GovernancePlaceholderPageComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-par-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  templateUrl: './par-placeholder.page.html',
  styleUrl: './par-placeholder.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParPlaceholderPageComponent {}

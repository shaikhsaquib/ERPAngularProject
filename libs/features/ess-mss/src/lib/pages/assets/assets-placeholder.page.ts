import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-assets-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  templateUrl: './assets-placeholder.page.html',
  styleUrl: './assets-placeholder.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsPlaceholderPageComponent {}

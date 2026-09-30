import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-declarations-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  templateUrl: './declarations-placeholder.page.html',
  styleUrl: './declarations-placeholder.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeclarationsPlaceholderPageComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-allowances-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  templateUrl: './allowances-placeholder.page.html',
  styleUrl: './allowances-placeholder.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllowancesPlaceholderPageComponent {}

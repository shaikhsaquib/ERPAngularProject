import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-tax-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  templateUrl: './tax-placeholder.page.html',
  styleUrl: './tax-placeholder.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxPlaceholderPageComponent {}

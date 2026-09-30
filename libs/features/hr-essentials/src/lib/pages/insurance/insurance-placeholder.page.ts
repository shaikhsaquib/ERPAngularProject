import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-insurance-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  templateUrl: './insurance-placeholder.page.html',
  styleUrl: './insurance-placeholder.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsurancePlaceholderPageComponent {}

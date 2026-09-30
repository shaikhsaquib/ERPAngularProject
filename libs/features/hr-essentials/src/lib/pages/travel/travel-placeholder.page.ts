import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-travel-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  templateUrl: './travel-placeholder.page.html',
  styleUrl: './travel-placeholder.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TravelPlaceholderPageComponent {}

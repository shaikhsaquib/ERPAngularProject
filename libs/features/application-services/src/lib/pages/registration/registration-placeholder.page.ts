import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '@timescapenu/shared-patterns';

@Component({
  selector: 'tsn-registration-placeholder-page',
  standalone: true,
  imports: [EmptyStateComponent],
  templateUrl: './registration-placeholder.page.html',
  styleUrl: './registration-placeholder.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPlaceholderPageComponent {}

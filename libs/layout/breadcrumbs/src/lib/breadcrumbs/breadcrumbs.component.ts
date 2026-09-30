import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Breadcrumb } from './breadcrumb.interface';

/**
 * Trail of crumbs above the page content. The last crumb (`route: null`)
 * is rendered as non-clickable text and marked `aria-current="page"`;
 * every earlier crumb is a clickable link that emits its route.
 */
@Component({
  selector: 'tsn-breadcrumbs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  @Input() crumbs: readonly Breadcrumb[] = [];

  @Output() crumbSelected = new EventEmitter<string>();

  protected onCrumbClick(crumb: Breadcrumb): void {
    if (crumb.route) {
      this.crumbSelected.emit(crumb.route);
    }
  }
}

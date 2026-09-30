import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconName, IconSize } from './icon-name.type';

/**
 * Inline SVG icon set. Icons here are always decorative companions to a
 * text label (e.g. next to a button or badge label) so the SVG is marked
 * `aria-hidden="true"` unconditionally — there is deliberately no
 * `ariaLabel` input. A component that uses an icon as its *only* accessible
 * content is responsible for supplying its own text alternative around it.
 */
const ICON_PATHS: Record<IconName, string> = {
  'chevron-down': 'M19.5 8.25l-7.5 7.5-7.5-7.5',
  'chevron-right': 'M8.25 4.5l7.5 7.5-7.5 7.5',
  check: 'M4.5 12.75l6 6 9-13.5',
  close: 'M6 18L18 6M6 6l12 12',
  search: 'M21 21l-5.2-5.2m1.2-5.3a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z',
  warning:
    'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
  user: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
  bell: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0',
};

@Component({
  selector: 'tsn-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() name: IconName = 'check';
  @Input() size: IconSize = 'md';

  get path(): string {
    return ICON_PATHS[this.name];
  }
}

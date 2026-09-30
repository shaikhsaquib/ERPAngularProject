import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { MegaMenuSection } from './mega-menu-section.interface';

/**
 * Expandable panel showing every section/link within the currently active
 * module. It is a simple overlay-style dropdown: it closes itself whenever
 * the user clicks anywhere outside its own host element.
 */
@Component({
  selector: 'tsn-mega-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mega-menu.component.html',
  styleUrl: './mega-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaMenuComponent {
  @Input() sections: readonly MegaMenuSection[] = [];
  @Input() open = false;

  @Output() linkSelected = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();

  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.open) {
      return;
    }
    const target = event.target as Node | null;
    if (target && !this.elementRef.nativeElement.contains(target)) {
      this.closed.emit();
    }
  }

  protected onLinkClick(route: string): void {
    this.linkSelected.emit(route);
  }
}

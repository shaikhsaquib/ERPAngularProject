import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@timescapenu/shared-ui';
import type { SidebarItem } from './sidebar-item.interface';

/**
 * Collapsible left navigation for a module's sub-sections. Supports one
 * level of nested children: a parent item with `children` toggles its own
 * expanded state instead of navigating, a leaf item (no children) emits
 * `itemSelected` with its route.
 */
@Component({
  selector: 'tsn-sidebar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() items: readonly SidebarItem[] = [];
  @Input() collapsed = false;

  @Output() itemSelected = new EventEmitter<string>();
  @Output() collapsedChange = new EventEmitter<boolean>();

  private readonly expandedKeys = signal<ReadonlySet<string>>(new Set());

  protected isExpanded(item: SidebarItem): boolean {
    return this.expandedKeys().has(item.label);
  }

  protected hasChildren(item: SidebarItem): boolean {
    return !!item.children && item.children.length > 0;
  }

  protected onItemClick(item: SidebarItem): void {
    if (this.hasChildren(item)) {
      this.toggleExpanded(item.label);
      return;
    }
    this.itemSelected.emit(item.route);
  }

  protected onChildClick(child: SidebarItem): void {
    this.itemSelected.emit(child.route);
  }

  protected onToggleCollapsed(): void {
    this.collapsedChange.emit(!this.collapsed);
  }

  private toggleExpanded(key: string): void {
    const next = new Set(this.expandedKeys());
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    this.expandedKeys.set(next);
  }
}

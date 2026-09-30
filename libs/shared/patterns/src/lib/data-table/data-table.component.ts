import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HasPermissionDirective } from '@timescapenu/core-permissions';
import type { Capability, SortDescriptor, SortDirection } from '@timescapenu/shared-models';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import type { DataTableColumn } from './data-table-column.interface';

/**
 * Presentational, generic data grid. It never calls the API itself — the
 * parent owns the actual `getPaged()` call (via `core-api-client`) and just
 * feeds `rows` / `totalCount` / `loading` in, reacting to `pageChange` and
 * `sortChange` to re-query.
 *
 * Rows are rendered through `@angular/cdk/scrolling`'s virtual scroll
 * viewport so large pages don't choke the DOM.
 */
@Component({
  selector: 'tsn-data-table',
  standalone: true,
  imports: [CommonModule, ScrollingModule, HasPermissionDirective, EmptyStateComponent],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<T> {
  @Input() columns: readonly DataTableColumn<T>[] = [];
  @Input() rows: readonly T[] = [];
  @Input() totalCount = 0;
  @Input() page = 1;
  @Input() pageSize = 20;
  @Input() loading = false;
  @Input() rowCapability?: (row: T) => Capability | readonly Capability[] | undefined;
  @Input({ required: true }) trackByField!: Extract<keyof T, string>;

  @Input()
  set sort(value: SortDescriptor | null) {
    this._sort.set(value);
  }
  get sort(): SortDescriptor | null {
    return this._sort();
  }
  private readonly _sort = signal<SortDescriptor | null>(null);

  @Output() readonly pageChange = new EventEmitter<number>();
  @Output() readonly sortChange = new EventEmitter<SortDescriptor>();
  @Output() readonly rowClick = new EventEmitter<T>();

  /** Row height fed to the CDK virtual-scroll viewport. */
  readonly rowItemSize = 44;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalCount / this.pageSize));
  }

  get hasPreviousPage(): boolean {
    return this.page > 1;
  }

  get hasNextPage(): boolean {
    return this.page < this.totalPages;
  }

  get gridTemplateColumns(): string {
    return this.columns.map((column) => column.width ?? '1fr').join(' ');
  }

  trackRow = (_index: number, row: T): unknown => row[this.trackByField];

  trackColumn = (_index: number, column: DataTableColumn<T>): string => column.field;

  cellValue(row: T, column: DataTableColumn<T>): string {
    const value = row[column.field];
    return value === null || value === undefined ? '' : String(value);
  }

  capabilitiesFor(row: T): readonly Capability[] {
    if (!this.rowCapability) {
      return [];
    }
    const value = this.rowCapability(row);
    if (value === undefined) {
      return [];
    }
    return Array.isArray(value) ? value : [value];
  }

  /**
   * Cycles a sortable column's direction asc -> desc -> none, emitting
   * `sortChange` for the meaningful (asc/desc) states. `SortDescriptor` has
   * no "unsorted" representation, so the final step back to none just
   * clears the local indicator without emitting — the next click on any
   * column starts a fresh ascending sort.
   */
  onHeaderClick(column: DataTableColumn<T>): void {
    if (!column.sortable) {
      return;
    }
    const current = this._sort();
    let next: SortDescriptor | null;
    if (!current || current.field !== column.field) {
      next = { field: column.field, direction: 'asc' };
    } else if (current.direction === 'asc') {
      next = { field: column.field, direction: 'desc' };
    } else {
      next = null;
    }
    this._sort.set(next);
    if (next) {
      this.sortChange.emit(next);
    }
  }

  directionFor(field: string): SortDirection | null {
    const current = this._sort();
    return current && current.field === field ? current.direction : null;
  }

  goToPreviousPage(): void {
    if (this.hasPreviousPage) {
      this.pageChange.emit(this.page - 1);
    }
  }

  goToNextPage(): void {
    if (this.hasNextPage) {
      this.pageChange.emit(this.page + 1);
    }
  }
}

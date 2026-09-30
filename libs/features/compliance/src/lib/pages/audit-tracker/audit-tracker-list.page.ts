import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Capability, QueryParams, SortDescriptor } from '@timescapenu/shared-models';
import { CopilotContextStore } from '@timescapenu/core-state';
import { HasPermissionDirective } from '@timescapenu/core-permissions';
import { DataTableComponent, EmptyStateComponent } from '@timescapenu/shared-patterns';
import type { DataTableColumn } from '@timescapenu/shared-patterns';
import { AuditTrackerService } from '../../services/audit-tracker.service';
import type { AuditTrackerEntry } from '../../models/audit-tracker-entry.interface';

const VIEW_CAPABILITY: Capability = 'compliance.audit-tracker.view';

/** Straightforward paged/sorted list — the row-detail workflow pattern is already demonstrated in application-services. */
@Component({
  selector: 'tsn-audit-tracker-list-page',
  standalone: true,
  imports: [CommonModule, HasPermissionDirective, DataTableComponent, EmptyStateComponent],
  templateUrl: './audit-tracker-list.page.html',
  styleUrl: './audit-tracker-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditTrackerListPageComponent implements OnInit {
  private readonly auditTrackerService = inject(AuditTrackerService);
  private readonly copilotContextStore = inject(CopilotContextStore);

  protected readonly viewCapability = VIEW_CAPABILITY;

  protected readonly columns: readonly DataTableColumn<AuditTrackerEntry>[] = [
    { field: 'area', header: 'Area', sortable: true },
    { field: 'description', header: 'Description' },
    { field: 'status', header: 'Status', sortable: true },
    { field: 'dueDate', header: 'Due date', sortable: true },
    { field: 'owner', header: 'Owner', sortable: true },
  ];

  protected readonly rows = signal<readonly AuditTrackerEntry[]>([]);
  protected readonly totalCount = signal(0);
  protected readonly loading = signal(false);
  protected readonly page = signal(1);
  protected readonly pageSize = signal(20);
  protected readonly sort = signal<SortDescriptor | null>(null);

  ngOnInit(): void {
    this.copilotContextStore.setContext('compliance', 'Audit tracker');
    this.loadEntries();
  }

  protected onPageChange(page: number): void {
    this.page.set(page);
    this.loadEntries();
  }

  protected onSortChange(sort: SortDescriptor): void {
    this.sort.set(sort);
    this.loadEntries();
  }

  private loadEntries(): void {
    this.loading.set(true);
    const query: QueryParams = {
      page: this.page(),
      pageSize: this.pageSize(),
      sort: this.sort() ? [this.sort() as SortDescriptor] : undefined,
    };

    this.auditTrackerService.list(query).subscribe({
      next: (result) => {
        this.rows.set(result.items);
        this.totalCount.set(result.totalCount);
        this.loading.set(false);
      },
      error: () => {
        this.rows.set([]);
        this.totalCount.set(0);
        this.loading.set(false);
      },
    });
  }
}

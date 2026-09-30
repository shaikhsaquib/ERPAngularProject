import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HasPermissionDirective } from '@timescapenu/core-permissions';
import { CopilotContextStore } from '@timescapenu/core-state';
import type { SortDescriptor } from '@timescapenu/shared-models';
import {
  DataTableComponent,
  EmptyStateComponent,
  WorkflowStatusBadgeComponent,
} from '@timescapenu/shared-patterns';
import type { DataTableColumn } from '@timescapenu/shared-patterns';
import type { PolicyDocument } from '../models/policy-document.interface';
import { PolicyDocumentService } from '../services/policy-document.service';

const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'tsn-policy-list-page',
  standalone: true,
  imports: [
    DataTableComponent,
    EmptyStateComponent,
    WorkflowStatusBadgeComponent,
    HasPermissionDirective,
  ],
  templateUrl: './policy-list.page.html',
  styleUrl: './policy-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyListPageComponent implements OnInit {
  private readonly policyDocumentService = inject(PolicyDocumentService);
  private readonly copilotContextStore = inject(CopilotContextStore);

  readonly columns: readonly DataTableColumn<PolicyDocument>[] = [
    { field: 'title', header: 'Title', sortable: true },
    { field: 'category', header: 'Category', sortable: true },
    { field: 'effectiveDate', header: 'Effective date', sortable: true },
    { field: 'status', header: 'Status' },
  ];

  readonly rows = signal<readonly PolicyDocument[]>([]);
  readonly totalCount = signal(0);
  readonly page = signal(1);
  readonly pageSize = signal(DEFAULT_PAGE_SIZE);
  readonly sort = signal<SortDescriptor | null>(null);
  readonly loading = signal(false);
  readonly selectedPolicy = signal<PolicyDocument | null>(null);

  ngOnInit(): void {
    this.copilotContextStore.setContext('company-specific', 'Company-specific policy documents');
    this.load();
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.load();
  }

  onSortChange(sort: SortDescriptor | null): void {
    this.sort.set(sort);
    this.page.set(1);
    this.load();
  }

  onRowClick(row: PolicyDocument): void {
    this.selectedPolicy.set(row);
  }

  private load(): void {
    this.loading.set(true);
    const sort = this.sort();

    this.policyDocumentService
      .list({
        page: this.page(),
        pageSize: this.pageSize(),
        sort: sort ? [sort] : undefined,
      })
      .subscribe({
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

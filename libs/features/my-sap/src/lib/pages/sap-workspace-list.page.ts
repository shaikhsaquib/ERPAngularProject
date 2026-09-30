import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HasPermissionDirective } from '@timescapenu/core-permissions';
import { CopilotContextStore } from '@timescapenu/core-state';
import type { SortDescriptor } from '@timescapenu/shared-models';
import { ButtonComponent } from '@timescapenu/shared-ui';
import { DataTableComponent, EmptyStateComponent } from '@timescapenu/shared-patterns';
import type { DataTableColumn } from '@timescapenu/shared-patterns';
import type { SapWorkspaceLink } from '../models/sap-workspace-link.interface';
import { SapWorkspaceService } from '../services/sap-workspace.service';

const DEFAULT_PAGE_SIZE = 10;

/** Base URL for the legacy SAP GUI launcher — a stub integration point until the real deep-link exists. */
const SAP_LAUNCH_BASE_URL = 'https://sap.example.com/launch';

@Component({
  selector: 'tsn-sap-workspace-list-page',
  standalone: true,
  imports: [DataTableComponent, EmptyStateComponent, ButtonComponent, HasPermissionDirective],
  templateUrl: './sap-workspace-list.page.html',
  styleUrl: './sap-workspace-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SapWorkspaceListPageComponent implements OnInit {
  private readonly sapWorkspaceService = inject(SapWorkspaceService);
  private readonly copilotContextStore = inject(CopilotContextStore);

  readonly columns: readonly DataTableColumn<SapWorkspaceLink>[] = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'transactionCode', header: 'Transaction code', sortable: true },
    { field: 'description', header: 'Description' },
  ];

  readonly rows = signal<readonly SapWorkspaceLink[]>([]);
  readonly totalCount = signal(0);
  readonly page = signal(1);
  readonly pageSize = signal(DEFAULT_PAGE_SIZE);
  readonly sort = signal<SortDescriptor | null>(null);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.copilotContextStore.setContext('my-sap', 'Launcher into legacy SAP transactions');
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

  openInSap(link: SapWorkspaceLink): void {
    // Stub integration point — a real SSO deep-link into the SAP GUI would replace this URL.
    window.open(
      `${SAP_LAUNCH_BASE_URL}?tcode=${encodeURIComponent(link.transactionCode)}`,
      '_blank',
    );
  }

  private load(): void {
    this.loading.set(true);
    const sort = this.sort();

    this.sapWorkspaceService
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

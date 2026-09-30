import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type {
  Capability,
  QueryParams,
  SortDescriptor,
  WorkflowAction,
} from '@timescapenu/shared-models';
import { CopilotContextStore } from '@timescapenu/core-state';
import { HasPermissionDirective } from '@timescapenu/core-permissions';
import { ButtonComponent } from '@timescapenu/shared-ui';
import {
  DataTableComponent,
  EmptyStateComponent,
  WorkflowStatusBadgeComponent,
  WorkflowValidActionsComponent,
} from '@timescapenu/shared-patterns';
import type { DataTableColumn } from '@timescapenu/shared-patterns';
import { GatepassService } from '../../services/gatepass.service';
import type { Gatepass } from '../../models/gatepass.interface';

const VIEW_CAPABILITY: Capability = 'application-services.gatepass.view';
const CREATE_CAPABILITY: Capability = 'application-services.gatepass.create';

/**
 * Flagship list/detail demo for the module: server-side paged + sorted
 * table, permission-gated create action, and a row-detail panel that shows
 * the workflow status and the actions valid from it.
 */
@Component({
  selector: 'tsn-gatepass-list-page',
  standalone: true,
  imports: [
    CommonModule,
    HasPermissionDirective,
    ButtonComponent,
    DataTableComponent,
    EmptyStateComponent,
    WorkflowStatusBadgeComponent,
    WorkflowValidActionsComponent,
  ],
  templateUrl: './gatepass-list.page.html',
  styleUrl: './gatepass-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GatepassListPageComponent implements OnInit {
  private readonly gatepassService = inject(GatepassService);
  private readonly copilotContextStore = inject(CopilotContextStore);

  protected readonly viewCapability = VIEW_CAPABILITY;
  protected readonly createCapability = CREATE_CAPABILITY;

  protected readonly columns: readonly DataTableColumn<Gatepass>[] = [
    { field: 'visitorName', header: 'Visitor', sortable: true },
    { field: 'purpose', header: 'Purpose' },
    { field: 'status', header: 'Status', sortable: true },
    { field: 'validFrom', header: 'Valid from', sortable: true },
    { field: 'validTo', header: 'Valid to', sortable: true },
  ];

  protected readonly rows = signal<readonly Gatepass[]>([]);
  protected readonly totalCount = signal(0);
  protected readonly loading = signal(false);
  protected readonly page = signal(1);
  protected readonly pageSize = signal(20);
  protected readonly sort = signal<SortDescriptor | null>(null);
  protected readonly selectedGatepass = signal<Gatepass | null>(null);

  ngOnInit(): void {
    this.copilotContextStore.setContext('application-services', 'Gatepass requests');
    this.loadGatepasses();
  }

  protected onPageChange(page: number): void {
    this.page.set(page);
    this.loadGatepasses();
  }

  protected onSortChange(sort: SortDescriptor): void {
    this.sort.set(sort);
    this.loadGatepasses();
  }

  protected onRowClick(row: Gatepass): void {
    this.selectedGatepass.set(row);
  }

  protected onWorkflowAction(action: WorkflowAction): void {
    // Real workflow transition wiring is a follow-up once the endpoint exists.
    console.info('TODO: wire workflow transition endpoint', action);
  }

  private loadGatepasses(): void {
    this.loading.set(true);
    const query: QueryParams = {
      page: this.page(),
      pageSize: this.pageSize(),
      sort: this.sort() ? [this.sort() as SortDescriptor] : undefined,
    };

    this.gatepassService.list(query).subscribe({
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

import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HasPermissionDirective } from '@timescapenu/core-permissions';
import { CopilotContextStore } from '@timescapenu/core-state';
import type { SortDescriptor } from '@timescapenu/shared-models';
import { DataTableComponent, EmptyStateComponent } from '@timescapenu/shared-patterns';
import type { DataTableColumn } from '@timescapenu/shared-patterns';
import type { Payslip } from '../../models/payslip.interface';
import { PayslipService } from '../../services/payslip.service';

const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'tsn-payslip-list-page',
  standalone: true,
  imports: [DataTableComponent, EmptyStateComponent, HasPermissionDirective],
  templateUrl: './payslip-list.page.html',
  styleUrl: './payslip-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayslipListPageComponent implements OnInit {
  private readonly payslipService = inject(PayslipService);
  private readonly copilotContextStore = inject(CopilotContextStore);

  readonly columns: readonly DataTableColumn<Payslip>[] = [
    { field: 'period', header: 'Period', sortable: true },
    { field: 'grossPay', header: 'Gross pay', sortable: true },
    { field: 'netPay', header: 'Net pay', sortable: true },
    { field: 'status', header: 'Status' },
  ];

  readonly rows = signal<readonly Payslip[]>([]);
  readonly totalCount = signal(0);
  readonly page = signal(1);
  readonly pageSize = signal(DEFAULT_PAGE_SIZE);
  readonly sort = signal<SortDescriptor | null>(null);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.copilotContextStore.setContext('ess-mss', 'Employee & manager self-service');
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

  private load(): void {
    this.loading.set(true);
    const sort = this.sort();

    this.payslipService
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

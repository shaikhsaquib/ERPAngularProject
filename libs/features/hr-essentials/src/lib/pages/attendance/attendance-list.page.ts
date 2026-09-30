import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Capability, QueryParams, SortDescriptor } from '@timescapenu/shared-models';
import { CopilotContextStore } from '@timescapenu/core-state';
import { HasPermissionDirective } from '@timescapenu/core-permissions';
import { DataTableComponent, EmptyStateComponent } from '@timescapenu/shared-patterns';
import type { DataTableColumn } from '@timescapenu/shared-patterns';
import { AttendanceService } from '../../services/attendance.service';
import type { AttendanceRecord } from '../../models/attendance-record.interface';

const VIEW_CAPABILITY: Capability = 'hr-essentials.attendance.view';

@Component({
  selector: 'tsn-attendance-list-page',
  standalone: true,
  imports: [CommonModule, HasPermissionDirective, DataTableComponent, EmptyStateComponent],
  templateUrl: './attendance-list.page.html',
  styleUrl: './attendance-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceListPageComponent implements OnInit {
  private readonly attendanceService = inject(AttendanceService);
  private readonly copilotContextStore = inject(CopilotContextStore);

  protected readonly viewCapability = VIEW_CAPABILITY;

  protected readonly columns: readonly DataTableColumn<AttendanceRecord>[] = [
    { field: 'employeeName', header: 'Employee', sortable: true },
    { field: 'date', header: 'Date', sortable: true },
    { field: 'status', header: 'Status', sortable: true },
    { field: 'hoursWorked', header: 'Hours worked' },
  ];

  protected readonly rows = signal<readonly AttendanceRecord[]>([]);
  protected readonly totalCount = signal(0);
  protected readonly loading = signal(false);
  protected readonly page = signal(1);
  protected readonly pageSize = signal(20);
  protected readonly sort = signal<SortDescriptor | null>(null);

  ngOnInit(): void {
    this.copilotContextStore.setContext('hr-essentials', 'Attendance');
    this.loadRecords();
  }

  protected onPageChange(page: number): void {
    this.page.set(page);
    this.loadRecords();
  }

  protected onSortChange(sort: SortDescriptor): void {
    this.sort.set(sort);
    this.loadRecords();
  }

  private loadRecords(): void {
    this.loading.set(true);
    const query: QueryParams = {
      page: this.page(),
      pageSize: this.pageSize(),
      sort: this.sort() ? [this.sort() as SortDescriptor] : undefined,
    };

    this.attendanceService.list(query).subscribe({
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

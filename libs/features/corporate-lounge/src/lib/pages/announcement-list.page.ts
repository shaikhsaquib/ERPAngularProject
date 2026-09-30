import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HasPermissionDirective } from '@timescapenu/core-permissions';
import { CopilotContextStore } from '@timescapenu/core-state';
import type { SortDescriptor } from '@timescapenu/shared-models';
import { DataTableComponent, EmptyStateComponent } from '@timescapenu/shared-patterns';
import type { DataTableColumn } from '@timescapenu/shared-patterns';
import type { Announcement } from '../models/announcement.interface';
import { AnnouncementService } from '../services/announcement.service';

const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'tsn-announcement-list-page',
  standalone: true,
  imports: [DataTableComponent, EmptyStateComponent, HasPermissionDirective],
  templateUrl: './announcement-list.page.html',
  styleUrl: './announcement-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementListPageComponent implements OnInit {
  private readonly announcementService = inject(AnnouncementService);
  private readonly copilotContextStore = inject(CopilotContextStore);

  readonly columns: readonly DataTableColumn<Announcement>[] = [
    { field: 'title', header: 'Title', sortable: true },
    { field: 'category', header: 'Category', sortable: true },
    { field: 'author', header: 'Author' },
    { field: 'publishedAt', header: 'Published', sortable: true },
  ];

  readonly rows = signal<readonly Announcement[]>([]);
  readonly totalCount = signal(0);
  readonly page = signal(1);
  readonly pageSize = signal(DEFAULT_PAGE_SIZE);
  readonly sort = signal<SortDescriptor | null>(null);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.copilotContextStore.setContext('corporate-lounge', 'Company announcements & recognition');
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

    this.announcementService
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

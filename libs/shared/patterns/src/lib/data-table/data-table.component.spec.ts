import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import type { DataTableColumn } from './data-table-column.interface';

interface DemoRow {
  id: string;
  name: string;
  department: string;
}

describe('DataTableComponent', () => {
  let fixture: ComponentFixture<DataTableComponent<DemoRow>>;
  let component: DataTableComponent<DemoRow>;

  const columns: readonly DataTableColumn<DemoRow>[] = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'department', header: 'Department', sortable: false },
  ];

  const rows: readonly DemoRow[] = [
    { id: '1', name: 'Amelia', department: 'Finance' },
    { id: '2', name: 'Noah', department: 'HR' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent<DataTableComponent<DemoRow>>(DataTableComponent);
    component = fixture.componentInstance;
    component.columns = columns;
    component.rows = rows;
    component.totalCount = rows.length;
    component.trackByField = 'id';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sort cycling', () => {
    it('ignores clicks on non-sortable columns', () => {
      const emitted: unknown[] = [];
      component.sortChange.subscribe((value) => emitted.push(value));

      component.onHeaderClick(columns[1]);

      expect(emitted).toEqual([]);
      expect(component.directionFor('department')).toBeNull();
    });

    it('cycles asc -> desc -> none on a sortable column, emitting only for asc/desc', () => {
      const emitted: unknown[] = [];
      component.sortChange.subscribe((value) => emitted.push(value));

      component.onHeaderClick(columns[0]);
      expect(component.directionFor('name')).toBe('asc');

      component.onHeaderClick(columns[0]);
      expect(component.directionFor('name')).toBe('desc');

      component.onHeaderClick(columns[0]);
      expect(component.directionFor('name')).toBeNull();

      expect(emitted).toEqual([
        { field: 'name', direction: 'asc' },
        { field: 'name', direction: 'desc' },
      ]);
    });

    it('resets to asc when a different sortable column is clicked', () => {
      component.onHeaderClick(columns[0]);
      component.onHeaderClick(columns[0]);
      expect(component.directionFor('name')).toBe('desc');

      const otherColumn: DataTableColumn<DemoRow> = {
        field: 'department',
        header: 'Department',
        sortable: true,
      };
      component.onHeaderClick(otherColumn);

      expect(component.directionFor('department')).toBe('asc');
      expect(component.directionFor('name')).toBeNull();
    });
  });

  describe('pager', () => {
    it('emits pageChange with the previous page when allowed', () => {
      component.page = 2;
      const emitted: number[] = [];
      component.pageChange.subscribe((value) => emitted.push(value));

      component.goToPreviousPage();

      expect(emitted).toEqual([1]);
    });

    it('does not emit pageChange when already on the first page', () => {
      component.page = 1;
      const emitted: number[] = [];
      component.pageChange.subscribe((value) => emitted.push(value));

      component.goToPreviousPage();

      expect(emitted).toEqual([]);
    });

    it('emits pageChange with the next page when more pages remain', () => {
      component.page = 1;
      component.pageSize = 1;
      component.totalCount = 2;
      const emitted: number[] = [];
      component.pageChange.subscribe((value) => emitted.push(value));

      component.goToNextPage();

      expect(emitted).toEqual([2]);
    });

    it('does not emit pageChange past the last page', () => {
      component.page = 2;
      component.pageSize = 1;
      component.totalCount = 2;
      const emitted: number[] = [];
      component.pageChange.subscribe((value) => emitted.push(value));

      component.goToNextPage();

      expect(emitted).toEqual([]);
    });
  });

  describe('row capabilities', () => {
    it('returns an empty array when no rowCapability is provided', () => {
      expect(component.capabilitiesFor(rows[0])).toEqual([]);
    });

    it('normalizes a single capability into an array', () => {
      component.rowCapability = () => 'ess.payslip.view';
      expect(component.capabilitiesFor(rows[0])).toEqual(['ess.payslip.view']);
    });

    it('passes through an array of capabilities untouched', () => {
      component.rowCapability = () => ['ess.payslip.view', 'ess.payslip.edit'];
      expect(component.capabilitiesFor(rows[0])).toEqual(['ess.payslip.view', 'ess.payslip.edit']);
    });
  });

  describe('cellValue', () => {
    it('stringifies a value', () => {
      expect(component.cellValue(rows[0], columns[0])).toBe('Amelia');
    });
  });
});

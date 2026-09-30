import type { Meta, StoryObj } from '@storybook/angular';
import { DataTableComponent } from './data-table.component';
import type { DataTableColumn } from './data-table-column.interface';

interface DemoRow {
  id: string;
  name: string;
  department: string;
}

const columns: readonly DataTableColumn<DemoRow>[] = [
  { field: 'name', header: 'Name', sortable: true, width: '2fr' },
  { field: 'department', header: 'Department', sortable: true, width: '1fr' },
];

const rows: readonly DemoRow[] = [
  { id: '1', name: 'Amelia Chen', department: 'Finance' },
  { id: '2', name: 'Noah Patel', department: 'Human Resources' },
  { id: '3', name: 'Sofia Rossi', department: 'Engineering' },
  { id: '4', name: 'Liam Byrne', department: 'Legal' },
];

const meta: Meta<DataTableComponent<DemoRow>> = {
  title: 'Shared Patterns/Data Table',
  component: DataTableComponent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<DataTableComponent<DemoRow>>;

export const Default: Story = {
  render: () => ({
    props: {
      columns,
      rows,
      totalCount: rows.length,
      page: 1,
      pageSize: 10,
      trackByField: 'id',
    },
  }),
};

export const Loading: Story = {
  render: () => ({
    props: {
      columns,
      rows: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      loading: true,
      trackByField: 'id',
    },
  }),
};

export const Empty: Story = {
  render: () => ({
    props: {
      columns,
      rows: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      trackByField: 'id',
    },
  }),
};

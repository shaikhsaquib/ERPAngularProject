export type SortDirection = 'asc' | 'desc';

export interface SortDescriptor {
  field: string;
  direction: SortDirection;
}

export type FilterOperator = 'eq' | 'neq' | 'contains' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

export interface FilterDescriptor {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean | readonly (string | number)[];
}

/** Server-side pagination/sort/filter request shape used by data-table and every list endpoint. */
export interface QueryParams {
  page: number;
  pageSize: number;
  sort?: readonly SortDescriptor[];
  filters?: readonly FilterDescriptor[];
  search?: string;
}

export interface PagedResult<T> {
  items: readonly T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

/**
 * Data-driven column config for `tsn-data-table`. `field` is constrained to
 * the string keys of `T` so it can drive cell access, sorting and
 * `trackBy` from the same descriptor.
 */
export interface DataTableColumn<T> {
  field: Extract<keyof T, string>;
  header: string;
  sortable?: boolean;
  width?: string;
}

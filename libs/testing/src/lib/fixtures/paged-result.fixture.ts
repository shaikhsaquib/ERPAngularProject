import type { PagedResult } from '@timescapenu/shared-models';

export function buildPagedResult<T>(
  items: readonly T[],
  overrides: Partial<Omit<PagedResult<T>, 'items'>> = {},
): PagedResult<T> {
  return {
    items,
    totalCount: items.length,
    page: 1,
    pageSize: items.length || 10,
    ...overrides,
  };
}

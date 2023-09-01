import { ListPaginationParams, PageableList } from "../services/list/list.types";

export function toPageableList<T>(
  items: T[],
  total: number,
  params?: Partial<ListPaginationParams>,
): PageableList<T> {
  return {
    items,
    pagination: {
      start: params?.start || 0,
      limit: params?.limit || items.length,
      total,
    },
  }
}

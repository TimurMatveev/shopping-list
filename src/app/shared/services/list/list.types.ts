import { ApiListSortDirection } from "../../types/api-list.types";

export enum FilterPredicate {
  Equal = 'Equal',
  NotEqual = 'NotEqual',
  GreaterThen = 'GreaterThen',
  LessThen = 'LessThen',
  RegExp = 'RegExp',

  // array value
  In = 'in',
  Contains = 'Contains',
}

export type FilterConfig = {
  key: string;
  predicate: FilterPredicate;
  value: string | number | boolean | (string | number | boolean)[];
};

export type ListPaginationParams = {
  start: number;
  limit: number;
};

export type ListSortParams = {
  sort: string;
  direction: ApiListSortDirection;
};

export type ListFilterParams = {
  filters: FilterConfig[];
};

export type ListParams = Partial<ListPaginationParams & Partial<ListSortParams> & Partial<ListFilterParams>>;

export type ListPagination = ListPaginationParams & {
  total: number;
}

export type PageableList<T> = {
  items: T[];
  pagination: ListPagination;
};

export type ListEvent<T, E extends Event = Event> = {
  item: T;
  index: number;
  event: E;
}

import { KeyValue } from "@angular/common";

export enum ApiListSortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type ApiListSortParams = {
  _sort?: string;
  _order?: ApiListSortDirection;
};

export type ApiListPaginationParams = {
  _start?: number;
  _limit?: number;
};

export type ApiListFilterValue = string | number | boolean | ReadonlyArray<string | number | boolean>;

export type ApiListFilterParams = {
  [param: string]: ApiListFilterValue;
};

export type ApiListParams = ApiListSortParams & ApiListPaginationParams & ApiListFilterParams;

export type ApiList<T> = {
  items: T[];
  total: number;
}

export type ApiListParamsMapper =
  (key: string, value?: ApiListFilterValue) => KeyValue<string, ApiListFilterValue | undefined>;

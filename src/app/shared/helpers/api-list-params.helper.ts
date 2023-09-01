import {
  ApiListFilterParams,
  ApiListFilterValue,
  ApiListPaginationParams,
  ApiListParams,
  ApiListSortParams,
  ApiListParamsMapper
} from "../types/api-list.types";
import {
  FilterConfig,
  FilterPredicate,
  ListPaginationParams,
  ListParams,
  ListSortParams,
} from "../services/list";

const defaultParamsMapper: ApiListParamsMapper = (key: string, value: ApiListFilterValue = '') => ({ key, value });

export function toApiListParams(listParams?: ListParams, paramsMapper?: ApiListParamsMapper): ApiListParams {
  if (!listParams) {
    return {};
  }

  return {
    ...toApiListSortParams(listParams, paramsMapper || defaultParamsMapper),
    ...toApiListPaginationParams(listParams),
    ...toApiListFilterParams(listParams.filters || [], paramsMapper || defaultParamsMapper),
  };
}

export function toApiListSortParams(
  listSortParams: Partial<ListSortParams>,
  paramsMapper: ApiListParamsMapper,
): ApiListSortParams {
  const apiSortParams: ApiListSortParams = {};

  if (listSortParams.sort) {
    apiSortParams._sort = paramsMapper(listSortParams.sort).key;
  }

  if (listSortParams.direction) {
    apiSortParams._order = listSortParams.direction;
  }

  return apiSortParams;
}

export function toApiListPaginationParams(listPaginationParams: Partial<ListPaginationParams>): ApiListPaginationParams {
  const apiPaginationParams: ApiListPaginationParams = {};

  if (listPaginationParams.start) {
    apiPaginationParams._start = listPaginationParams.start;
  }

  if (listPaginationParams.limit) {
    apiPaginationParams._limit = listPaginationParams.limit;
  }

  return apiPaginationParams;
}

export function toApiListFilterParams(
  filters: FilterConfig[],
  paramsMapper: ApiListParamsMapper = (key, value) => ({ key, value }),
): ApiListFilterParams {
  return filters
    .reduce((params, {key, predicate, value}) => {
      const mapped = paramsMapper(key, value);
      const apiFilterKey = mapped.key + FILTER_PREDICATE_SUFFIX_MAP.get(predicate);

      return {
        ...params,
        [apiFilterKey]: mapped.value ?? '',
      };
    }, <ApiListFilterParams>{});
}

const FILTER_PREDICATE_SUFFIX_SEPARATOR = '_';

const FILTER_PREDICATE_SUFFIX_MAP: Map<FilterPredicate, string> = new Map([
  [FilterPredicate.Equal, ''],
  [FilterPredicate.NotEqual, `${FILTER_PREDICATE_SUFFIX_SEPARATOR}ne`],
  [FilterPredicate.GreaterThen, `${FILTER_PREDICATE_SUFFIX_SEPARATOR}gte`],
  [FilterPredicate.LessThen, `${FILTER_PREDICATE_SUFFIX_SEPARATOR}lte`],
  [FilterPredicate.RegExp, `${FILTER_PREDICATE_SUFFIX_SEPARATOR}like`],
  [FilterPredicate.Contains, `${FILTER_PREDICATE_SUFFIX_SEPARATOR}like`],
]);

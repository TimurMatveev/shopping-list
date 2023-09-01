import { FilterConfig, FilterPredicate } from "../services/list";
import { Params } from "@angular/router";
import { revertMap } from "./revert-map.helper";

const predicateToSuffixMap: Map<FilterPredicate, string> = new Map([
  [FilterPredicate.Equal, 'eq'],
  [FilterPredicate.NotEqual, 'neq'],
  [FilterPredicate.GreaterThen, 'from'],
  [FilterPredicate.LessThen, 'to'],
  [FilterPredicate.RegExp, 'has'],
  [FilterPredicate.In, 'in'],
  [FilterPredicate.Contains, 'contains'],
]);

const suffixToPredicateMap: Map<string, FilterPredicate> = revertMap(predicateToSuffixMap);

const separator = '_';

export function filtersToQuery(filters: FilterConfig[]): Params {
  return filters.reduce<Params>((params, filter) => ({
    ...params,
    [filter.key + separator + predicateToSuffixMap.get(filter.predicate)]: filter.value,
  }), {});
}

export function queryToFilters(params: Params): FilterConfig[] {
  return Object.entries(params).reduce<FilterConfig[]>((filters, [keyWithFn, value]) => {
    const [key, fn] = keyWithFn.split(separator);

    return [
      ...filters,
      {
        key,
        predicate: suffixToPredicateMap.get(fn) as FilterPredicate,
        value: value as FilterConfig['value'],
      },
    ];
  }, []);
}

import { Injectable } from "@angular/core";
import { ActivatedRoute, Data, Params, Router } from "@angular/router";
import { combineLatest, map, Observable } from "rxjs";
import { FilterConfig, FilterPredicate, ListFilterStorage } from "../../../shared/services/list";
import { ShoppingType } from "../shoppings.constants";
import { filtersToQuery, queryToFilters } from "../../../shared/helpers/query-filter.helper";

@Injectable()
export class ShoppingListFilterStorageService implements ListFilterStorage {
  public readonly systemFilters$: Observable<FilterConfig[]> = combineLatest([
    this.activatedRoute.data,
    this.activatedRoute.params,
  ]).pipe(
    map(([{ userId }, { shoppingType }]: [Data, Params]) => {
      return [
        shoppingType === ShoppingType.Shared
          ? {
            key: 'shareWith',
            predicate: FilterPredicate.Contains,
            value: userId,
          } : {
            key: 'userId',
            predicate: FilterPredicate.Equal,
            value: userId,
          }
        ];
    }),
  );

  public readonly userFilters$: Observable<FilterConfig[]> = this.activatedRoute.queryParams
    .pipe(
      map((queryParams: Params) => queryToFilters(queryParams)),
    );

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  public setFilters(filters: FilterConfig[]): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: filtersToQuery(filters),
    });
  };
}

import { inject, Injectable } from "@angular/core";
import { map, Observable, combineLatest, shareReplay } from "rxjs";
import { FilterConfig, ListFilterParams } from "./list.types";
import { ListFilterStorage, ListFilterStorageService } from "./list-filter-storage.service";

@Injectable()
export class ListFilterService {
  public readonly filterStorage: ListFilterStorage = inject(ListFilterStorageService);

  public params$: Observable<Partial<ListFilterParams>> = combineLatest([
    this.filterStorage.systemFilters$,
    this.filterStorage.userFilters$,
  ]).pipe(
    map(([systemFilters, userFilters]: [FilterConfig[], FilterConfig[]]) => {
      const filters: FilterConfig[] = [...systemFilters, ...userFilters];
      return filters.length ? { filters } : {};
    }),
    shareReplay(1),
  );

  public readonly isFiltered$: Observable<boolean> = this.params$
    .pipe(
      map((params: Partial<ListFilterParams>) => !!Object.keys(params).length),
    );

  public setFilters(filters: FilterConfig[]): void {
    this.filterStorage.setFilters(filters);
  };
}

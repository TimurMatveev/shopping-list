import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { FilterConfig } from "./list.types";

export interface ListFilterStorage {
  readonly systemFilters$: Observable<FilterConfig[]>;
  readonly userFilters$: Observable<FilterConfig[]>;
  setFilters(filters: FilterConfig[]): void;
}

@Injectable()
export class ListFilterStorageService implements ListFilterStorage {
  private filtersStorage: BehaviorSubject<FilterConfig[]> = new BehaviorSubject<FilterConfig[]>([]);

  public systemFilters$: Observable<FilterConfig[]> = of([]);

  public userFilters$: Observable<FilterConfig[]> = this.filtersStorage.asObservable();

  public setFilters(filters: FilterConfig[]): void {
    this.filtersStorage.next(filters);
  };
}

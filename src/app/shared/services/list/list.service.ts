import { Inject, Injectable, Optional } from "@angular/core";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  distinctUntilChanged,
  finalize,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap
} from "rxjs";
import { ListFilterService } from "./list-filter.service";
import { ListPaginationService } from "./list-pagination.service";
import { ListSortService } from "./list-sort.service";
import { LIST_PARAMS_MERGER, LIST_SOURCE, ListParamsMerger, ListSource } from "./list.providers";
import {
  ListFilterParams,
  ListPaginationParams,
  ListParams,
  ListSortParams,
  PageableList
} from "./list.types";

@Injectable()
export class ListService<T> {
  #itemsState: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  get #emptyList(): PageableList<T> {
    return {
      items: [],
      pagination: this.listPaginationService?.pagination || { start: 0, limit: 0, total: 0 },
    };
  };

  #isLoadingState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  #reload: Subject<void> = new Subject<void>();

  #updateItem: Subject<[number, T | null]> = new Subject<[number, T | null]>();

  public readonly isLoading$: Observable<boolean> = this.#isLoadingState.asObservable();

  public readonly isInitialLoading$: Observable<boolean> = this.isLoading$
    .pipe(
      map((isLoading: boolean) => isLoading && !this.#itemsState.value.length),
    );

  public readonly isEmpty$: Observable<boolean> = combineLatest([
    this.#isLoadingState,
    this.#itemsState,
  ]).pipe(
    map(([isLoading, items]) => !isLoading && !items.length),
    distinctUntilChanged(),
  );

  public readonly params$: Observable<ListParams> = this.#reload
    .pipe(
      startWith(null),
      switchMap(() => {
        const filterParams$: Observable<Partial<ListFilterParams>> = this.listFilterService
          ? this.listFilterService.params$
          : of({});

        const sortParams$: Observable<ListSortParams | null> = this.listSortService
          ? this.listSortService.params$
          : of(null);

        return combineLatest([filterParams$, sortParams$]);
      }),
      switchMap(([filterParams, sortParams]) => {
        this.#itemsState.next([]);

        this.listPaginationService?.reset();

        const paginationParams$: Observable<Partial<ListPaginationParams>> = this.listPaginationService
          ? this.listPaginationService.params$
          : of({});

        return paginationParams$
          .pipe(
            map((paginationParams: Partial<ListPaginationParams>) =>
              this.listParamsMerger.merge([filterParams, sortParams, paginationParams])
            ),
          );
      }),
      shareReplay(1),
    );

  public readonly items$: Observable<T[]> = this.params$.pipe(
    switchMap((params) => {
      this.#isLoadingState.next(true);

      return this.listSource.getList(params)
        .pipe(
          startWith(this.#emptyList),
          catchError(() => of(this.#emptyList)),
          finalize(() => this.#isLoadingState.next(false)),
        );
    }),
    map((list: PageableList<T>) => {
      this.listPaginationService?.setTotal(list.pagination.total);
      return [ ...this.#itemsState.value, ...list.items ];
    }),
    switchMap((items) => this.#updateItem
      .pipe(
        map(([index, item]) => [
          ...this.#itemsState.value.slice(0, index),
          ...(item ? [item] : []),
          ...this.#itemsState.value.slice(index + 1),
        ]),
        startWith(items),
      )),
    tap((items) => this.#itemsState.next(items)),
    startWith(this.#itemsState.value),
    shareReplay(1),
  );

  constructor(
    @Inject(LIST_SOURCE) private listSource: ListSource<T>,
    @Inject(LIST_PARAMS_MERGER) private listParamsMerger: ListParamsMerger<T>,
    @Optional() private listFilterService: ListFilterService | null,
    @Optional() private listPaginationService: ListPaginationService | null,
    @Optional() private listSortService: ListSortService | null,
  ) {
  }

  public get items(): T[] {
    return this.#itemsState.value.slice();
  }

  public get length(): number {
    return this.#itemsState.value.length;
  }

  public addItem(item: T): void {
    this.#updateItem.next([ this.length, item ]);

    if (this.listPaginationService) {
      this.listPaginationService.setTotal(this.listPaginationService.pagination.total + 1);
    }
  }

  public updateItem(index: number, item: T): void {
    this.#updateItem.next([ index, item ]);
  }

  public deleteItem(index: number): void {
    this.#updateItem.next([ index, null ]);

    if (this.listPaginationService) {
      this.listPaginationService.setTotal(this.listPaginationService.pagination.total - 1);
    }
  }
}

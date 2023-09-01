import { Inject, Injectable, InjectionToken } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { ListPagination, ListPaginationParams } from "./list.types";

export const LIST_PAGINATION_LIMIT: InjectionToken<number> =
  new InjectionToken<number>('LIST_PAGINATION_LIMIT', { factory: () => 25 });

@Injectable()
export class ListPaginationService {
  #startState: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  #total: number = 0;

  public params$: Observable<ListPaginationParams> = this.#startState
    .pipe(
      map((start: number) => ({
        start,
        limit: this.limit,
      })),
    )

  constructor(
    @Inject(LIST_PAGINATION_LIMIT) private readonly limit: number,
  ) {
  }

  public get pagination(): ListPagination {
    return {
      start: this.#startState.value,
      limit: this.limit,
      total: this.#total,
    };
  }

  public reset(): void {
    this.#total = 0;
    this.#startState.next(0);
  }

  public loadMore(): void {
    const nextStart = this.#startState.value + this.limit;

    if (nextStart < this.#total) {
      this.#startState.next(nextStart);
    }
  }

  public setTotal(total: number): void {
    this.#total = total;
  }
}

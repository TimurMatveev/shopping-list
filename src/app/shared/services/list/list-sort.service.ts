import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ListSortParams } from "./list.types";

@Injectable()
export class ListSortService {
  #sortState: BehaviorSubject<ListSortParams | null> =
    new BehaviorSubject<ListSortParams | null>(null);

  public params$: Observable<ListSortParams | null> = this.#sortState.asObservable();

  public setSort(sort: ListSortParams | null): void {
    this.#sortState.next(sort);
  };
}

import { Injectable } from "@angular/core";
import { map, Observable, shareReplay, startWith, Subject, switchMap, tap } from "rxjs";
import { CategoryMapper } from "./category.mapper";
import { toApiListParams } from "../../../shared/helpers/api-list-params.helper";
import { CategoryApiService, CategoryDto } from "../api";
import { Category } from "./category.types";
import { ListSource, ListParams, PageableList } from "../../../shared/services/list";
import { ApiList } from "../../../shared/types/api-list.types";
import { toPageableList } from "../../../shared/helpers/pageable-list.helpers";

@Injectable({
  providedIn: 'root',
})
export class CategoryService implements ListSource<Category> {
  public refreshAll$: Subject<void> = new Subject<void>();

  public readonly all$: Observable<Category[]> = this.refreshAll$
    .pipe(
      startWith(null),
      switchMap(() => this.getList()),
      map((list: PageableList<Category>) => list.items),
      tap((categories: Category[]) => {
        this.tagsMap.clear();

        categories.forEach(
          (category: Category) => category.tags.forEach(
            (tag: string) => this.tagsMap.set(tag, category.key)
          )
        );
      }),
      shareReplay(1),
    );

  public readonly allMap$: Observable<Map<Category['key'], Category>> = this.all$
    .pipe(
      map((categories: Category[]) => new Map(categories.map((category: Category) => [category.key, category]))),
      shareReplay(1),
    );

  public readonly tagsMap: Map<string, Category['key']> = new Map();

  constructor(
    private categoryApiService: CategoryApiService,
  ) {
  }

  public getList(params?: ListParams): Observable<PageableList<Category>> {
    return this.categoryApiService.getList(toApiListParams(params, CategoryMapper.listParamsMapper))
      .pipe(
        map(({ items, total }: ApiList<CategoryDto>) => toPageableList<Category>(
          items.map(CategoryMapper.toModel),
          total,
          params
        )),
      );
  }

  public getItem(key: Category['key']): Observable<Category> {
    return this.categoryApiService.getItem(key)
      .pipe(
        map(CategoryMapper.toModel),
      );
  }

  public isKeyUnique(key: Category['key']): Observable<boolean> {
    return this.allMap$.pipe(
      map((allMap: Map<Category['key'], Category>) => !allMap.has(key)),
    );
  }

  public create(category: Category): Observable<Category> {
    return this.categoryApiService.create(CategoryMapper.fromModel(category))
      .pipe(
        map(CategoryMapper.toModel),
        tap(() => this.refreshAll$.next()),
      );
  }

  public update(category: Category): Observable<Category> {
    return this.categoryApiService.update(category.key, CategoryMapper.fromModel(category))
      .pipe(
        map(CategoryMapper.toModel),
        tap(() => this.refreshAll$.next()),
      );
  }

  public delete(key: Category['key']): Observable<void> {
    return this.categoryApiService.delete(key)
      .pipe(
        tap(() => this.refreshAll$.next()),
      );
  }
}

import { Injectable } from "@angular/core";
import { map, Observable, switchMap } from "rxjs";
import { ShoppingApiService, ShoppingDto } from "../api";
import { toApiListParams } from "../../../shared/helpers/api-list-params.helper";
import { ListParams, ListSource, PageableList } from "../../../shared/services/list";
import { Shopping, ShoppingCreate, ShoppingShort } from "./shopping.types";
import { ShoppingMapper } from "./shopping.mapper";
import { ApiList } from "../../../shared/types/api-list.types";
import { User, UserService } from "../../users";
import { toPageableList } from "../../../shared/helpers/pageable-list.helpers";

@Injectable({
  providedIn: 'root',
})
export class ShoppingService implements ListSource<ShoppingShort> {
  constructor(
    private shoppingApiService: ShoppingApiService,
    private userService: UserService,
  ) {
  }

  public getList(params?: ListParams): Observable<PageableList<ShoppingShort>> {
    return this.shoppingApiService.getList(toApiListParams(params))
      .pipe(
        map(({ items, total }: ApiList<ShoppingDto>) => toPageableList<ShoppingShort>(
          items.map(ShoppingMapper.toShortModel),
          total,
          params
        )),
      );
  }

  public getItem(id: number): Observable<Shopping> {
    return this.shoppingApiService.getItem(id)
      .pipe(
        switchMap((shoppingDto: ShoppingDto) => {
          const userIds: number[] = [
            shoppingDto.userId,
            ...(shoppingDto.shareWith || []),
            ...(shoppingDto.implementerId ? [shoppingDto.implementerId] : []),
          ];

          return this.userService.getByIds(userIds)
            .pipe(
              map((users: User[]) => ShoppingMapper.toModel(shoppingDto, users)),
            );
        }),
      );
  }

  public create(shopping: ShoppingCreate): Observable<ShoppingShort> {
    return this.shoppingApiService.create(ShoppingMapper.fromCreateModel(shopping))
      .pipe(
        map(ShoppingMapper.toShortModel),
      );
  }

  public update(shopping: ShoppingShort): Observable<ShoppingShort> {
    return this.shoppingApiService.update(shopping.id, ShoppingMapper.fromShortModel(shopping))
      .pipe(
        map(ShoppingMapper.toShortModel),
      );
  }

  public delete(id: number): Observable<void> {
    return this.shoppingApiService.delete(id);
  }

  public share(shopping: Shopping, shareWith: User[]): Observable<Shopping> {
    const updatedShopping: Shopping = {
      ...shopping,
      shareWith,
    };

    return this.shoppingApiService.update(shopping.id, ShoppingMapper.fromModel(updatedShopping))
      .pipe(
        map(() => updatedShopping),
      );
  }
}

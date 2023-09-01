import { Injectable } from "@angular/core";
import { map, Observable, throwError } from "rxjs";
import { UserApiService } from "../api/user-api.service";
import { User, UserCreate } from "./user.types";
import { UserMapper } from "./user.mapper";
import { toApiListParams } from "../../../shared/helpers/api-list-params.helper";
import { FilterPredicate, ListParams, PageableList } from "../../../shared/services/list/list.types";
import { ListSource } from "../../../shared/services/list/list.providers";
import { ApiList } from "../../../shared/types/api-list.types";
import { UserDto } from "../api/user-api.types";
import { toPageableList } from "../../../shared/helpers/pageable-list.helpers";

@Injectable({
  providedIn: 'root',
})
export class UserService implements ListSource<User> {
  constructor(
    private userApiService: UserApiService,
  ) {
  }

  public getList(params?: ListParams): Observable<PageableList<User>> {
    return this.userApiService.getList(toApiListParams(params))
      .pipe(
        map(({ items, total }: ApiList<UserDto>) =>
          toPageableList<User>(items.map(UserMapper.toModel), total, params)
        ),
      );
  }

  public getItem(id: number): Observable<User> {
    return this.userApiService.getItem(id)
      .pipe(
        map(UserMapper.toModel),
      );
  }

  public getByIds(ids: number[]): Observable<User[]> {
    return this.userApiService.getList(toApiListParams({
      filters: [
        {
          key: 'id',
          predicate: FilterPredicate.In,
          value: ids,
        },
      ],
    })).pipe(
      map((list: ApiList<UserDto>) => list.items.map(UserMapper.toModel)),
    );
  }

  public getByAuth(email: string, password: string): Observable<User> {
    return this.userApiService.getList(toApiListParams({
      filters: [
        {
          key: 'email',
          predicate: FilterPredicate.Equal,
          value: email,
        },
      ],
    })).pipe(
      map((list: ApiList<UserDto>) => {
        const first: UserDto | undefined = list.items.at(0);

        if (!first) {
          throw new Error('auth.emailNotFound');
        }

        if (first.password !== password) {
          throw new Error('auth.wrongPassword');
        }

        return UserMapper.toModel(first);
      }),
    );
  }

  public create(user: UserCreate): Observable<User> {
    return this.userApiService.create(UserMapper.fromCreateModel(user))
      .pipe(
        map(UserMapper.toModel),
      );
  }

  public update(id: User['id'], user: Partial<User>): Observable<User> {
    return this.userApiService.update(id, UserMapper.fromPartialModel(user))
      .pipe(
        map(UserMapper.toModel),
      );
  }

  public delete(id: User['id']): Observable<void> {
    return this.userApiService.delete(id);
  }
}

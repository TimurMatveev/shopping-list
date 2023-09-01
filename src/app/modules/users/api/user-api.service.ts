import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environment/environment";
import { delay, map, Observable } from "rxjs";
import { UserCreateDto, UserDto } from "./user-api.types";
import { ApiList, ApiListParams } from "../../../shared/types/api-list.types";
import { toApiList } from "../../../shared/helpers/api-list.helper";

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly url: string = `${ environment.apiUrl }/users`;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  public getList(params?: ApiListParams): Observable<ApiList<UserDto>> {
    return this.httpClient.get<UserDto[]>(this.url, {
      observe: 'response',
      params,
    }).pipe(
      map(toApiList),
      delay(500)
    );
  }

  public getItem(id: number): Observable<UserDto> {
    return this.httpClient
      .get<UserDto>(`${ this.url }/${ id }`)
      .pipe(delay(1500));
  }

  public create(data: UserCreateDto): Observable<UserDto> {
    return this.httpClient
      .post<UserDto>(this.url, {
        ...data,
        createdAt: Date.now(),
      })
      .pipe(delay(500));
  }

  public update(id: number, data: Partial<UserDto>): Observable<UserDto> {
    return this.httpClient
      .patch<UserDto>(`${ this.url }/${ id }`, {
        ...data,
        updatedAt: Date.now(),
      })
      .pipe(delay(500));
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${ this.url }/${ id }`);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environment/environment";
import { delay, map, Observable } from "rxjs";
import { ApiList, ApiListParams } from "../../../shared/types/api-list.types";
import { ShoppingCreateDto, ShoppingDto } from "./shopping-api.types";
import { toApiList } from "../../../shared/helpers/api-list.helper";

@Injectable({
  providedIn: 'root',
})
export class ShoppingApiService {
  private readonly url: string = `${ environment.apiUrl }/shoppings`;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  public getList(params?: ApiListParams): Observable<ApiList<ShoppingDto>> {
    return this.httpClient.get<ShoppingDto[]>(
      this.url,
      { observe: 'response', params }
    ).pipe(
      map(toApiList),
      delay(500),
    );
  }

  public getItem(id: number): Observable<ShoppingDto> {
    return this.httpClient.get<ShoppingDto>(`${ this.url }/${ id }`)
      .pipe(delay(500));
  }

  public create(data: ShoppingCreateDto): Observable<ShoppingDto> {
    return this.httpClient
      .post<ShoppingDto>(this.url, {
        ...data,
        createdAt: Date.now(),
      })
      .pipe(delay(500));
  }

  public update(id: number, data: ShoppingDto): Observable<ShoppingDto> {
    return this.httpClient
      .put<ShoppingDto>(`${ this.url }/${ id }`, {
        ...data,
        updatedAt: Date.now(),
      })
      .pipe(delay(500));
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${ this.url }/${ id }`)
      .pipe(delay(500));
  }
}

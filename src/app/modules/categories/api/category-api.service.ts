import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environment/environment";
import { delay, map, Observable } from "rxjs";
import { ApiList, ApiListParams } from "../../../shared/types/api-list.types";
import { CategoryDto } from "./category-api.types";
import { toApiList } from "../../../shared/helpers/api-list.helper";

@Injectable({
  providedIn: 'root',
})
export class CategoryApiService {
  private readonly url: string = `${ environment.apiUrl }/categories`;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  public getList(params?: ApiListParams): Observable<ApiList<CategoryDto>> {
    return this.httpClient.get<CategoryDto[]>(this.url, { observe: 'response', params })
      .pipe(
        map(toApiList),
      );
  }

  public getItem(id: string): Observable<CategoryDto> {
    return this.httpClient.get<CategoryDto>(`${ this.url }/${ id }`);
  }

  public create(data: CategoryDto): Observable<CategoryDto> {
    return this.httpClient.post<CategoryDto>(this.url, data)
      .pipe(delay(500));
  }

  public update(id: string, data: CategoryDto): Observable<CategoryDto> {
    return this.httpClient.put<CategoryDto>(`${ this.url }/${ id }`, data)
      .pipe(delay(500));
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${ this.url }/${ id }`);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environment/environment";
import { PermissionDto } from "./permission-api.types";

@Injectable({
  providedIn: 'root',
})
export class PermissionApiService {
  private readonly url: string = `${ environment.apiUrl }/permissions`;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  public getList(): Observable<PermissionDto[]> {
    return this.httpClient.get<PermissionDto[]>(this.url);
  }

  public getItem(id: string): Observable<PermissionDto> {
    return this.httpClient.get<PermissionDto>(`${ this.url }/${ id }`);
  }
}

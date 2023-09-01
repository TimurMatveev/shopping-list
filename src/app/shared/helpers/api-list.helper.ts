import { ApiList } from "../types/api-list.types";
import { HttpResponse } from "@angular/common/http";

export function toApiList<T>(response: HttpResponse<T[]>): ApiList<T> {
  const items: T[] = response.body || [];
  const total: number = +(response.headers.get('X-Total-Count') || items.length);

  return { items, total };
}

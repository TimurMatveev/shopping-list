import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { FilterConfig, ListParams, PageableList } from "./list.types";

export interface ListSource<T = unknown> {
  getList(params?: ListParams): Observable<PageableList<T>>;
}

export interface ListParamsMerger<T = unknown> {
  merge(params?: (ListParams | null)[]): ListParams;
}

export const LIST_SOURCE: InjectionToken<ListSource> =
  new InjectionToken<ListSource>('LIST_SOURCE');

export const LIST_DEFAULT_FILTERS: InjectionToken<FilterConfig[]> =
  new InjectionToken<FilterConfig[]>('LIST_DEFAULT_FILTERS');

export const LIST_FILTER_STORAGE: InjectionToken<FilterConfig[]> =
  new InjectionToken<FilterConfig[]>('LIST_DEFAULT_FILTERS');

export const LIST_PARAMS_MERGER: InjectionToken<ListParamsMerger> =
  new InjectionToken<ListParamsMerger>('LIST_PARAMS_MERGER', {
    factory: () => ({
      merge(params?: ListParams[]): ListParams {
        if (!params?.length) {
          return {};
        }

        return params.reduce((result, params) => ({ ...result, ...params }));
      },
    }),
  });

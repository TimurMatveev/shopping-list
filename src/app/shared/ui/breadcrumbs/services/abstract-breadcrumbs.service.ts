import { Observable } from "rxjs";

export abstract class AbstractBreadcrumbsService<T> {
  public readonly abstract breadcrumbs$: Observable<T[]>;
}

import { Injectable } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router, PRIMARY_OUTLET, Data } from "@angular/router";
import { AbstractBreadcrumbsService } from "../../ui/breadcrumbs/services/abstract-breadcrumbs.service";
import { filter, Observable, of, shareReplay, startWith, switchMap } from "rxjs";
import { RouterBreadcrumb, RouterBreadcrumbsFactory } from "./router-breadcrumbs.types";

@Injectable()
export class RouterBreadcrumbsService extends AbstractBreadcrumbsService<RouterBreadcrumb> {
  public readonly breadcrumbs$: Observable<RouterBreadcrumb[]> = this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null),
      switchMap(() => this.buildBreadcrumbs()),
      shareReplay(1),
    );

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  public handleBreadcrumbClick(breadcrumb: RouterBreadcrumb, event: Event): void {
    event.stopPropagation();

    if (breadcrumb.disabled) {
      return;
    }

    this.router.navigate([breadcrumb.url]);
  }

  private getPrimaryRoute(route = this.activatedRoute): ActivatedRoute {
    const primaryChild = route.children.find(({outlet}) => outlet === PRIMARY_OUTLET);

    return primaryChild ? this.getPrimaryRoute(primaryChild) : route;
  }

  private buildBreadcrumbs(): Observable<RouterBreadcrumb[]> {
    const route: ActivatedRoute = this.getPrimaryRoute();

    return route.data
      .pipe(
        switchMap((data: Data) => {
          const breadcrumbsFactory: RouterBreadcrumbsFactory | null = data['breadcrumbsFactory'];

          if (breadcrumbsFactory) {
            return breadcrumbsFactory(route);
          }

          const breadcrumbs: RouterBreadcrumb[] | null = data['breadcrumbs'];

          return of(breadcrumbs || []);
        }),
      );
  }
}

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router } from "@angular/router";
import { Observable, of, tap } from "rxjs";
import { PermissionArea, PermissionService } from "../model";

export type PermissionConfig = {
  area: PermissionArea,
  can: number,
}

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private permissionService: PermissionService,
  ) {
  }

  public canLoad(route: Route): Observable<boolean> {
    return this.checkUserPermitted(route.data && route.data['permission']);
  }

  public canActivate(routeSnapshot: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkUserPermitted(routeSnapshot.data['permission']);
  }

  public canActivateChild(routeSnapshot: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkUserPermitted(routeSnapshot.data['permission']);
  }

  private checkUserPermitted(config?: PermissionConfig): Observable<boolean> {
    if (!config) {
      return of(true);
    }

    return this.permissionService.hasPermission(config.area, config.can)
      .pipe(
        tap((isPermitted: boolean) => {
          if (!isPermitted) {
            this.router.navigate(['access-denied']);
          }
        }),
      );
  }
}

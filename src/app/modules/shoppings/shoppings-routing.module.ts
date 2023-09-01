import { inject, NgModule } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Data, Params, RouterModule, Routes } from '@angular/router';
import { AppBreadcrumbs } from "../../app.breadcrumbs";
import { ShoppingListPageComponent, ShoppingPageComponent } from "./pages";
import { AuthService } from "../../shared/modules/auth";
import { MY_USER, ShoppingType } from "./shoppings.constants";
import { Loader, PatchLoader } from "../../shared/helpers/loader.helper";
import { map, switchMap } from "rxjs";
import { Shopping, ShoppingService } from "./model";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `${ MY_USER }/lists/${ ShoppingType.Own }`,
  },
  {
    path: ':userId/lists',
    pathMatch: 'full',
    redirectTo: `:userId/lists/${ ShoppingType.Own }`,
  },
  {
    path: ':userId/lists/:shoppingType',
    component: ShoppingListPageComponent,
    data: {
      breadcrumbsFactory: (route: ActivatedRoute) => {
        return route.params
          .pipe(
            map(({ userId, shoppingType }: Params) => AppBreadcrumbs.shoppings(userId, shoppingType, true)),
          )
      },
    },
    resolve: {
      userId: (route: ActivatedRouteSnapshot) =>
        route.params['userId'] === MY_USER ? inject(AuthService).userId$ : +route.params['userId'],
    },
  },
  {
    path: ':userId/lists/:shoppingType/:id',
    component: ShoppingPageComponent,
    resolve: {
      shoppingLoader: (route: ActivatedRouteSnapshot) => new PatchLoader(inject(ShoppingService).getItem(route.params['id'])),
      userId: (route: ActivatedRouteSnapshot) =>
        route.params['userId'] === MY_USER ? inject(AuthService).userId$ : +route.params['userId'],
    },
    data: {
      breadcrumbsFactory: (route: ActivatedRoute) => {
        return route.data
          .pipe(
            map((data: Data) => data['shoppingLoader']),
            switchMap((loader: Loader<Shopping>) => loader.data$),
            map((shopping: Shopping | null) => AppBreadcrumbs.shopping(
              route.snapshot.params['userId'],
              route.snapshot.params['shoppingType'],
              route.snapshot.params['id'],
              shopping,
              true
            )),
          );
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingsRoutingModule { }

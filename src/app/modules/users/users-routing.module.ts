import { inject, NgModule } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Data, RouterModule, Routes } from '@angular/router';
import { UserListPageComponent } from "./pages/user-list-page/user-list-page.component";
import { AppBreadcrumbs } from "../../app.breadcrumbs";
import { UserService } from "./model/user.service";
import { map, switchMap } from "rxjs";
import { Loader } from "../../shared/helpers/loader.helper";
import { User } from "./model/user.types";
import { UserPageComponent } from "./pages/user-page/user-page.component";

const routes: Routes = [
  {
    path: '',
    component: UserListPageComponent,
    data: {
      breadcrumbs: AppBreadcrumbs.users(true),
    },
  },
  {
    path: ':id',
    component: UserPageComponent,
    resolve: {
      userLoader: (route: ActivatedRouteSnapshot) => new Loader(inject(UserService).getItem(route.params['id'])),
    },
    data: {
      breadcrumbsFactory: (route: ActivatedRoute) => {
        return route.data
          .pipe(
            map((data: Data) => data['userLoader']),
            switchMap((loader: Loader<User>) => loader.data$),
            map((user: User | null) => AppBreadcrumbs.user(route.snapshot.params['id'], user, true)),
          );
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }

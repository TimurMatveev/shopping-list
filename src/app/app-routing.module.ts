import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from "./modules/dashboard";
import { AppBreadcrumbs } from "./app.breadcrumbs";
import { AuthGuard, AuthPageComponent } from "./shared/modules/auth";
import { PermissionArea, PermissionGuard, PermissionValue } from "./shared/modules/permission";
import { AccessDeniedPageComponent, NotFoundPageComponent } from "./shared/modules/error-page";

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    data: {
      breadcrumbs: AppBreadcrumbs.dashboard(true),
      permission: {
        area: PermissionArea.Dashboard,
        can: PermissionValue.Read,
      },
    },
    canActivate: [AuthGuard, PermissionGuard],
  },
  {
    path: 'auth',
    component: AuthPageComponent,
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
    canLoad: [AuthGuard, PermissionGuard],
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permission: {
        area: PermissionArea.User,
        can: PermissionValue.Read,
      },
    }
  },
  {
    path: 'categories',
    loadChildren: () => import('./modules/categories/categories.module').then(m => m.CategoriesModule),
    canLoad: [AuthGuard, PermissionGuard],
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permission: {
        area: PermissionArea.Category,
        can: PermissionValue.Read,
      },
    }
  },
  {
    path: 'shopping',
    loadChildren: () => import('./modules/shoppings/shoppings.module').then(m => m.ShoppingsModule),
    canLoad: [AuthGuard, PermissionGuard],
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permission: {
        area: PermissionArea.Shopping,
        can: PermissionValue.Read,
      },
    }
  },
  {
    path: 'access-denied',
    component: AccessDeniedPageComponent,
    data: {
      breadcrumbs: AppBreadcrumbs.error(403),
    },
  },
  {
    path: 'not-found',
    component: NotFoundPageComponent,
    data: {
      breadcrumbs: AppBreadcrumbs.error(404),
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

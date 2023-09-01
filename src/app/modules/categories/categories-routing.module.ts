import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListPageComponent } from "./pages";
import { AppBreadcrumbs } from "../../app.breadcrumbs";

const routes: Routes = [
  {
    path: '',
    component: CategoryListPageComponent,
    data: {
      breadcrumbs: AppBreadcrumbs.categories(true),
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule { }
